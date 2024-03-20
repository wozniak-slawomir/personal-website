<template>
  <nav
    class="w-full h-[88px] bg-[color:var(--primary-color)] py-5 px-16 flex justify-between items-center fixed top-0 left-0"
  >
    <img src="logo.png" class="h-full" />
    <div class="flex gap-8">
      <a
        href="#"
        class="text-[color:var(--secondary-text-color)] uppercase hover:text-[color:var(--primary-text-color)]"
        >Home</a
      >
      <a
        href="#"
        class="text-[color:var(--secondary-text-color)] uppercase hover:text-[color:var(--primary-text-color)]"
        >About</a
      >
      <a
        href="#"
        class="text-[color:var(--secondary-text-color)] uppercase hover:text-[color:var(--primary-text-color)]"
        >Contact</a
      >
    </div>
    <div class="h-full">
      <button
        class="px-10 h-full rounded-full bg-[color:var(--secondary-color)]"
      >
        Contact me
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  // Your component's logic goes here
};
</script>

<style scoped>
/* Your component's styles go here */
</style>
