import { useEffect, useMemo, useState } from 'react'
import { MessageCircle, Copy } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { db, type CalculationRecord, type ClientRecord } from '../store/db'
import { loadAgentProfile } from '../utils/agentProfile'
import { formatCurrencyINR } from '../utils/formatCurrency'
import { planMap } from '../data/plans'
import { useUIStore } from '../store/uiStore'

const templates = [
  {
    id: 'quote',
    title: 'Quote to Client',
    body: 'Hi {client_name}, your premium quote for {plan_name} is ready. Total premium is {premium} for sum assured {sum_assured}.',
  },
  {
    id: 'reminder',
    title: 'Premium Reminder',
    body: 'Dear {client_name}, your policy {plan_name} premium of {premium} is due shortly. Please pay before due date to keep benefits active.',
  },
  {
    id: 'maturity',
    title: 'Maturity Update',
    body: 'Dear {client_name}, estimated maturity value for {plan_name} is {maturity_value}. I can help you plan next reinvestment steps.',
  },
]

export const MessagesPage = () => {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [calculations, setCalculations] = useState<CalculationRecord[]>([])
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [selectedCalculationId, setSelectedCalculationId] = useState<number | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id)
  const [messageDraft, setMessageDraft] = useState('')
  const { showToast } = useUIStore()
  const agent = loadAgentProfile()

  useEffect(() => {
    const load = async () => {
      const [dbClients, dbCalculations] = await Promise.all([db.clients.orderBy('name').toArray(), db.calculations.reverse().sortBy('createdAt')])
      setClients(dbClients)
      setCalculations(dbCalculations)
      if (dbClients[0]?.id) setSelectedClientId(dbClients[0].id)
      if (dbCalculations[0]?.id) setSelectedCalculationId(dbCalculations[0].id)
    }
    void load()
  }, [])

  const selectedClient = clients.find((item) => item.id === selectedClientId)
  const filteredCalculations = selectedClientId
    ? calculations.filter((item) => item.clientId === selectedClientId)
    : calculations
  const selectedCalculation =
    filteredCalculations.find((item) => item.id === selectedCalculationId) ?? filteredCalculations[0] ?? null
  const selectedPlan = selectedCalculation ? planMap.get(selectedCalculation.input.planNo) : null
  const selectedTemplate = templates.find((item) => item.id === selectedTemplateId) ?? templates[0]

  const renderedMessage = useMemo(() => {
    const raw = selectedTemplate.body
    return raw
      .replaceAll('{client_name}', selectedClient?.name ?? 'Client')
      .replaceAll('{plan_name}', selectedPlan?.name ?? 'selected plan')
      .replaceAll('{premium}', selectedCalculation ? formatCurrencyINR(selectedCalculation.output.totalPremiumByMode) : 'N/A')
      .replaceAll('{sum_assured}', selectedCalculation ? formatCurrencyINR(selectedCalculation.input.sumAssured) : 'N/A')
      .replaceAll('{maturity_value}', selectedCalculation ? formatCurrencyINR(selectedCalculation.output.maturityEstimate) : 'N/A')
      .concat(`\n\n${agent.brandName || 'LIC Advisor'}\n${agent.name || ''}${agent.licId ? ` | LIC ID: ${agent.licId}` : ''}${agent.contact ? ` | ${agent.contact}` : ''}`.trim())
  }, [selectedTemplate, selectedClient, selectedPlan, selectedCalculation, agent])

  useEffect(() => {
    setMessageDraft(renderedMessage)
  }, [renderedMessage])

  const whatsappLink = selectedClient?.phone
    ? `https://wa.me/${selectedClient.phone.replace(/\\D/g, '')}?text=${encodeURIComponent(messageDraft)}`
    : `https://wa.me/?text=${encodeURIComponent(messageDraft)}`

  return (
    <PageWrapper title='Message Generator' subtitle='Quote-to-WhatsApp workflow with client, plan, and agent details auto-filled.' eyebrow='Agent Communication'>
      <div className='grid gap-4 lg:grid-cols-2'>
        <Card variant='glass' className='space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Compose</p>
          <label className='block'>
            <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Template</span>
            <select className='w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none' value={selectedTemplateId} onChange={(event) => setSelectedTemplateId(event.target.value)}>
              {templates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label className='block'>
            <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Client</span>
            <select className='w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none' value={selectedClientId ?? ''} onChange={(event) => setSelectedClientId(event.target.value ? Number(event.target.value) : null)}>
              <option value=''>No client selected</option>
              {clients.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.phone}
                </option>
              ))}
            </select>
          </label>
          <label className='block'>
            <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Calculation</span>
            <select className='w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-3 text-sm shadow-[var(--shadow-soft)] outline-none' value={selectedCalculation?.id ?? ''} onChange={(event) => setSelectedCalculationId(event.target.value ? Number(event.target.value) : null)}>
              <option value=''>No calculation selected</option>
              {filteredCalculations.map((item) => {
                const plan = planMap.get(item.input.planNo)
                return (
                  <option key={item.id} value={item.id}>
                    {plan?.name || item.input.planNo} - {formatCurrencyINR(item.output.totalPremiumByMode)} ({new Date(item.createdAt).toLocaleDateString('en-IN')})
                  </option>
                )
              })}
            </select>
          </label>
        </Card>

        <Card variant='interactive' className='space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Preview</p>
          {!selectedClientId && <p className='text-xs text-[var(--text-tertiary)]'>Tip: select a client for one-tap WhatsApp message with phone prefill.</p>}
          <textarea
            className='min-h-64 w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--stroke-strong)] focus:ring-2 focus:ring-blue-400/30'
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
          />
          <div className='grid grid-cols-2 gap-2'>
            <Button
              variant='secondary'
              leadingIcon={<Copy size={14} />}
              onClick={async () => {
                await navigator.clipboard.writeText(messageDraft)
                showToast('Message copied', 'Ready to paste and send.')
              }}
            >
              Copy
            </Button>
            <Button
              variant='primary'
              leadingIcon={<MessageCircle size={14} />}
              onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
            >
              WhatsApp
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}
