import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ClientForm } from '../components/clients/ClientForm'
import { PageWrapper } from '../components/layout/PageWrapper'
import { PremiumForm } from '../components/calculator/PremiumForm'
import { ResultCard } from '../components/calculator/ResultCard'
import { Card } from '../components/ui/Card'
import { useCalculator } from '../hooks/useCalculator'
import { useClientStore } from '../store/clientStore'
import { useUIStore } from '../store/uiStore'
import { plans } from '../data/plans'

export const CalculatorPage = () => {
  const { draft, selectedClientId, setDraft, setSelectedClientId } = useCalculator()
  const { clients, addClient, loadClients } = useClientStore()
  const { showToast } = useUIStore()
  const [useClientWorkspace, setUseClientWorkspace] = useState(false)
  const [showAddClientForm, setShowAddClientForm] = useState(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    void loadClients()
  }, [loadClients])

  useEffect(() => {
    const planParam = Number(searchParams.get('plan'))
    if (!Number.isFinite(planParam)) return
    if (draft.planNo === planParam) return

    const plan = plans.find((item) => item.planNo === planParam)
    if (!plan) return

    setDraft({
      planNo: plan.planNo,
      policyTerm: plan.minTerm,
      premiumPayingTerm: Math.min(plan.minTerm, 16),
      sumAssured: Math.max(plan.minSA, draft.sumAssured),
    })
  }, [searchParams, draft.planNo, draft.sumAssured, setDraft])

  return (
    <PageWrapper title='Premium Calculator' subtitle='Design a quote with riders, mode rebates, and instant maturity/death projection.' eyebrow='Core Engine'>
      <div className='grid gap-4 xl:grid-cols-5'>
        <div className='space-y-4 xl:col-span-3'>
          <Card variant='glass' className='space-y-3'>
            <div className='flex items-center justify-between'>
              <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Client Workspace (Optional)</p>
              <label className='flex items-center gap-2 text-xs text-[var(--text-secondary)]'>
                <input
                  type='checkbox'
                  checked={useClientWorkspace}
                  onChange={(event) => {
                    const next = event.target.checked
                    setUseClientWorkspace(next)
                    if (!next) setSelectedClientId(null)
                  }}
                />
                Use Client
              </label>
            </div>
            {useClientWorkspace && (
              <>
                <label className='block'>
                  <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Select Client</span>
                  <select
                    className='w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none'
                    value={selectedClientId ?? ''}
                    onChange={(event) => setSelectedClientId(event.target.value ? Number(event.target.value) : null)}
                  >
                    <option value=''>No client selected</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.phone}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <button
                    type='button'
                    className='text-xs font-semibold text-[var(--accent-blue)]'
                    onClick={() => setShowAddClientForm((prev) => !prev)}
                  >
                    {showAddClientForm ? 'Hide Add Client' : 'Add New Client'}
                  </button>
                </div>

                {showAddClientForm && (
                  <ClientForm
                    onSubmit={async (value) => {
                      await addClient({ ...value, dob: '', notes: '' })
                      await loadClients()
                      showToast('Client added', `${value.name} is now available in quote selection.`)
                    }}
                  />
                )}
              </>
            )}
          </Card>
          <PremiumForm />
        </div>
        <div className='space-y-4 xl:col-span-2'>
          <ResultCard />
          <Card variant='solid' className='space-y-2'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Tax Snapshot</p>
            <p className='text-sm text-[var(--text-secondary)]'>80C deduction applies under old regime limits. 10(10D) exemption depends on premium to SA rules by issue year.</p>
            <p className='text-xs text-[var(--text-tertiary)]'>Always validate final tax advice with latest applicable rules.</p>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}
