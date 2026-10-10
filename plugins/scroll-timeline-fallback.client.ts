const RISE_Y = 6.5
const SIDE_X = 5
const SIDE_Y = 2

type Motion = {
  opacity: number
  x: number
  y: number
  scale?: number
}

export default defineNuxtPlugin((nuxtApp) => {
  if (window.CSS?.supports('animation-timeline', 'view()')) return

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motionQuery.matches) return

  const prepared = new WeakSet<HTMLElement>()
  let frame = 0

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

  const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

  const prepare = (element: HTMLElement) => {
    if (prepared.has(element)) return
    prepared.add(element)
    element.style.setProperty(
      'transition-property',
      'box-shadow, border-color, background-color, color, filter, outline-color, max-height, transform, rotate, gap',
      'important',
    )
  }

  const paint = (element: HTMLElement, progress: number, from: Motion, to: Motion, holdEnd: boolean) => {
    prepare(element)
    const write = (progressValue: number) => {
      const opacity = from.opacity + (to.opacity - from.opacity) * progressValue
      const x = from.x + (to.x - from.x) * progressValue
      const y = from.y + (to.y - from.y) * progressValue
      element.style.opacity = opacity.toFixed(3)
      element.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`
      if (from.scale != null || to.scale != null) {
        const startScale = from.scale ?? 1
        const endScale = to.scale ?? 1
        element.style.scale = String(startScale + (endScale - startScale) * progressValue)
      }
    }

    if (progress <= 0) {
      write(0)
      return
    }
    if (progress >= 1) {
      if (holdEnd) {
        write(1)
      } else {
        element.style.opacity = ''
        element.style.translate = ''
        element.style.scale = ''
      }
      return
    }
    write(progress)
  }

  const rangeProgress = (element: HTMLElement, startEntry: number, endCover: number) => {
    const rect = element.getBoundingClientRect()
    const traveled = window.innerHeight - rect.top
    const start = startEntry * rect.height
    const end = endCover * (window.innerHeight + rect.height)
    return clamp((traveled - start) / (end - start || 1), 0, 1)
  }

  const update = () => {
    frame = 0
    const unit = rem()
    const hidden: Motion = { opacity: 0, x: 0, y: RISE_Y * unit }
    const shown: Motion = { opacity: 1, x: 0, y: 0 }

    document.querySelectorAll<HTMLElement>('.scroll-reveal').forEach((element) => {
      const end = element.classList.contains('scroll-reveal-soon') ? 0.2 : 0.36
      paint(element, rangeProgress(element, 0, end), hidden, shown, false)
    })

    document.querySelectorAll<HTMLElement>('.scroll-stagger').forEach((parent) => {
      const from: Motion = parent.classList.contains('scroll-stagger-left')
        ? { opacity: 0, x: -SIDE_X * unit, y: SIDE_Y * unit }
        : parent.classList.contains('scroll-stagger-right')
          ? { opacity: 0, x: SIDE_X * unit, y: SIDE_Y * unit }
          : hidden

      Array.from(parent.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return
        paint(child, rangeProgress(child, index * 0.02, 0.28 + index * 0.015), from, shown, false)
      })
    })

    const hero = document.querySelector<HTMLElement>('.hero-scroll-root')
    if (!hero) return

    const heroRect = hero.getBoundingClientRect()
    const exit = clamp(-heroRect.top / (heroRect.height || 1), 0, 1)
    const rest: Motion = { opacity: 1, x: 0, y: 0 }

    const copy = hero.querySelector<HTMLElement>('.hero-scroll-copy')
    if (copy) {
      paint(
        copy,
        clamp(exit / 0.55, 0, 1),
        rest,
        { opacity: 0, x: 0, y: -5 * unit },
        true,
      )
    }

    const portrait = hero.querySelector<HTMLElement>('.hero-scroll-portrait')
    if (portrait) {
      paint(
        portrait,
        clamp(exit / 0.8, 0, 1),
        rest,
        { opacity: 1, x: 0, y: 8 * unit, scale: 0.9 },
        true,
      )
    }

    const logos = hero.querySelector<HTMLElement>('.hero-scroll-logos')
    if (logos) {
      paint(
        logos,
        clamp(exit / 0.35, 0, 1),
        rest,
        { opacity: 0, x: 0, y: 3 * unit },
        true,
      )
    }
  }

  const requestUpdate = () => {
    if (frame) return
    frame = requestAnimationFrame(update)
  }

  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)
  nuxtApp.hook('page:finish', requestUpdate)
  requestUpdate()
})
