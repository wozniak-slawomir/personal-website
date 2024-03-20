<template>
    <div class="backdrop fixed flex justify-center items-center inset-0 bg-[#1A1A1A] bg-opacity-80 z-10">
        <div
            class="bg-[#1A1A1A] w-[90%] md:w-[512px] rounded-2xl p-4 md:p-10 border border-[color:var(--primary-color)]">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-semibold uppercase">Contact me</h1>
                <button @click="$emit('hideContactModal', false)" class="text-3xl font-semibold">&times;</button>
            </div>
            <div>
                <form action="mail_handler.php" class="w-100">
                    <div class="mb-4 mt-8">
                        <label for="name" class="block text-xl font-semibold mb-2">
                            First name
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="name" class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="name" class="block text-xl font-semibold mb-2">
                            Last name
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="name" class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-xl font-semibold mb-2">
                            Email
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="email" id="email" class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="phone-number" class="block text-xl font-semibold mb-2">
                            Phone number
                        </label>
                        <input type="tel" id="phone-number" class="w-full p-2 rounded-lg h-14 bg-[#252525] border-0" />
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-xl font-semibold mb-2">
                            Message
                            <span class="text-red-500">*</span>
                        </label>
                        <textarea id="message"
                            class="w-full p-2 rounded-lg bg-[#252525] border-0 min-h-[150px]"></textarea>
                    </div>

                    <button
                        class="uppercase block py-2 px-6 mx-auto my-0 rounded-lg bg-[color:var(--secondary-color)] font-semibold bg-[image:var(--primary-gradient)] text-black transition-transform transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>