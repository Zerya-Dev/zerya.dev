// The night sky the projects are charted on, printed live. Each frame the sky is drawn into three ink
// plates on a 2D canvas (red: aurora, green: paper, blue: ember), and one shader screens every plate
// into riso dots, each at its own angle and slightly out of register, and lays the inks on the night.
// Loaded only once the hero has played, so none of this competes with the first seconds.

export interface SkyStar {
  // Degrees from the constellation's centre: x to the right, y up
  x: number
  y: number
  label?: string
  main?: boolean
}

export interface SkyConstellation {
  name: string
  az: number
  alt: number
  stars: SkyStar[]
  edges: [number, number][]
  // Not charted yet: dashed lines, hollow stars
  uncharted?: boolean
}

export interface SkyFrame {
  // Where the camera looks, in degrees, and how wide
  az: number
  alt: number
  fov: number
  // 0 keeps the view centred (the horizon), 1 moves the target beside the text
  focus: number
  // How far up from the horizon the stars have come out, 0 → 1
  reveal: number
  // How firmly each constellation is locked on, in the order they were given
  locks: number[]
}

export interface Sky {
  draw: (frame: SkyFrame) => void
  // Sends a meteor across the part of the sky in view; the sky has to be drawn every frame while one flies
  launch: () => void
  flying: () => boolean
  resize: () => void
  destroy: () => void
}

type Vec = [number, number, number]

const DEG = Math.PI / 180
// The sky over Kraków, frozen at one sidereal time
const LAT = 50.06 * DEG
const LST = 4.6 * 15 * DEG
// Screen pitch in CSS px; finer than the ruins print, the sky is mostly points and hairlines
const PITCH = 3.6
const FONT = '"Geist Mono", ui-monospace, monospace'

const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const clamp = (v: number, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi)
function norm(v: Vec): Vec {
  const l = Math.hypot(v[0], v[1], v[2])
  return [v[0] / l, v[1] / l, v[2] / l]
}

// Horizontal frame: x north, y west, z the zenith
const ZENITH: Vec = [0, 0, 1]
function horizontal(az: number, alt: number): Vec {
  return [Math.cos(alt) * Math.cos(az), -Math.cos(alt) * Math.sin(az), Math.sin(alt)]
}

// The celestial pole, the point where the meridian crosses the equator, and the west point
const POLE: Vec = [Math.cos(LAT), 0, Math.sin(LAT)]
const MERIDIAN: Vec = [-Math.sin(LAT), 0, Math.cos(LAT)]
const WEST: Vec = [0, 1, 0]
function equatorial(ra: number, dec: number): Vec {
  const h = LST - ra
  const c = Math.cos(dec)
  return [0, 1, 2].map(i => c * Math.cos(h) * MERIDIAN[i]! + c * Math.sin(h) * WEST[i]! + Math.sin(dec) * POLE[i]!) as Vec
}
function toEquatorial(v: Vec) {
  const dec = Math.asin(clamp(dot(v, POLE), -1, 1))
  const ra = (LST - Math.atan2(dot(v, WEST), dot(v, MERIDIAN)) + 4 * Math.PI) % (2 * Math.PI)
  return { ra, dec }
}

