import { Database, Globe, UserCircle2 } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { Card } from '../components/ui/Card'
import { useTheme } from '../hooks/useTheme'
import { Button } from '../components/ui/Button'

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

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
        <p className='text-sm text-[var(--text-secondary)]'>Name, contact, LIC ID, and branding fields can be expanded here.</p>
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
