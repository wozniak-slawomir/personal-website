<template>
  <div
    v-bind="props"
    :class="
      cn(
        'fixed z-0 top-0 left-0 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg',
        props.class,
      )
    "
  >
    <div class="absolute h-[100vh] w-[100vw] inset-0 overflow-hidden">
      <div
        :class="
          cn(
            'filter blur-[10px] invert dark:invert-0 pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform;',
            '[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]',
            '[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]',
            '[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]',
            '[background-image:var(--white-gradient),var(--aurora)] dark:[background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%]',
            'aurora-background-gradient-after',
            'aurora-gradient-animation',
            props.radialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )
        "
      />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  radialGradient?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<AuroraBackgroundProps>(), {
  radialGradient: true,
})
</script>

<style scoped>
.aurora-background-gradient-after {
  @apply after:content-[""] 
          after:absolute 
          after:inset-0 
          after:[background-image:var(--white-gradient),var(--aurora)]
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:[background-attachment:fixed] 
          after:mix-blend-difference;
}

.aurora-gradient-animation::after {
  animation: animate-aurora 60s linear infinite;
}

@keyframes animate-aurora {
  0% {
    background-position:
      50% 50%,
      50% 50%;
  }
  100% {
    background-position:
      350% 50%,
      350% 50%;
  }
}

.dark\:\[background-image\:var\(--dark-gradient\)\,var\(--aurora\)\]:where(.dark,
.dark *) {
  background-image:var(--dark-gradient),var(--aurora);
}

