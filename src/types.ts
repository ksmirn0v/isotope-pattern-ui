export interface Isotope {
  name: string
  mass: number
  abundance: number
  count: number
}

export interface IsotopeFormula {
  name: string
  mass: number
  probability: number
  isotopes: Isotope[]
}
