<script lang="ts">
  import type { CreateTransactionDto } from 'src/__gen-api'
  import { api } from 'src/api'

  const formValues: CreateTransactionDto = {
    captchaToken: '',
    email: '',
    mug: false,
    paper: false,
    sleep: false,
    transportHelp: false,
    tshirt: undefined,
    person: '',
  }

  let wantTshirt = false
  const tshirtSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
    '4XL',
  ] satisfies CreateTransactionDto['tshirt'][]

  let repeatEmail = ''

  async function getRecaptchaToken(): Promise<string> {
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

  let anyErrors = false
  let loading = false

  async function submit() {
    if (anyErrors) return
    if (loading) return

    loading = true

    formValues.captchaToken = await getRecaptchaToken()

    try {
      const res = await api.transactions.create(formValues)
      window.location.replace(res.data.redirectUrl)
    } catch (err) {
      loading = false
      console.error(err)
    }
  }

  function asd() {
    console.log('asd')
  }
</script>

<form on:submit|preventDefault={submit}>
  <label class="label">
    <span>Imię "pseudonim" nazwisko</span>
    <input
      type="text"
      class="input"
      bind:value={formValues.person}
      placeholder="Jan Kowalski"
      disabled={loading}
      maxlength="60"
      autocomplete="given-name"
    />
  </label>
  <label class="label">
    <span>Email<span class="required">*</span></span>
    <input
      type="email"
      class="input"
      bind:value={formValues.email}
      placeholder="jan.kowalski@example.com"
      autocomplete="email"
      inputmode="email"
      required
      disabled={loading}
    />
  </label>
  <label class="label">
    <span>Powtórz email<span class="required">*</span></span>
    <input
      type="email"
      class="input"
      bind:value={repeatEmail}
      placeholder="jan.kowalski@example.com"
      autocomplete="email"
      inputmode="email"
      required
      disabled={loading}
    />
  </label>
  <label class="label label--checkbox">
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={formValues.mug}
      disabled={loading}
    />
    <span>SkierQubas (50 zł)</span>
  </label>
  <label class="label label--checkbox">
    <input type="checkbox" class="checkbox" bind:checked={wantTshirt} />
    <span>Koszulka SkierConu (40 zł)</span>
  </label>

  {#if wantTshirt}
    <label class="label">
      <span>Rozmiar koszulki</span>
      <select
        class="input select"
        bind:value={formValues.tshirt}
        disabled={loading}
      >
        {#each tshirtSizes as size}
          <option value={size}>{size}</option>
        {/each}
      </select>
    </label>
  {/if}

  <label class="label label--checkbox">
    <input type="checkbox" class="checkbox" bind:checked={formValues.sleep} />
    <span>Miejsce na sleep-roomie (5 zł)</span>
  </label>
  <label class="label label--checkbox">
    <input type="checkbox" class="checkbox" bind:checked={formValues.paper} />
    <span>Papierowy egzemplarz informatora konwentowego (0 zł)</span>
  </label>
  <label class="label label--checkbox">
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={formValues.transportHelp}
    />
    <span>
      Jestem osobą z niepełnosprawnością wzroku i potrzebuję asysty w podróży z
      dworca PKP Skierniewice na teren konwnetu
    </span>
  </label>

  <hr class="my-12" />
  <label class="label label--checkbox">
    <input type="checkbox" required class="checkbox" disabled={loading} />
    Oświadczam, że zapoznałem się z
    <a
      href="https://www.przelewy24.pl/regulamin"
      target="_blank"
      rel="noopener noreferrer"
      class="link">regulaminem</a
    >
    i&nbsp;<a
      href="https://www.przelewy24.pl/obowiazek-informacyjny-rodo-platnicy"
      target="_blank"
      rel="noopener noreferrer"
      class="link">obowiązkiem informacyjnym</a
    >
    serwisu Przelewy24.&nbsp;<span class="required">*</span>
  </label>
  <label class="label label--checkbox">
    <input type="checkbox" required class="checkbox" disabled={loading} />
    Zapoznałem/am się z&nbsp;
    <a
      href="https://cech.skiercon.pl/nasze-akcje/kongres-2023#h.fbm1a0thmvgo"
      target="_blank"
      rel="noopener noreferrer"
      class="link">Regulaminem SkierConu</a
    >
    i&nbsp;akceptuję go. Przebywanie na terenie SkierConu uważane jest za jednoznaczne
    z&nbsp;faktem zapoznania się z&nbsp;Regulaminem i&nbsp;akceptacją jego treści.
    Nieznajomość Regulaminu nie zwalnia z&nbsp;obowiązku jego przestrzegania.&nbsp;<span
      class="required">*</span
    >
  </label>
  <label class="label label--checkbox">
    <input type="checkbox" required class="checkbox" disabled={loading} />
    Wyrażam zgodę na przetwarzanie moich danych zgodnie z&nbsp;<a
      href="https://cech.skiercon.pl/cech/rodo"
      target="_blank"
      rel="noopener noreferrer"
      class="link">Polityką Prywatności</a
    >
    oraz akceptuję
    <a
      href="https://cech.skiercon.pl/cech/regulamin-sprzedaży"
      target="_blank"
      rel="noopener noreferrer"
      class="link">Regulamin sprzedaży towarów i&nbsp;usług</a
    >. <span class="required">*</span>
  </label>
  <hr class="my-12" />

  <button
    type="submit"
    class="py-5 px-10 text-white text-xl bg-cyan-700 hover:bg-cyan-800 transition-all"
  >
    Przejdź do płatności
  </button>
</form>

<style>
  .input {
    @apply block p-2 text-white bg-cyan-900 w-96;
  }
  .label {
    @apply block mb-4;
  }
  .checkbox {
    @apply inline-block;
  }
  .required {
    @apply text-red-400;
  }
  a {
    @apply text-cyan-500;
  }
  a[target='_blank']::after {
    content: ' ↗';
  }
</style>
