import { Api } from './__gen-api'

export const api = new Api({
  baseURL: import.meta.env.VITE_API_URL,
})
