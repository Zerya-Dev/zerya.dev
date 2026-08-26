<script setup>
useHead({
  script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', defer: true }],
})
useSeoMeta({
  title: 'Home',
})

if (import.meta.client) {
  const container = document.getElementById('canvas-container')
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
  container.appendChild(renderer.domElement)

  const vertexShader = `
              varying vec2 vUv;
              void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
          `

  const fragmentShader = `
              uniform float uTime;
              uniform vec2 uResolution;
              uniform float uDraw;
              uniform float uKp;
              uniform float uHueShift;
              varying vec2 vUv;

              // --- NOISE FUNCTIONS ---
              float hash(float n) { return fract(sin(n) * 43758.5453); }
              float noise(vec2 x) {
                  vec2 p = floor(x);
                  vec2 f = fract(x);
                  f = f * f * (3.0 - 2.0 * f);
                  float n = p.x + p.y * 57.0;
                  return mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                             mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
              }

              // --- COLOR MATH ---
              vec3 rgb2hsl(vec3 c) {
                  float maxc = max(c.r, max(c.g, c.b));
                  float minc = min(c.r, min(c.g, c.b));
                  float l = (maxc + minc) / 2.0;
                  float s = 0.0;
                  float h = 0.0;
                  if (maxc > minc) {
                      float d = maxc - minc;
                      s = (l > 0.5) ? d / (2.0 - maxc - minc) : d / (maxc + minc);
                      if (c.r > c.g && c.r > c.b) h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
                      else if (c.g > c.b) h = (c.b - c.r) / d + 2.0;
                      else h = (c.r - c.g) / d + 4.0;
                      h /= 6.0;
                  }
                  return vec3(h, s, l);
              }
              float hue2rgb(float p, float q, float t) {
                  if (t < 0.0) t += 1.0;
                  if (t > 1.0) t -= 1.0;
                  if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
                  if (t < 1.0/2.0) return q;
                  if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
                  return p;
              }
              vec3 hsl2rgb(vec3 c) {
                  float q = c.z < 0.5 ? c.z * (1.0 + c.y) : c.z + c.y - c.z * c.y;
                  float p = 2.0 * c.z - q;
                  return vec3(hue2rgb(p, q, c.x + 1.0/3.0), hue2rgb(p, q, c.x), hue2rgb(p, q, c.x - 1.0/3.0));
              }
              vec3 hueShift(vec3 color, float shift) {
                  vec3 hsl = rgb2hsl(color);
                  hsl.x = fract(hsl.x + shift / 360.0);
                  return hsl2rgb(hsl);
              }

              void main() {
                  vec2 uv = vUv;
                  // Correct aspect ratio so curtains look consistent on all screens
                  uv.x *= uResolution.x / uResolution.y;

                  vec3 finalColor = vec3(0.0);
                  float t = uTime * 0.2;

                  // --- LOOP: STRICTLY 2 CURTAINS ---
                  for(float i = 0.0; i < 2.0; i++) {

                      // --- 1. BALANCED ASYMMETRY CONFIG ---

                      float isBig = (i == 1.0) ? 1.0 : 0.0; // Index 1 is the big one

                      // Base Position:
                      // i=0 (Small) -> -0.5 (Left)
                      // i=1 (Big)   ->  0.2 (Right Center)
                      float baseX = (i == 0.0) ? 0.0 : 1.4;

                      // Size Multiplier:
                      // Small = 1.0, Big = 1.5
                      float sizeMult = (i == 0.0) ? 1.0 : 1.2;

                      // Sway:
                      // Oscillates back and forth rather than infinite drift
                      // Added phase offset (+ i) so they don't move in perfect sync
                      float sway = sin(t * 0.4 + i * 2.0) * 0.15;

                      float centerX = baseX + sway;

                      // --- 2. CURTAIN SHAPE ---
                      // Unique curve for each based on index
                      float curve = 0.2 + sin(uv.x * 2.0 * (1.0/sizeMult) + t + i * 10.0) * (0.1 * sizeMult);
                      curve += noise(vec2(uv.x * 8.0, t * 2.0)) * 0.04;

                      // --- 3. DISTANCE & GLOW ---
                      float dist = uv.y - curve;

                      if(dist > 0.0) {
                          float rays = noise(vec2(uv.x * 12.0, uv.y * 1.5 - t));
                          rays = pow(rays, 1.5);

                          // Core and Beam intensity scaled by sizeMult
                          float core = 0.04 / (dist + 0.01);
                          float beam = (0.08 / (dist + 0.01)) * rays;

                          float totalGlow = core + beam;

                          // Taller curtains decay slower
                          totalGlow *= exp(-dist * (0.15 / sizeMult));

                          // Width Mask: Wider for the big one
                          float widthBound = 0.6 * sizeMult;
                          float widthMask = smoothstep(widthBound, 0.0, abs(uv.x - centerX));
                          totalGlow *= widthMask;

                          // Intro Animation
                          float drawMask = smoothstep(0.0, 1.0, (uDraw * 2.0 - dist));
                          totalGlow *= drawMask;

                          // KP Intensity
                          totalGlow *= (uKp / 9.0) * 1.0 + 0.5;

                          // --- 4. COLORS ---
                          vec3 cStart, cMid1, cMid2, cEnd;

                          if (i == 0.0) {
                              // SMALL CURTAIN (Left): Cooler, Deep Blues/Purples
                              cStart = vec3(0.0, 0.3, 1.0);
                              cMid1 = vec3(0.5, 0.0, 1.0);
                              cMid2 = vec3(0.0, 0.7, 1.0);
                              cEnd = vec3(0.0, 0.1, 0.6);
                          } else {
                              // BIG CURTAIN (Right): Bright, Vibrant Cyan/Magenta/Green mix
                              cStart = vec3(0.1, 1.0, 0.6); // Bright Teal start
                              cMid1 = vec3(0.0, 0.5, 1.0);  // Azure
                              cMid2 = vec3(1.0, 0.2, 0.8);  // Magenta
                              cEnd = vec3(0.5, 0.0, 1.0);   // Purple
                          }

                          // Gradient mapping
                          float h = dist * (0.4 / sizeMult); // Stretch gradient for bigger curtain
                          vec3 col = mix(cStart, cMid1, smoothstep(0.0, 0.4, h));
                          col = mix(col, cMid2, smoothstep(0.4, 0.8, h));
                          col = mix(col, cEnd, smoothstep(0.8, 1.2, h));

                          col = hueShift(col, uHueShift);

                          // Accumulate
                          finalColor += col * totalGlow * 0.4;
                      }
                  }

                  // Starfield
                  float starNoise = noise(uv * 100.0 + t * 0.05);
                  if (starNoise > 0.98) {
                      finalColor += vec3(1.0) * (0.2 + sin(t * 5.0) * 0.1);
                  }

                  // Tone Mapping
                  finalColor = finalColor / (finalColor + 1.2);
                  finalColor *= 1.2;

                  gl_FragColor = vec4(finalColor, 1.0);
              }
          `

  const geometry = new THREE.PlaneGeometry(2, 2)
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uDraw: { value: 0.0 },
    uKp: { value: 9.0 },
    uHueShift: { value: 0.0 },
  }
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    depthWrite: false,
    depthTest: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uHueShift.value = (uniforms.uTime.value * 10.0) % 360.0

    if (uniforms.uDraw.value < 1.5) {
      uniforms.uDraw.value += 0.008
    }
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
  })
}
</script>

