import { useState } from 'react'
import type { FormEvent } from 'react'

interface FormulaFormProps {
  onSubmit: (formula: string) => void
  isSubmitting: boolean
}

export function FormulaForm({ onSubmit, isSubmitting }: FormulaFormProps) {
  const [formula, setFormula] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = formula.trim()
    if (trimmed.length === 0) {
      return
    }
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formula">Molecular formula</label>
      <input
        id="formula"
        name="formula"
        type="text"
        placeholder="e.g. C2H5OH"
        value={formula}
        onChange={(event) => setFormula(event.target.value)}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting || formula.trim().length === 0}>
        {isSubmitting ? 'Computing…' : 'Compute'}
      </button>
    </form>
  )
}
