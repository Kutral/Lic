import { useEffect } from 'react'
import { ClientCard } from '../components/clients/ClientCard'
import { ClientForm } from '../components/clients/ClientForm'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { useClientStore } from '../store/clientStore'
import { useUIStore } from '../store/uiStore'

export const ClientsPage = () => {
  const { clients, addClient, loadClients } = useClientStore()
  const { showToast } = useUIStore()

  useEffect(() => {
    void loadClients()
  }, [loadClients])

  return (
    <PageWrapper title='Client Manager' subtitle='Organize client records and keep quote history ready for instant follow-up.' eyebrow='CRM'>
      <div className='mb-4'>
        <ClientForm
          onSubmit={async (value) => {
            await addClient({ ...value, dob: '', notes: '' })
            showToast('Client added', `${value.name} was saved to your local vault.`)
          }}
        />
      </div>

      {clients.length ? (
        <div className='grid gap-3 md:grid-cols-2'>
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
        <Card variant='glass'>
          <p className='text-sm text-[var(--text-secondary)]'>No clients yet. Add your first client to start linking calculations and reminders.</p>
        </Card>
      )}
    </PageWrapper>
  )
}
