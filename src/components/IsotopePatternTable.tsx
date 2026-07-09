import { formatMass, formatProbability } from '../format'
import type { IsotopeFormula } from '../types'


interface IsotopePatternTableProps {
  data: IsotopeFormula[]
}


export function IsotopePatternTable({ data }: IsotopePatternTableProps) {
  return (
    <table data-testid="isotope-pattern-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mass</th>
          <th>Probability</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={`${entry.name}-${entry.mass}`}>
            <td>{entry.name}</td>
            <td>{formatMass(entry.mass)}</td>
            <td>{formatProbability(entry.probability)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
