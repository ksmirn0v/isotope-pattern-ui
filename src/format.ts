export function formatMass(mass: number): string {
  return mass.toFixed(4)
}


export function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(2)}%`
}
