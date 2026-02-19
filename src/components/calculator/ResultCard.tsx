import { clsx } from 'clsx'
import { Download, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useCalculator } from '../../hooks/useCalculator'
import { useClientStore } from '../../store/clientStore'
import { useUIStore } from '../../store/uiStore'
import { formatCurrencyINR } from '../../utils/formatCurrency'
import { loadAgentProfile } from '../../utils/agentProfile'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const MetricRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className='flex items-center justify-between py-2'>
    <dt className='text-[15px] text-[var(--text-secondary)]'>{label}</dt>
    <dd className={clsx('text-[15px] font-medium tabular-nums text-[var(--text-primary)]', highlight && 'text-[var(--accent-blue)]')}>{value}</dd>
  </div>
)

export const ResultCard = () => {
  const { result, draft, selectedPlan, selectedClientId } = useCalculator()
  const { clients } = useClientStore()
  const { showToast } = useUIStore()
  const cardRef = useRef<HTMLDivElement>(null)
  const agent = loadAgentProfile()
  const selectedClient = clients.find((client) => client.id === selectedClientId)

  if (!result || !selectedPlan) {
    return (
      <Card variant='glass' className='flex flex-col items-center justify-center py-10 text-center'>
        <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-elev-2)]'>
          <span className='text-2xl'>✨</span>
        </div>
        <p className='text-[15px] font-medium text-[var(--text-primary)]'>Ready to Quote</p>
        <p className='text-[13px] text-[var(--text-secondary)]'>Enter details to generate a premium options card.</p>
      </Card>
    )
  }

  const onDownloadPdf = async () => {
    // ... same implementation ...
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, { scale: 2 })
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = 190
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, width, height)
    pdf.save(`LIC-${selectedPlan.planNo}-premium-quote.pdf`)
    showToast('PDF downloaded', 'Quote file is ready to share.')
  }

  const onShare = async () => {
    // ... same implementation ...
    const header = `${agent.brandName || 'LIC Premium Quote'}`
    const advisor = [agent.name, agent.licId ? `LIC ID: ${agent.licId}` : null, agent.contact].filter(Boolean).join(' | ')
    const clientLine = selectedClient ? `Client: ${selectedClient.name} (${selectedClient.phone})` : null
    const text = [
      header,
      `${selectedPlan.name} (${selectedPlan.planNo})`,
      `Age: ${result.age} years`,
      `Total Premium: ${formatCurrencyINR(result.totalPremiumByMode)}`,
      `Maturity: ${formatCurrencyINR(result.maturityEstimate)}`,
      clientLine,
      advisor,
    ]
      .filter(Boolean)
      .join('\n')

    if (navigator.share) {
      await navigator.share({ title: 'LIC Premium Quote', text })
      showToast('Quote shared', 'Shared using native share sheet.')
      return
    }

    await navigator.clipboard.writeText(text)
    showToast('Quote copied', 'Share text copied to clipboard.')
  }

  return (
    <div className='space-y-3'>
      <div ref={cardRef} className='relative overflow-hidden rounded-[24px] border border-[var(--stroke-soft)] bg-[var(--bg-elev-1)] shadow-[var(--shadow-float)]'>
        {/* Pass Header */}
        <div className='bg-[var(--accent-blue)] px-5 py-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[11px] font-semibold uppercase tracking-wider opacity-80'>LIC of India</p>
              <h3 className='text-lg font-bold leading-tight'>{selectedPlan.name}</h3>
            </div>
            <div className='text-right'>
              <p className='text-[11px] font-medium opacity-80'>Table</p>
              <p className='font-mono text-xl font-bold leading-none'>{selectedPlan.planNo}</p>
            </div>
          </div>
        </div>

        {/* Pass Body */}
        <div className='px-5 py-5'>
          <div className='mb-6 text-center'>
            <p className='text-[13px] font-medium text-[var(--text-secondary)]'>Annual Premium</p>
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='text-[40px] font-bold tracking-tight text-[var(--text-primary)]'
            >
              {formatCurrencyINR(result.totalPremiumByMode)}
            </motion.h2>
            <p className='text-[13px] text-[var(--text-secondary)]'>Includes GST</p>
          </div>

          <div className='space-y-1 border-t border-dashed border-[var(--stroke-strong)] py-4'>
            <MetricRow label='Age' value={`${result.age} Years`} />
            <MetricRow label='Sum Assured' value={formatCurrencyINR(draft.sumAssured)} />
            <MetricRow label='Policy Term' value={`${draft.policyTerm} Years`} />
            <MetricRow label='Maturity (approx)' value={formatCurrencyINR(result.maturityEstimate)} highlight />
          </div>

          <div className='rounded-xl bg-[var(--bg-elev-2)] px-4 py-3'>
            <div className='flex items-center justify-between'>
              <span className='text-[13px] font-medium text-[var(--text-secondary)]'>Advisor</span>
              <span className='text-[13px] font-semibold text-[var(--text-primary)]'>{agent.name || 'Agent'}</span>
            </div>
          </div>
        </div>

        {/* Pass Footer visual/punch hole effect (simulated) */}
        <div className='relative h-4 bg-[var(--bg-elev-1)]'>
          <div className='absolute -left-2 top-0 h-4 w-4 rounded-full bg-[var(--bg-primary)]' />
          <div className='absolute -right-2 top-0 h-4 w-4 rounded-full bg-[var(--bg-primary)]' />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Button variant='secondary' onClick={onDownloadPdf} className='justify-center'>
          <Download size={18} className='mr-2' /> PDF
        </Button>
        <Button variant='primary' onClick={onShare} className='justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-primary)]'>
          <Share2 size={18} className='mr-2' /> Share
        </Button>
      </div>

      <div className='text-center'>
        {!result.isRealData ? (
          <span className='inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'>
            ⚠️ Estimate (Fallback Data)
          </span>
        ) : (
          <span className='inline-flex items-center text-[10px] text-[var(--text-secondary)] opacity-60'>
            ✓ Based on Official Rate Tables
          </span>
        )}
      </div>
    </div>
  )
}
