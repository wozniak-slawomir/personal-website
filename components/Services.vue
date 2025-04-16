<template>
  <div class="container mt-64">
    <h2 class="text-5xl text-center md:text-left font-semibold uppercase">
      {{ $t('services.services') }}
    </h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
      <CardContainer class="w-full lg:w-auto">
        <CardBody
          class="group/card relative size-auto w-full lg:w-auto rounded-3xl border glassmorphism p-6 sm:w-[30rem] dark:hover:shadow-2xl dark:hover:shadow-[var(--primary-color)]"
        >
          <CardItem
            :translate-z="100"
            :translate-y="10"
            class="text-xl font-bold"
          >
            {{ $t('services.development.title') }}
          </CardItem>
          <CardItem
            as="p"
            translate-z="60"
            class="mt-2 max-w-sm text-sm text-[#bbbbbb]"
          >
            {{ $t('services.development.description') }}
          </CardItem>
          <CardItem
            :translate-z="60"
            class="mt-4 w-full text-2xl"
          >
            {{ $t('services.development.price') }}
          </CardItem>
          <CardItem
            :translate-z="100"
            class="mt-4 w-full"
          >
            <img
              src="/services/website.jpg"
              height="1000"
              width="1000"
              class="h-60 w-full rounded-3xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            >
          </CardItem>
          <CardItem
            :translate-z="20"
            as="div"
            class="mt-4 text-sm text-[#bbbbbb]"
          >
            <ul class="pl-7 my-4 list-disc">
              <li>{{ $t('services.development.points1') }}</li>
              <li>{{ $t('services.development.points2') }}</li>
              <li>{{ $t('services.development.points3') }}</li>
            </ul>
          </CardItem>
          <div class="mt-10 flex items-center justify-end">
            <CardItem
              :translate-z="20"
              as="button"
              class="px-20 py-4 rounded-full font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300 max-w-fit"
              @click="onContactClick"
            >
              {{ $t("common.contact") }}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer class="w-full lg:w-auto">
        <CardBody
          class="group/card relative size-auto w-full lg:w-auto rounded-3xl border glassmorphism p-6 sm:w-[30rem] dark:hover:shadow-2xl dark:hover:shadow-[var(--primary-color)]"
        >
          <CardItem
            :translate-z="100"
            :translate-y="10"
            class="text-xl font-bold"
          >
            {{ $t('services.coaching.title') }}
          </CardItem>
          <CardItem
            as="p"
            translate-z="60"
            class="mt-2 max-w-sm text-sm text-[#bbbbbb]"
          >
            {{ $t('services.coaching.description') }}
          </CardItem>
          <CardItem
            :translate-z="60"
            class="mt-4 w-full text-2xl"
          >
            {{ $t('services.coaching.price') }}
          </CardItem>
          <CardItem
            :translate-z="100"
            class="mt-4 w-full"
          >
            <img
              src="/services/coaching.jpg"
              height="1000"
              width="1000"
              class="h-60 w-full rounded-3xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            >
          </CardItem>
          <CardItem
            :translate-z="20"
            as="div"
            class="mt-4 text-sm text-[#bbbbbb]"
          >
            <ul class="pl-7 my-4 list-disc">
              <li>{{ $t('services.coaching.points1') }}</li>
              <li>{{ $t('services.coaching.points2') }}</li>
              <li>{{ $t('services.coaching.points3') }}</li>
            </ul>
          </CardItem>
          <div class="mt-10 flex items-center justify-end">
            <CardItem
              :translate-z="20"
              as="button"
              class="px-20 py-4 rounded-full font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300 max-w-fit"
              @click="onContactClick"
            >
              {{ $t("common.contact") }}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <div class="flex flex-col items-center justify-center">
        <CardContainer class="w-full lg:w-auto">
          <CardBody
            class="group/card relative size-auto w-full lg:w-auto rounded-3xl border glassmorphism p-6 sm:w-[30rem] dark:hover:shadow-2xl dark:hover:shadow-[var(--primary-color)]"
          >
            <CardItem
              :translate-z="100"
              :translate-y="10"
              class="text-xl font-bold"
            >
              {{ $t('services.audits.title') }}
            </CardItem>
            <CardItem
              as="p"
              translate-z="60"
              class="mt-2 max-w-sm text-sm text-[#bbbbbb]"
            >
              {{ $t('services.audits.description') }}
            </CardItem>
            <CardItem
              :translate-z="60"
              class="mt-4 w-full text-2xl"
            >
              {{ $t('services.audits.price') }}
            </CardItem>
            <CardItem
              :translate-z="100"
              class="mt-4 w-full"
            >
              <img
                src="/services/consulting.jpg"
                height="1000"
                width="1000"
                class="h-60 w-full rounded-3xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              >
            </CardItem>
            <CardItem
              :translate-z="20"
              as="div"
              class="mt-4 text-sm text-[#bbbbbb]"
            >
              <ul class="pl-7 my-4 list-disc">
                <li>{{ $t('services.audits.points1') }}</li>
                <li>{{ $t('services.audits.points2') }}</li>
                <li>{{ $t('services.audits.points3') }}</li>
              </ul>
            </CardItem>
          </CardBody>
        </CardContainer>
        <div
          :translate-z="20"
          as="button"
          class="px-20 py-4 rounded-full font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300 max-w-fit mt-10"
          @click="onContactClick"
        >
          {{ $t("common.contact") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardContainer from '@/components/ui/card-3d/CardContainer.vue'
import CardItem from '@/components/ui/card-3d/CardItem.vue'
import CardBody from '@/components/ui/card-3d/CardBody.vue'
const { $event } = useNuxtApp()

const onContactClick = () => {
  $event('ContactModal:Open')
}
</script>