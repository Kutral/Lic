import { create } from 'zustand'
import type { CalculatorInput, PremiumBreakdown } from '../types'
import { calculatePremium } from '../utils/premium-engine'
import { db } from './db'

interface CalculatorState {
  draft: CalculatorInput
  result: PremiumBreakdown | null
  error: string | null
  setDraft: (patch: Partial<CalculatorInput>) => void
  runCalculation: () => void
  reset: () => void
}

const defaultDraft: CalculatorInput = {
  planNo: 714,
  dateOfBirth: '1995-01-01',
  sumAssured: 1000000,
  policyTerm: 21,
  premiumPayingTerm: 16,
  paymentMode: 'yearly',
  includeAccidentalRider: false,
  includeTermRider: false,
  includePwbRider: false,
  smoker: false,
  gender: 'male',
  ageMode: 'nearest',
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  draft: defaultDraft,
  result: null,
  error: null,
  setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch }, error: null })),
  runCalculation: () => {
    const { draft } = get()
    try {
      const result = calculatePremium(draft)
      set({ result, error: null })
      void db.calculations.add({
        input: { ...draft },
        output: { ...result },
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to calculate premium with current inputs.'
      set({ result: null, error: message })
    }
  },
  reset: () => set({ draft: defaultDraft, result: null, error: null }),
}))