<template>
  <div>
    <div id="canvas-container" />
    <div class="content">
      <div class="logo-container">
        <img
          src="~/assets/logo.svg"
          alt="Zerya Logo"
        >
      </div>
      <div class="github-link">
        <a
          href="https://github.com/Zerya-Dev"
          target="_blank"
          rel="noopener"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          github.com/Zerya-Dev
        </a>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --bg: #000000;
}
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}
#canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  perspective: 1000px;
}

.logo-container {
  width: 40vw;
  max-width: 600px;
  height: auto;
  opacity: 0;
  transform: scale(0.95);
  animation: textReveal 3s cubic-bezier(0.1, 1, 0.2, 1) forwards;
  animation-delay: 0.5s;
  filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.9));
}
.logo-container img {
  width: 100%;
  height: auto;
  display: block;
}
.github-link {
  margin-top: 2rem;
  opacity: 0;
  animation: fadeSub 2s ease forwards;
  animation-delay: 2s;
}
.github-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.05em;
  padding: 14px 28px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.github-link a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}
.github-link a:hover {
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(50px) saturate(200%);
  -webkit-backdrop-filter: blur(50px) saturate(200%);
}
.github-link a:hover::before {
  left: 100%;
}
.github-link svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
  opacity: 0.8;
}
@keyframes textReveal {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fadeSub {
  to {
    opacity: 1;
  }
}
</style>
