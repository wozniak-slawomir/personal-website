<template>
    <div class="container mt-10 w-full overflow-hidden">
        <div class="h-[450px] container absolute scale-[101%] translate-y-36 translate-x-[-20px] bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] z-10 md:translate-y-32"></div>
        <h1 class="text-5xl font-bold my-10 text-center md:text-left">WHAT OUR CLIENTS SAY</h1>
        <div class="flex bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] animate-slide whitespace-nowrap">
            <div v-for="topTestimonials in topTestimonials" class="w-full inline-block whitespace-normal">
                    <div class="flex flex-col w-[350px] h-[200px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mr-6 mb-6">
                    <h1 class="text-3xl">{{ topTestimonials.text }}</h1>
                    <div class="flex flex-col text-[#929292]">
                        <h3>{{ topTestimonials.name }}</h3>
                        <p>{{ topTestimonials.position }}, {{ topTestimonials.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="topTestimonials in topTestimonials" class="w-full inline-block whitespace-normal">
                    <div class="flex flex-col w-[350px] h-[200px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mr-6 mb-6">
                    <h1 class="text-3xl">{{ topTestimonials.text }}</h1>
                    <div class="flex flex-col text-[#929292]">
                        <h3>{{ topTestimonials.name }}</h3>
                        <p>{{ topTestimonials.position }}, {{ topTestimonials.company }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex ml-[-175px] animate-slide">
            <div v-for="bottomTestimonials in bottomTestimonials" class="w-full">
                    <div class="flex flex-col w-[350px] h-[200px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mr-6">
                    <h1 class="text-3xl">{{ bottomTestimonials.text }}</h1>
                    <div class="flex flex-col text-[#929292]">
                        <h3>{{ bottomTestimonials.name }}</h3>
                        <p>{{ bottomTestimonials.position }}, {{ bottomTestimonials.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="bottomTestimonials in bottomTestimonials" class="w-full">
                    <div class="flex flex-col w-[350px] h-[200px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mr-6">
                    <h1 class="text-3xl">{{ bottomTestimonials.text }}</h1>
                    <div class="flex flex-col text-[#929292]">
                        <h3>{{ bottomTestimonials.name }}</h3>
                        <p>{{ bottomTestimonials.position }}, {{ bottomTestimonials.company }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// najlepiej jakby było tyle samo górnych i dolnych testimoniali bo animacja ładnie chodzi, jak będzie więcej niż 5 to trzeba zmienić w configu animację
    const topTestimonials = [
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "1",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "2",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "3",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "4",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "5",
        },
        
    ];

    const bottomTestimonials = [
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "1",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "2",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "3",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "4",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "5",
        },
    ];
</script>

<style scoped lang="css">

</style>