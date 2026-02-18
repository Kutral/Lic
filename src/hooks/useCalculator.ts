import { useMemo } from 'react'
import { useCalculatorStore } from '../store/calculatorStore'
import { planMap } from '../data/plans'

export const useCalculator = () => {
  const { draft, result, setDraft, runCalculation, reset } = useCalculatorStore()

  const selectedPlan = useMemo(() => planMap.get(draft.planNo), [draft.planNo])

  return {
    draft,
    result,
    selectedPlan,
    setDraft,
    runCalculation,
    reset,
  }
}
