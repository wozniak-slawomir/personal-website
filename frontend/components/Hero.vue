<template>
  <div class="hero container grid justify-center lg:h-full pt-[var(--navbar-height)]">
    <h1
      class="text-[color:var(--primary-text-color)] text-6xl md:text-8xl lg:text-7xl xl:text-9xl mt-4 mx-auto lg:ml-0 font-bold keywords uppercase self-center"
    >
      Create<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span><br>
      Learn<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span><br>
      Thrive<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span>
    </h1>
    <div class="portrait">
      <NuxtImg
        src="/portrait.png"
        class="lg:w-[384px] mx-auto"
        :alt="$t('alt.portrait')"
        width="300"
        height="450"
      />
    </div>
    <!-- <div class="partners">
      <swiper-container slides-per-view="4" class="mix-blend-luminosity opacity-85">
        <swiper-slide v-for="partner in partners" :key="partner.alt">
          <img class="h-10" :src="partner.src" :alt="partner.alt" />
        </swiper-slide>
      </swiper-container>
    </div> -->
    <div class="cta m-4 flex justify-center items-center flex-col">
      <div>
        <ul class="mb-6 uppercase text-xl sm:text-2xl w-max">
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            {{ $t("hero.software.engineering") }}
          </li>
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            {{ $t("hero.business.psychology") }}
          </li>
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            {{ $t("hero.wellbeing") }}
          </li>
        </ul>
      </div>
      <button
        class="px-20 py-4 rounded-full font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300 max-w-fit"
        @click="onContactClick"
      >
        {{ $t("common.contact") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle } from '@phosphor-icons/vue'
import { provide } from 'vue'
const { $event } = useNuxtApp()

provide('weight', 'fill')

const onContactClick = () => {
  $event('ContactModal:Open')
}

// const partners = [
//   {
//     alt: "Webwave",
//     src: "/partners/webwave.svg",
//   },
//   {
//     alt: "Nordea",
//     src: "/partners/Nordea.png",
//   },
//   {
//     alt: "Wirtualna Polska",
//     src: "/partners/wp.png",
//   },
//   {
//     alt: "Cognitran",
//     src: "/partners/cognitran.svg",
//   },
// ];
</script>

<style lang="css" scoped>
.hero {
  grid-template-areas:
    "keywords"
    "portrait"
    "cta"
    "partners";
}

@media screen and (min-width: 1024px) {
  .hero {
    grid-template-areas:
      "keywords portrait cta"
      "keywords portrait cta"
      "keywords portrait cta"
      "partners partners partners";
    grid-template-columns: 1fr minmax(256px, 512px) 1fr;
  }
}

.keywords {
  grid-area: keywords;
  text-shadow: 10px 3px 25px rgba(0, 0, 0, 1);
}

/* .partners {
  grid-area: partners;
} */

.portrait {
  grid-area: portrait;
}

.cta {
  grid-area: cta;
}

swiper-container {
  height: 100%;
  max-height: 100vw;
  min-height: 0;
  min-width: 0;
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
  padding: 0 2rem;
  margin: 2rem 0;
}

swiper-slide {
  width: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 100%;
}

swiper-wrapper {
  max-height: 100%;
  height: 100%t;
  display: flex;
}
</style>