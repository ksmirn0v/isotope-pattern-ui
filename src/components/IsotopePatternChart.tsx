import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatMass, formatProbability } from '../format'
import type { IsotopeFormula } from '../types'
import { IsotopePatternTable } from './IsotopePatternTable'


const AXIS_MASS_PADDING = 10
const BAR_SIZE = 6
const BAR_FILL = '#2563eb'


interface IsotopePatternChartProps {
  data: IsotopeFormula[]
}


// Recharts derives a bar's available width from the pixel gap between the
// closest two data points on the axis, then clamps `barSize` to fit. Isotope
// peaks can sit thousandths of a mass unit apart, which collapses that gap
// (and the bar) to a near-invisible sliver. Drawing a fixed-width path
// centered on the computed slot sidesteps that clamping entirely.
// Recharts' own type for `shape` (ActiveShape<BarProps, SVGPathElement>) doesn't
// accurately describe the per-item geometry it actually passes at render time,
// so the callback is typed structurally here instead of against that type.
function ThinBar({ x = 0, y = 0, width = 0, height = 0 }: { x?: number; y?: number; width?: number; height?: number }) {
  const barX = x + width / 2 - BAR_SIZE / 2
  return <path d={`M ${barX},${y} h ${BAR_SIZE} v ${height} h ${-BAR_SIZE} Z`} fill={BAR_FILL} />
}


export function IsotopePatternChart({ data }: IsotopePatternChartProps) {
  return (
    <div data-testid="isotope-pattern-chart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="mass"
            domain={[(dataMin: number) => dataMin - AXIS_MASS_PADDING, (dataMax: number) => dataMax + AXIS_MASS_PADDING]}
            tickFormatter={formatMass}
            label={{ value: 'Mass', position: 'insideBottom', offset: -8 }}
          />
          <YAxis tickFormatter={formatProbability} label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: number) => formatProbability(value)}
            labelFormatter={(mass: number) => `Mass: ${formatMass(mass)}`}
          />
          <Bar dataKey="probability" fill={BAR_FILL} shape={ThinBar} />
        </BarChart>
      </ResponsiveContainer>
      <IsotopePatternTable data={data} />
    </div>
  )
}
