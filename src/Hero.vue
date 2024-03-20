<template>
  <div class="hero h-full pt-[var(--navbar-height)]">
    <h1
      class="text-[color:var(--primary-text-color)] text-7xl mt-4 ml-16 font-bold keywords uppercase"
    >
      Create<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
        >.</span
      ><br />
      Develop<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
        >.</span
      ><br />
      Achieve<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
        >.</span
      >
    </h1>
    <div class="portrait">
      <img src="/final-me.png" alt="Portrait" />
    </div>
    <div class="partners">
      <swiper-container
        slides-per-view="4"
        class="mix-blend-luminosity opacity-85"
      >
        <swiper-slide v-for="partner in partners" :key="partner.alt">
          <img class="h-10" :src="partner.src" :alt="partner.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
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
  display: grid;

  grid-template-areas:
    "keywords"
    "portrait"
    "cta"
    "partners";
}

@media screen and (min-width: 768px) {
  .hero {
    grid-template-areas:
      "keywords . description"
      "keywords portrait ."
      ". portrait cta"
      "partners partners partners";
  }
}

.keywords {
  grid-area: keywords;
}

.partners {
  grid-area: partners;
}

.portrait {
  grid-area: portrait;
}

swiper-container {
  height: 100%;
  max-height: 100vw;
  min-height: 0;
  min-width: 0;
  max-width: 100vw;
  width: 100%;
  overflow: hidden;
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