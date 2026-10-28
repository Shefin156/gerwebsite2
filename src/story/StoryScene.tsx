import { useRef, type MutableRefObject } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { BiogasPlant } from '../factory'
import { THEME } from '../theme'
import { Director, type StoryHandles } from './Director'
import { CHAPTERS } from './timeline'

interface StorySceneProps {
  progressRef: MutableRefObject<number>
  handles: StoryHandles
  activeChapter: number
  onChapterChange: (index: number) => void
  narrow: boolean
}

/** Everything inside the story <Canvas>: white studio light, the plant and the director. */
export function StoryScene({ progressRef, handles, activeChapter, onChapterChange, narrow }: StorySceneProps) {
  const disassemblyRef = useRef(0)
  return (
    <>
      <color attach="background" args={[THEME.background]} />
      <fog attach="fog" args={[THEME.background, 420, 900]} />
      <hemisphereLight args={[THEME.hemiSky, THEME.hemiGround, 1.2]} />
      <directionalLight position={[60, 120, 70]} intensity={1.7} />
      <directionalLight position={[-80, 40, -60]} intensity={0.35} />
      {/* offline reflection environment – no HDR download */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={1.8} color="#ffffff" scale={[220, 70, 1]} position={[0, 60, -90]} />
        <Lightformer form="rect" intensity={1.1} color="#ffffff" scale={[220, 70, 1]} position={[0, 40, 100]} rotation-y={Math.PI} />
        <Lightformer form="rect" intensity={0.6} color="#e9eee7" scale={[320, 320, 1]} position={[0, -20, 0]} rotation-x={-Math.PI / 2} />
      </Environment>

      <BiogasPlant
        explodeRef={disassemblyRef}
        smoothing={6}
        showSite={false}
        showGridLine={false}
        showLabels={narrow ? false : CHAPTERS[activeChapter].labels}
      />
      <Director
        progressRef={progressRef}
        handles={handles}
        disassemblyRef={disassemblyRef}
        narrow={narrow}
        onChapterChange={onChapterChange}
      />
    </>
  )
}
