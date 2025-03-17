import React from 'react'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Primitive } from '../types/Primitive'

interface PrimitiveListProps {
  primitives: Primitive[]
  onSelect: (id: string) => void
}

const PrimitiveList: React.FC<PrimitiveListProps> = ({ primitives, onSelect }) => {
  return (
    <List>
      {primitives.map((primitive) => (
        <ListItem key={primitive.id} disablePadding>
          <ListItemButton selected={primitive.selected} onClick={() => onSelect(primitive.id)}>
            <ListItemText
              primary={`${primitive.type.toUpperCase()} - (${primitive.position.x.toFixed(
                2
              )}, ${primitive.position.y.toFixed(2)}, ${primitive.position.z.toFixed(2)})`}
              secondary={`Цвет: ${primitive.color}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default PrimitiveList