.dark\:block:where(.dark,
.dark *) {
  display:block
}
.dark\:hidden:where(.dark,
.dark *) {
  display:none
}
.dark\:-rotate-90:where(.dark,
.dark *) {
  --tw-rotate:-90deg;
  transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
.dark\:rotate-0:where(.dark,
.dark *) {
  --tw-rotate:0deg;
  transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
.dark\:scale-0:where(.dark,
.dark *) {
  --tw-scale-x:0;
  --tw-scale-y:0;
  transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
.dark\:scale-100:where(.dark,
.dark *) {
  --tw-scale-x:1;
  --tw-scale-y:1;
  transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}
.dark\:border-\[--dark-border-color\]:where(.dark,
.dark *) {
  border-color:var(--dark-border-color)
}
.dark\:border-destructive:where(.dark,
.dark *) {
  border-color:hsl(var(--destructive))
}
.dark\:border-gray-50\/\[\.1\]:where(.dark,
.dark *) {
  border-color:#f9fafb1a
}
.dark\:border-gray-800:where(.dark,
.dark *) {
  --tw-border-opacity:1;
  border-color:rgb(31 41 55/var(--tw-border-opacity,1))
}
.dark\:border-neutral-700:where(.dark,
.dark *) {
  --tw-border-opacity:1;
  border-color:rgb(64 64 64/var(--tw-border-opacity,1))
}
.dark\:border-neutral-800:where(.dark,
.dark *) {
  --tw-border-opacity:1;
  border-color:rgb(38 38 38/var(--tw-border-opacity,1))
}
.dark\:border-white\/\[0\.2\]:where(.dark,
.dark *) {
  border-color:#fff3
}
.dark\:border-zinc-800:where(.dark,
.dark *) {
  --tw-border-opacity:1;
  border-color:rgb(39 39 42/var(--tw-border-opacity,1))
}
.dark\:bg-\[\#fff\]\/25:where(.dark,
.dark *) {
  background-color:#ffffff40
}
.dark\:bg-\[--dark-square-color\]:where(.dark,
.dark *) {
  background-color:var(--dark-square-color)
}
.dark\:bg-background:where(.dark,
.dark *) {
  background-color:hsl(var(--background))
}
.dark\:bg-black:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(0 0 0/var(--tw-bg-opacity,1))
}
.dark\:bg-gray-50\/\[\.10\]:where(.dark,
.dark *) {
  background-color:#f9fafb1a
}
.dark\:bg-gray-600:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(75 85 99/var(--tw-bg-opacity,1))
}
.dark\:bg-gray-900:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(17 24 39/var(--tw-bg-opacity,1))
}
.dark\:bg-neutral-800:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(38 38 38/var(--tw-bg-opacity,1))
}
.dark\:bg-neutral-900:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(23 23 23/var(--tw-bg-opacity,1))
}
.dark\:bg-neutral-950:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(10 10 10/var(--tw-bg-opacity,1))
}
.dark\:bg-transparent:where(.dark,
.dark *) {
  background-color:transparent
}
.dark\:bg-white:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(255 255 255/var(--tw-bg-opacity,1))
}
.dark\:bg-white\/5:where(.dark,
.dark *) {
  background-color:#ffffff0d
}
.dark\:bg-zinc-800:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(39 39 42/var(--tw-bg-opacity,1))
}
.dark\:bg-zinc-900:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(24 24 27/var(--tw-bg-opacity,1))
}
.dark\:bg-zinc-900\/50:where(.dark,
.dark *) {
  background-color:#18181b80
}
.dark\:bg-\[linear-gradient\(\#fff\,\#fff\)\,linear-gradient\(\#fff_50\%\,rgba\(255\,255\,255\,0\.6\)_80\%\,rgba\(0\,0\,0\,0\)\)\,linear-gradient\(90deg\,var\(--color-1\)\,var\(--color-5\)\,var\(--color-3\)\,var\(--color-4\)\,var\(--color-2\)\)\]:where(.dark,
.dark *) {
  background-image:linear-gradient(#fff,#fff),linear-gradient(#fff 50%,hsla(0,0%,100%,.6) 80%,transparent),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))
}
.dark\:from-background:where(.dark,
.dark *) {
  --tw-gradient-from:hsl(var(--background)) var(--tw-gradient-from-position);
  --tw-gradient-to:hsl(var(--background)/0) var(--tw-gradient-to-position);
  --tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)
}
.dark\:from-white:where(.dark,
.dark *) {
  --tw-gradient-from:#fff var(--tw-gradient-from-position);
  --tw-gradient-to:hsla(0,0%,100%,0) var(--tw-gradient-to-position);
  --tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)
}
.dark\:via-neutral-700:where(.dark,
.dark *) {
  --tw-gradient-to:rgba(64,64,64,0) var(--tw-gradient-to-position);
  --tw-gradient-stops:var(--tw-gradient-from),#404040 var(--tw-gradient-via-position),var(--tw-gradient-to)
}
.dark\:via-white:where(.dark,
.dark *) {
  --tw-gradient-to:hsla(0,0%,100%,0) var(--tw-gradient-to-position);
  --tw-gradient-stops:var(--tw-gradient-from),#fff var(--tw-gradient-via-position),var(--tw-gradient-to)
}
.dark\:to-slate-900\/10:where(.dark,
.dark *) {
  --tw-gradient-to:rgba(15,23,42,.1) var(--tw-gradient-to-position)
}
.dark\:to-zinc-700\/75:where(.dark,
.dark *) {
  --tw-gradient-to:rgba(63,63,70,.75) var(--tw-gradient-to-position)
}
.dark\:fill-\[\#262626\]:where(.dark,
.dark *) {
  fill:#262626
}
.dark\:fill-\[\#404040\]:where(.dark,
.dark *) {
  fill:#404040
}
.dark\:stroke-\[\#404040\]:where(.dark,
.dark *) {
  stroke:#404040
}
.dark\:stroke-neutral-800:where(.dark,
.dark *) {
  stroke:#262626
}
.dark\:text-black:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(0 0 0/var(--tw-text-opacity,1))
}
.dark\:text-gray-200:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(229 231 235/var(--tw-text-opacity,1))
}
.dark\:text-gray-400:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(156 163 175/var(--tw-text-opacity,1))
}
.dark\:text-neutral-100:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(245 245 245/var(--tw-text-opacity,1))
}
.dark\:text-neutral-200:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(229 229 229/var(--tw-text-opacity,1))
}
.dark\:text-neutral-300:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(212 212 212/var(--tw-text-opacity,1))
}
.dark\:text-neutral-400:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(163 163 163/var(--tw-text-opacity,1))
}
.dark\:text-neutral-400\/70:where(.dark,
.dark *) {
  color:#a3a3a3b3
}
.dark\:text-neutral-500:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(115 115 115/var(--tw-text-opacity,1))
}
.dark\:text-transparent:where(.dark,
.dark *) {
  color:transparent
}
.dark\:text-white:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(255 255 255/var(--tw-text-opacity,1))
}
.dark\:text-white\/20:where(.dark,
.dark *) {
  color:#fff3
}
.dark\:text-white\/40:where(.dark,
.dark *) {
  color:#fff6
}
.dark\:text-white\/60:where(.dark,
.dark *) {
  color:#fff9
}
.dark\:text-zinc-200:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(228 228 231/var(--tw-text-opacity,1))
}
.dark\:text-zinc-500:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(113 113 122/var(--tw-text-opacity,1))
}
.dark\:opacity-50:where(.dark,
.dark *) {
  opacity:.5
}
.dark\:opacity-70:where(.dark,
.dark *) {
  opacity:.7
}
.dark\:shadow-\[0px_0px_1px_1px_var\(--neutral-700\)\]:where(.dark,
.dark *) {
  --tw-shadow:0px 0px 1px 1px var(--neutral-700);
  --tw-shadow-colored:0px 0px 1px 1px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)
}
.dark\:shadow-\[0px_0px_1px_3px_rgba\(0\,0\,0\,1\)_inset\]:where(.dark,
.dark *) {
  --tw-shadow:0px 0px 1px 3px #000 inset;
  --tw-shadow-colored:inset 0px 0px 1px 3px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)
}
.dark\:shadow-\[0px_0px_27px_0px_\#2D2D2D\]:where(.dark,
.dark *) {
  --tw-shadow:0px 0px 27px 0px #2d2d2d;
  --tw-shadow-colored:0px 0px 27px 0px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)
}
.dark\:shadow-none:where(.dark,
.dark *) {
  --tw-shadow:0 0 #0000;
  --tw-shadow-colored:0 0 #0000;
  box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)
}
.dark\:invert:where(.dark,
.dark *) {
  --tw-invert:invert(100%);
  filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}
