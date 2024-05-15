<template>
    <div class="container mt-10 w-full overflow-hidden">
        <div class="h-[450px] container absolute translate-y-32 translate-x-[-20px] bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] to"></div>
        <h1 class="text-5xl font-bold my-10">WHAT OUR CLIENTS SAY</h1>
        <div class="flex bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)]">
            <div v-for="topTestimonials in topTestimonials" class="w-full">
                    <div class="flex flex-col w-[350px] h-[200px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mr-6 mb-6">
                    <h1 class="text-3xl">{{ topTestimonials.text }}</h1>
                    <div class="flex flex-col text-[#929292]">
                        <h3>{{ topTestimonials.name }}</h3>
                        <p>{{ topTestimonials.position }}, {{ topTestimonials.company }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex ml-[-175px]">
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
    const topTestimonials = [
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        
    ];

    const bottomTestimonials = [
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
        {
            text: "Never a downtime. Place of mind.",
            name: "John Doe",
            position: "CEO",
            company: "Company",
        },
    ];
</script>

<style scoped lang="css">
@keyframes slide {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>