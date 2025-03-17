/* eslint-disable react/no-unknown-property */
// отключаю правило из-за @react-three/fiber и поэтому нестандартных DOM-свойств

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Primitive } from '../types/Primitive'

interface ViewerProps {
  primitives: Primitive[]
  onSelect: (id: string) => void
}

const PrimitiveMesh: React.FC<{ primitive: Primitive; onSelect: (id: string) => void }> = ({
  primitive,
  onSelect
}) => {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(primitive.id)
  }

  return (
    <mesh
      ref={meshRef}
      position={[primitive.position.x, primitive.position.y, primitive.position.z]}
      onClick={handleClick}
    >
      {primitive.type === 'box' ? (
        <boxGeometry args={[primitive.dimensions.width, primitive.dimensions.height, primitive.dimensions.depth]} />
      ) : (
        <coneGeometry args={[primitive.dimensions.width / 2, primitive.dimensions.height, 4]} />
      )}
      <meshStandardMaterial color={primitive.selected ? '#00FF00' : primitive.color} />
    </mesh>
  )
}

const Viewer: React.FC<ViewerProps> = ({ primitives, onSelect }) => {
  return (
    <div style={{ border: '2px solid #000', borderRadius: '4px', height: '100%', width: '100%' }}>
      <Canvas style={{ height: '100%', width: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {primitives.map((primitive) => (
          <PrimitiveMesh key={primitive.id} primitive={primitive} onSelect={onSelect} />
        ))}
      </Canvas>
    </div>
  )
}

export default Viewer
