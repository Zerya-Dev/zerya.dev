<script setup lang="ts">
import { Aurora, FloatingParticles, HueShift, Shader } from 'shaders/vue'

useHead({
  titleTemplate: null,
})
useSeoMeta({
  title: 'Zerya',
})

const ready = ref(false)
const unavailable = ref(false)

// Slowly cycle the whole aurora around the color wheel (one turn every ~36s).
// Range starts at 1 so the shift never hits 0, which would recompile the filter.
const hueCycle = { type: 'auto-animate', mode: 'loop', outputMin: 1, outputMax: 361, speed: 1 / 36 } as const
</script>

<template>
  <div>
    <div
      id="canvas-container"
      :class="{ ready, unavailable }"
    >
      <ClientOnly>
        <Shader
          class="shader"
          disable-telemetry
          @ready="ready = true"
          @unavailable="unavailable = true"
        >
          <HueShift :shift="hueCycle">
            <!-- Small curtain (left): cool blues and purples -->
            <Aurora
              color-a="#7f00ff"
              color-b="#004dff"
              color-c="#00b3ff"
              :center="{ x: 0.22, y: 0 }"
              :height="90"
              :intensity="70"
              :curtain-count="3"
              :speed="3"
              :waviness="60"
              :ray-density="35"
              :seed="3"
            />
            <!-- Big curtain (right): teal, azure and magenta -->
            <Aurora
              color-a="#ff33cc"
              color-b="#1aff99"
              color-c="#7f00ff"
              blend-mode="linearDodge"
              :center="{ x: 0.72, y: 0 }"
              :height="140"
              :intensity="85"
              :curtain-count="4"
              :speed="4"
              :waviness="45"
              :ray-density="25"
              :seed="11"
            />
          </HueShift>
          <!-- Starfield -->
          <FloatingParticles
            particle-color="#ffffff"
            blend-mode="screen"
            :count="350"
            :particle-size="0.8"
            :softness="0.3"
            :speed="0.02"
            :twinkle="1"
            :opacity="0.6"
          />
        </Shader>
      </ClientOnly>
    </div>
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
  opacity: 0;
  transition: opacity 3s ease;
}
#canvas-container.ready {
  opacity: 1;
}
/* No WebGPU: fall back to a static glow so the page isn't just black */
#canvas-container.unavailable {
  opacity: 1;
  background:
    radial-gradient(ellipse 60% 45% at 72% 100%, rgba(26, 255, 153, 0.25), transparent 70%),
    radial-gradient(ellipse 45% 35% at 22% 100%, rgba(80, 0, 255, 0.3), transparent 70%);
}
#canvas-container .shader {
  width: 100%;
  height: 100%;
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
