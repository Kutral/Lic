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

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className='rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3'>
    <dt className='text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>{label}</dt>
    <dd className='mt-1 text-sm font-semibold text-[var(--text-primary)]'>{value}</dd>
  </div>
)

export const ResultCard = () => {
  const { result, selectedPlan, selectedClientId } = useCalculator()
  const { clients } = useClientStore()
  const { showToast } = useUIStore()
  const cardRef = useRef<HTMLDivElement>(null)
  const agent = loadAgentProfile()
  const selectedClient = clients.find((client) => client.id === selectedClientId)

  if (!result || !selectedPlan) {
    return (
      <Card variant='glass'>
        <p className='text-sm text-[var(--text-secondary)]'>Run a calculation to see your premium breakdown, maturity estimate, and tax snapshot.</p>
      </Card>
    )
  }

  const onDownloadPdf = async () => {
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
    <Card variant='metric' className='space-y-4' glow>
      <div ref={cardRef} className='space-y-4'>
        <p className='text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]'>Premium Result</p>
        {(agent.name || agent.brandName || selectedClient) && (
          <div className='rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] p-3 text-xs text-[var(--text-secondary)]'>
            {agent.brandName && <p className='font-semibold text-[var(--text-primary)]'>{agent.brandName}</p>}
            {agent.name && <p>Advisor: {agent.name}{agent.licId ? ` (LIC ID: ${agent.licId})` : ''}</p>}
            {agent.contact && <p>Contact: {agent.contact}</p>}
            {selectedClient && <p>Client: {selectedClient.name} ({selectedClient.phone})</p>}
          </div>
        )}
        <motion.h3 initial={{ opacity: 0.5, y: 8 }} animate={{ opacity: 1, y: 0 }} className='text-3xl font-extrabold text-[var(--accent-blue)] md:text-4xl'>
          {formatCurrencyINR(result.totalPremiumByMode)}
        </motion.h3>

        <dl className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          <Metric label='Age' value={`${result.age} years`} />
          <Metric label='Base Premium' value={formatCurrencyINR(result.baseAnnualPremium)} />
          <Metric label='Rider Premium' value={formatCurrencyINR(result.riderPremiumAnnual)} />
          <Metric label='GST' value={`${formatCurrencyINR(result.gstAmount)} (${(result.gstRate * 100).toFixed(2)}%)`} />
          <Metric label='Mode Adjustment' value={formatCurrencyINR(result.modeAdjustment)} />
          <Metric label='Maturity Estimate' value={formatCurrencyINR(result.maturityEstimate)} />
          <Metric label='Death Benefit' value={formatCurrencyINR(result.deathBenefitEstimate)} />
          <Metric label='IRR Estimate' value={`${result.irrEstimate.toFixed(2)}%`} />
          <Metric label='80C Eligible' value={formatCurrencyINR(result.taxDeduction80C)} />
        </dl>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <Button variant='secondary' onClick={onDownloadPdf} leadingIcon={<Download size={16} />}>
          Download PDF
        </Button>
        <Button variant='secondary' onClick={onShare} leadingIcon={<Share2 size={16} />}>
          Share Quote
        </Button>
      </div>
    </Card>
  )
}
