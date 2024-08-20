<template>
  <div
    id="large-header"
    class="w-screen absolute top-0 left-0 -z-10 overflow-visible"
  >
    <canvas
      id="demo-canvas"
      class="w-full h-full object-fill overflow-visible"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TweenLite, Circ } from 'gsap'

interface Point {
  x: number
  originX: number
  y: number
  originY: number
  closest?: Point[]
  active?: number
  circle?: Circle
}

class Circle {
  pos: Point
  radius: number
  color: string
  active: number

  constructor(pos: Point, radius: number, color: string) {
    this.pos = pos
    this.radius = radius
    this.color = color
    this.active = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = `rgba(156,121,69,${this.active})`
    ctx.fill()
  }
}

const width = ref<number | undefined>()
const height = ref<number | undefined>()

const largeHeader = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const points = ref<Point[]>([])
const target = ref({ x: 0, y: 0 })
const animateHeader = ref(true)

onMounted(() => {
  width.value = window.innerWidth
  height.value = document.documentElement.scrollHeight + window.innerHeight
  target.value = { x: width.value / 2, y: height.value / 2 }

  initHeader()
  initAnimation()
  addListeners()
})

function initHeader() {
  width.value = window.innerWidth
  height.value = document.documentElement.scrollHeight
  target.value = { x: width.value / 2, y: height.value / 2 }

  largeHeader.value = document.getElementById('large-header') as HTMLElement
  largeHeader.value.style.height = height.value + 'px'

  canvas.value = document.getElementById('demo-canvas') as HTMLCanvasElement
  canvas.value.width = width.value
  canvas.value.height = height.value
  ctx.value = canvas.value.getContext('2d')

  // create points
  points.value = []
  for (let x = 0; x < width.value; x = x + width.value / 20) {
    for (let y = 0; y < height.value; y = y + height.value / 20) {
      const px = x + Math.random() * width.value / 20
      const py = y + Math.random() * height.value / 20
      const p: Point = { x: px, originX: px, y: py, originY: py }
      points.value.push(p)
    }
  }

  // for each point find the 5 closest points
  for (let i = 0; i < points.value.length; i++) {
    const closest: Point[] = []
    const p1 = points.value[i]
    for (let j = 0; j < points.value.length; j++) {
      const p2 = points.value[j]
      if (!(p1 === p2)) {
        let placed = false
        for (let k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] === undefined) {
              closest[k] = p2
              placed = true
            }
          }
        }

        for (let k = 0; k < 5; k++) {
          if (!placed) {
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2
              placed = true
            }
          }
        }
      }
    }
    p1.closest = closest
  }

  // assign a circle to each point
  for (const i in points.value) {
    const c = new Circle(points.value[i], 2 + Math.random() * 2, 'rgba(156,121,69,0.3)')
    points.value[i].circle = c
  }
}

function addListeners() {
  if (!('ontouchstart' in window)) {
    window.addEventListener('mousemove', mouseMove)
  }
  window.addEventListener('scroll', scrollCheck)
  window.addEventListener('resize', resize)
}

function mouseMove(e: MouseEvent) {
  let posx = 0
  let posy = 0
  if (e.pageX || e.pageY) {
    posx = e.pageX
    posy = e.pageY
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
  target.value.x = posx
  target.value.y = posy
}

function scrollCheck() {
  if (document.body.scrollTop > height.value!) animateHeader.value = false
  else animateHeader.value = true
}

function resize() {
  document.location.reload()
}

function initAnimation() {
  animate()
  for (const i in points.value) {
    shiftPoint(points.value[i])
  }
}

function animate() {
  if (animateHeader.value) {
    ctx.value!.clearRect(0, 0, width.value!, height.value!)
    for (const i in points.value) {
      // detect points in range
      if (Math.abs(getDistance(target.value, points.value[i])) < 10000) {
        points.value[i].active = 0.3
        points.value[i].circle!.active = 0.6
      } else if (Math.abs(getDistance(target.value, points.value[i])) < 50000) {
        points.value[i].active = 0.1
        points.value[i].circle!.active = 0.3
      } else if (Math.abs(getDistance(target.value, points.value[i])) < 100000) {
        points.value[i].active = 0.02
        points.value[i].circle!.active = 0.1
      } else {
        points.value[i].active = 0
        points.value[i].circle!.active = 0
      }

      drawLines(points.value[i])
      points.value[i].circle!.draw(ctx.value!)
    }
  }
  requestAnimationFrame(animate)
}

function shiftPoint(p: Point) {
  TweenLite.to(p, 1 + 1 * Math.random(), {
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100,
    ease: Circ.easeInOut,
    onComplete: function () {
      shiftPoint(p)
    },
  })
}

function drawLines(p: Point) {
  if (!p.active) return
  for (const i in p.closest) {
    ctx.value!.beginPath()
    ctx.value!.moveTo(p.x, p.y)
    ctx.value!.lineTo(p.closest![i].x, p.closest![i].y)
    ctx.value!.strokeStyle = `rgba(156,121,69,${p.active})`
    ctx.value!.stroke()
  }
}

function getDistance(p1: Point, p2: Point) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
}
</script>