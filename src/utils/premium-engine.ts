import { planMap } from '../data/plans'
import type { CalculatorInput, PremiumBreakdown, LICPlan } from '../types'
import { getAgeLastBirthday, getAgeNearestBirthday } from './ageCalc'
import { getGstRate } from './gst'

const riderRatesPerThousand = {
  accidental: 1,
  term: 1.8,
  pwb: 0.9,
}

const findNearestRate = (plan: LICPlan, age: number, term: number) => {
  const ages = Object.keys(plan.premiumRates).map(Number)
  if (!ages.length) return 55

  const nearestAge = ages.reduce((prev, curr) =>
    Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev,
  )

  const terms = Object.keys(plan.premiumRates[String(nearestAge)] || {}).map(Number)
  if (!terms.length) return 55

  const nearestTerm = terms.reduce((prev, curr) =>
    Math.abs(curr - term) < Math.abs(prev - term) ? curr : prev,
  )

  return plan.premiumRates[String(nearestAge)]?.[String(nearestTerm)] ?? 55
}

const getHighSARebate = (plan: LICPlan, sumAssured: number) => {
  const slab = plan.rebates.highSA.find((entry) => {
    const upper = entry.max ?? Number.POSITIVE_INFINITY
    return sumAssured >= entry.min && sumAssured <= upper
  })

  if (!slab) return 0
  return (sumAssured / 1000) * slab.ratePerThousand
}

const estimateMaturity = (
  plan: LICPlan,
  input: CalculatorInput,
  annualBasePremium: number,
  highSARebate: number,
) => {
  const sa = input.sumAssured
  const bonus = plan.bonusRate > 0 ? (sa / 1000) * plan.bonusRate * input.policyTerm : 0
  const loyalty = plan.loyaltyAdditionRate ? (sa / 1000) * plan.loyaltyAdditionRate : 0
  const survival =
    plan.survivalBenefits?.reduce((total, benefit) => total + (sa * benefit.percentage) / 100, 0) ?? 0

  if (plan.type === 'term') return 0
  if (plan.type === 'ulip') {
    const invested = (annualBasePremium - highSARebate) * input.premiumPayingTerm
    return invested * 1.08 ** input.policyTerm
  }

  return sa + bonus + loyalty + survival
}

const estimateIRR = (premiumOutflowAnnual: number, years: number, maturityValue: number) => {
  if (!premiumOutflowAnnual || !years || !maturityValue) return 0
  const invested = premiumOutflowAnnual * years
  if (invested <= 0) return 0
  return (Math.pow(maturityValue / invested, 1 / years) - 1) * 100
}

export const calculatePremium = (
  input: CalculatorInput,
  quoteDate = new Date().toISOString().slice(0, 10),
): PremiumBreakdown => {
  const plan = planMap.get(input.planNo)
  if (!plan) {
    throw new Error('Plan not found')
  }

  const age =
    input.ageMode === 'nearest'
      ? getAgeNearestBirthday(input.dateOfBirth)
      : getAgeLastBirthday(input.dateOfBirth)

  if (age < plan.minAge || age > plan.maxAge) {
    throw new Error(`Age ${age} is outside eligibility for ${plan.name}`)
  }

  if (input.policyTerm < plan.minTerm || input.policyTerm > plan.maxTerm) {
    throw new Error('Policy term is outside plan limits')
  }

  if (input.sumAssured < plan.minSA || input.sumAssured > plan.maxSA) {
    throw new Error('Sum assured is outside plan limits')
  }

  const perThousandRate = findNearestRate(plan, age, input.policyTerm)
  let baseAnnualPremium = (input.sumAssured / 1000) * perThousandRate

  if (plan.type === 'term' && input.smoker) {
    baseAnnualPremium *= 1.15
  }

  if (input.gender === 'female' && plan.type === 'term') {
    baseAnnualPremium *= 0.97
  }

  const highSARebate = getHighSARebate(plan, input.sumAssured)
  const premiumAfterSARebate = Math.max(baseAnnualPremium - highSARebate, 0)

  const accidental = input.includeAccidentalRider ? (input.sumAssured / 1000) * riderRatesPerThousand.accidental : 0
  const termRider = input.includeTermRider ? (input.sumAssured / 1000) * riderRatesPerThousand.term : 0
  const pwbRider = input.includePwbRider ? (input.sumAssured / 1000) * riderRatesPerThousand.pwb : 0
  const riderPremiumAnnual = accidental + termRider + pwbRider

  const grossAnnualBeforeMode = premiumAfterSARebate + riderPremiumAnnual
  const modeRate = plan.rebates.mode[input.paymentMode]
  const modeAdjustment = grossAnnualBeforeMode * modeRate
  const adjustedPremium = grossAnnualBeforeMode - modeAdjustment

  const gstRate = getGstRate({
    issueDate: quoteDate,
    category: plan.gstCategory,
    policyTerm: input.policyTerm,
  })
  const gstAmount = adjustedPremium * gstRate
  const totalPremiumByMode = adjustedPremium + gstAmount

  const maturityEstimate = estimateMaturity(plan, input, premiumAfterSARebate, highSARebate)
  const deathBenefitEstimate = Math.max(input.sumAssured * 1.05, input.sumAssured + premiumAfterSARebate * input.premiumPayingTerm)
  const irrEstimate = estimateIRR(totalPremiumByMode, input.premiumPayingTerm, maturityEstimate)

  return {
    age,
    baseAnnualPremium,
    riderPremiumAnnual,
    highSARebate,
    modeAdjustment,
    gstRate,
    gstAmount,
    totalPremiumByMode,
    maturityEstimate,
    deathBenefitEstimate,
    taxDeduction80C: Math.min(totalPremiumByMode, 150000),
    irrEstimate,
  }
}
