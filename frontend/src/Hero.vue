<template>
  <div class="hero grid justify-center h-full pt-[var(--navbar-height)]">
    <h1
      class="text-[color:var(--primary-text-color)] text-6xl md:text-8xl xl:text-9xl mt-4 ml-16 font-bold keywords uppercase self-center">
      Create<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span><br />
      Learn<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span><br />
      Thrive<span class="text-[color:var(--primary-color)] text-9xl leading-[0]">.</span>
    </h1>
    <div class="portrait">
      <img src="/portrait.png" alt="Portrait" />
    </div>
    <div class="partners">
      <swiper-container slides-per-view="4" class="mix-blend-luminosity opacity-85">
        <swiper-slide v-for="partner in partners" :key="partner.alt">
          <img class="h-10" :src="partner.src" :alt="partner.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="cta m-4 flex justify-center items-center">
      <div>
        <ul class="mb-6 uppercase text-2xl w-max">
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            Software Engineering
          </li>
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            Business Psychology
          </li>
          <li class="mb-2">
            <PhCheckCircle class="inline align-baseline" />
            Martial Arts
          </li>
        </ul>
        <button @click="showContactModal = true"
          class="px-20 py-4 rounded-full bg-[color:var(--secondary-color)] hidden md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-transform transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          Contact me
        </button>
      </div>
    </div>
    <ContactModal @hideContactModal="showContactModal = false" v-if="showContactModal" />
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle } from "@phosphor-icons/vue";
import { provide, ref } from "vue"
import ContactModal from "./ContactModal/ContactModal.vue";

const showContactModal = ref(false);

provide("weight", "fill");

const partners = [
  {
    alt: "Webwave",
    src: "/partners/webwave.svg",
  },
  {
    alt: "Nordea",
    src: "/partners/Nordea.png",
  },
  {
    alt: "Wirtualna Polska",
    src: "/partners/wp.png",
  },
  {
    alt: "Cognitran",
    src: "/partners/cognitran.svg",
  },
];
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

.partners {
  grid-area: partners;
}

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