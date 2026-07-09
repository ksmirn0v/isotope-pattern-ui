import { useState } from 'react'
import { computeIsotopePattern, ComputeError } from './api/computeIsotopePattern'
import { FormulaForm } from './components/FormulaForm'
import { IsotopePatternChart } from './components/IsotopePatternChart'
import type { IsotopeFormula } from './types'


type Status = 'idle' | 'computing' | 'error' | 'success'


export function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<IsotopeFormula[]>([])
  const [error, setError] = useState<string | null>(null)

  async function computeFormula(formula: string) {
    setStatus('computing')
    setError(null)
    try {
      const result = await computeIsotopePattern(formula)
      setData(result)
      setStatus('success')
    } catch (err) {
      setError(err instanceof ComputeError ? err.message : "Something went wrong. Please try again.")
      setStatus('error')
    }
  }

  return (
    <main>
      <h1>Isotope Pattern</h1>
      <FormulaForm onCompute={computeFormula} isComputing={status === 'computing'} />
      {status === 'error' && error && <p role="alert">{error}</p>}
      {status === 'success' && <IsotopePatternChart data={data} />}
    </main>
  )
}
