<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--primary-color)] py-5 px-16 flex flex-wrap justify-between items-center fixed top-0 left-0"
  >
    <img src="logo.png" class="w-[400px]" />
    <div class="h-full">
      <button
        class="px-10 h-full rounded-full bg-[color:var(--secondary-color)] hidden md:inline-block font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
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
