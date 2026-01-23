<template>
  <div class="flex flex-col min-h-screen">
    <div class="container flex-grow flex flex-col items-center justify-center py-20 px-4 mt-24">

      <!-- Back Button -->
      <div class="w-full max-w-[1200px] mb-8">
        <BackButton />
      </div>

      <!-- Section 1: Header, Subheader, and Benefits -->
      <div class="w-full max-w-[800px] mb-16 text-center">
        
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          {{ $t('contact.hero.title') }}
        </h1>
        <p class="text-xl text-gray-300 mb-12 leading-relaxed">
          {{ $t('contact.hero.subtitle') }}
        </p>

        <div class="space-y-8">
          <h2 class="text-2xl font-semibold text-[color:var(--primary-color)] mb-6">
            {{ $t('contact.benefits.title') }}
          </h2>

          <div class="flex items-start gap-4 text-left">
            <div class="mt-1 p-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-white">
              <PhChatCircleText :size="32" weight="duotone" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1 text-white">{{ $t('contact.benefits.item1.title') }}</h3>
              <p class="text-gray-400">{{ $t('contact.benefits.item1.desc') }}</p>
            </div>
          </div>

          <div class="flex items-start gap-4 text-left">
            <div class="mt-1 p-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-white">
              <PhStethoscope :size="32" weight="duotone" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1 text-white">{{ $t('contact.benefits.item2.title') }}</h3>
              <p class="text-gray-400">{{ $t('contact.benefits.item2.desc') }}</p>
            </div>
          </div>

          <div class="flex items-start gap-4 text-left">
            <div class="mt-1 p-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-white">
              <PhHandshake :size="32" weight="duotone" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1 text-white">{{ $t('contact.benefits.item3.title') }}</h3>
              <p class="text-gray-400">{{ $t('contact.benefits.item3.desc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2 & 3: iPhone and Contact Form (side by side) -->
      <div class="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
        <!-- Left: iPhone with Embedded Meeting -->
        <div class="w-full lg:w-5/12 flex justify-center">
          <div class="transform scale-90 md:scale-100 origin-center">
            <div class="device device-iphone-14-pro">
              <div class="device-frame">
                <div
                  ref="bookingCalendarRef"
                  class="device-screen overflow-y-auto bg-white flex items-center justify-center"
                />
              </div>
              <div class="device-stripe" />
              <div class="device-header" />
              <div class="device-sensors" />
              <div class="device-btns" />
              <div class="device-power" />
              <div class="device-home" />
            </div>
          </div>
        </div>

        <!-- Middle: Separator -->
        <div class="flex items-center justify-center py-4 lg:py-0">
           <span class="text-4xl md:text-5xl font-black text-gray-500 select-none tracking-widest opacity-50">LUB</span>
        </div>

        <!-- Right: Contact Form -->
        <div class="w-full lg:w-5/12">

          <div
            class="bg-[#1A1A1A] w-full rounded-2xl p-6 md:p-8 lg:p-10 border border-[color:var(--primary-color)] shadow-xl"
          >
            <div class="mb-8 text-center text-white">
               <h2 class="text-2xl font-bold mb-2">{{ $t('common.contact') }}</h2>
               <p class="text-sm text-gray-400">{{ $t('seo.contact.description') }}</p>
            </div>
            
            <form
              method="post"
              class="w-full"
              @submit="onSubmit"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="name" class="block text-sm font-semibold mb-2 text-gray-300">
                    {{ $t('modal.first.name') }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    name="name"
                    required
                    class="w-full p-3 rounded-lg bg-[#252525] border border-transparent focus:border-[color:var(--primary-color)] focus:outline-none transition-colors text-white"
                  >
                </div>
                <div>
                  <label for="surname" class="block text-sm font-semibold mb-2 text-gray-300">
                    {{ $t('modal.last.name') }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="surname"
                    v-model="surname"
                    type="text"
                    name="surname"
                    required
                    class="w-full p-3 rounded-lg bg-[#252525] border border-transparent focus:border-[color:var(--primary-color)] focus:outline-none transition-colors text-white"
                  >
                </div>
              </div>

              <div class="mb-4">
                <label for="email" class="block text-sm font-semibold mb-2 text-gray-300">
                  {{ $t('modal.email') }} <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  name="email"
                  required
                  class="w-full p-3 rounded-lg bg-[#252525] border border-transparent focus:border-[color:var(--primary-color)] focus:outline-none transition-colors text-white"
                >
              </div>

              <div class="mb-4">
                <label for="phone-number" class="block text-sm font-semibold mb-2 text-gray-300">
                  {{ $t('modal.phone') }}
                </label>
                <input
                  id="phone-number"
                  v-model="phoneNumber"
                  type="tel"
                  name="phone-number"
                  class="w-full p-3 rounded-lg bg-[#252525] border border-transparent focus:border-[color:var(--primary-color)] focus:outline-none transition-colors text-white"
                >
              </div>

              <div class="mb-6">
                <label for="message" class="block text-sm font-semibold mb-2 text-gray-300">
                  {{ $t('modal.message') }} <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="message"
                  name="message"
                  required
                  class="w-full p-3 rounded-lg bg-[#252525] border border-transparent focus:border-[color:var(--primary-color)] focus:outline-none transition-colors min-h-[150px] resize-none text-white"
                />
              </div>

              <button
                :disabled="isLoading"
                class="w-full flex items-center justify-center gap-2 uppercase py-4 px-6 rounded-lg bg-[color:var(--secondary-color)] font-bold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-lg hover:shadow-xl hover:bg-[image:var(--secondary-gradient)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <PhCircleNotch v-if="isLoading" class="animate-spin" size="24" weight="bold" />
                {{ $t('modal.submit') }}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhCircleNotch, PhChatCircleText, PhStethoscope, PhHandshake } from '@phosphor-icons/vue'
import { useToast } from 'vue-toastification'
const config = useRuntimeConfig()
const { t } = useI18n()

useHead({
    title: t('seo.contact.title'),
    meta: [
        {
            name: 'description',
            content: t('seo.contact.description'),
        },
        {
            property: 'og:title',
            content: t('seo.contact.title'),
        },
        {
            property: 'og:description',
            content: t('seo.contact.description'),
        },
        {
            name: 'twitter:title',
            content: t('seo.contact.title'),
        },
        {
            name: 'twitter:description',
            content: t('seo.contact.description'),
        },
    ],
})

const toast = useToast()
const route = useRoute()
const name = ref('')
const surname = ref('')
const message = ref('')
const email = ref('')
const phoneNumber = ref('')
const isLoading = ref(false)

const bookingCalendarRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const packageKey = route.query.package as string
  if (packageKey) {
    const packageTitle = t(`pricing.packages.${packageKey}.title`)
    message.value = t('pricing.interested_message', { package: packageTitle })
  }

  if (bookingCalendarRef.value) {
    const script = document.createElement('script')
    script.src = 'https://meet.reclaimai.com/scripts/embed-scheduling-link.0.x.x.js'
    script.setAttribute('data-id', 'af0b28d9-17b9-445d-8dc4-acacbde81c32')
    script.setAttribute('data-redirect', 'NONE')
    bookingCalendarRef.value.appendChild(script)
  }
})

const { csrf } = useCsrf()

const onSubmit = async (e: Event) => {
    e.preventDefault()
    if (!e.target) return
    isLoading.value = true
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            headers: {
                'csrf-token': csrf
            },
            body: {
                name: name.value,
                surname: surname.value,
                email: email.value,
                phone_number: phoneNumber.value,
                message: message.value,
            },
        })
        
        toast.success(t('contact.form.success'))
        // Reset form
        name.value = ''
        surname.value = ''
        email.value = ''
        phoneNumber.value = ''
        message.value = ''
    } catch (error: any) {
        if (error.statusCode === 429) {
            toast.error(t('contact.form.rateLimitError'))
        } else {
            toast.error(t('contact.form.error'))
        }
    } finally {
        isLoading.value = false
    }
}
</script>
