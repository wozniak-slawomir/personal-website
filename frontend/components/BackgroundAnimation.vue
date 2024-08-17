<template>
  <div
    ref="canvasContainer"
    class="w-screen h-screen fixed top-0 left-0 z-0 bg-gray-300 flex justify-center items-center"
  >
    <canvas
      ref="canvasElement"
      :width="width"
      :height="height"
      class=" text-black duration-1000 bg-white"
      :class="isMounted ? 'opacity-75' : 'opacity-0'"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

const isMounted = ref(false)

const width = ref(0)
const height = ref(0)
const points = ref([])

const canvasElement: Ref<HTMLCanvasElement | undefined> = ref()
const context: Ref<CanvasRenderingContext2D | undefined> = ref()

onMounted(() => {
  width.value = window.innerWidth
  height.value = window.innerHeight

  context.value = canvasElement.value?.getContext('2d') || undefined

  // Set isMounted to true after the component is mounted to prevent the canvas from being rendered before the context is available
  setTimeout(() => {
    calculatePoints()
  }, 0)

})

function calculatePoints() {
  for (let x = 0; x < width.value; x = x + width.value/20) {
    for(let y = 0; y < height.value; y = y + height.value/20) {
            let px = x + Math.random()*width.value/20
            let py = y + Math.random()*height.value/20
            let p = {x: px, originX: px, y: py, originY: py }
        }
  }
  drawCircle()
}

function drawCircle() {
  isMounted.value = true
    if (!context.value) {
      console.error('Canvas context is not available')
      return
    } else {
      console.log('Canvas context is available')
      context.value.arc(200, 200, 3, 0, 2 * Math.PI)
      context.value.arc(300, 200, 3, 0, 2 * Math.PI)
      context.value.fill()
     }
}







// ======================================================================================================================
// make an array of objects with x, y properties and an array of objects with x, y properties of 5 closest points
// x = iterator + Math.random() * width/20
// y = iterator + Math.random() * height/20
// ======================================================================================================================
// pick 5 closest points to the current point using the distance formula
// d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
// store the 5 closest points in an array
// ======================================================================================================================
// draw the circles and lines between the points
</script>