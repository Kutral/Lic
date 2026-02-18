import { create } from 'zustand'
import type { CalculatorInput, PremiumBreakdown } from '../types'
import { calculatePremium } from '../utils/premium-engine'

interface CalculatorState {
  draft: CalculatorInput
  result: PremiumBreakdown | null
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
  setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
  runCalculation: () => {
    const { draft } = get()
    const result = calculatePremium(draft)
    set({ result })
  },
  reset: () => set({ draft: defaultDraft, result: null }),
}))
