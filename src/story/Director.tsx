import { useEffect, useRef, type MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  NARROW, PROGRESS_DAMPING, VIEW_SHIFT, WIDE_FOV, cameraAt, chapterIndexAt, disassemblyAt, textSideAt, textWeight,
} from './timeline'

/** DOM nodes the director updates every frame (no React state per frame). */
export interface StoryHandles {
  blocks: MutableRefObject<(HTMLElement | null)[]>
  /** Soft white fades behind the text column: [left, right]. */
  scrims: MutableRefObject<(HTMLDivElement | null)[]>
  scrollHint: MutableRefObject<HTMLDivElement | null>
}

interface DirectorProps {
  /** Raw 0–1 scroll progress through the story section, written by the page. */
  progressRef: MutableRefObject<number>
  handles: StoryHandles
  disassemblyRef: MutableRefObject<number>
  narrow: boolean
  onChapterChange: (index: number) => void
}

/**
 * Turns story progress into: disassembly, a continuous camera path, a gentle shift of
 * the scene away from the text, and the text overlay's opacity/position.
 */
export function Director({ progressRef, handles, disassemblyRef, narrow, onChapterChange }: DirectorProps) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)

  const smooth = useRef<number | null>(null)
  const desiredPos = useRef(new THREE.Vector3())
  const desiredTarget = useRef(new THREE.Vector3())
  const lookAt = useRef<THREE.Vector3 | null>(null)
  const shift = useRef(0)
  const lastChapter = useRef(-1)

  useEffect(() => {
    camera.fov = narrow ? NARROW.fov : WIDE_FOV
    camera.updateProjectionMatrix()
  }, [camera, narrow])

  useEffect(() => () => camera.clearViewOffset(), [camera])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1)

    // smoothed progress – first frame snaps so a reload mid-page doesn't animate from 0
    smooth.current =
      smooth.current === null ? progressRef.current : THREE.MathUtils.damp(smooth.current, progressRef.current, PROGRESS_DAMPING, dt)
    const p = smooth.current

    disassemblyRef.current = disassemblyAt(p)

    cameraAt(p, narrow, desiredPos.current, desiredTarget.current)
    if (!lookAt.current) {
      lookAt.current = desiredTarget.current.clone()
      camera.position.copy(desiredPos.current)
    }
    const k = 1 - Math.exp(-5 * dt)
    camera.position.lerp(desiredPos.current, k)
    lookAt.current.lerp(desiredTarget.current, k)
    camera.lookAt(lookAt.current)

    // keep the model clear of the text column (desktop only)
    const side = textSideAt(p)
    shift.current = THREE.MathUtils.damp(shift.current, narrow ? 0 : -side * VIEW_SHIFT, 3, dt)
    if (Math.abs(shift.current) > 1e-4) {
      camera.setViewOffset(size.width, size.height, -shift.current * size.width, 0, size.width, size.height)
    } else camera.clearViewOffset()

    handles.blocks.current.forEach((el, i) => {
      if (!el) return
      const w = textWeight(p, i)
      el.style.opacity = w.toFixed(3)
      el.style.setProperty('--ty', `${((1 - w) * 24).toFixed(1)}px`)
      el.style.visibility = w < 0.01 ? 'hidden' : 'visible'
    })
    const [scrimL, scrimR] = handles.scrims.current
    if (scrimL) scrimL.style.opacity = Math.max(0, -side).toFixed(3)
    if (scrimR) scrimR.style.opacity = Math.max(0, side).toFixed(3)
    if (handles.scrollHint.current) handles.scrollHint.current.style.opacity = (1 - Math.min(1, p / 0.03)).toFixed(3)

    const chapter = chapterIndexAt(p)
    if (chapter !== lastChapter.current) {
      lastChapter.current = chapter
      onChapterChange(chapter)
    }
  })

  return null
}
