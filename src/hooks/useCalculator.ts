import { useMemo } from 'react'
import { useCalculatorStore } from '../store/calculatorStore'
import { planMap } from '../data/plans'

export const useCalculator = () => {
  const { draft, result, error, selectedClientId, setDraft, setSelectedClientId, runCalculation, reset } = useCalculatorStore()

  const selectedPlan = useMemo(() => planMap.get(draft.planNo), [draft.planNo])

  return {
    draft,
    result,
    error,
    selectedClientId,
    selectedPlan,
    setDraft,
    setSelectedClientId,
    runCalculation,
    reset,
  }
}
