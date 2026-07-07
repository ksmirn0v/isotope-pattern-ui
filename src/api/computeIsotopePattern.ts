import type { IsotopeFormula } from '../types'

export class ComputeError extends Error {}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function extractDetailMessage(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null || !('detail' in body)) {
    return undefined
  }

  const detail = (body as { detail: unknown }).detail

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((entry) => (typeof entry === 'object' && entry !== null && 'msg' in entry ? String(entry.msg) : String(entry)))
      .join(', ')
  }

  return undefined
}

export async function computeIsotopePattern(formula: string): Promise<IsotopeFormula[]> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/isotope-pattern/api/compute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formula }),
    })
  } catch {
    throw new ComputeError('Could not reach the isotope pattern service. Please try again.')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => undefined)
    throw new ComputeError(extractDetailMessage(body) ?? `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<IsotopeFormula[]>
}
