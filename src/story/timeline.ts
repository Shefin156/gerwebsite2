import * as THREE from 'three'
import { easeInOutCubic, seg } from '../factory/utils'
import { BAND_Y, EXPLODE_STYLE } from '../factory/partsRegistry'
import type { Vec3 } from '../factory/types'
import { FLOW } from '../theme'

/**
 * ───────────────────────────────────────────────────────────────────────────────
 *  STORY TIMELINE: tweak everything here.
 *  `progress` (0–1) is how far the visitor has scrolled through the sticky 3D story
 *  section. Every value on screen is a pure function of it, so scrolling back up
 *  reassembles the plant exactly.
 * ───────────────────────────────────────────────────────────────────────────────
 */

/** Height of the story section in viewport heights (longer = slower story). */
export const STORY_SCREENS = 7

/** Extra smoothing applied to the scroll progress (higher = snappier). */
export const PROGRESS_DAMPING = 6

/** Progress range over which the plant comes apart (stage windows in partsRegistry sequence it). */
export const DISASSEMBLY_RANGE: [number, number] = [0.06, 0.86]

/** Progress distance used for text fades. */
export const FADE = 0.035

export type Side = 'left' | 'right'

export interface Chapter {
  key: string
  range: [number, number]
  side: Side
  /** Biomass → Quality Biogas → Electricity indicator index. */
  chainStep?: number
  accent?: string
  /** Part ids with name tags while active; true = all labelled parts. */
  labels: string[] | true
  copy: { eyebrow: string; title: string; body: string; fact?: { value: string; label: string } }
}

export const CHAPTERS: Chapter[] = [
  {
    key: 'hero',
    range: [0, 0.07],
    side: 'left',
    labels: [],
    copy: {
      eyebrow: 'Green Energy Resources · Since 2008',
      title: 'Turning waste into power.',
      body: 'Biogas plants, German gas engines and combined heat & power for palm oil mills, food waste and animal husbandry across Southeast Asia.',
    },
  },
  {
    key: 'biomass',
    range: [0.1, 0.28],
    side: 'right',
    chainStep: 0,
    accent: FLOW.biomass,
    labels: ['material-recovery-facility', 'equalization-tanks'],
    copy: {
      eyebrow: '01 / Biomass',
      title: 'Organic waste comes in.',
      body: 'Palm oil mill effluent, food waste and animal manure are received, sorted and blended into a steady feed for the digesters.',
      fact: { value: '1.5 m³', label: 'of biogas a day from a single 500 kg cow' },
    },
  },
  {
    key: 'biogas',
    range: [0.3, 0.49],
    side: 'left',
    chainStep: 1,
    accent: FLOW.rawGas,
    labels: ['anaerobic-digesters', 'biogas-upgrading-plant'],
    copy: {
      eyebrow: '02 / Quality Biogas',
      title: 'Digested. Cleaned. Dried.',
      body: 'Tank digestion with our German partner LIPP turns organic matter into methane-rich biogas. Our proprietary biological scrubber and stainless-steel dryer clean it for the engines.',
      fact: { value: '1970', label: 'LIPP built Germany’s first biogas power plant' },
    },
  },
  {
    key: 'electricity',
    range: [0.51, 0.66],
    side: 'right',
    chainStep: 2,
    accent: FLOW.electricity,
    labels: ['power-generation'],
    copy: {
      eyebrow: '03 / Electricity',
      title: 'Clean gas becomes power.',
      body: 'MAN and Siemens gas engines, assembled at our Johor Bahru factory, generate electricity while CHP recovers the heat that conventional plants waste.',
      fact: { value: '60–80%', label: 'total CHP efficiency vs 32–42% for fossil plants' },
    },
  },
  {
    key: 'water',
    range: [0.68, 0.83],
    side: 'right',
    accent: FLOW.water,
    labels: ['fertilizer-tank', 'polishing-pond', 'constructed-wetlands'],
    copy: {
      eyebrow: '04 / Digestate & Water',
      title: 'Nothing goes to waste.',
      body: 'Fermented residue becomes high-quality fertiliser, substantially reducing the use of mineral fertiliser, while process water is polished in ponds and wetlands.',
    },
  },
  {
    key: 'closing',
    range: [0.86, 1.01],
    side: 'left',
    labels: true,
    copy: {
      eyebrow: 'One integrated plant',
      title: 'Engineered end to end.',
      body: 'From feedstock to grid, GER designs, builds, operates and maintains every unit.',
    },
  },
]

/**
 * Camera path: one continuous Catmull-Rom spline through these keys, so motion never stops
 * and starts. Each key orbits `target` at `azimuth` (0 = from the south, + toward the east),
 * `height` metres above the target.
 */
interface CameraKey {
  at: number
  target: Vec3
  azimuth: number
  radius: number
  height: number
}

