import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'


interface FormulaFormProps {
  onCompute: (formula: string) => void
  isComputing: boolean
}


export function FormulaForm({ onCompute, isComputing }: FormulaFormProps) {

  const [formula, setFormula] = useState('')

  function submitFormula(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onCompute(formula)
    setFormula('')
  }

  function parseFormula(event: ChangeEvent<HTMLInputElement>) {
      const formulaTrimmed = event.target.value.toUpperCase().trim()
      setFormula(formulaTrimmed)
  }

  return (
    <form onSubmit={submitFormula}>
      <label htmlFor='formula'>Molecular Formula</label>
      <input
        id='formula'
        name='formula'
        type='text'
        placeholder="e.g. C2H5OH"
        value={formula}
        onChange={parseFormula}
        disabled={isComputing}
      />
      <button type='submit' disabled={isComputing || formula.length === 0}>
        {isComputing ? 'Computing…' : 'Compute'}
      </button>
    </form>
  )
}
