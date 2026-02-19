import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clsx } from 'clsx'
import { ClientForm } from '../components/clients/ClientForm'
import { PageWrapper } from '../components/layout/PageWrapper'
import { BottomSheet } from '../components/ui/BottomSheet'
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
  const [isClientSheetOpen, setIsClientSheetOpen] = useState(false)
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
          {/* Calculator Controls */}
          <div className='flex items-center justify-between'>
            <h2 className='text-[22px] font-bold text-[var(--text-primary)]'>Quote</h2>
            <button
              onClick={() => setIsClientSheetOpen(true)}
              className='flex items-center gap-2 rounded-full border border-[var(--stroke-soft)] bg-[var(--bg-elev-1)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] transition-colors active:bg-[var(--bg-elev-2)]'
            >
              {selectedClientId ? (
                <>
                  <span className='h-2 w-2 rounded-full bg-[var(--accent-emerald)]' />
                  {clients.find(c => c.id === selectedClientId)?.name ?? 'Client Selected'}
                </>
              ) : (
                <>
                  Client: <span className='text-[var(--accent-blue)]'>Anyone</span>
                </>
              )}
            </button>
          </div>

          <PremiumForm />
        </div>

        {/* Client Selection Sheet */}
        <BottomSheet
          isOpen={isClientSheetOpen}
          onClose={() => setIsClientSheetOpen(false)}
          title={showAddClientForm ? 'Add New Client' : 'Select Client'}
        >
          {showAddClientForm ? (
            <div className='space-y-4'>
              <button
                onClick={() => setShowAddClientForm(false)}
                className='text-[13px] font-medium text-[var(--accent-blue)]'
              >
                ← Back to list
              </button>
              <ClientForm
                onSubmit={async (value) => {
                  try {
                    await addClient({ ...value, dob: '', notes: '' })
                    await loadClients()
                    showToast('Client added', `${value.name} is now available.`)
                    setShowAddClientForm(false)
                  } catch (e) {
                    console.error(e)
                  }
                }}
              />
            </div>
          ) : (
            <div className='space-y-2'>
              <button
                onClick={() => {
                  setSelectedClientId(null)
                  setIsClientSheetOpen(false)
                }}
                className={clsx(
                  'flex w-full items-center justify-between rounded-xl p-4 text-left transition-colors active:bg-[var(--bg-elev-3)]',
                  selectedClientId === null ? 'bg-[var(--bg-elev-2)] ring-1 ring-[var(--accent-blue)]' : 'bg-[var(--bg-elev-1)]'
                )}
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-elev-3)] text-[var(--text-tertiary)]'>
                    <span className='text-lg'>👤</span>
                  </div>
                  <div>
                    <p className='text-[15px] font-semibold text-[var(--text-primary)]'>Generic Quote</p>
                    <p className='text-[13px] text-[var(--text-secondary)]'>Quick quote without saving</p>
                  </div>
                </div>
                {selectedClientId === null && <div className='h-2 w-2 rounded-full bg-[var(--accent-blue)]' />}
              </button>

              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClientId(client.id || null)
                    setIsClientSheetOpen(false)
                  }}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-xl p-4 text-left transition-colors active:bg-[var(--bg-elev-3)]',
                    selectedClientId === client.id ? 'bg-[var(--bg-elev-2)] ring-1 ring-[var(--accent-blue)]' : 'bg-[var(--bg-elev-1)]'
                  )}
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-blue-soft)]/20 text-[var(--accent-blue)]'>
                      <span className='font-bold'>{client.name[0]}</span>
                    </div>
                    <div>
                      <p className='text-[15px] font-semibold text-[var(--text-primary)]'>{client.name}</p>
                      <p className='text-[13px] text-[var(--text-secondary)]'>{client.phone}</p>
                    </div>
                  </div>
                  {selectedClientId === client.id && <div className='h-2 w-2 rounded-full bg-[var(--accent-blue)]' />}
                </button>
              ))}

              <div className='pt-4'>
                <button
                  onClick={() => setShowAddClientForm(true)}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-blue)] py-3.5 text-[15px] font-semibold text-white active:scale-[0.98]'
                >
                  + Add New Client
                </button>
              </div>
            </div>
          )}
        </BottomSheet>
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
