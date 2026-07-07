import { useState } from 'react'
import { computeIsotopePattern, ComputeError } from './api/computeIsotopePattern'
import { FormulaForm } from './components/FormulaForm'
import { IsotopePatternChart } from './components/IsotopePatternChart'
import type { IsotopeFormula } from './types'

type Status = 'idle' | 'loading' | 'error' | 'success'

export function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<IsotopeFormula[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formula: string) {
    setStatus('loading')
    setError(null)
    try {
      const result = await computeIsotopePattern(formula)
      setData(result)
      setStatus('success')
    } catch (err) {
      setError(err instanceof ComputeError ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main>
      <h1>Isotope Pattern</h1>
      <FormulaForm onSubmit={handleSubmit} isSubmitting={status === 'loading'} />
      {status === 'error' && error && <p role="alert">{error}</p>}
      {status === 'success' && <IsotopePatternChart data={data} />}
    </main>
  )
}
