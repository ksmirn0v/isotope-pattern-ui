import type { IsotopeFormula } from '../types'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''


export class ComputeError extends Error {}


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
    throw new ComputeError(`Request failed with status ${response.status}`)
  }

  return await response.json()
}
