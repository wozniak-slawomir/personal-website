<template>
    <div class="container mt-32 overflow-hidden">
        <div
            class="h-[550px] w-full absolute z-10 bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] translate-x-[-20px] mt-[136px] sm:mt-[130px] md:mt-32 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1025px] xl:max-w-[1280px] 2xl:max-w-[1536px] scale-[101%]" />
        <!-- scale is set to 101% to prevent little lines on the edges that sometimes appear -->
        <h1 class="text-5xl font-bold my-10 text-center md:text-left z-50">
            WHAT OUR CLIENTS SAY
        </h1>
        <div class="flex animate-slide whitespace-nowrap gap-[24px] ml-[-350px]">
            <!-- ml is set to -350px to prevent blocks from getting squished -->
            <div v-for="testimonial in topTestimonials" class="w-full inline-block whitespace-normal">
                <div
                    class=" flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="testimonial in topTestimonials" class="w-full inline-block whitespace-normal">
                <div
                    class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="testimonial in topTestimonials" class="w-full inline-block whitespace-normal ">
                <div
                    class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex animate-slide whitespace-nowrap gap-[24px] ml-[-175px]">
            <div v-for="testimonial in bottomTestimonials" class="w-full inline-block whitespace-normal">
                <div
                    class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="testimonial in bottomTestimonials" class="w-full inline-block whitespace-normal">
                <div
                    class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
            <div v-for="testimonial in bottomTestimonials" class="w-full inline-block whitespace-normal">
                <div
                    class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]">
                    <h2 class="text-2xl">
                        {{ testimonial.text }}
                    </h2>
                    <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
                        <h3>{{ testimonial.name }}</h3>
                        <p>{{ testimonial.position }}{{ testimonial.company }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// the number of top and bottom testimonials should be the same, otherwise the animation will not work, in case more is needed, the animation should be adjusted
const topTestimonials = [
    {
        text: 'He was my front-end technical lead and I relied on him greatly',
        name: 'Paul Richardson',
        position: 'Senior Project Manager',
        company: ' of Cognitran Ltd',
    },
    {
        text: 'Their proficiency in React is outstanding, Sławomir is not only skilled but also proactive',
        name: 'Daniel Sobisz',
        position: 'Front-End Developer',
        company: '',
    },
    {
        text: 'He is an excellent communicator and a great team player, a reliable and valuable asset to any team.',
        name: 'Adam Wuss',
        position: 'Senior Frontend Developer',
        company: '',
    },

]

const bottomTestimonials = [
    {
        text: 'Sławek is a professional with an open mind, full of ideas for new projects and solving potential problems.',
        name: 'Anna Wójcik',
        position: 'Healthcare | IT | Public relations | Media',
        company: '',
    },
    {
        text: 'Their mastery of React, Vue, and JavaScript is truly impressive,',
        name: 'Piotr Świerszcz',
        position: 'Senior Frontend Developer',
        company: '',
    },
    {
        text: 'I am very pleased with Sławek\'s work, full professionalism and effective cooperation.',
        name: 'Kamil Hiszpan',
        position: 'CEO',
        company: ' of Hiszpanbet',
    },
]
</script>