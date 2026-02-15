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

    <div class="glassmorphism p-8 md:p-12 rounded-3xl max-w-md w-full">
        <form 
          @submit.prevent="subscribe"
          class="listmonk-form"
        >
          <h3 class="text-2xl font-bold mb-6 text-center text-white">
            {{ $t('audyt.form.leadin') }}
          </h3>

          <div class="mb-6 p-4 rounded-lg bg-yellow-500/10 border-2 border-yellow-500/30">
             <p class="text-yellow-200 text-sm text-center">
              {{ $t('audyt.form.spam_warn') }}
            </p>
          </div>

          <div v-if="success" class="mb-6 p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30">
            <p class="text-green-200 text-sm text-center font-bold">
              {{ $t('audyt.form.success') }}
            </p>
          </div>

          <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-500/10 border-2 border-red-500/30">
            <p class="text-red-200 text-sm text-center">
              {{ error }}
            </p>
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold mb-2">
              {{ $t('audyt.form.email.label') }}
              <span class="text-red-500">*</span>
            </label>
            <input 
              id="email"
              v-model="email"
              type="email" 
              name="email" 
              required 
              :placeholder="$t('audyt.form.email.placeholder')"
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              :disabled="loading"
            />
          </div>

          <div class="mb-4">
            <label for="name" class="block text-sm font-semibold mb-2">
              {{ $t('audyt.form.name.label') }}
            </label>
            <input 
              id="name"
              v-model="name"
              type="text" 
              name="name" 
              :placeholder="$t('audyt.form.name.placeholder')"
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              :disabled="loading"
            />
          </div>

          <button 
            type="submit"
            :disabled="loading"
            class="w-full px-8 py-4 rounded-full bg-[image:var(--primary-gradient)] text-black font-bold text-lg transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">...</span>
            <span v-else>{{ $t('audyt.button') }}</span>
          </button>
          
          <p class="text-xs text-gray-500 mt-4 text-center">
            {{ $t('audyt.form.privacy') }}
          </p>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const email = ref('')
const name = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

const subscribe = async () => {
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    const { csrf } = useCsrf()
    await $fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'csrf-token': csrf
      },
      body: { 
        email: email.value, 
        name: name.value 
      }
    })
    
    success.value = true
    email.value = ''
    name.value = ''
  } catch (e: any) {
    console.error(e)
    error.value = t('audyt.form.error')
  } finally {
    loading.value = false
  }
}

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
