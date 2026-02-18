import { useState } from 'react'
import { Building2, Database, Globe, IdCard, Phone, UserCircle2 } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { Card } from '../components/ui/Card'
import { useTheme } from '../hooks/useTheme'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useUIStore } from '../store/uiStore'
import { type AgentProfile, loadAgentProfile, saveAgentProfile } from '../utils/agentProfile'

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()
  const { showToast } = useUIStore()
  const [profile, setProfile] = useState<AgentProfile>(loadAgentProfile)

  const updateProfile = (patch: Partial<AgentProfile>) =>
    setProfile((prev) => ({ ...prev, ...patch }))

  const saveProfile = () => {
    saveAgentProfile(profile)
    showToast('Profile saved', 'Agent details and branding updated.')
  }

  return (
    <PageWrapper title='Settings' subtitle='Control appearance, profile details, and local data management.' eyebrow='Preferences'>
      <Card variant='glass' className='mb-3 space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='rounded-2xl border border-blue-300/20 bg-blue-500/10 p-2 text-[var(--accent-blue)]'>
            <UserCircle2 size={16} />
          </div>
          <div>
            <p className='text-sm font-semibold'>Agent Profile</p>
            <p className='text-xs text-[var(--text-tertiary)]'>LIC Advisor · Branch setup</p>
          </div>
        </div>

        <div className='grid gap-3 md:grid-cols-2'>
          <Input
            label='Agent Name'
            value={profile.name}
            onChange={(event) => updateProfile({ name: event.target.value })}
            leading={<UserCircle2 size={14} />}
            placeholder='Full name'
          />
          <Input
            label='LIC ID'
            value={profile.licId}
            onChange={(event) => updateProfile({ licId: event.target.value })}
            leading={<IdCard size={14} />}
            placeholder='LIC advisor code'
          />
          <Input
            label='Primary Contact'
            value={profile.contact}
            onChange={(event) => updateProfile({ contact: event.target.value })}
            leading={<Phone size={14} />}
            placeholder='Phone number'
          />
          <Input
            label='WhatsApp'
            value={profile.whatsapp}
            onChange={(event) => updateProfile({ whatsapp: event.target.value })}
            leading={<Phone size={14} />}
            placeholder='WhatsApp number'
          />
          <Input
            label='Email'
            type='email'
            value={profile.email}
            onChange={(event) => updateProfile({ email: event.target.value })}
            leading={<Globe size={14} />}
            placeholder='name@example.com'
          />
          <Input
            label='Branch'
            value={profile.branch}
            onChange={(event) => updateProfile({ branch: event.target.value })}
            leading={<Building2 size={14} />}
            placeholder='Branch name'
          />
          <Input
            label='DO Code'
            value={profile.doCode}
            onChange={(event) => updateProfile({ doCode: event.target.value })}
            leading={<Building2 size={14} />}
            placeholder='Divisional Office code'
          />
          <Input
            label='Brand Name'
            value={profile.brandName}
            onChange={(event) => updateProfile({ brandName: event.target.value })}
            leading={<UserCircle2 size={14} />}
            placeholder='Shown in shared messages/PDF'
          />
        </div>

        <label className='block'>
          <span className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]'>Brand Tagline</span>
          <textarea
            className='min-h-22 w-full rounded-2xl border border-[var(--stroke-soft)] bg-[var(--bg-elev-2)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none shadow-[var(--shadow-soft)] focus:border-[var(--stroke-strong)] focus:ring-2 focus:ring-blue-400/30'
            value={profile.brandTagline}
            onChange={(event) => updateProfile({ brandTagline: event.target.value })}
            placeholder='Example: Trusted LIC guidance for families and business owners.'
          />
        </label>

        <Button onClick={saveProfile}>Save Profile</Button>
      </Card>

      <Card variant='glass' className='mb-3 space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='rounded-2xl border border-blue-300/20 bg-blue-500/10 p-2 text-[var(--accent-blue)]'>
            <Globe size={16} />
          </div>
          <p className='text-sm font-semibold'>Theme Mode</p>
        </div>
        <SegmentedControl
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' },
          ]}
        />
      </Card>

      <Card variant='glass' className='space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='rounded-2xl border border-blue-300/20 bg-blue-500/10 p-2 text-[var(--accent-blue)]'>
            <Database size={16} />
          </div>
          <p className='text-sm font-semibold'>Data Controls</p>
        </div>
        <div className='grid gap-2 sm:grid-cols-2'>
          <Button variant='secondary'>Export Data (JSON)</Button>
          <Button variant='secondary'>Import Backup</Button>
          <Button variant='tertiary'>Share App Link</Button>
          <Button variant='destructive'>Clear Local Data</Button>
        </div>
      </Card>
    </PageWrapper>
  )
}

