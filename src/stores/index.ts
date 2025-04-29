// Utilities
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);


export {
  pinia
}

export * from "./app"
export  * from "./messages-store"
export * from "./auth-store"
export * from "./signup-store"
export * from "./patient-store"
export * from "./profile-store"
