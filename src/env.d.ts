interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string
  readonly PUBLIC_GTM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
