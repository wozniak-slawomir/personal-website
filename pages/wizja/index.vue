<template>
    <div class="pt-[var(--navbar-height)] pb-20">
        <div class="container mt-10 lg:mt-20">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
                {{ $t('navbar.vision') }}
            </h1>

            <div class="max-w-4xl mx-auto space-y-20">
                <!-- Vision Section -->
                <section class="glassmorphism rounded-2xl p-8 md:p-12 shadow-xl">
                    <div class="flex flex-col items-center text-center gap-6">
                        <div class="p-4 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                            <PhEye :size="48" weight="duotone" />
                        </div>
                        <h2 class="text-3xl font-bold">{{ $t('vision.title') }}</h2>
                        <p class="text-xl leading-relaxed text-[var(--secondary-text-color)]">
                            {{ $t('vision.description') }}
                        </p>
                    </div>
                </section>

                <!-- Mission Section -->
                <section class="glassmorphism rounded-2xl p-8 md:p-12 shadow-xl">
                    <div class="flex flex-col items-center text-center gap-6">
                        <div class="p-4 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                            <PhTarget :size="48" weight="duotone" />
                        </div>
                        <h2 class="text-3xl font-bold">{{ $t('mission.title') }}</h2>
                        <p class="text-xl leading-relaxed text-[var(--secondary-text-color)]">
                            {{ $t('mission.description') }}
                        </p>
                    </div>
                </section>

                <!-- Values Section -->
                <section>
                    <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">{{ $t('values.title') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Agency -->
                        <div
                            class="glassmorphism rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors h-full">
                            <div class="flex flex-col items-center text-center gap-4 h-full">
                                <PhLightning :size="32" weight="fill" class="text-[var(--primary-color)]" />
                                <h3 class="font-bold text-xl">{{ $t('values.agency.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)]">
                                    {{ $t('values.agency.description') }}
                                </p>
                            </div>
                        </div>

                        <!-- Partnership -->
                        <div
                            class="glassmorphism rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors h-full">
                            <div class="flex flex-col items-center text-center gap-4 h-full">
                                <PhHandshake :size="32" weight="fill" class="text-[var(--primary-color)]" />
                                <h3 class="font-bold text-xl">{{ $t('values.partnership.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)]">
                                    {{ $t('values.partnership.description') }}
                                </p>
                            </div>
                        </div>

                        <!-- Growth -->
                        <div
                            class="glassmorphism rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors h-full">
                            <div class="flex flex-col items-center text-center gap-4 h-full">
                                <PhTrendUp :size="32" weight="fill" class="text-[var(--primary-color)]" />
                                <h3 class="font-bold text-xl">{{ $t('values.growth.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)]">
                                    {{ $t('values.growth.description') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PhEye, PhTarget, PhLightning, PhHandshake, PhTrendUp } from '@phosphor-icons/vue'

const { t, locale } = useI18n()

watch(locale, () => {
    useSeoMeta({
        title: t('seo.vision.title'),
        description: t('seo.vision.description'),
        ogTitle: t('seo.vision.title'),
        ogDescription: t('seo.vision.description'),
        ogSiteName: t('seo.ogSiteName'),
        ogUrl: 'https://slawomir-wozniak.pl/wizja',
        twitterCard: 'summary_large_image',
    })
}, { immediate: true })
</script>
