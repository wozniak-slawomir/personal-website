<template>
    <div class="backdrop fixed flex justify-center items-center inset-0 bg-[#1A1A1A] bg-opacity-80 z-20">
        <div
            class="bg-[#1A1A1A] w-[90%] md:w-[512px] rounded-2xl p-4 md:p-10 border border-[color:var(--primary-color)]">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-semibold uppercase">Contact me</h1>
                <button @click="$emit('hideContactModal', false)" class="text-3xl font-semibold">&times;</button>
            </div>
            <div>
                <form method="post" @submit="onSubmit" class="w-100">
                    <div class="mb-4 mt-8">
                        <label for="name" class="block text-xl font-semibold mb-2">
                            First name
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" v-model="name" required id="name"
                            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="name" class="block text-xl font-semibold mb-2">
                            Last name
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="surname" v-model="surname" id="surname" required
                            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-xl font-semibold mb-2">
                            Email
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" v-model="email" required id="email"
                            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="phone-number" class="block text-xl font-semibold mb-2">
                            Phone number
                        </label>
                        <input type="tel" name="phone-number" v-model="phoneNumber" id="phone-number"
                            class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-xl font-semibold mb-2">
                            Message
                            <span class="text-red-500">*</span>
                        </label>
                        <textarea name="message" v-model="message" required id="message"
                            class="w-full p-2 rounded-lg bg-[#252525] border-0 min-h-[150px]"></textarea>
                    </div>

                    <button
                        class="uppercase block py-2 px-6 mx-auto my-0 rounded-lg bg-[color:var(--secondary-color)] font-semibold bg-[image:var(--primary-gradient)] text-black transition-transform transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from "vue-toastification";

const emit = defineEmits(['hideContactModal']);
const toast = useToast();
const name = ref('');
const surname = ref('');
const message = ref('');
const email = ref('');
const phoneNumber = ref('');

const onSubmit = (e: Event) => {
    e.preventDefault();
    if (!e.target) return;
    fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            email: email.value,
            phone_number: phoneNumber.value,
            message: message.value
        })
    }).then(res => {
        if (res.ok) {
            toast.success('Message sent successfully');
            emit('hideContactModal', false)
        } else {
            toast.error('Failed to send message');
        }
    });
};
</script>

<style scoped></style>