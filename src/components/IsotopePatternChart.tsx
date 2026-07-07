import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { IsotopeFormula } from '../types'

interface IsotopePatternChartProps {
  data: IsotopeFormula[]
}

function formatMass(mass: number): string {
  return mass.toFixed(4)
}

function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(2)}%`
}

export function IsotopePatternChart({ data }: IsotopePatternChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mass" tickFormatter={formatMass} label={{ value: 'Mass', position: 'insideBottom', offset: -8 }} />
        <YAxis tickFormatter={formatProbability} label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value: number) => formatProbability(value)}
          labelFormatter={(mass: number) => `Mass: ${formatMass(mass)}`}
        />
        <Bar dataKey="probability" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  )
}
