<template>
  <div class="hero h-full pt-[var(--navbar-height)]">
    <h1
      class="text-[color:var(--primary-text-color)] text-7xl mt-4 ml-16 font-bold keywords uppercase"
    >
      Create<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
      >.</span><br>
      Develop<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
      >.</span><br>
      Achieve<span
        class="text-[color:var(--secondary-color)] text-7xl leading-[0]"
      >.</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="css" scoped>
.hero {
  display: grid;
  grid-template-areas:
    "keywords . description"
    "keywords . ."
    ". portrait cta"
    "partners partners partners";
}

.keywords {
  grid-area: keywords;
}
</style>