// A point a few degrees off a centre, on the sky's own tangent plane
function offset(centre: Vec, x: number, y: number): Vec {
  const east = norm(cross(centre, ZENITH))
  const up = cross(east, centre)
  const tx = Math.tan(x * DEG)
  const ty = Math.tan(y * DEG)
  return norm([0, 1, 2].map(i => centre[i]! + tx * east[i]! + ty * up[i]!) as Vec)
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Star { v: Vec, r: number, alt: number }
// A meteor runs along a great circle: from its start, in the direction it was thrown, by angles in radians
interface Meteor { from: Vec, dir: Vec, travel: number, tail: number, born: number, life: number }
interface Cloud { v: Vec, size: number, a: number, alt: number }

// One seeded sky, so the same stars come out on every visit
function buildSky() {
  const rand = mulberry32(1690)
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())
  const stars: Star[] = []
  const add = (v: Vec, r: number) => stars.push({ v, r, alt: Math.asin(v[2]) })

  for (let i = 0; i < 1800; i++) {
    const z = rand() * 2 - 1
    const t = rand() * 2 * Math.PI
    const s = Math.sqrt(1 - z * z)
    add([s * Math.cos(t), s * Math.sin(t), z], 0.5 + rand() ** 6 * 2.4)
  }

  // The Milky Way crosses the part of the sky the camera travels through
  const a = horizontal(150 * DEG, 4 * DEG)
  const far = horizontal(255 * DEG, 72 * DEG)
  const b = norm([0, 1, 2].map(i => far[i]! - dot(far, a) * a[i]!) as Vec)
  const g = cross(a, b)
  const band = (t: number, off: number) => norm([0, 1, 2].map(i => Math.cos(t) * a[i]! + Math.sin(t) * b[i]! + Math.tan(off) * g[i]!) as Vec)
  for (let i = 0; i < 2600; i++)
    add(band(rand() * 2 * Math.PI, gauss() * 5 * DEG), 0.45 + rand() ** 8 * 1.4)

  const clouds: Cloud[] = []
  for (let i = 0; i < 140; i++) {
    const v = band((i / 140) * 2 * Math.PI + rand() * 0.03, gauss() * 2.5 * DEG)
    clouds.push({ v, size: (4 + rand() * 6) * DEG, a: 0.03 + rand() ** 2 * 0.07, alt: Math.asin(v[2]) })
  }
  return { stars, clouds }
}

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAGMENT = `
precision highp float;
uniform sampler2D u_plates;
uniform vec2 u_res;
uniform float u_pitch;
uniform float u_scale;

const vec3 NIGHT = vec3(10.0) / 255.0;
const vec3 AURORA = vec3(92.0, 240.0, 160.0) / 255.0;
const vec3 PAPER = vec3(245.0, 243.0, 236.0) / 255.0;
const vec3 EMBER = vec3(241.0, 225.0, 91.0) / 255.0;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}

// Threshold screen: a dot grows from the cell centre with coverage, so a full tone prints solid
// and a thin line at a low tone breaks into a row of dots
float screen(float cov, vec2 px, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  vec2 q = vec2(c * px.x - s * px.y, s * px.x + c * px.y) / u_pitch;
  float d = length(fract(q) - 0.5);
  float t = d < 0.5 ? 3.14159 * d * d : 0.785 + (d - 0.5) * 0.99;
  t = clamp(t + (hash(px) - 0.5) * 0.05, 0.001, 0.995);
  return step(t, cov);
}

void main() {
  vec2 px = gl_FragCoord.xy;
  // Here and there the drum runs a little dry
  float starve = 1.0 - 0.14 * smoothstep(0.6, 0.9, noise(px / (38.0 * u_scale)));
  float a = screen(texture2D(u_plates, (px + vec2(0.7, -0.5) * u_scale) / u_res).r * starve, px, 0.2618);
  float p = screen(texture2D(u_plates, px / u_res).g * starve, px, 0.7854);
  float e = screen(texture2D(u_plates, (px + vec2(-0.6, 0.8) * u_scale) / u_res).b * starve, px, 1.309);
  vec3 col = NIGHT;
  col = 1.0 - (1.0 - col) * (1.0 - PAPER * p * 0.9);
  col = 1.0 - (1.0 - col) * (1.0 - AURORA * a * 0.92);
  col = 1.0 - (1.0 - col) * (1.0 - EMBER * e * 0.95);
  gl_FragColor = vec4(col, 1.0);
}
`

const plate = {
  aurora: (a: number) => `rgba(255,0,0,${a})`,
  paper: (a: number) => `rgba(0,255,0,${a})`,
  ember: (a: number) => `rgba(0,0,255,${a})`,
}

// Labels are read, not looked at: they are set in plain type on an overlay, never screened, and the
// print is knocked out under them so no dots run through the letters
interface Label { text: string, x: number, y: number, color: string, alpha: number }
const LABEL_FONT = `500 12px ${FONT}`
const LABEL = { paper: '245 243 236', aurora: '92 240 160' }

function pad(n: number, width = 2) {
  return String(Math.floor(n)).padStart(width, '0')
}

function readout(v: Vec) {
  const { ra, dec } = toEquatorial(v)
  const hours = ra / DEG / 15
  const deg = Math.abs(dec / DEG)
  const sign = dec < 0 ? '−' : '+'
  return `RA ${pad(hours)}h ${pad((hours % 1) * 60)}m · DEC ${sign}${pad(deg)}° ${pad((deg % 1) * 60)}′`
}

