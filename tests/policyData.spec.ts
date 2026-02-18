import { describe, expect, it } from 'vitest'
import { plans } from '../src/data/plans'

describe('policy data quality', () => {
  it('has unique plan numbers', () => {
    const nums = plans.map((p) => p.planNo)
    expect(new Set(nums).size).toBe(nums.length)
  })

  it('active plans include official LIC reference', () => {
    for (const plan of plans.filter((p) => p.isActive)) {
      expect(plan.sourceRefs.some((ref) => ref.includes('licindia.in'))).toBe(true)
    }
  })

  it('has sensible eligibility bounds', () => {
    for (const plan of plans) {
      expect(plan.minAge).toBeLessThanOrEqual(plan.maxAge)
      expect(plan.minTerm).toBeLessThanOrEqual(plan.maxTerm)
      expect(plan.minSA).toBeLessThanOrEqual(plan.maxSA)
    }
  })
})
