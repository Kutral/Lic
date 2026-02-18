import { useMemo, useState } from 'react'
import { plans } from '../data/plans'
import type { PlanType } from '../types'

export const usePlanFilter = () => {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<PlanType | 'all'>('all')

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesType = type === 'all' || plan.type === type
      const q = query.toLowerCase().trim()
      const matchesQuery = !q || plan.name.toLowerCase().includes(q) || String(plan.planNo).includes(q)
      return matchesType && matchesQuery
    })
  }, [query, type])

  return { query, setQuery, type, setType, filteredPlans }
}
