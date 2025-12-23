<template>
  <div class="container min-h-screen flex flex-col items-center justify-center py-20">
    <div class="w-full max-w-4xl mb-8 self-start">
      <BackButton />
    </div>
    
    <div class="max-w-4xl w-full mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
        {{ $t('newsletter.title') }}
      </h1>
      <p class="text-xl text-gray-300 text-center mb-12">
        {{ $t('cta.subtitle') }}
      </p>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('cta.benefit1.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('cta.benefit1.description') }}</p>
        </div>
        
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('cta.benefit2.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('cta.benefit2.description') }}</p>
        </div>
        
        <div class="glassmorphism p-6 rounded-2xl text-center hover:bg-[#2a2a2a] transition-all duration-300">
          <h3 class="font-semibold mb-2 text-lg">{{ $t('cta.benefit3.title') }}</h3>
          <p class="text-sm text-gray-400">{{ $t('cta.benefit3.description') }}</p>
        </div>
      </div>

    </div>

    <div class="glassmorphism p-8 md:p-12 rounded-3xl max-w-md w-full">
      <form 
        method="post" 
        action="https://listmonk.slawomir-wozniak.pl/subscription/form" 
        class="listmonk-form"
      >
        <div class="mb-6 p-4 rounded-lg bg-yellow-500/10 border-2 border-yellow-500/30">
          <p class="text-yellow-200 text-sm text-center">
            {{ $t('newsletter.spam.disclaimer') }}
          </p>
        </div>

        <input type="hidden" name="nonce" />

        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold mb-2">
            {{ $t('newsletter.email.label') }}
            <span class="text-red-500">*</span>
          </label>
          <input 
            id="email"
            type="email" 
            name="email" 
            required 
            :placeholder="$t('newsletter.email.placeholder')" 
            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold mb-2">
            {{ $t('newsletter.name.label') }}
          </label>
          <input 
            id="name"
            type="text" 
            name="name" 
            :placeholder="$t('newsletter.name.placeholder')" 
            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
        </div>

        <input 
          id="9c921" 
          type="hidden" 
          name="l" 
          value="9c92165a-5916-4c0a-8daa-881f11c74cb7"
        />

        <button 
          type="submit"
          class="w-full px-8 py-4 rounded-full bg-[image:var(--primary-gradient)] text-black font-bold text-lg transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] duration-300"
        >
          {{ $t('cta.button') }}
        </button>
        
        <p class="text-sm text-gray-300 mt-4 text-center">
          {{ $t('cta.newsletter.info') }}
        </p>
        
        <p class="text-xs text-gray-500 mt-2 text-center">
          {{ $t('cta.noSpam') }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.newsletter.title'),
    description: t('seo.newsletter.description'),
    ogTitle: t('seo.newsletter.title'),
    ogDescription: t('seo.newsletter.description'),
    ogSiteName: t('seo.ogSiteName'),
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
