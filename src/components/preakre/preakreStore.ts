import type { CreateTransactionDto } from 'src/__gen-api'
import { writable } from 'svelte/store'

const preakreFormLS = localStorage.getItem('preakreForm')
export const preakreForm = writable<CreateTransactionDto>(
  preakreFormLS
    ? JSON.parse(preakreFormLS)
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
        age: 18,
      }
)

const preakreAmountLS = localStorage.getItem('preakreAmount')
export const preakreAmount = writable(
  preakreAmountLS ? parseInt(preakreAmountLS) : 0
)

const preakreStepLs = localStorage.getItem('preakreStep')
export const preakreStep = writable(preakreStepLs ? parseInt(preakreStepLs) : 0)

preakreForm.subscribe(form => {
  let amount = 50
  if (form.preakreType === 'premium') amount += 50
  if (form.mug) amount += 50
  if (form.sleep) amount += 5
  if (form.tshirt) amount += 40

  preakreAmount.update(() => amount)
  localStorage.setItem('preakreForm', JSON.stringify(form))
})

preakreAmount.subscribe(state => {
  localStorage.setItem('preakreState', JSON.stringify(state))
})

preakreStep.subscribe(step => {
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
  localStorage.setItem('preakreStep', JSON.stringify(step))
})
