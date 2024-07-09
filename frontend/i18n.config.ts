import en from './locales/en.json'
import pl from './locales/pl.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        pl,
        fr,
        es,
    },
}))