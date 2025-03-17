import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button
} from '@mui/material'
import { PrimitiveType, Primitive } from '../types/Primitive'
import { v4 as uuidv4 } from 'uuid'

function generateRandomPosition(): { x: number; y: number; z: number } {
  const range = 2
  return {
    x: Math.random() * (range * 2) - range,
    y: Math.random() * (range * 2) - range,
    z: Math.random() * (range * 2) - range
  }
}

function isGreenish(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return g > 200 && r < 100 && b < 100
}

function generateRandomColor(): string {
  let color = ''
  do {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    color = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
  } while (isGreenish(color))
  return color
}

interface AddPrimitiveModalProps {
  open: boolean
  onClose: () => void
  onAdd: (primitives: Primitive[]) => void
}

const AddPrimitiveModal: React.FC<AddPrimitiveModalProps> = ({ open, onClose, onAdd }) => {
  const [primitiveType, setPrimitiveType] = useState<PrimitiveType>('box')
  const [width, setWidth] = useState<number>(1)
  const [height, setHeight] = useState<number>(1)
  const [depth, setDepth] = useState<number>(1)
  const [count, setCount] = useState<number>(1)

  const handleSubmit = () => {
    const newPrimitives: Primitive[] = Array.from({ length: count }).map(() => {
      const position = generateRandomPosition()
      const color = generateRandomColor()
      return {
        id: uuidv4(),
        type: primitiveType,
        dimensions: { width, height, depth },
        position,
        color,
        selected: false
      }
    })
    onAdd(newPrimitives)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить примитив(ы)</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Тип"
          value={primitiveType}
          onChange={(e) => setPrimitiveType(e.target.value as PrimitiveType)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="box">Box</MenuItem>
          <MenuItem value="pyramid">Pyramid</MenuItem>
        </TextField>
        <TextField
          label="Width"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          fullWidth
          margin="dense"
          inputProps={{ min: 0.1, max: 5, step: 0.1 }}
        />
        <TextField
          label="Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          fullWidth
          margin="dense"
          inputProps={{ min: 0.1, max: 5, step: 0.1 }}
        />
        <TextField
          label="Depth"
          type="number"
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          fullWidth
          margin="dense"
          inputProps={{ min: 0.1, max: 5, step: 0.1 }}
        />
        <TextField
          label="Количество"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          fullWidth
          margin="dense"
          inputProps={{ min: 1, step: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPrimitiveModal
