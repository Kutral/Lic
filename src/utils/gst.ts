export type GstCategory = 'life' | 'ulip'

export interface GstContext {
  issueDate: string
  category: GstCategory
  policyTerm: number
}

const GST_CHANGEOVER = new Date('2025-09-22')

export const getGstRate = ({ issueDate, category, policyTerm }: GstContext) => {
  const issuedOn = new Date(issueDate)

  if (issuedOn >= GST_CHANGEOVER) {
    if (category === 'life') return 0
    return 0
  }

  if (category === 'ulip') return 0.18
  return policyTerm < 10 ? 0.045 : 0.0225
}
