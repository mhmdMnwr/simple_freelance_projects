import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, Html, useProgress } from '@react-three/drei'
import GlassesModel from './GlassesModel'
import StudioEnvironment from './StudioEnvironment'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#0284C7',
        fontWeight: 'bold',
        fontSize: '14px',
        background: 'rgba(255,255,255,0.8)',
        padding: '8px 16px',
        borderRadius: '20px',
        backdropFilter: 'blur(4px)',
        whiteSpace: 'nowrap'
      }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

export default function CanvasContainer() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 6], fov: 35 }}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', touchAction: 'pan-y' }}
    >
      <Suspense fallback={<Loader />}>
        <StudioEnvironment />
        <GlassesModel />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
