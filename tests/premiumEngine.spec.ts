import { describe, expect, it } from 'vitest'
import { calculatePremium } from '../src/utils/premium-engine'

const validInput = {
  planNo: 736,
  dateOfBirth: '1995-01-01',
  sumAssured: 1000000,
  policyTerm: 21,
  premiumPayingTerm: 16,
  paymentMode: 'yearly' as const,
  includeAccidentalRider: false,
  includeTermRider: false,
  includePwbRider: false,
  smoker: false,
  gender: 'male' as const,
  ageMode: 'nearest' as const,
}

describe('premium engine', () => {
  it('returns numeric premium outputs for valid input', () => {
    const result = calculatePremium(validInput)
    expect(result.totalPremiumByMode).toBeGreaterThan(0)
    expect(Number.isFinite(result.maturityEstimate)).toBe(true)
    expect(Number.isFinite(result.irrEstimate)).toBe(true)
  })

  it('throws on invalid age eligibility', () => {
    expect(() =>
      calculatePremium({
        ...validInput,
        planNo: 774,
        dateOfBirth: '1990-01-01',
      }),
    ).toThrowError()
  })

  it('applies monthly loading compared to yearly', () => {
    const yearly = calculatePremium({ ...validInput, paymentMode: 'yearly' })
    const monthly = calculatePremium({ ...validInput, paymentMode: 'monthlySSS' })
    expect(monthly.totalPremiumByMode).toBeGreaterThan(yearly.totalPremiumByMode)
  })
})
