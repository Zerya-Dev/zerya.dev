<script setup lang="ts">
// Background of the projects section: a few large, faint isometric cubes pinned behind the content, scrubbed by scroll.
// Nine broken cubes and the one that fits for MOTOQ, steps that go from plain to glowing for Hack4Krak,
// and three systems joined up for commissioned work.
// The cube geometry renders once; scrolling only writes transforms and CSS variables to the DOM,
// so the page never re-renders while the cubes move.
const props = defineProps<{
  // Everything after the first case, each one moves the cubes on from MOTOQ by a stage
  anchors: () => HTMLElement[]
}>()

// x, y, z, scale, broken (halftone, dashed), lit (aurora), glow (aurora halo)
type Frame = [x: number, y: number, z: number, scale: number, broken: number, lit: number, glow: number]

// Every stage moves the same nine cubes, the ones a stage does not need shrink away
const COUNT = 9
// Spacing and size of the three commissioned systems, the joins run between their faces
const SYSTEM_GAP = 3
const SYSTEM_SIZE = 1.2

const range = (length: number) => Array.from({ length }, (_, i) => i)
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1)
const smooth = (t: number) => t * t * (3 - 2 * t)

const grid = (i: number) => [(i % 3 - 1) * 1.5, (Math.floor(i / 3) - 1) * 1.5] as const

const shapes: Frame[][] = [
  // MOTOQ: plenty of invoice systems, one fits
  range(COUNT).map((i) => {
    const [x, z] = grid(i)
    return [x, 0, z, 1, i === 4 ? 0 : 1, i === 4 ? 1 : 0, i === 4 ? 0.8 : 0]
  }),
  // Hack4Krak: a plain first step, the cube that fit MOTOQ as the middle one and a glowing top
  [
    [0, 2, -1, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, -1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, -1, 1, 0, 0, 0],
    [-1.5, 0, 1.5, 0, 1, 0, 0],
    [0, 0, 1.5, 0, 1, 0, 0],
    [1.5, 0, 1.5, 0, 1, 0, 0],
  ],
  // Commissioned work: three systems in a row, joined up
  range(COUNT).map((i): Frame => {
    if (i < 3 || i > 5)
      return [0, 0, 0, 0, 0, 0, 0]
    return [(i - 4) * SYSTEM_GAP, 0, 0, SYSTEM_SIZE, 0, i === 4 ? 1 : 0, i === 4 ? 0.8 : 0]
  }),
]

// Isometric projection, 40 px per unit
const UNIT = 40
const COS = Math.cos(Math.PI / 6)

function project(x: number, y: number, z: number) {
  return [(x - z) * COS * UNIT, ((x + z) / 2 - y) * UNIT] as const
}

// Each stage is centred on its own outline, so every shape sits around the middle of the screen.
// A screen shift maps back to the scene as x − z for sideways and y for up.
const shifts = shapes.map((shape) => {
  const corners = shape.filter(frame => frame[3] > 0).flatMap(([x, y, z, scale]) => {
    const h = scale / 2
    return [-h, h].flatMap(dx => [-h, h].flatMap(dy => [-h, h].map(dz => project(x + dx, y + dy, z + dz))))
  })
  const xs = corners.map(([px]) => px)
  const ys = corners.map(([, py]) => py)
  const side = -(Math.min(...xs) + Math.max(...xs)) / 2 / (2 * COS * UNIT)
  const up = (Math.min(...ys) + Math.max(...ys)) / 2 / UNIT
  return [side, up] as const
})
const stages = shapes.map((shape, k) => {
  const [side, up] = shifts[k]!
  return shape.map(([x, y, z, ...rest]) => [x + side, y + up, z - side, ...rest] as Frame)
})

// `appear` (0 → 1) builds the first shape cube by cube, back row first, each one growing as it drops into place.
// It starts once a third of the section shows and completes just before the hero has gone.
function framesAt(progress: number, appear: number) {
  const p = Math.min(Math.max(progress, 0), stages.length - 1)
  const k = Math.min(Math.floor(p), stages.length - 2)
  const f = p - k
  return range(COUNT).map((i) => {
    // A slight stagger so the cubes move one after another
    const e = smooth(clamp01(f * 1.25 - i * 0.025))
    const a = stages[k]![i]!
    const b = stages[k + 1]![i]!
    const frame = a.map((value, j) => value + (b[j]! - value) * e) as Frame
    const built = smooth(clamp01(appear * 2.6 - 0.9 - i * 0.07))
    frame[1] += (1 - built) * 1.5
    frame[3] *= built
    frame[6] *= built
    return frame
  })
}

