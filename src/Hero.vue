<template>
  <div class="hero h-full pt-[var(--navbar-height)]">
    <h1
      class="text-[color:var(--primary-text-color)] text-8xl xl:text-9xl mt-4 ml-16 font-bold keywords uppercase"
    >
      Create<span class="text-[color:var(--primary-color)] text-9xl leading-[0]"
        >.</span
      ><br />
      Learn<span class="text-[color:var(--primary-color)] text-9xl leading-[0]"
        >.</span
      ><br />
      Thrive<span class="text-[color:var(--primary-color)] text-9xl leading-[0]"
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

@media screen and (min-width: 1024px) {
  .hero {
    grid-template-areas:
      "keywords portrait cta"
      "keywords portrait cta"
      "keywords portrait cta"
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