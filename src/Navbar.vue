<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--primary-color)] py-5 px-16 flex justify-between items-center fixed top-0 left-0"
  >
    <img src="logo.png" class="h-3/4" />
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
        class="px-10 h-full rounded-full bg-[color:var(--secondary-color)] font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
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
