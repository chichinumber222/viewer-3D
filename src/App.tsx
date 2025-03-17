import React, { useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'
import AddPrimitiveModal from './components/AddPrimitiveModal'
import PrimitiveList from './components/PrimitiveList'
import Viewer from './components/Viewer'
import { Primitive } from './types/Primitive'

const App: React.FC = () => {
  const [primitives, setPrimitives] = useState<Primitive[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addPrimitives = (newPrimitives: Primitive[]) => {
    setPrimitives((prev) => [...prev, ...newPrimitives])
  }

  const handleSelect = (id: string) => {
    setPrimitives((prev) =>
      prev.map((p) => ({
        ...p,
        selected: p.id === id
      }))
    )
  }

  const clearScene = () => {
    setPrimitives([])
  }

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', pt: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={4}>
          <Box mb={2}>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Добавить примитив
            </Button>
            <Button variant="outlined" onClick={clearScene} sx={{ ml: 2 }}>
              Очистить
            </Button>
          </Box>
          <PrimitiveList primitives={primitives} onSelect={handleSelect} />
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '80vh' }}>
          <Viewer primitives={primitives} onSelect={handleSelect} />
        </Grid>
      </Grid>
      <AddPrimitiveModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addPrimitives} />
    </Container>
  )
}

export default App
