import Dexie, { type Table } from 'dexie'
import type { CalculatorInput, PremiumBreakdown, LICPlan } from '../types'

export interface ClientRecord {
  id?: number
  name: string
  phone: string
  email?: string
  dob?: string
  notes?: string
  createdAt: string
}

export interface CalculationRecord {
  id?: number
  clientId?: number
  input: CalculatorInput
  output: PremiumBreakdown
  createdAt: string
}

export class LicDb extends Dexie {
  plans!: Table<LICPlan, number>
  clients!: Table<ClientRecord, number>
  calculations!: Table<CalculationRecord, number>

  constructor() {
    super('lic-calculator-db')
    this.version(1).stores({
      plans: 'planNo, name, type, isActive',
      clients: '++id, name, phone, email, dob, createdAt',
      calculations: '++id, clientId, createdAt, input.planNo',
    })
  }
}

export const db = new LicDb()
