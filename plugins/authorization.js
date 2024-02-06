import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('authorization', async (to, _from) => {
    const { params } = useRoute()
    const { status, signOut } = await useSession()
    const { activeModules } = useUserStore()

    if (status && status.value && status.value === 'authenticated' && !activeModules) {
      signOut()
    }

    if ((status && status.value && status.value === 'authenticated') && params.module && !activeModules.includes(params.module)) {
      return navigateTo(`/?error=unauthorized`)
    }
  }, { global: true })
})
