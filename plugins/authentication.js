export default defineNuxtPlugin(() => {
  addRouteMiddleware('authentication', async (to, _from) => {
    const session = await useSession()
    console.log('session', session)
    const { status = {} } = session

    if (to.meta.auth !== false && status.value === 'unauthenticated') {
      return navigateTo(`/login?callbackUrl=${to.path}`)
    }
  }, { global: true })
})
