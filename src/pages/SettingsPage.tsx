import { PageWrapper } from '../components/layout/PageWrapper'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { Card } from '../components/ui/Card'
import { useTheme } from '../hooks/useTheme'

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

  return (
    <PageWrapper title='Settings'>
      <Card className='mb-3'>
        <p className='mb-2 text-xs text-[var(--text-secondary)]'>Theme</p>
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
      <Card>
        <p className='text-sm text-[var(--text-secondary)]'>Agent profile, export/import, and backup controls can be added here.</p>
      </Card>
    </PageWrapper>
  )
}