// Painter's order: the camera looks down along (1, 1, 1), so x + y + z is the distance towards it.
// Ties go bottom first, then by index so every engine agrees.
function paintOrder(frames: Frame[]) {
  const depth = frames.map(([x, y, z]) => [Math.round((x + y + z) * 1000), Math.round(y * 1000)] as const)
  return range(frames.length).sort((a, b) => depth[a]![0] - depth[b]![0] || depth[a]![1] - depth[b]![1] || a - b)
}

function polygon(points: [number, number, number][]) {
  return points.map(point => project(...point).map(v => v.toFixed(1)).join(',')).join(' ')
}

// One unit cube around the origin; each cube only moves and scales it
const FACES = {
  top: polygon([[-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]]),
  right: polygon([[0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5]]),
  front: polygon([[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]]),
}

function attributes([x, y, z, scale, broken, lit, glow]: Frame) {
  const [px, py] = project(x, y, z)
  return {
    transform: `translate(${px.toFixed(1)} ${py.toFixed(1)}) scale(${Math.max(scale, 0.001).toFixed(3)})`,
    opacity: Math.min(scale * 2, 1).toFixed(3),
    broken: broken.toFixed(3),
    lit: lit.toFixed(3),
    glow: glow.toFixed(3),
  }
}

// The joins between the three systems draw in during the last stretch, face to face along x
const joinAt = (progress: number) => clamp01((progress - (stages.length - 1.6)) / 0.6)
const [joinSide, joinUp] = shifts.at(-1)!
const outer = SYSTEM_GAP - SYSTEM_SIZE / 2
const joins = [[-outer, -SYSTEM_SIZE / 2], [SYSTEM_SIZE / 2, outer]].map(([from, to]) => {
  const [x1, y1] = project(from! + joinSide, joinUp, -joinSide)
  const [x2, y2] = project(to! + joinSide, joinUp, -joinSide)
  return { x1, y1, x2, y2 }
})

// The server and the first client render share the first stage, later frames go straight to the DOM
const initialFrames = framesAt(0, 0)
const initial = paintOrder(initialFrames).map(i => ({ i, ...attributes(initialFrames[i]!) }))

const root = useTemplateRef('root')
const scene = useTemplateRef('scene')
const lines = useTemplateRef<SVGLineElement[]>('lines')
const cubeRefs = useTemplateRef<SVGGElement[]>('cubeRefs')
const haloRefs = useTemplateRef<SVGCircleElement[]>('haloRefs')
// Painting reorders the cubes in the DOM, so they are looked up by index rather than by ref order
let cubes = new Map<number, SVGGElement>()
let halos = new Map<number, SVGCircleElement>()
let order = initial.map(cube => cube.i).join()

function apply([progress, appear]: [number, number]) {
  if (!scene.value)
    return
  const frames = framesAt(progress, appear)
  for (const [i, el] of cubes) {
    const { transform, opacity, broken, lit, glow } = attributes(frames[i]!)
    el.setAttribute('transform', transform)
    el.setAttribute('opacity', opacity)
    el.style.setProperty('--broken', broken)
    el.style.setProperty('--lit', lit)
    el.style.setProperty('--glow', glow)
  }
  for (const [i, halo] of halos) {
    const { transform, glow } = attributes(frames[i]!)
    halo.setAttribute('transform', transform)
    halo.setAttribute('opacity', glow)
  }
  // Re-stack only when the depth order actually changes
  const next = paintOrder(frames)
  if (next.join() !== order) {
    order = next.join()
    scene.value.append(...next.map(i => cubes.get(i)!))
  }
  // The dashed joins grow from the left cube towards the right one
  const join = joinAt(progress)
  for (const [i, line] of (lines.value ?? []).entries()) {
    const { x1, y1, x2, y2 } = joins[i]!
    line.setAttribute('x2', (x1 + (x2 - x1) * join).toFixed(1))
    line.setAttribute('y2', (y1 + (y2 - y1) * join).toFixed(1))
  }
}

const { y } = useWindowScroll()
const { height } = useWindowSize()
const reducedMotion = usePreferredReducedMotion()
const visible = useElementVisibility(root)

// Progress is 0 for MOTOQ, +1 as each anchor travels from just below the middle of the screen to its upper part.
// The cubes build up as the section comes into view.
function progressNow(): [number, number] {
  const vh = height.value || 1
  const edge = Math.max(root.value?.getBoundingClientRect().top ?? 0, 0)
  const anchors = props.anchors()
  // The commissioned work closes the section, so it joins the cubes up earlier, while they are still in view
  const total = anchors.reduce((sum, anchor, i) => {
    const start = vh * (i === anchors.length - 1 ? 0.75 : 0.55)
    return sum + clamp01((start - anchor.getBoundingClientRect().top) / (vh * 0.4))
  }, 0)
  const appear = 1 - clamp01(edge / vh)
  return reducedMotion.value === 'reduce' ? [Math.round(total), 1] : [total, appear]
}

