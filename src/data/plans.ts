import type { LICPlan, PlanType } from '../types'

const modeRebates = {
  yearly: 0.02,
  halfYearly: 0.01,
  quarterly: 0,
  monthlySSS: -0.05,
} as const

const defaultsByType: Record<
  PlanType,
  Pick<LICPlan, 'minAge' | 'maxAge' | 'minTerm' | 'maxTerm' | 'minSA' | 'maxSA' | 'premiumRates' | 'bonusRate' | 'gstCategory' | 'rebates' | 'riders'>
> = {
  endowment: {
    minAge: 8,
    maxAge: 60,
    minTerm: 10,
    maxTerm: 35,
    minSA: 100000,
    maxSA: 50000000,
    premiumRates: { '30': { '20': 58 } },
    bonusRate: 40,
    gstCategory: 'life',
    rebates: {
      highSA: [
        { min: 500000, max: 995000, ratePerThousand: 1.5 },
        { min: 1000000, ratePerThousand: 2 },
      ],
      mode: { ...modeRebates },
    },
    riders: ['Accidental Benefit Rider', 'New Term Assurance Rider'],
  },
  wholelife: {
    minAge: 0,
    maxAge: 65,
    minTerm: 12,
    maxTerm: 35,
    minSA: 200000,
    maxSA: 50000000,
    premiumRates: { '30': { '20': 54 } },
    bonusRate: 42,
    gstCategory: 'life',
    rebates: {
      highSA: [
        { min: 500000, max: 995000, ratePerThousand: 2 },
        { min: 1000000, ratePerThousand: 3 },
      ],
      mode: { ...modeRebates },
    },
    riders: ['Accidental Benefit Rider', 'New Term Assurance Rider'],
  },
  moneyback: {
    minAge: 13,
    maxAge: 60,
    minTerm: 15,
    maxTerm: 25,
    minSA: 200000,
    maxSA: 25000000,
    premiumRates: { '30': { '20': 64 } },
    bonusRate: 38,
    gstCategory: 'life',
    rebates: { highSA: [{ min: 500000, ratePerThousand: 1.5 }], mode: { ...modeRebates } },
    riders: ['Accidental Benefit Rider', 'New Term Assurance Rider'],
  },
  child: {
    minAge: 0,
    maxAge: 17,
    minTerm: 10,
    maxTerm: 25,
    minSA: 100000,
    maxSA: 10000000,
    premiumRates: { '10': { '20': 48 } },
    bonusRate: 35,
    gstCategory: 'life',
    rebates: { highSA: [{ min: 500000, ratePerThousand: 1.2 }], mode: { ...modeRebates } },
    riders: ['Premium Waiver Benefit Rider'],
  },
  term: {
    minAge: 18,
    maxAge: 65,
    minTerm: 10,
    maxTerm: 40,
    minSA: 500000,
    maxSA: 500000000,
    premiumRates: { '30': { '20': 8 } },
    bonusRate: 0,
    gstCategory: 'life',
    rebates: { highSA: [{ min: 10000000, ratePerThousand: 0.5 }], mode: { ...modeRebates } },
    riders: ['Accidental Benefit Rider', 'New Term Assurance Rider'],
  },
  pension: {
    minAge: 30,
    maxAge: 80,
    minTerm: 5,
    maxTerm: 99,
    minSA: 150000,
    maxSA: 100000000,
    premiumRates: { '50': { '10': 95 } },
    bonusRate: 0,
    gstCategory: 'life',
    rebates: { highSA: [{ min: 500000, ratePerThousand: 1 }], mode: { ...modeRebates } },
    riders: [],
  },
  ulip: {
    minAge: 0.75,
    maxAge: 60,
    minTerm: 10,
    maxTerm: 25,
    minSA: 100000,
    maxSA: 20000000,
    premiumRates: { '30': { '15': 78 } },
    bonusRate: 0,
    gstCategory: 'ulip',
    rebates: { highSA: [{ min: 500000, ratePerThousand: 1 }], mode: { ...modeRebates } },
    riders: ['Linked Accidental Death Benefit Rider'],
  },
  micro: {
    minAge: 18,
    maxAge: 55,
    minTerm: 10,
    maxTerm: 20,
    minSA: 50000,
    maxSA: 200000,
    premiumRates: { '30': { '10': 108 } },
    bonusRate: 22,
    gstCategory: 'life',
    rebates: { highSA: [], mode: { ...modeRebates } },
    riders: ['Accidental Benefit Rider'],
  },
}

