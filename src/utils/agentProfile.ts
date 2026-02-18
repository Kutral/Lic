export interface AgentProfile {
  name: string
  contact: string
  whatsapp: string
  email: string
  licId: string
  branch: string
  doCode: string
  brandName: string
  brandTagline: string
}

export const agentProfileStorageKey = 'lic-agent-profile-v1'

export const defaultAgentProfile: AgentProfile = {
  name: '',
  contact: '',
  whatsapp: '',
  email: '',
  licId: '',
  branch: '',
  doCode: '',
  brandName: '',
  brandTagline: '',
}

export const loadAgentProfile = (): AgentProfile => {
  const raw = localStorage.getItem(agentProfileStorageKey)
  if (!raw) return defaultAgentProfile

  try {
    const parsed = JSON.parse(raw) as Partial<AgentProfile>
    return { ...defaultAgentProfile, ...parsed }
  } catch {
    return defaultAgentProfile
  }
}

export const saveAgentProfile = (profile: AgentProfile) => {
  localStorage.setItem(agentProfileStorageKey, JSON.stringify(profile))
}
