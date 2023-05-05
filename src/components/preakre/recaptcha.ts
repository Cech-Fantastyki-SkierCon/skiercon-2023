export async function getRecaptchaToken(): Promise<string> {
  return new Promise(resolve => {
    // @ts-ignore
    grecaptcha.ready(() => {
      // @ts-ignore
      grecaptcha
        .execute(import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY, {
          action: 'submit',
        })
        .then(resolve)
    })
  })
}
