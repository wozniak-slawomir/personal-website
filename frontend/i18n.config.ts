import en from '~/locales/en.json'
import pl from '~/locales/pl.json'
import fr from '~/locales/fr.json'
import es from '~/locales/es.json'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: DEFAULT_LOCALE,
    messages: {
        en,
        pl,
        fr,
        es,
    },
}))