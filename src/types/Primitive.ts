export type PrimitiveType = 'box' | 'pyramid'

export interface Primitive {
  id: string
  type: PrimitiveType
  dimensions: {
    width: number
    height: number
    depth: number
  }
  position: { x: number; y: number; z: number }
  color: string
  selected: boolean
}
