<template>
    <div class="pt-[var(--navbar-height)] pb-20">
        <div class="container mt-10 lg:mt-20">
            <BackButton class="mb-6" />
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 mt-8">
                {{ $t('navbar.vision') }}
            </h1>

            <div class="max-w-6xl mx-auto space-y-20">
                <!-- Vision & Mission Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                     <!-- Vision Section -->
                    <section class="glassmorphism rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group">
                         <div class="absolute top-0 right-0 p-32 bg-[var(--primary-color)]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[var(--primary-color)]/10"></div>
                        <div class="flex flex-col items-start gap-6 relative z-10">
                            <div class="p-4 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent text-[var(--primary-color)]">
                                <PhEye :size="40" weight="duotone" />
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold mb-4">{{ $t('vision.title') }}</h2>
                                <p class="text-lg leading-relaxed text-[var(--secondary-text-color)]">
                                    {{ $t('vision.description') }}
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- Mission Section -->
                    <section class="glassmorphism rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group">
                         <div class="absolute top-0 right-0 p-32 bg-[var(--primary-color)]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[var(--primary-color)]/10"></div>
                        <div class="flex flex-col items-start gap-6 relative z-10">
                            <div class="p-4 rounded-xl bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent text-[var(--primary-color)]">
                                <PhTarget :size="40" weight="duotone" />
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold mb-4">{{ $t('mission.title') }}</h2>
                                <p class="text-lg leading-relaxed text-[var(--secondary-text-color)]">
                                    {{ $t('mission.description') }}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Values Section -->
                <section>
                    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ $t('values.title') }}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <!-- Agency -->
                        <div
                            class="glassmorphism rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-[var(--primary-color)]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                            <div class="flex flex-col items-center text-center gap-5 h-full">
                                <div class="p-3 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">
                                     <PhLightning :size="32" weight="fill" />
                                </div>
                                <h3 class="font-bold text-xl">{{ $t('values.agency.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)] text-sm md:text-base leading-relaxed">
                                    {{ $t('values.agency.description') }}
                                </p>
                            </div>
                        </div>

                        <!-- Partnership -->
                        <div
                            class="glassmorphism rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-[var(--primary-color)]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                            <div class="flex flex-col items-center text-center gap-5 h-full">
                                <div class="p-3 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">
                                    <PhHandshake :size="32" weight="fill" />
                                </div>
                                <h3 class="font-bold text-xl">{{ $t('values.partnership.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)] text-sm md:text-base leading-relaxed">
                                    {{ $t('values.partnership.description') }}
                                </p>
                            </div>
                        </div>

                        <!-- Growth -->
                        <div
                            class="glassmorphism rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-[var(--primary-color)]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                            <div class="flex flex-col items-center text-center gap-5 h-full">
                                <div class="p-3 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">
                                    <PhTrendUp :size="32" weight="fill" />
                                </div>
                                <h3 class="font-bold text-xl">{{ $t('values.growth.title') }}</h3>
                                <p class="text-[var(--secondary-text-color)] text-sm md:text-base leading-relaxed">
                                    {{ $t('values.growth.description') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <CTASection />
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