const RADIAL_KEYS: CameraKey[] = [
  { at: 0.0, target: [-17, 2, -17], azimuth: -0.72, radius: 146, height: 66 },
  { at: 0.19, target: [26, 4, -12], azimuth: -0.42, radius: 112, height: 56 },
  { at: 0.4, target: [-4, 6, -6], azimuth: -0.6, radius: 122, height: 60 },
  { at: 0.585, target: [30, 4, 24], azimuth: -0.15, radius: 112, height: 56 },
  { at: 0.76, target: [-56, 4, -26], azimuth: -0.85, radius: 120, height: 64 },
  { at: 0.92, target: [-21, 6, -15], azimuth: -0.55, radius: 232, height: 122 },
  { at: 1.0, target: [-21, 6, -15], azimuth: -0.45, radius: 232, height: 122 },
]

const VERTICAL_KEYS: CameraKey[] = [
  { at: 0.0, target: [-4, 2, -6], azimuth: -0.72, radius: 112, height: 54 },
  { at: 0.19, target: [44, BAND_Y.biomass + 14, -23], azimuth: 0.75, radius: 96, height: 30 },
  { at: 0.4, target: [-8, BAND_Y.biogas + 16, -4], azimuth: -0.6, radius: 104, height: 32 },
  { at: 0.585, target: [22, BAND_Y.electricity + 9, 22], azimuth: -0.3, radius: 72, height: 24 },
  { at: 0.76, target: [-18, BAND_Y.water + 12, -14], azimuth: -0.72, radius: 108, height: 34 },
  { at: 0.92, target: [-4, BAND_Y.biogas, -6], azimuth: -0.62, radius: 340, height: 46 },
  { at: 1.0, target: [-4, BAND_Y.biogas, -6], azimuth: -0.5, radius: 340, height: 46 },
]

export const CAMERA_KEYS = EXPLODE_STYLE === 'radial' ? RADIAL_KEYS : VERTICAL_KEYS

/** Narrow screens: wider FOV and a farther camera so the plant still fits. */
export const NARROW = { maxWidth: 640, fov: 50, distance: 1.3 }
export const WIDE_FOV = 36

/** Horizontal shift of the scene away from the text column (fraction of viewport width). */
export const VIEW_SHIFT = 0.2

// ── derived helpers (pure functions of progress) ─────────────────────────────

export const disassemblyAt = (p: number) => seg(p, ...DISASSEMBLY_RANGE)

export function chapterIndexAt(p: number): number {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) if (p >= CHAPTERS[i].range[0]) return i
  return 0
}

/** 0–1 visibility of a chapter's text: fade in, hold, fade out. */
export function textWeight(p: number, index: number): number {
  const [start, end] = CHAPTERS[index].range
  const fadeIn = index === 0 ? 1 : seg(p, start, start + FADE)
  const fadeOut = index === CHAPTERS.length - 1 ? 1 : 1 - seg(p, end - FADE, end)
  return easeInOutCubic(fadeIn * fadeOut)
}

/** Side of the text column (−1 left, +1 right), blended across chapters. */
export function textSideAt(p: number): number {
  let side = 0
  CHAPTERS.forEach((c, i) => {
    side += textWeight(p, i) * (c.side === 'left' ? -1 : 1)
  })
  return THREE.MathUtils.clamp(side, -1, 1)
}

const targetCurve = new THREE.CatmullRomCurve3(CAMERA_KEYS.map((k) => new THREE.Vector3(...k.target)), false, 'centripetal')
const orbitCurve = new THREE.CatmullRomCurve3(
  CAMERA_KEYS.map((k) => new THREE.Vector3(k.azimuth, k.radius, k.height)),
  false,
  'centripetal',
)
const orbit = new THREE.Vector3()

/** Map progress to the spline parameter so each key lands exactly at its `at`. */
function curveParam(p: number): number {
  const n = CAMERA_KEYS.length - 1
  for (let i = 0; i < n; i++) {
    const a = CAMERA_KEYS[i].at
    const b = CAMERA_KEYS[i + 1].at
    if (p <= b || i === n - 1) return (i + seg(p, a, b)) / n
  }
  return 1
}

/** Camera position + look-at target for a progress value. Pure; the caller damps toward it. */
export function cameraAt(p: number, narrow: boolean, pos: THREE.Vector3, target: THREE.Vector3) {
  const t = curveParam(THREE.MathUtils.clamp(p, 0, 1))
  targetCurve.getPoint(t, target)
  orbitCurve.getPoint(t, orbit)
  const scale = narrow ? NARROW.distance : 1
  pos.set(
    target.x + Math.sin(orbit.x) * orbit.y * scale,
    target.y + orbit.z * scale,
    target.z + Math.cos(orbit.x) * orbit.y * scale,
  )
}

export const CHAIN = CHAPTERS.filter((c) => c.chainStep !== undefined)
