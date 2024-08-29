<template>
  <div
    v-if="renderContactModal"
    class="backdrop fixed flex justify-center items-start p-4 inset-0 bg-[#1A1A1A] bg-opacity-80 z-30"
    :class="{ 'overflow-y-auto': !isLoading }"
  >
    <PhCircleNotch
      v-if="isCircleRendered"
      class="text-[color:var(--primary-color)] animate-spin text-6xl absolute self-center"
    />
    <div
      class="bg-[#1A1A1A] w-[90%] md:w-[512px] mt-4 rounded-2xl p-4 md:p-10 border border-[color:var(--primary-color)] duration-700 z-20"
      :class="translateClass"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold uppercase">
          {{ $t('common.contact') }}
        </h1>
        <button
          class="text-3xl font-semibold"
          @click="hideContactModal"
        >
          &times;
        </button>
      </div>
      <div>
        <form
          method="post"
          class="w-100"
          @submit="onSubmit"
        >
          <div class="mb-4 mt-8">
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
              for="name"
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
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PhCircleNotch } from '@phosphor-icons/vue'
import { useToast } from 'vue-toastification'
const { $listen } = useNuxtApp()
const config = useRuntimeConfig()

const toast = useToast()
const name = ref('')
const surname = ref('')
const message = ref('')
const email = ref('')
const phoneNumber = ref('')
const isLoading = ref(false)
const isMounted = ref(false)
const isCircleRendered = ref(false)

const translateClass = computed(() => ({
    'translate-y-[130%]': isLoading.value,
    'translate-y-[-130%]': !isLoading.value && !isMounted.value,
    'translate-y-0': !isLoading.value && isMounted.value,
}))

const renderContactModal = ref(false)

const hideContactModal = () => {
    renderContactModal.value = false
    document.body.style.overflowY = 'auto'
}

const showContactModal = () => {
    renderContactModal.value = true
    document.body.style.overflowY = 'hidden'
}

watch(renderContactModal, () => {
  if (renderContactModal.value) {
    setTimeout(() => {
        isMounted.value = true
    }, 100)
    setTimeout(() => {
        isCircleRendered.value = true
    }, 1000)
  } else {
    isMounted.value = false
    isCircleRendered.value = false
  }
})

$listen('ContactModal:Open', () => {
  showContactModal()
})

const onSubmit = (e: Event) => {
    e.preventDefault()
    if (!e.target) return
    isLoading.value = true
    fetch(`${config.public.API_URL}/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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
            hideContactModal()
        }
    }).catch(() => {
        toast.error('Failed to send message')
    }).finally(() => {
        isLoading.value = false
    })
}
</script>
