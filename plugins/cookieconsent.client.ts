import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import type { CookieConsentConfig } from 'vanilla-cookieconsent'

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
  },

  onChange: () => {
    console.log('Cookie consent: Preferences changed')
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
    ads: {},
  },

  language: {
    default: (typeof window !== 'undefined' && localStorage.getItem('language')) || 'en',
    translations: {
      en: {
        consentModal: {
          title: 'We value your privacy',
          description:
            'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/privacy" class="cc__link">Privacy Policy</a>',
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
                'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept all", you consent to our use of cookies.',
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
                'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
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
                'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
              linkedCategory: 'ads',
            },
            {
              title: 'More information',
              description:
                'For any questions regarding our cookie policy, please <a class="cc__link" href="/contact">contact us</a>.',
            },
          ],
        },
      },
      pl: {
        consentModal: {
          title: 'Szanujemy Twoją prywatność',
          description:
            'Ta strona używa niezbędnych plików cookie do zapewnienia prawidłowego działania oraz plików cookie śledzących, aby zrozumieć, jak z nią wchodzisz w interakcję. Te ostatnie będą ustawione tylko po wyrażeniu zgody.',
          acceptAllBtn: 'Zaakceptuj wszystkie',
          acceptNecessaryBtn: 'Odrzuć wszystkie',
          showPreferencesBtn: 'Zarządzaj preferencjami',
          footer: '<a href="/privacy" class="cc__link">Polityka Prywatności</a>',
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
                'Używamy plików cookie, aby ulepszyć Twoje doświadczenie przeglądania, dostarczać spersonalizowane treści i analizować nasz ruch. Klikając "Zaakceptuj wszystkie", wyrażasz zgodę na nasze użycie plików cookie.',
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
                'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną internetową, zbierając i raportując informacje anonimowo.',
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
                'Te pliki cookie mogą być ustawiane przez naszą stronę przez naszych partnerów reklamowych w celu stworzenia profilu Twoich zainteresowań.',
              linkedCategory: 'ads',
            },
            {
              title: 'Więcej informacji',
              description:
                'W przypadku pytań dotyczących naszej polityki plików cookie, prosimy o <a class="cc__link" href="/contact">kontakt</a>.',
            },
          ],
        },
      },
      fr: {
        consentModal: {
          title: 'Nous respectons votre vie privée',
          description:
            'Ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront définis qu\'après consentement.',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout rejeter',
          showPreferencesBtn: 'Gérer les préférences',
          footer: '<a href="/privacy" class="cc__link">Politique de Confidentialité</a>',
        },
        preferencesModal: {
          title: 'Préférences des cookies',
          acceptAllBtn: 'Tout accepter',
          acceptNecessaryBtn: 'Tout rejeter',
          savePreferencesBtn: 'Enregistrer les préférences',
          sections: [
            {
              title: 'Utilisation des cookies',
              description:
                'Nous utilisons des cookies pour améliorer votre expérience de navigation, fournir du contenu personnalisé et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
            },
            {
              title: 'Cookies strictement nécessaires',
              description:
                'Ces cookies sont essentiels au bon fonctionnement du site web. Ils ne peuvent pas être désactivés.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies de performance et d\'analyse',
              description:
                'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et rapportant des informations de manière anonyme.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Domaine',
                  desc: 'Description',
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Utilisé pour distinguer les utilisateurs dans Google Analytics',
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Utilisé pour distinguer les utilisateurs dans Google Analytics',
                  },
                ],
              },
            },
            {
              title: 'Cookies publicitaires et de ciblage',
              description:
                'Ces cookies peuvent être définis sur notre site par nos partenaires publicitaires pour créer un profil de vos intérêts.',
              linkedCategory: 'ads',
            },
            {
              title: 'Plus d\'informations',
              description:
                'Pour toute question concernant notre politique de cookies, veuillez nous <a class="cc__link" href="/contact">contacter</a>.',
            },
          ],
        },
      },
      es: {
        consentModal: {
          title: 'Valoramos tu privacidad',
          description:
            'Este sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para entender cómo interactúas con él. Estas últimas solo se establecerán después del consentimiento.',
          acceptAllBtn: 'Aceptar todo',
          acceptNecessaryBtn: 'Rechazar todo',
          showPreferencesBtn: 'Gestionar preferencias',
          footer: '<a href="/privacy" class="cc__link">Política de Privacidad</a>',
        },
        preferencesModal: {
          title: 'Preferencias de cookies',
          acceptAllBtn: 'Aceptar todo',
          acceptNecessaryBtn: 'Rechazar todo',
          savePreferencesBtn: 'Guardar preferencias',
          sections: [
            {
              title: 'Uso de cookies',
              description:
                'Utilizamos cookies para mejorar tu experiencia de navegación, ofrecer contenido personalizado y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", consientes nuestro uso de cookies.',
            },
            {
              title: 'Cookies estrictamente necesarias',
              description:
                'Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Cookies de rendimiento y análisis',
              description:
                'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando e informando información de forma anónima.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Cookie',
                  domain: 'Dominio',
                  desc: 'Descripción',
                },
                body: [
                  {
                    name: '_ga',
                    domain: location.hostname,
                    desc: 'Utilizada para distinguir usuarios en Google Analytics',
                  },
                  {
                    name: '_gid',
                    domain: location.hostname,
                    desc: 'Utilizada para distinguir usuarios en Google Analytics',
                  },
                ],
              },
            },
            {
              title: 'Cookies publicitarias y de segmentación',
              description:
                'Estas cookies pueden ser establecidas en nuestro sitio por nuestros socios publicitarios para crear un perfil de tus intereses.',
              linkedCategory: 'ads',
            },
            {
              title: 'Más información',
              description:
                'Para cualquier pregunta sobre nuestra política de cookies, por favor <a class="cc__link" href="/contact">contáctanos</a>.',
            },
          ],
        },
      },
    },
  },
}

export default defineNuxtPlugin(async () => {
  await CookieConsent.run(config)

  return {
    provide: {
      CC: CookieConsent,
    },
  }
})
