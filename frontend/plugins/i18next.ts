import i18next from 'i18next'
import i18NextVue from 'i18next-vue'
// import en from '~/locales/en.json'
// import fr from '~/locales/fr.json'
// import pl from '~/locales/pl.json'
// import es from '~/locales/es.json'

export default defineNuxtPlugin((nuxtApp) => {
i18next.init({
    // lng: localStorage.getItem('language') || 'en',
    lng: 'en',
    interpolation:{
        escapeValue: false,
    },
    fallbackLng: 'en',
    resources: {
        en: {
            'common.contact': 'Bonjour le monde',
            'Welcome to Vite': 'Bienvenue à Vite',
        },
        // fr,
        // pl,
        // es,
    },
})

    nuxtApp.vueApp.use(i18NextVue, { i18next })
})





// import i18next from 'i18next'
// import i18NextVue from 'i18next-vue'
// import en from './locales/en.json'
// import fr from './locales/fr.json'
// import pl from './locales/pl.json'
// import es from './locales/es.json'

// i18next.init({
//     lng: localStorage.getItem('language') || 'en',
//     interpolation:{
//         escapeValue: false,
//     },
//     fallbackLng: 'en',
//     resources: {
//         en,
//         fr,
//         pl,
//         es,
//     },
// })


//.use(i18NextVue, { i18next })



// import { createI18n } from 'vue-i18n'
// import i18next-vue
// import en from '~/locales/en.json'

// export default defineNuxtPlugin((nuxtApp) => {
//     const i18n = createI18n({
//         legacy: false,
//         locale: 'en',
//         messages: {
//             en,
//         },
//     })

//     nuxtApp.vueApp.use(i18n)
// })



// import i18next from 'i18next'
// import i18NextVue from 'i18next-vue'

// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use(i18NextVue, { i18next })
// })






// import en from './locales/en.json'

// export default defineI18nConfig(() => ({
//     legacy: false,
//     locale: 'en',
//     messages: {
//       en: {
//         'common.contact': 'Bonjour le monde',
//         'Welcome to Vite': 'Bienvenue à Vite',
//       },
//     },
//   }))