import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'

useGLTF.preload('/models/Johnny glasses.glb')

export default function GlassesModel() {
  const glassesRef = useRef()
  const { scene } = useGLTF('/models/Johnny glasses.glb')

  const isDragging = useRef(false)
  const previousX = useRef(0)

  // Auto-rotate ONLY the glasses group
  useFrame((state, delta) => {
    if (!glassesRef.current) return
    if (!isDragging.current) {
      glassesRef.current.rotation.y += delta * 0.4
    }
  })

  const handlePointerDown = (e) => {
    isDragging.current = true
    previousX.current = e.clientX
    document.body.style.cursor = 'grabbing'
    e.stopPropagation()
  }

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDragging.current && glassesRef.current) {
        const deltaX = e.clientX - previousX.current
        glassesRef.current.rotation.y += deltaX * 0.01
        previousX.current = e.clientX
      }
    }
    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        document.body.style.cursor = 'grab'
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <group position={[0, 0, 0]}>
      {/* Glasses — manually positioned to sit on top of the plate, and ONLY this group rotates */}
      <group ref={glassesRef}>
        {/* Invisible hit box tightly fitted around glasses to prevent raycasting lag */}
        <mesh 
          position={[0, 0.4, 0]} 
          onPointerDown={handlePointerDown}
          onPointerOver={() => { if (!isDragging.current) document.body.style.cursor = 'grab' }}
          onPointerOut={() => { if (!isDragging.current) document.body.style.cursor = 'auto' }}
        >
          <boxGeometry args={[2.8, 1.2, 2.8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        
        <Center position={[0, 0.32, 0]}>
          <primitive object={scene} scale={0.5} />
        </Center>
      </group>

      {/* ── PEDESTAL (Stationary) ── */}
      {/* Main glass/silver plate */}
      <mesh position={[0, -0.09, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.18, 64]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.1} />
      </mesh>
      
      {/* Thin optic blue base layer */}
      <mesh position={[0, -0.19, 0]} receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.02, 64]} />
        <meshStandardMaterial color="#0284C7" roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  )
}
