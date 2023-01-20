import { Api } from './__gen-api'

export const api = new Api({
  baseURL: import.meta.env.PUBLIC_API_URL,
})
