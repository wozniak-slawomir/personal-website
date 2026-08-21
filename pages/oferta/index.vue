<template>
  <div class="pt-[var(--navbar-height)] pb-20">
    <div class="container mt-10 lg:mt-20">
      <BackButton class="mb-6" />

      <div class="max-w-6xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ t('offer.title') }}
        </h1>
        <p class="text-lg text-[var(--secondary-text-color)]">
          {{ t('offer.subtitle') }}
        </p>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard
          image="/services/website.jpg"
          :image-alt="t('offer.website.title')"
          :title="t('offer.website.title')"
          :description="t('offer.website.offerSubtitle')"
          link="/oferta/strona-internetowa"
          :button-text="t('offer.viewDetails')"
        />

        <ServiceCard
          image="/services/nextcloud.webp"
          :image-alt="t('offer.privateCloud.title')"
          :title="t('offer.privateCloud.title')"
          :description="t('offer.privateCloud.subtitle')"
          link="/oferta/prywatna-chmura-nextcloud"
          :button-text="t('offer.viewDetails')"
        />

        <ServiceCard
          image="/services/woocommerce.png"
          :image-alt="t('pricing.packages.commerce.title')"
          :title="t('pricing.packages.commerce.title')"
          :description="t('pricing.packages.commerce.subtitle')"
          link="/oferta/suwerenny-handel"
          :button-text="t('offer.viewDetails')"
        />

        <ServiceCard
          image="/projects/schnellrezeptlandscape.png"
          :image-alt="t('offer.telemedicine.title')"
          :title="t('offer.telemedicine.title')"
          :description="t('offer.telemedicine.subtitle')"
          link="/oferta/platforma-telemedyczna"
          :button-text="t('offer.viewDetails')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.offer.title'),
    description: t('seo.offer.description'),
    ogTitle: t('seo.offer.title'),
    ogDescription: t('seo.offer.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogUrl: 'https://slawomir-wozniak.pl/oferta',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>