export type PlanType =
  | 'endowment'
  | 'moneyback'
  | 'term'
  | 'wholelife'
  | 'child'
  | 'pension'
  | 'ulip'
  | 'micro'

export type PaymentMode = 'yearly' | 'halfYearly' | 'quarterly' | 'monthlySSS'

export interface RateTable {
  [age: string]: {
    [term: string]: number
  }
}

export interface LICPlan {
  planNo: number
  name: string
  type: PlanType
  versionTag?: string
  minAge: number
  maxAge: number
  minTerm: number
  maxTerm: number
  minSA: number
  maxSA: number
  premiumRates: RateTable
  bonusRate: number
  gstCategory: 'life' | 'ulip'
  rebates: {
    highSA: { min: number; max?: number; ratePerThousand: number }[]
    mode: Record<PaymentMode, number>
  }
  riders: string[]
  survivalBenefits?: { year: number; percentage: number }[]
  loyaltyAdditionRate?: number
  description: string
  features: string[]
  isActive: boolean
  lastVerified: string
  sourceRefs: string[]
}

export interface CalculatorInput {
  planNo: number
  dateOfBirth: string
  quoteBy?: 'dob' | 'age'
  manualAge?: number | null
  sumAssured: number
  policyTerm: number
  premiumPayingTerm: number
  paymentMode: PaymentMode
  includeAccidentalRider: boolean
  includeTermRider: boolean
  includePwbRider: boolean
  smoker: boolean
  gender: 'male' | 'female' | 'other'
  ageMode: 'nearest' | 'last'
}

export interface PremiumBreakdown {
  age: number
  baseAnnualPremium: number
  riderPremiumAnnual: number
  highSARebate: number
  modeAdjustment: number
  gstRate: number
  gstAmount: number
  totalPremiumByMode: number
  maturityEstimate: number
  deathBenefitEstimate: number
  taxDeduction80C: number
  irrEstimate: number
}