.dark\:invert-0:where(.dark,
.dark *) {
  --tw-invert:invert(0);
  filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.dark\:backdrop-blur-md:where(.dark,
.dark *) {
  --tw-backdrop-blur:blur(12px);
  -webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)
}
.dark\:\[--shadowColor\:\#111\]:where(.dark,
.dark *) {
  --shadowColor:#111
}
.dark\:\[background-image\:var\(--dark-gradient\)\,var\(--aurora\)\]:where(.dark,
.dark *) {
  background-image:var(--dark-gradient),var(--aurora);
}
.dark\:\[border\:1px_solid_rgba\(255\,255\,255\,\.1\)\]:where(.dark,
.dark *) {
  border:1px solid hsla(0,0%,100%,.1)
}
.dark\:\[box-shadow\:0_-20px_80px_-20px_\#ffffff1f_inset\]:where(.dark,
.dark *) {
  box-shadow:inset 0 -20px 80px -20px #ffffff1f
}
.after\:dark\:\[background-image\:var\(--dark-gradient\)\,var\(--aurora\)\]:where(.dark,
.dark *):after {
  background-image:var(--dark-gradient),var(--aurora);
  content:var(--tw-content)
}
.dark\:hover\:bg-\[--dark-square-hover-color\]:hover:where(.dark,
.dark *) {
  background-color:var(--dark-square-hover-color)
}
.dark\:hover\:bg-gray-50\/\[\.15\]:hover:where(.dark,
.dark *) {
  background-color:#f9fafb26
}
.dark\:hover\:bg-neutral-800:hover:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(38 38 38/var(--tw-bg-opacity,1))
}
.dark\:hover\:text-zinc-50:hover:where(.dark,
.dark *) {
  --tw-text-opacity:1;
  color:rgb(250 250 250/var(--tw-text-opacity,1))
}
.hover\:dark\:text-neutral-400:where(.dark,
.dark *):hover {
  --tw-text-opacity:1;
  color:rgb(163 163 163/var(--tw-text-opacity,1))
}
.dark\:hover\:shadow-2xl:hover:where(.dark,
.dark *) {
  --tw-shadow:0 25px 50px -12px rgba(0,0,0,.25);
  --tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color);
  box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)
}
.dark\:hover\:shadow-emerald-500\/\[0\.1\]:hover:where(.dark,
.dark *) {
  --tw-shadow-color:rgba(16,185,129,.1);
  --tw-shadow:var(--tw-shadow-colored)
}
.dark\:focus-visible\:ring-neutral-600:focus-visible:where(.dark,
.dark *) {
  --tw-ring-opacity:1;
  --tw-ring-color:rgb(82 82 82/var(--tw-ring-opacity,1))
}
.dark\:disabled\:bg-zinc-700:disabled:where(.dark,
.dark *) {
  --tw-bg-opacity:1;
  background-color:rgb(63 63 70/var(--tw-bg-opacity,1))
}
.group:hover .group-hover\:dark\:bg-neutral-800\/10:where(.dark,
.dark *) {
  background-color:#2626261a
}
</style>
