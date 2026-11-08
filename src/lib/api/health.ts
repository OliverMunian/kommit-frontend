import { apiBaseUrl } from '@/lib/api/apiBaseUrl'
import type { HealthResponse } from '@/types/apiContract'

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/health`)

  if (!response.ok) {
    throw new Error('Serveur injoignable')
  }

  return response.json()
}
