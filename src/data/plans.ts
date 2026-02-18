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
  versionTag: string
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
}): LICPlan => {
  const d = defaultsByType[input.type]
  return {
    planNo: input.planNo,
    name: input.name,
    type: input.type,
    versionTag: input.versionTag,
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
    isActive: true,
    lastVerified: '2026-02-19',
    sourceRefs: input.sourceRefs,
  }
}

export const plans: LICPlan[] = [
  mkPlan({ planNo: 717, name: "LIC's Single Premium Endowment Plan", type: 'endowment', versionTag: '512N283V03', description: 'Single premium endowment plan.', features: ['Single premium', 'Savings + life cover'], sourceRefs: ['https://licindia.in/insurance-plan', 'https://licindia.in/web/guest/lic-s-single-premium-endowment-plan-717-512n283v03'] }),
  mkPlan({ planNo: 714, name: "LIC's New Endowment Plan", type: 'endowment', versionTag: '512N277V03', description: 'Participating endowment savings plan.', features: ['Participating', 'Life cover + maturity'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 715, name: "LIC's New Jeevan Anand", type: 'endowment', versionTag: '512N279V03', description: 'Endowment with lifelong protection continuation.', features: ['Endowment + whole-life continuation'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 733, name: "LIC's Jeevan Lakshya", type: 'endowment', versionTag: '512N297V03', description: 'Family-focused endowment plan.', features: ['Family protection', 'Maturity corpus'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 736, name: "LIC's Jeevan Labh Plan", type: 'endowment', versionTag: '512N304V03', description: 'Limited premium endowment plan.', features: ['Limited premium', 'Participating'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 774, name: "LIC's Amritbaal", type: 'child', versionTag: '512N365V02', description: 'Child/endowment oriented protection and savings.', features: ['Child corpus', 'Protection'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 760, name: "LIC's Bima Jyoti", type: 'endowment', versionTag: '512N339V03', description: 'Guaranteed additions based endowment.', features: ['Guaranteed additions'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 912, name: "LIC's Nav Jeevan Shree", type: 'endowment', versionTag: '512N387V02', description: 'High-value endowment product.', features: ['High ticket', 'Endowment'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 911, name: "LIC's Nav Jeevan Shree - Single Premium", type: 'endowment', versionTag: '512N390V01', description: 'Single premium Nav Jeevan Shree.', features: ['Single premium', 'High ticket'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 881, name: "LIC's Bima Lakshmi", type: 'endowment', versionTag: '512N389V01', description: 'Endowment targeted for female lives.', features: ['Endowment', 'Female focused'], sourceRefs: ['https://licindia.in/insurance-plan'] }),

  mkPlan({ planNo: 745, name: "LIC's Jeevan Umang", type: 'wholelife', versionTag: '512N312V03', description: 'Whole life with survival payouts.', features: ['Whole-life', 'Periodic benefits'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 771, name: "LIC's Jeevan Utsav", type: 'wholelife', versionTag: '512N363V02', description: 'Whole life with guaranteed benefits.', features: ['Whole-life', 'Guaranteed benefits'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 883, name: "LIC's Jeevan Utsav Single Premium", type: 'wholelife', versionTag: '512N392V01', description: 'Single premium whole life variant.', features: ['Single premium', 'Whole-life'], sourceRefs: ['https://licindia.in/insurance-plan'] }),

  mkPlan({ planNo: 748, name: "LIC's Bima Shree", type: 'moneyback', versionTag: '512N316V03', description: 'Money back with periodic payouts.', features: ['Money back', 'Survival benefits'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 720, name: "LIC's New Money Back Plan-20 Years", type: 'moneyback', versionTag: '512N280V03', description: '20-year money back plan.', features: ['Money back', '20-year'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 721, name: "LIC's New Money Back Plan-25 Years", type: 'moneyback', versionTag: '512N278V03', description: '25-year money back plan.', features: ['Money back', '25-year'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 732, name: "LIC's New Children's Money Back Plan", type: 'child', versionTag: '512N296V03', description: 'Children money back plan.', features: ['Child plan', 'Money back'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 734, name: "LIC's Jeevan Tarun", type: 'child', versionTag: '512N299V03', description: 'Children savings and milestone support.', features: ['Child plan', 'Education support'], sourceRefs: ['https://licindia.in/insurance-plan'] }),

  mkPlan({ planNo: 876, name: "LIC's Digi Term", type: 'term', versionTag: '512N356V02', description: 'Digital term insurance.', features: ['Term', 'Digital issuance'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 878, name: "LIC's Digi Credit Life", type: 'term', versionTag: '512N358V01', description: 'Digital credit-life term cover.', features: ['Term', 'Credit life'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 877, name: "LIC's Yuva Credit Life", type: 'term', versionTag: '512N357V01', description: 'Yuva credit life term cover.', features: ['Term', 'Credit linked'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 875, name: "LIC's Yuva Term", type: 'term', versionTag: '512N355V02', description: 'Term plan for young earners.', features: ['Term', 'Youth focused'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 954, name: "LIC's New Tech-Term", type: 'term', versionTag: '512N351V02', description: 'Online pure protection term plan.', features: ['Term', 'Online'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 955, name: "LIC's New Jeevan Amar", type: 'term', versionTag: '512N350V02', description: 'Non-linked pure risk term plan.', features: ['Term', 'Pure risk'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 859, name: "LIC's Saral Jeevan Bima", type: 'term', versionTag: '512N341V01', description: 'Standardized simple term insurance.', features: ['Term', 'Standard product'], sourceRefs: ['https://licindia.in/insurance-plan'] }),
  mkPlan({ planNo: 887, name: "LIC's Bima Kavach", type: 'term', versionTag: '512N360V01', description: 'Protection-centric term assurance.', features: ['Term', 'Protection'], sourceRefs: ['https://licindia.in/insurance-plan'] }),

  mkPlan({ planNo: 873, name: "LIC's Index Plus", type: 'ulip', versionTag: '512L354V01', description: 'Unit linked plan with indexed funds.', features: ['ULIP', 'Market linked'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 749, name: "LIC's Nivesh Plus", type: 'ulip', versionTag: '512L317V02', description: 'Single premium unit linked plan.', features: ['ULIP', 'Single premium'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 752, name: "LIC's SIIP", type: 'ulip', versionTag: '512L334V02', description: 'Systematic investment ULIP.', features: ['ULIP', 'Regular premium'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),
  mkPlan({ planNo: 886, name: "LIC's Protection Plus", type: 'ulip', versionTag: '512L361V01', description: 'ULIP with protection focus.', features: ['ULIP', 'Protection'], sourceRefs: ['https://licindia.in/unit-linked-plans'] }),

  mkPlan({ planNo: 867, name: "LIC's New Pension Plus", type: 'pension', versionTag: '512L347V01', description: 'Pension ULIP-hybrid product.', features: ['Pension', 'Market linked'], sourceRefs: ['https://licindia.in/pension-plan'], gstCategory: 'ulip' }),
  mkPlan({ planNo: 857, name: "LIC's Jeevan Akshay-VII", type: 'pension', versionTag: '512N337V07', description: 'Immediate annuity pension plan.', features: ['Immediate annuity'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 758, name: "LIC's New Jeevan Shanti", type: 'pension', versionTag: '512N338V08', description: 'Deferred annuity pension plan.', features: ['Deferred annuity'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 862, name: "LIC's Saral Pension", type: 'pension', versionTag: '512N342V05', description: 'Standard annuity pension plan.', features: ['Pension'], sourceRefs: ['https://licindia.in/pension-plan'] }),
  mkPlan({ planNo: 879, name: "LIC's Smart Pension", type: 'pension', versionTag: '512N386V01', description: 'Retirement-focused pension solution.', features: ['Pension', 'Retirement income'], sourceRefs: ['https://licindia.in/pension-plan'] }),

  mkPlan({ planNo: 751, name: "LIC's Micro Bachat", type: 'micro', versionTag: '512N329V03', description: 'Micro insurance savings plan.', features: ['Micro insurance'], sourceRefs: ['https://licindia.in/micro-insurance-plans'] }),
  mkPlan({ planNo: 880, name: "LIC's Jan Suraksha", type: 'micro', versionTag: '512N388V01', description: 'Micro insurance protection plan.', features: ['Micro insurance', 'Protection'], sourceRefs: ['https://licindia.in/micro-insurance-plans'] }),
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