export async function createSky(canvas: HTMLCanvasElement, overlay: HTMLCanvasElement, constellations: SkyConstellation[]): Promise<Sky | undefined> {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false })
  if (!gl)
    return undefined

  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!
    gl!.shaderSource(shader, source)
    gl!.compileShader(shader)
    return shader
  }
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    return undefined
  gl.useProgram(program)

  // One triangle that covers the screen
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const uRes = uniform('u_res')
  const uPitch = uniform('u_pitch')
  const uScale = uniform('u_scale')

  const plates = document.createElement('canvas')
  const ctx = plates.getContext('2d', { alpha: false })!
  const type = overlay.getContext('2d')!

  await document.fonts?.load(`500 11px ${FONT}`).catch(() => {})

  const { stars, clouds } = buildSky()
  const charts = constellations.map((c) => {
    const centre = horizontal(c.az * DEG, c.alt * DEG)
    return { ...c, points: c.stars.map(s => offset(centre, s.x, s.y)) }
  })

  let w = 0
  let h = 0
  let plateScale = 1
  let glScale = 1
  let last: SkyFrame | undefined
  let meteors: Meteor[] = []

  function launch() {
    if (!last)
      return
    const forward = horizontal(last.az * DEG, last.alt * DEG)
    const half = last.fov / 2
    // Mostly right of centre, away from the text, and in the upper part of the view
    const from = offset(forward, (Math.random() * 1.5 - 0.5) * half, (Math.random() * 0.9 - 0.1) * half)
    if (from[2] < Math.sin(15 * DEG))
      return
    const east = norm(cross(from, ZENITH))
    const up = cross(east, from)
    // Thrown downwards, to either side
    const angle = (200 + Math.random() * 140) * DEG
    const dir = norm([0, 1, 2].map(i => Math.cos(angle) * east[i]! + Math.sin(angle) * up[i]!) as Vec)
    meteors.push({
      from,
      dir,
      travel: (14 + Math.random() * 16) * DEG,
      tail: (6 + Math.random() * 7) * DEG,
      born: performance.now(),
      life: 650 + Math.random() * 650,
    })
  }

  function resize() {
    w = canvas.clientWidth
    h = canvas.clientHeight
    const dpr = window.devicePixelRatio || 1
    // The plates only carry tone; the dots themselves are screened at the device resolution
    plateScale = Math.min(dpr, 1.5)
    glScale = Math.min(dpr, 2)
    plates.width = Math.round(w * plateScale)
    plates.height = Math.round(h * plateScale)
    canvas.width = Math.round(w * glScale)
    canvas.height = Math.round(h * glScale)
    overlay.width = canvas.width
    overlay.height = canvas.height
    if (last)
      draw(last)
  }

  function draw(frame: SkyFrame) {
    last = frame
    if (!w || !h)
      return
    const wide = w >= 768
    const forward = horizontal(frame.az * DEG, frame.alt * DEG)
    const right = norm(cross(forward, ZENITH))
    const up = cross(right, forward)
    const focal = (wide ? Math.min(w * 0.9, h) : w * 0.62) / 2 / Math.tan((frame.fov * DEG) / 2)
    const cx = w * (wide ? 0.5 + 0.2 * frame.focus : 0.5)
    const cy = h * (wide ? 0.5 : 0.5 - 0.22 * frame.focus)
    const project = (v: Vec): [number, number] | undefined => {
      const z = dot(v, forward)
      if (z < 0.15)
        return undefined
      return [cx + (focal * dot(v, right)) / z, cy - (focal * dot(v, up)) / z]
    }
    const onScreen = (p: [number, number] | undefined, margin = 40): p is [number, number] =>
      !!p && p[0] > -margin && p[0] < w + margin && p[1] > -margin && p[1] < h + margin
    // Stars come out from the horizon upwards, and thin out just above it. Phones look up too steeply
    // for a horizon to make sense on a tall screen, so there the sky has no ground and fills it.
    const shown = (alt: number) => clamp((frame.reveal * 95 * DEG - alt) / (12 * DEG)) * (wide ? clamp(alt / (5 * DEG)) : 1)

    ctx.setTransform(plateScale, 0, 0, plateScale, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    // The Milky Way as a faint tone, which the screen breaks into a drift of dots
    for (const cloud of clouds) {
      const a = cloud.a * shown(cloud.alt)
      const p = project(cloud.v)
      if (a < 0.005 || !onScreen(p, 400))
        continue
      const r = focal * Math.tan(cloud.size)
      const gradient = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r)
      gradient.addColorStop(0, plate.paper(a))
      gradient.addColorStop(1, plate.paper(0))
      ctx.fillStyle = gradient
      ctx.fillRect(p[0] - r, p[1] - r, r * 2, r * 2)
    }

    // The atlas grid, right ascension and declination, at a tone low enough to print as dotted lines
    ctx.lineWidth = 1
    const trace = (point: (t: number) => Vec, from: number, to: number, steps: number) => {
      let open = false
      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const v = point(from + ((to - from) * i) / steps)
        const p = v[2] > 0 ? project(v) : undefined
        if (!p) {
          open = false
          continue
        }
        if (open)
          ctx.lineTo(p[0], p[1])
        else
          ctx.moveTo(p[0], p[1])
        open = true
      }
      ctx.stroke()
    }
    ctx.strokeStyle = plate.paper(0.3 * clamp(frame.reveal * 1.6 - 0.3))
    for (let dec = -30; dec <= 75; dec += 15)
      trace(ra => equatorial(ra, dec * DEG), 0, 2 * Math.PI, 180)
    for (let ra = 0; ra < 24; ra += 2)
      trace(dec => equatorial(ra * 15 * DEG, dec), -40 * DEG, 88 * DEG, 64)

    // Stars: always solid ink, brightness is size
    for (const star of stars) {
      const a = shown(star.alt)
      if (a <= 0.01)
        continue
      const p = project(star.v)
      if (!onScreen(p, 4))
        continue
      ctx.fillStyle = plate.paper(a)
      if (star.r < 1) {
        ctx.fillRect(p[0] - star.r, p[1] - star.r, star.r * 2, star.r * 2)
        continue
      }
      ctx.beginPath()
      ctx.arc(p[0], p[1], star.r, 0, 2 * Math.PI)
      ctx.fill()
      // The brightest catch a cross of light
      if (star.r > 2.2) {
        ctx.fillRect(p[0] - star.r * 3, p[1] - 0.5, star.r * 6, 1)
        ctx.fillRect(p[0] - 0.5, p[1] - star.r * 3, 1, star.r * 6)
      }
    }

    // Meteors: a streak of paper ink that brightens towards its head, so the screen breaks its tail into dots
    const now = performance.now()
    meteors = meteors.filter(m => now - m.born < m.life)
    ctx.lineCap = 'round'
    for (const m of meteors) {
      const t = (now - m.born) / m.life
      const along = (s: number) => norm([0, 1, 2].map(i => Math.cos(s) * m.from[i]! + Math.sin(s) * m.dir[i]!) as Vec)
      const s = m.travel * (1 - (1 - t) ** 1.5)
      const head = project(along(s))
      const tail = project(along(Math.max(s - m.tail * clamp(t * 4), 0)))
      const a = clamp(t * 8) * clamp((1 - t) * 2.5) * frame.reveal
      if (!head || !tail || a <= 0.01)
        continue
      const streak = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1])
      streak.addColorStop(0, plate.paper(0))
      streak.addColorStop(1, plate.paper(a))
      ctx.strokeStyle = streak
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(tail[0], tail[1])
      ctx.lineTo(head[0], head[1])
      ctx.stroke()
      ctx.fillStyle = plate.ember(a * 0.8)
      ctx.beginPath()
      ctx.arc(head[0], head[1], 1.8, 0, 2 * Math.PI)
      ctx.fill()
    }
    ctx.lineCap = 'butt'

    // The horizon: the line of light the hero closed into, with a low glow above it
    const horizon: [number, number][] = []
    for (let d = -100; d <= 100; d += 2) {
      const p = project(horizontal((frame.az + d) * DEG, 0))
      if (p)
        horizon.push(p)
    }
    if (wide && horizon.length > 1) {
      const fade = (a: number) => {
        const gradient = ctx.createLinearGradient(0, 0, w, 0)
        gradient.addColorStop(0, plate.aurora(0))
        gradient.addColorStop(0.5, plate.aurora(a))
        gradient.addColorStop(1, plate.aurora(0))
        return gradient
      }
      const stroke = (width: number, a: number, dy = 0) => {
        ctx.lineWidth = width
        ctx.strokeStyle = fade(a)
        ctx.beginPath()
        horizon.forEach(([x, y], i) => i ? ctx.lineTo(x, y + dy) : ctx.moveTo(x, y + dy))
        ctx.stroke()
      }
      stroke(24, 0.035, -12)
      stroke(8, 0.07, -4)
      stroke(1.5, 1)
    }

    // The charted constellations, drawn line by line as each one is locked on
    const labels: Label[] = []
    charts.forEach((chart, index) => {
      const lock = frame.locks[index] ?? 0
      const points = chart.points.map(project)
      if (!points.some(p => onScreen(p, 200)))
        return
      const reveal = clamp(frame.reveal * 2 - 1)

      ctx.lineWidth = 1.5
      ctx.setLineDash(chart.uncharted ? [4, 5] : [])
      chart.edges.forEach(([from, to], k) => {
        const a = points[from]
        const b = points[to]
        const t = clamp(lock * chart.edges.length * 1.25 - k)
        if (!a || !b || t <= 0)
          return
        ctx.strokeStyle = plate.aurora(chart.uncharted ? 0.8 : 1)
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
        ctx.stroke()
      })
      ctx.setLineDash([])

      chart.stars.forEach((star, k) => {
        const p = points[k]
        if (!p)
          return
        if (chart.uncharted) {
          ctx.strokeStyle = plate.paper(0.9 * reveal)
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(p[0], p[1], 3, 0, 2 * Math.PI)
          ctx.stroke()
        } else if (star.main) {
          const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 26)
          glow.addColorStop(0, plate.ember(0.35 * reveal))
          glow.addColorStop(1, plate.ember(0))
          ctx.fillStyle = glow
          ctx.fillRect(p[0] - 26, p[1] - 26, 52, 52)
          ctx.fillStyle = plate.ember(reveal)
          ctx.beginPath()
          ctx.arc(p[0], p[1], 4, 0, 2 * Math.PI)
          ctx.fill()
        } else {
          ctx.fillStyle = plate.paper(reveal)
          ctx.beginPath()
          ctx.arc(p[0], p[1], 2.4, 0, 2 * Math.PI)
          ctx.fill()
        }
        if (star.label && lock > 0.5) {
          labels.push({ text: star.label.toUpperCase(), x: p[0] + 10, y: p[1] + 4, color: LABEL.paper, alpha: 0.9 * clamp((lock - 0.5) * 3) })
        }
      })

      if (lock <= 0.02)
        return
      // The reticle closes in on the constellation as the lock takes hold
      const seen = points.filter((p): p is [number, number] => !!p)
      const xs = seen.map(p => p[0])
      const ys = seen.map(p => p[1])
      const mx = (Math.min(...xs) + Math.max(...xs)) / 2
      const my = (Math.min(...ys) + Math.max(...ys)) / 2
      const spread = 1 + (1 - lock) ** 2 * 1.4
      const hw = ((Math.max(...xs) - Math.min(...xs)) / 2 + 40) * spread
      const hh = ((Math.max(...ys) - Math.min(...ys)) / 2 + 40) * spread
      const arm = 18
      ctx.strokeStyle = plate.aurora(clamp(lock * 2))
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
        const x = mx + sx * hw
        const y = my + sy * hh
        ctx.moveTo(x - sx * arm, y)
        ctx.lineTo(x, y)
        ctx.lineTo(x, y - sy * arm)
      }
      // Ticks on the frame's sides, like a finder's scale
      for (const s of [-1, 1]) {
        ctx.moveTo(mx + s * hw, my)
        ctx.lineTo(mx + s * (hw - 8), my)
        ctx.moveTo(mx, my + s * hh)
        ctx.lineTo(mx, my + s * (hh - 8))
      }
      ctx.stroke()

      const x = mx - hw
      const y = my + hh + 22
      labels.push({ text: chart.name.toUpperCase(), x, y, color: LABEL.aurora, alpha: clamp(lock * 2) })
      labels.push({ text: readout(forward), x, y: y + 17, color: LABEL.paper, alpha: clamp(lock * 2) * 0.6 })
    })

    // Knock the print out under every label, then set the type over it
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000'
    type.setTransform(glScale, 0, 0, glScale, 0, 0)
    type.clearRect(0, 0, w, h)
    type.font = LABEL_FONT
    ctx.font = LABEL_FONT
    for (const l of labels) {
      if (l.alpha <= 0.01)
        continue
      const width = ctx.measureText(l.text).width
      ctx.fillRect(l.x - 4, l.y - 12, width + 8, 17)
      type.fillStyle = `rgb(${l.color} / ${l.alpha})`
      type.fillText(l.text, l.x, l.y)
    }

    gl!.viewport(0, 0, canvas.width, canvas.height)
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGB, gl!.RGB, gl!.UNSIGNED_BYTE, plates)
    gl!.uniform2f(uRes, canvas.width, canvas.height)
    gl!.uniform1f(uPitch, PITCH * glScale)
    gl!.uniform1f(uScale, glScale)
    gl!.drawArrays(gl!.TRIANGLES, 0, 3)
  }

  resize()
  return {
    draw,
    resize,
    launch,
    flying: () => meteors.length > 0,
    destroy: () => gl.getExtension('WEBGL_lose_context')?.loseContext(),
  }
}