const mkPlan = (input: {
  planNo: number
  name: string
  type: PlanType
  description: string
  features: string[]
  sourceRefs: string[]
  minAge?: number
  maxAge?: number
  minTerm?: number
  maxTerm?: number
  minSA?: number
  maxSA?: number
  premiumRates?: LICPlan['premiumRates']
  bonusRate?: number
  gstCategory?: LICPlan['gstCategory']
  riders?: string[]
  survivalBenefits?: { year: number; percentage: number }[]
  isActive?: boolean
}): LICPlan => {
  const d = defaultsByType[input.type]
  return {
    planNo: input.planNo,
    name: input.name,
    type: input.type,
    minAge: input.minAge ?? d.minAge,
    maxAge: input.maxAge ?? d.maxAge,
    minTerm: input.minTerm ?? d.minTerm,
    maxTerm: input.maxTerm ?? d.maxTerm,
    minSA: input.minSA ?? d.minSA,
    maxSA: input.maxSA ?? d.maxSA,
    premiumRates: input.premiumRates ?? d.premiumRates,
    bonusRate: input.bonusRate ?? d.bonusRate,
    gstCategory: input.gstCategory ?? d.gstCategory,
    rebates: d.rebates,
    riders: input.riders ?? d.riders,
    survivalBenefits: input.survivalBenefits,
    description: input.description,
    features: input.features,
    isActive: input.isActive ?? true,
    lastVerified: '2026-02-18',
    sourceRefs: input.sourceRefs,
  }
}

