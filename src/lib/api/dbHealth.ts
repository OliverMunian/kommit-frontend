import { apiBaseUrl } from '@/lib/api/apiBaseUrl'
import type { DbHealthResponse } from '@/types/apiContract'

export async function fetchDbHealth(): Promise<DbHealthResponse> {
  const response = await fetch(`${apiBaseUrl}/db-health`)

  return response.json()
}
