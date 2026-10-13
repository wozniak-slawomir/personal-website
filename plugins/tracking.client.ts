import { TRACKING_CONSENT_EVENT } from '@/utils/tracking'

export default defineNuxtPlugin({
  name: 'tracking',
  dependsOn: ['cookie-consent'],
  setup() {
    const { sync } = useTracking()
    sync()
    window.addEventListener(TRACKING_CONSENT_EVENT, sync)
  },
})