// Off screen the cubes are left where they are, the next scroll into view catches them up
watch([y, height, reducedMotion, visible], () => {
  if (visible.value)
    apply(progressNow())
})

onMounted(() => {
  cubes = new Map(cubeRefs.value?.map(el => [Number(el.dataset.cube), el]))
  halos = new Map(haloRefs.value?.map(el => [Number(el.dataset.halo), el]))
  apply(progressNow())
})
</script>

<template>
  <div ref="root" class="pointer-events-none absolute inset-0 overflow-clip" aria-hidden="true">
    <div class="sticky top-0 h-svh">
      <svg
        class="absolute top-1/2 right-[-40vw] w-[140vw] -translate-y-1/2 opacity-20 md:right-[-12vw] md:w-[72vw] md:opacity-30"
        viewBox="-200 -170 400 340"
        fill="none"
      >
        <defs>
          <!-- Sized for the drawing being scaled up about 2.5×, so the cells land at roughly 4 px on screen -->
          <radialGradient id="cubes-glow">
            <stop offset="0" stop-color="var(--color-aurora)" stop-opacity="0.4" />
            <stop offset="0.45" stop-color="var(--color-aurora)" stop-opacity="0.12" />
            <stop offset="1" stop-color="var(--color-aurora)" stop-opacity="0" />
          </radialGradient>
          <pattern id="cubes-halftone" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
            <circle cx="0.8" cy="0.8" r="0.42" fill="var(--color-paper)" />
          </pattern>
        </defs>

        <line
          v-for="(line, i) in joins"
          ref="lines"
          :key="i"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x1"
          :y2="line.y1"
          stroke="var(--color-aurora)"
          stroke-opacity="0.7"
          stroke-dasharray="3 3"
        />

        <g ref="scene">
          <g
            v-for="cube in initial"
            ref="cubeRefs"
            :key="cube.i"
            :data-cube="cube.i"
            :transform="cube.transform"
            :opacity="cube.opacity"
            :style="{ '--broken': cube.broken, '--lit': cube.lit, '--glow': cube.glow }"
            stroke-linejoin="round"
          >
            <polygon :points="FACES.top" fill="#121412" />
            <polygon :points="FACES.right" fill="#0e100e" />
            <polygon :points="FACES.front" fill="#0b0c0b" />
            <g fill="url(#cubes-halftone)">
              <polygon class="halftone-top" :points="FACES.top" />
              <polygon class="halftone-right" :points="FACES.right" />
              <polygon class="halftone-front" :points="FACES.front" />
            </g>
            <g fill="var(--color-aurora)">
              <polygon class="lit-top" :points="FACES.top" />
              <polygon class="lit-right" :points="FACES.right" />
              <polygon class="lit-front" :points="FACES.front" />
            </g>
            <g v-for="edge in ['solid', 'dashed', 'lit']" :key="edge" :class="`edge-${edge}`">
              <polygon v-for="(points, face) in FACES" :key="face" :points="points" vector-effect="non-scaling-stroke" />
            </g>
          </g>
        </g>

        <!-- Halos over the cubes, screened on so the glowing ones light up what is around them -->
        <g class="halos">
          <circle
            v-for="cube in initial"
            ref="haloRefs"
            :key="cube.i"
            :data-halo="cube.i"
            :transform="cube.transform"
            :opacity="cube.glow"
            r="80"
            fill="url(#cubes-glow)"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* `--broken`, `--lit` and `--glow` (0 → 1) cross-fade the layers of each cube */
.halftone-top {
  opacity: calc(var(--broken) * 0.32);
}

.halftone-right {
  opacity: calc(var(--broken) * 0.22);
}

.halftone-front {
  opacity: calc(var(--broken) * 0.14);
}

.lit-top {
  opacity: calc(var(--lit) * 0.14 + var(--glow) * 0.4);
}

.lit-right {
  opacity: calc(var(--lit) * 0.08 + var(--glow) * 0.24);
}

.lit-front {
  opacity: calc(var(--lit) * 0.05 + var(--glow) * 0.14);
}

.halos {
  mix-blend-mode: screen;
}

[class^='edge-'] {
  fill: none;
  stroke-width: 1;
}

.edge-solid {
  stroke: var(--color-paper);
  stroke-opacity: calc(0.18 * (1 - var(--broken)) * (1 - var(--lit)));
}

.edge-dashed {
  stroke: var(--color-paper);
  stroke-dasharray: 2 3;
  stroke-opacity: calc(0.16 * var(--broken) * (1 - var(--lit)));
}

.edge-lit {
  stroke: var(--color-aurora);
  stroke-opacity: calc(var(--lit) * (0.5 + var(--glow) * 0.5));
  filter: drop-shadow(0 0 calc(var(--glow) * 12px) var(--color-aurora));
}
</style>
