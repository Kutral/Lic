import { Mail, Phone, User } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useState } from 'react'

export const ClientForm = ({ onSubmit }: { onSubmit: (value: { name: string; phone: string; email: string }) => Promise<void> }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Card variant='glass' className='space-y-3'>
      <Input label='Client Name' placeholder='Client full name' value={name} onChange={(event) => setName(event.target.value)} leading={<User size={14} />} />
      <Input label='Phone' placeholder='Phone number' value={phone} onChange={(event) => setPhone(event.target.value)} leading={<Phone size={14} />} />
      <Input label='Email' placeholder='Optional email' value={email} onChange={(event) => setEmail(event.target.value)} leading={<Mail size={14} />} />
      <Button
        className='w-full'
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

