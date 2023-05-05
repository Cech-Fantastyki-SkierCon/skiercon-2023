import type { CreateTransactionDto } from 'src/__gen-api'
import { writable } from 'svelte/store'

export const preakreForm = writable<CreateTransactionDto>({
  captchaToken: '',
  email: '',
  mug: false,
  paper: false,
  sleep: false,
  transportHelp: false,
  tshirt: undefined,
  person: '',
})

export const preakreState = writable({
  preakreType: 'normal' as 'normal' | 'premium',
  loading: false,
  step: 0,
})
