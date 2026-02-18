import { create } from 'zustand'
import { db, type ClientRecord } from './db'

interface ClientState {
  clients: ClientRecord[]
  loadClients: () => Promise<void>
  addClient: (client: Omit<ClientRecord, 'id' | 'createdAt'>) => Promise<void>
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  loadClients: async () => {
    const clients = await db.clients.orderBy('name').toArray()
    set({ clients })
  },
  addClient: async (client) => {
    await db.clients.add({ ...client, createdAt: new Date().toISOString() })
    const clients = await db.clients.orderBy('name').toArray()
    set({ clients })
  },
}))
