import type { CreateTransactionDto } from 'src/__gen-api'
import { writable } from 'svelte/store'

export const preakreForm = writable<CreateTransactionDto>(
  localStorage.getItem('preakreForm')
    ? JSON.parse(localStorage.getItem('preakreForm') as string)
    : {
        captchaToken: '',
        email: '',
        mug: false,
        paper: false,
        sleep: false,
        transportHelp: false,
        tshirt: undefined,
        person: '',
        preakreType: 'normal',
      }
)

export const preakreState = writable(
  localStorage.getItem('preakreState')
    ? JSON.parse(localStorage.getItem('preakreState') as string)
    : {
        loading: false,
        step: 0,
        amount: 0,
        age: 18,
      }
)

preakreForm.subscribe(form => {
  let amount = 50
  if (form.preakreType === 'premium') amount += 50
  if (form.mug) amount += 50
  if (form.sleep) amount += 5
  if (form.tshirt) amount += 40

  preakreState.update(state => ({ ...state, amount }))
  localStorage.setItem('preakreForm', JSON.stringify(form))
})

preakreState.subscribe(state => {
  localStorage.setItem('preakreState', JSON.stringify(state))
})
