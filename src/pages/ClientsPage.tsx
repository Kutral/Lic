import { useEffect } from 'react'
import { ClientCard } from '../components/clients/ClientCard'
import { ClientForm } from '../components/clients/ClientForm'
import { PageWrapper } from '../components/layout/PageWrapper'
import { useClientStore } from '../store/clientStore'

export const ClientsPage = () => {
  const { clients, addClient, loadClients } = useClientStore()

  useEffect(() => {
    void loadClients()
  }, [loadClients])

  return (
    <PageWrapper title='Client Manager'>
      <div className='mb-4'>
        <ClientForm onSubmit={async (value) => addClient({ ...value, dob: '', notes: '' })} />
      </div>

      <div className='grid gap-3 md:grid-cols-2'>
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </PageWrapper>
  )
}
