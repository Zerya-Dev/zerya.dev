// Scroll positions for the page's pinned scenes, written straight to CSS variables so scrolling never re-renders.
// `--s` on the root is the page progress (0 → 1). Every `[data-scene]` gets `--p`: 0 when its top reaches
// the top of the screen, 1 when its bottom reaches the bottom, which is how long its sticky content stays pinned.
// Long scenes also get `--v`, how many screen heights have been scrolled into them, to time things in screens.
export function useScrollScenes() {
  let frame = 0
  let scenes: HTMLElement[] = []

  function update() {
    frame = 0
    const root = document.documentElement
    const vh = window.innerHeight
    root.style.setProperty('--s', Math.min(Math.max(window.scrollY / Math.max(root.scrollHeight - vh, 1), 0), 1).toFixed(4))
    for (const el of scenes) {
      const rect = el.getBoundingClientRect()
      const p = -rect.top / Math.max(rect.height - vh, 1)
      el.style.setProperty('--p', Math.min(Math.max(p, 0), 1).toFixed(4))
      el.style.setProperty('--v', Math.max(-rect.top / vh, 0).toFixed(4))
    }
  }

  function request() {
    if (!frame)
      frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')]
    update()
  })
  useEventListener('scroll', request, { passive: true })
  useEventListener('resize', request, { passive: true })
  onBeforeUnmount(() => cancelAnimationFrame(frame))
}