export const plans: LICPlan[] = [
  // Endowment Plans (official LIC insurance-plan table)
  mkPlan({ planNo: 717, name: "LIC's Single Premium Endowment Plan", type: 'endowment', description: 'Single premium endowment savings and protection.', features: ['Single premium', 'Savings + life cover'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 714, name: "LIC's New Endowment Plan", type: 'endowment', description: 'Participating endowment with risk cover and maturity corpus.', features: ['Participating', 'Maturity + bonus'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 715, name: "LIC's New Jeevan Anand", type: 'endowment', description: 'Endowment with lifelong coverage after maturity.', features: ['Whole-life continuation', 'Bonus eligible'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 733, name: "LIC's Jeevan Lakshya", type: 'endowment', description: 'Family-oriented endowment with maturity and protection focus.', features: ['Family protection', 'Participating'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 736, name: "LIC's Jeevan Labh Plan", type: 'endowment', description: 'Limited premium endowment with bonus participation.', features: ['Limited premium', 'Participating'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 774, name: "LIC's Amritbaal", type: 'child', description: 'Child-focused savings with protection features.', features: ['Child plan', 'Future corpus'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 760, name: "LIC's Bima Jyoti", type: 'endowment', description: 'Non-linked, non-participating savings product.', features: ['Guaranteed additions', 'Protection + savings'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 912, name: 'LIC’s Nav Jeevan Shree', type: 'endowment', description: 'High-value participating endowment plan.', features: ['High ticket', 'Participating'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 911, name: 'LIC’s Nav Jeevan Shree -Single Premium', type: 'endowment', description: 'Single premium variant of Nav Jeevan Shree.', features: ['Single premium', 'High-value'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 881, name: "LIC's Bima Lakshmi", type: 'endowment', description: 'Limited premium savings plan with periodic liquidity.', features: ['Limited premium', 'Savings'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),

  // Whole Life Plans
  mkPlan({ planNo: 745, name: "LIC's Jeevan Umang", type: 'wholelife', description: 'Whole life plan with annual survival payouts.', features: ['Whole-life cover', 'Annual benefits'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 771, name: "LIC's Jeevan Utsav", type: 'wholelife', description: 'Guaranteed benefit whole life product.', features: ['Guaranteed benefits', 'Whole-life cover'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 883, name: "LIC's Jeevan Utsav Single Premium", type: 'wholelife', description: 'Single premium whole life variant.', features: ['Single premium', 'Guaranteed benefits'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),

  // Money Back Plans
  mkPlan({ planNo: 748, name: 'LIC’s Bima Shree', type: 'moneyback', description: 'Money-back plan with periodic survival benefits.', features: ['Periodic payouts', 'Savings + life cover'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'], minSA: 1000000 }),
  mkPlan({ planNo: 720, name: "LIC's New Money Back Plan- 20 Years", type: 'moneyback', description: '20-year money-back with regular payouts.', features: ['20-year term', 'Periodic payouts'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'], survivalBenefits: [{ year: 5, percentage: 20 }, { year: 10, percentage: 20 }, { year: 15, percentage: 20 }] }),
  mkPlan({ planNo: 721, name: "LIC's New Money Back Plan-25 years", type: 'moneyback', description: '25-year money-back with staged benefits.', features: ['25-year term', 'Periodic payouts'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'], survivalBenefits: [{ year: 5, percentage: 15 }, { year: 10, percentage: 15 }, { year: 15, percentage: 15 }, { year: 20, percentage: 15 }] }),
  mkPlan({ planNo: 732, name: "LIC's New Children's Money Back Plan", type: 'child', description: 'Children money-back plan for education milestones.', features: ['Child plan', 'Milestone payouts'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 734, name: "LIC's Jeevan Tarun", type: 'child', description: 'Children-focused money back plan.', features: ['Child plan', 'Education support'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),

  // Term Assurance Plans
  mkPlan({ planNo: 876, name: 'LIC’s Digi Term', type: 'term', description: 'Digital pure protection term product.', features: ['Online term', 'Pure risk cover'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 878, name: 'LIC’s Digi Credit Life', type: 'term', description: 'Credit-linked digital term product.', features: ['Credit-linked', 'Online'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 877, name: 'LIC’s Yuva Credit Life', type: 'term', description: 'Credit life cover focused on youth segment.', features: ['Credit life', 'Youth-focused'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 875, name: 'LIC’s Yuva Term', type: 'term', description: 'Pure term protection for young earners.', features: ['Pure term', 'Flexible cover'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 954, name: "LIC's New Tech-Term", type: 'term', description: 'Online term plan with high protection option.', features: ['High SA', 'Online purchase'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 955, name: "LIC's New Jeevan Amar", type: 'term', description: 'Non-linked pure risk premium term plan.', features: ['Pure protection', 'Multiple payout choices'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 859, name: "LIC's Saral Jeevan Bima", type: 'term', description: 'Standardized simple term insurance product.', features: ['Simple term', 'Standard product'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),
  mkPlan({ planNo: 887, name: 'LIC’s Bima Kavach', type: 'term', description: 'Term assurance product with focused protection.', features: ['Term assurance', 'Risk protection'], sourceRefs: ['https://licindia.in/web/guest/insurance-plan'] }),

  // Pension Plans
  mkPlan({ planNo: 867, name: "LIC's New Pension Plus", type: 'pension', description: 'Pension-linked market associated plan.', features: ['Retirement corpus', 'Long horizon'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 857, name: "LIC's Jeevan Akshay-VII", type: 'pension', description: 'Immediate annuity pension product.', features: ['Immediate annuity', 'Retirement income'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 758, name: 'LIC’s New Jeevan Shanti', type: 'pension', description: 'Deferred annuity pension plan.', features: ['Deferred annuity', 'Guaranteed pension options'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 862, name: "LIC's Saral Pension", type: 'pension', description: 'Standard annuity pension plan.', features: ['Immediate annuity', 'Standardized structure'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 879, name: 'LIC’s Smart Pension', type: 'pension', description: 'Retirement income planning pension product.', features: ['Pension income', 'Retirement planning'], sourceRefs: ['https://licindia.in/pension-plan'] }),

  // Unit Linked Plans
  mkPlan({ planNo: 873, name: "LIC's Index Plus", type: 'ulip', description: 'Unit linked savings and protection plan.', features: ['Market linked', 'Fund options'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 749, name: "LIC's Nivesh Plus", type: 'ulip', description: 'Single premium unit linked plan.', features: ['Single premium', 'ULIP'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 752, name: "LIC's SIIP", type: 'ulip', description: 'Systematic investment and insurance ULIP plan.', features: ['Regular premium', 'ULIP'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 886, name: "LIC's Protection Plus", type: 'ulip', description: 'ULIP variant with additional protection orientation.', features: ['ULIP', 'Protection focus'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),

  // Micro Insurance Plans
  mkPlan({ planNo: 751, name: "LIC's Micro Bachat", type: 'micro', description: 'Micro insurance savings plan.', features: ['Low-ticket insurance', 'Savings support'], sourceRefs: ['https://licindia.in/micro-insurance-plans'] }),
  mkPlan({ planNo: 880, name: "LIC's Jan Suraksha", type: 'micro', description: 'Micro insurance protection-oriented plan.', features: ['Micro cover', 'Affordable premium'], sourceRefs: ['https://licindia.in/micro-insurance-plans'] }),
]

export const planMap = new Map(plans.map((plan) => [plan.planNo, plan]))

export const planCategories = [
  { value: 'endowment', label: 'Endowment' },
  { value: 'moneyback', label: 'Money Back' },
  { value: 'term', label: 'Term' },
  { value: 'wholelife', label: 'Whole Life' },
  { value: 'child', label: 'Child' },
  { value: 'pension', label: 'Pension' },
  { value: 'ulip', label: 'ULIP' },
  { value: 'micro', label: 'Micro' },
] as const
