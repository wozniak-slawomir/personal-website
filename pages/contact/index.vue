<template>
  <div class="container min-h-screen my-16 flex flex-col items-center justify-center py-20">
    <div class="w-full max-w-[500px] mb-8 self-start">
      <BackButton />
    </div>
    <h1 class="text-5xl font-bold mb-16 text-center text-white">
      {{ $t('common.contact') }}
    </h1>
    <PhCircleNotch
      v-if="isLoading"
      class="text-[color:var(--primary-color)] animate-spin text-6xl mx-auto my-8"
    />
    <div
      class="bg-[#1A1A1A] w-full max-w-[500px] mx-auto rounded-2xl p-4 md:p-10 border border-[color:var(--primary-color)]"
    >
      <div>
        <form
          method="post"
          class="w-100"
          @submit="onSubmit"
        >
          <div class="mb-4">
            <label
              for="name"
              class="block text-xl font-semibold mb-2"
            >
              {{ $t('modal.first.name') }}
              <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              required
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0"
            >
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block text-xl font-semibold mb-2"
            >
              {{ $t('modal.last.name') }}
              <span class="text-red-500">*</span>
            </label>
            <input
              id="surname"
              v-model="surname"
              type="text"
              name="surname"
              required
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0"
            >
          </div>
          <div class="mb-4">
            <label
              for="email"
              class="block text-xl font-semibold mb-2"
            >
              {{ $t('modal.email') }}
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              required
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0"
            >
          </div>
          <div class="mb-4">
            <label
              for="phone-number"
              class="block text-xl font-semibold mb-2"
            >
              {{ $t('modal.phone') }}
            </label>
            <input
              id="phone-number"
              v-model="phoneNumber"
              type="tel"
              name="phone-number"
              class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0"
            >
          </div>
          <div class="mb-4">
            <label
              for="message"
              class="block text-xl font-semibold mb-2"
            >
              {{ $t('modal.message') }}
              <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              v-model="message"
              name="message"
              required
              class="w-full p-2 rounded-lg bg-[#252525] border-0 min-h-[150px] resize-none"
            />
          </div>
          <button
            :disabled="isLoading"
            class="uppercase block py-2 px-6 mx-auto my-0 rounded-lg bg-[color:var(--secondary-color)] font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300"
          >
            {{ $t('modal.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhCircleNotch } from '@phosphor-icons/vue'
import { useToast } from 'vue-toastification'
const config = useRuntimeConfig()

const toast = useToast()
const name = ref('')
const surname = ref('')
const message = ref('')
const email = ref('')
const phoneNumber = ref('')
const isLoading = ref(false)

const onSubmit = (e: Event) => {
    e.preventDefault()
    if (!e.target) return
    isLoading.value = true
    fetch(`${config.public.API_URL}/contact`, {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            email: email.value,
            phone_number: phoneNumber.value,
            message: message.value,
        }),
    }).then(res => {
        if (res.ok) {
            toast.success('Message sent successfully')
            // Reset form
            name.value = ''
            surname.value = ''
            email.value = ''
            phoneNumber.value = ''
            message.value = ''
        }
    }).catch(() => {
        toast.error('Failed to send message')
    }).finally(() => {
        isLoading.value = false
    })
}
</script>
