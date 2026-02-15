<template>
  <section class="py-20" id="services">
    <div class="container">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('offer.title') }}</h2>
        <p class="text-lg text-[var(--secondary-text-color)]">{{ $t('offer.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServiceCard
          image="/services/website.jpg"
          :image-alt="$t('offer.website.title')"
          :title="$t('offer.website.title')"
          :description="$t('offer.website.offerSubtitle')"
          link="/oferta/strona-internetowa"
          :button-text="$t('offer.viewDetails')"
        />

        <ServiceCard
          image="/services/nextcloud.webp"
          :image-alt="$t('offer.privateCloud.title')"
          :title="$t('offer.privateCloud.title')"
          :description="$t('offer.privateCloud.subtitle')"
          link="/oferta/prywatna-chmura-nextcloud"
          :button-text="$t('offer.viewDetails')"
        />

        <ServiceCard
          image="/services/woocommerce.png"
          :image-alt="$t('pricing.packages.commerce.title')"
          :title="$t('pricing.packages.commerce.title')"
          :description="$t('pricing.packages.commerce.subtitle')"
          link="/oferta/suwerenny-handel"
          :button-text="$t('offer.viewDetails')"
        />

        <ServiceCard
          image="/services/consulting.jpg"
          :image-alt="$t('pricing.packages.partnership.title')"
          :title="$t('pricing.packages.partnership.title')"
          :description="$t('offer.fractionalCto.subtitle')"
          link="/oferta/fractional-cto"
          :button-text="$t('offer.viewDetails')"
        />
      </div>

      <div class="text-center mt-10">
        <NuxtLink to="/oferta" class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-colors font-semibold">
          {{ $t('offer.title') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>