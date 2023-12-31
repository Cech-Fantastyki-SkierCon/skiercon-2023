import { writable } from 'svelte/store'

const preakreFormLS = localStorage.getItem('preakreForm')
export const preakreForm = writable<any>(
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
        additionalPayment: 100,
        payMore: false,
      }
)

preakreForm.update(form => {
  return {
    ...form,
    preakreType: 'normal',
  }
})

const preakreAmountLS = localStorage.getItem('preakreAmount')
export const preakreAmount = writable(
  preakreAmountLS ? parseInt(preakreAmountLS) : 0
)

let preakreStepLs = localStorage.getItem('preakreStep')
if (preakreStepLs === '0') {
  preakreStepLs = '1'
}
export const preakreStep = writable(preakreStepLs ? parseInt(preakreStepLs) : 1)

preakreForm.subscribe(form => {
  let amount = 0
  if (form.preakreType === 'normal') {
    amount += 50
  } else if (form.payMore) {
    amount += form.additionalPayment || 0
  } else {
    amount += 100
  }
  if (form.mug) amount += 60
  if (form.sleep) amount += 5
  if (form.tshirt) amount += 40

  preakreAmount.update(() => amount)
  localStorage.setItem('preakreForm', JSON.stringify(form))
})

preakreAmount.subscribe(state => {
  localStorage.setItem('preakreAmount', JSON.stringify(state))
})

preakreStep.subscribe(step => {
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
  localStorage.setItem('preakreStep', JSON.stringify(step))
})
