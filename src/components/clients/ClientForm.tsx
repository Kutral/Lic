import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useState } from 'react'

export const ClientForm = ({ onSubmit }: { onSubmit: (value: { name: string; phone: string; email: string }) => Promise<void> }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Card className='space-y-3'>
      <Input placeholder='Client name' value={name} onChange={(event) => setName(event.target.value)} />
      <Input placeholder='Phone' value={phone} onChange={(event) => setPhone(event.target.value)} />
      <Input placeholder='Email (optional)' value={email} onChange={(event) => setEmail(event.target.value)} />
      <Button
        onClick={async () => {
          if (!name || !phone) return
          await onSubmit({ name, phone, email })
          setName('')
          setPhone('')
          setEmail('')
        }}
      >
        Add Client
      </Button>
    </Card>
  )
}
