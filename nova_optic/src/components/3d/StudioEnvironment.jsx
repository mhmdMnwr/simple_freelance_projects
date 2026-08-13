import { Environment } from '@react-three/drei'

export default function StudioEnvironment() {
  return (
    <>
      <Environment preset="studio" environmentIntensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.6} color="#BAE6FD" />
      <ambientLight intensity={0.3} color="#F1F5F9" />
    </>
  )
}
