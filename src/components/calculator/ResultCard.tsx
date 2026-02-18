import { Download, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'
import { useCalculator } from '../../hooks/useCalculator'
import { formatCurrencyINR } from '../../utils/formatCurrency'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export const ResultCard = () => {
  const { result, selectedPlan } = useCalculator()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!result || !selectedPlan) return null

  const onDownloadPdf = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, { scale: 2 })
    const pdf = new jsPDF('p', 'mm', 'a4')
    const width = 190
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, width, height)
    pdf.save(`LIC-${selectedPlan.planNo}-premium-quote.pdf`)
  }

  const onShare = async () => {
    const text = `${selectedPlan.name} (${selectedPlan.planNo}) premium quote: ${formatCurrencyINR(result.totalPremiumByMode)}.`
    if (navigator.share) {
      await navigator.share({ title: 'LIC Premium Quote', text })
      return
    }

    await navigator.clipboard.writeText(text)
    alert('Quote copied to clipboard.')
  }

  return (
    <Card className='space-y-4'>
      <div ref={cardRef} className='space-y-3'>
        <p className='text-xs uppercase text-[var(--text-secondary)]'>Premium Result</p>
        <h3 className='text-2xl font-bold text-[var(--accent-blue)]'>{formatCurrencyINR(result.totalPremiumByMode)}</h3>
        <dl className='grid grid-cols-2 gap-3 text-sm'>
          <div>
            <dt className='text-[var(--text-secondary)]'>Base Premium</dt>
            <dd>{formatCurrencyINR(result.baseAnnualPremium)}</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>Rider Premium</dt>
            <dd>{formatCurrencyINR(result.riderPremiumAnnual)}</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>GST</dt>
            <dd>
              {formatCurrencyINR(result.gstAmount)} ({(result.gstRate * 100).toFixed(2)}%)
            </dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>Mode Adjustment</dt>
            <dd>{formatCurrencyINR(result.modeAdjustment)}</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>Maturity Estimate</dt>
            <dd>{formatCurrencyINR(result.maturityEstimate)}</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>Death Benefit</dt>
            <dd>{formatCurrencyINR(result.deathBenefitEstimate)}</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>IRR Estimate</dt>
            <dd>{result.irrEstimate.toFixed(2)}%</dd>
          </div>
          <div>
            <dt className='text-[var(--text-secondary)]'>80C Eligible</dt>
            <dd>{formatCurrencyINR(result.taxDeduction80C)}</dd>
          </div>
        </dl>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <Button variant='secondary' onClick={onDownloadPdf}>
          <Download size={16} className='mr-2 inline' /> PDF
        </Button>
        <Button variant='secondary' onClick={onShare}>
          <Share2 size={16} className='mr-2 inline' /> Share
        </Button>
      </div>
    </Card>
  )
}
