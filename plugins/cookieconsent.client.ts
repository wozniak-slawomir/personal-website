import 'vanilla-cookieconsent/dist/cookieconsent.css'
import '~/assets/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import type { CookieConsentConfig } from 'vanilla-cookieconsent'
import { TRACKING_CONSENT_EVENT } from '@/utils/tracking'

function publishConsent() {
  window.dispatchEvent(new Event(TRACKING_CONSENT_EVENT))
}

const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
    },
    preferencesModal: {
      layout: 'box',
    },
  },

  onFirstConsent: () => {
    console.log('Cookie consent: First consent given')
  },

  onConsent: () => {
    console.log('Cookie consent: Consent updated')
    publishConsent()
  },

  onChange: () => {
    console.log('Cookie consent: Preferences changed')
    publishConsent()
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
    ads: {
      autoClear: {
        cookies: [
          { name: /^__oppref$/ },
          { name: /^__obref$/ },
        ],
      },
    },
  },

  language: {
    default: (() => {
      const storedLanguage = localStorage.getItem('language')
      if (storedLanguage) return storedLanguage
      return 'pl'
    })(),
    translations: {
      en: {
        consentModal: {
          title: 'I value your privacy',
          description:
            'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          sections: [
            {
              title: 'Cookie usage',
              description:
                'I use cookies to enhance your browsing experience, serve personalized content, and analyze my traffic. By clicking "Accept all", you consent to my use of cookies.',
            },
            {
              title: 'Strictly necessary cookies',
              description:
                'These cookies are essential for the website to function properly. They cannot be disabled.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Performance and analytics cookies',
              description:
                'These cookies help me understand how visitors interact with my website by collecting and reporting information anonymously.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Domain',
                  desc: 'Description',
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Used to distinguish users for Google Analytics',
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Used to distinguish users for Google Analytics',
                  },
                ],
              },
            },
            {
              title: 'Advertisement and targeting cookies',
              description:
                'These cookies may be set through my site by advertising partners, including ChatGPT Ads, to measure ad conversions.',
              linkedCategory: 'ads',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Domain',
                  desc: 'Description',
                },
                body: [
                  {
                    name: '__oppref',
                    domain: location.hostname,
                    desc: 'Stores the ChatGPT Ads click reference for 30 days',
                  },
                  {
                    name: '__obref',
                    domain: location.hostname,
                    desc: 'Stores a ChatGPT Ads browser reference for 365 days',
                  },
                ],
              },
            },
            {
              title: 'More information',
              description:
                'For any questions regarding my cookie policy, please <a class="cc__link" href="/contact">contact me</a>.',
            },
          ],
        },
      },
      pl: {
        consentModal: {
          title: 'Szanuję Twoją prywatność',
          description:
            'Ta strona używa niezbędnych plików cookie do zapewnienia prawidłowego działania oraz plików cookie śledzących, aby zrozumieć, jak z nią wchodzisz w interakcję. Te ostatnie będą ustawione tylko po wyrażeniu zgody.',
          acceptAllBtn: 'Zaakceptuj wszystkie',
          acceptNecessaryBtn: 'Odrzuć wszystkie',
          showPreferencesBtn: 'Zarządzaj preferencjami',
        },
        preferencesModal: {
          title: 'Preferencje plików cookie',
          acceptAllBtn: 'Zaakceptuj wszystkie',
          acceptNecessaryBtn: 'Odrzuć wszystkie',
          savePreferencesBtn: 'Zapisz preferencje',
          sections: [
            {
              title: 'Użycie plików cookie',
              description:
                'Używam plików cookie, aby ulepszyć Twoje doświadczenie przeglądania, dostarczać spersonalizowane treści i analizować mój ruch. Klikając "Zaakceptuj wszystkie", wyrażasz zgodę na użycie plików cookie.',
            },
            {
              title: 'Niezbędne pliki cookie',
              description:
                'Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony internetowej. Nie można ich wyłączyć.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Pliki cookie wydajności i analityki',
              description:
                'Te pliki cookie pomagają mi zrozumieć, jak odwiedzający wchodzą w interakcję z moją stroną internetową, zbierając i raportując informacje anonimowo.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Plik cookie',
                  domain: 'Domena',
                  desc: 'Opis',
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Używany do rozróżniania użytkowników w Google Analytics',
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Używany do rozróżniania użytkowników w Google Analytics',
                  },
                ],
              },
            },
            {
              title: 'Pliki cookie reklamowe i targetujące',
              description:
                'Te pliki cookie mogą być ustawiane przez partnerów reklamowych, w tym ChatGPT Ads, aby mierzyć konwersje z reklam.',
              linkedCategory: 'ads',
              cookieTable: {
                headers: {
                  name: 'Plik cookie',
                  domain: 'Domena',
                  desc: 'Opis',
                },
                body: [
                  {
                    name: '__oppref',
                    domain: location.hostname,
                    desc: 'Przechowuje identyfikator kliknięcia ChatGPT Ads przez 30 dni',
                  },
                  {
                    name: '__obref',
                    domain: location.hostname,
                    desc: 'Przechowuje identyfikator przeglądarki ChatGPT Ads przez 365 dni',
                  },
                ],
              },
            },
            {
              title: 'Więcej informacji',
              description:
                'W przypadku pytań dotyczących polityki plików cookie, proszę o <a class="cc__link" href="/contact">kontakt</a>.',
            },
          ],
        },
      },
    },
  },
}

export default defineNuxtPlugin({
  name: 'cookie-consent',
  async setup() {
    await CookieConsent.run(config)

    return {
      provide: {
        CC: CookieConsent,
      },
    }
  },
})
