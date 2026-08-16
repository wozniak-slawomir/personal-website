<template>
  <div class="container min-h-screen flex flex-col items-center justify-center py-20">
    <div class="w-full max-w-4xl my-8 self-start">
      <BackButton />
    </div>
    
    <div class="max-w-4xl w-full mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
        {{ $t('audyt.title') }}
      </h1>
      <p class="text-xl text-gray-300 text-center mb-12">
        {{ $t('audyt.description') }}
      </p>

      <div class="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        <img 
          src="/projects/kalkulator.png" 
          alt="Kalkulator Subskrypcji Screenshot" 
          class="w-full h-auto object-cover"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('audyt.benefit1.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('audyt.benefit1.description') }}</p>
        </div>
        
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('audyt.benefit2.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('audyt.benefit2.description') }}</p>
        </div>
        
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('audyt.benefit3.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('audyt.benefit3.description') }}</p>
        </div>
      </div>
    </div>

    <div class="text-center">
      <NuxtLink
        :to="localePath('/contact')"
        class="px-8 py-4 rounded-full bg-[image:var(--primary-gradient)] text-black font-bold text-lg transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] duration-300 inline-block"
      >
        {{ $t('cta.button') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

watch(locale, () => {
  useSeoMeta({
    title: t('audyt.seo.title'),
    description: t('audyt.seo.description'),
    ogTitle: t('audyt.seo.title'),
    ogDescription: t('audyt.seo.description'),
    ogImage: 'https://slawomir-wozniak.pl/projects/kalkulator.png',
    ogImageAlt: t('audyt.seo.ogImageAlt'),
    ogSiteName: 'Sławomir Woźniak',
    twitterCard: 'summary_large_image',
    twitterTitle: t('audyt.seo.title'),
    twitterDescription: t('audyt.seo.description'),
    twitterImage: 'https://slawomir-wozniak.pl/projects/kalkulator.png',
  })
}, { immediate: true })
</script>
