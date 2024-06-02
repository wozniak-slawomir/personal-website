<template>
    <div class="container mt-64">
        <h1 class="text-5xl text-center md:text-left font-semibold">SERVICES</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
            <div class="bg-[#393939] py-4 rounded-xl px-8">
                <h2 class="text-l my-5">SOFTWARE DEVELOPMENT</h2>
                <hr class="border-[#666666]" />
                <div class="my-5 text-[#bbbbbb]">
                    <p>With my experienced team we create the most challenging and effective solutions.</p>
                    <ul class="pl-7 my-4 list-disc">
                        <li>Customized software projects</li>
                        <li>Software team outsourcing</li>
                    </ul>
                </div>
                <button @click="expandDevelopmentFeatures = !expandDevelopmentFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandDevelopmentFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandDevelopmentFeatures" :size="20" class="inline align-middle ml-2" />
                </button>
            </div>
            <div class="bg-[#393939] py-4 rounded-xl px-8">
                <h2 class="text-l my-5">SOFTWARE COACHING</h2>
                <hr class="border-[#666666]" />
                <div class="my-5 text-[#bbbbbb]">
                    <p>Are you learning how to code? We will:</p>
                    <ul class="pl-7 my-4 list-disc">
                        <li>Plan your learning journey</li>
                        <li>Work on real-life scenarios</li>
                        <li>Analyze trends and new technologies</li>
                    </ul>
                </div>
                <button @click="expandCoachingFeatures = !expandCoachingFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandCoachingFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandCoachingFeatures" :size="20" class="inline align-middle ml-2" />
                </button>
            </div>
            <div class="bg-[#393939] py-4 rounded-xl px-8">
                <h2 class="text-l my-5">SOFTWARE AUDITS</h2>
                <hr class="border-[#666666]" />
                <div class="my-5 text-[#bbbbbb]">
                    <p>Have any doubts about current solutions?</p>
                    <ul class="pl-7 my-4 list-disc">
                        <li>Comprehensive software audit pointing weak points and possible solutions</li>
                        <li>Refactoring and reducing technology debt</li>
                    </ul>
                </div>
                <button @click="expandAuditsFeatures = !expandAuditsFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandAuditsFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandAuditsFeatures" :size="20" class="inline align-middle ml-2" />
                </button>
            </div>
        </div>
        <div class="text-center my-20">
            <h1 class="text-4xl mb-6">Interested in working together?</h1>
            <button @click="$emit('showContactModal')"
                class="px-8 py-5 rounded-full bg-[color:var(--secondary-color)] md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-transform transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50">
                Contact me
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";
const expandDevelopmentFeatures = ref(false);
const expandCoachingFeatures = ref(false);
const expandAuditsFeatures = ref(false);
</script>