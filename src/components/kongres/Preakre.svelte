<script lang="ts">
  import { api } from '../../api'
  import type { CreateTransactionKongres2023Dto } from '../../__gen-api'

  let email = ''
  let repeatEmail = ''
  let accreditationType: CreateTransactionKongres2023Dto['accreditationType'] =
    'full'
  let paper = 'yes'
  let user = ''
  let sleepRoom = 'false'

  $: sum = (paper == 'yes' ? 10 : 0) + (accreditationType === 'full' ? 10 : 0)

  let emailError = false
  let responseError = false
  let loading = false

  $: if (email === repeatEmail) {
    emailError = false
  }

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

  async function submit() {
    if (email !== repeatEmail) {
      emailError = true
      return
    }

    if (loading) {
      return
    }

    emailError = false
    responseError = false
    loading = true

    const captchaToken = await getRecaptchaToken()

    try {
      const res = await api.transactions.createTransactionKongres2023({
        email,
        accreditationType,
        koniunkcja: paper === 'yes',
        sleepRoom: sleepRoom === 'true',
        user,
        captchaToken,
      })

      window.location.replace(res.data.redirectUrl)
    } catch (err) {
      // TODO: handle error
      responseError = true
      loading = false
      console.error(err)
    }
  }
</script>

<form on:submit|preventDefault={submit}>
  <label class="label">
    Rodzaj akredytacji: <span class="required">*</span>
    <select
      class="input select"
      bind:value={accreditationType}
      disabled={loading}
    >
      <option value="full">Pełna akredytacja (+10,00 zł)</option>
      <option value="program">Twórca programu (+0,00 zł)</option>
      <option value="member">
        Członek lub rekrut Cechu Fantastyki "SkierCon" (+0,00 zł)
      </option>
    </select>
  </label>

  <label class="label">
    Papierowy egzemplarz <b>KONiunkcji</b>: <span class="required">*</span>
    <select class="input select" bind:value={paper} disabled={loading}>
      <option value="yes">Tak (+10,00 zł)</option>
      <option value="no">Nie (+0,00 zł)</option>
    </select>
  </label>

  <label class="label">
    Miejsce na sleeproomie: <span class="required">*</span>
    <select class="input select" bind:value={sleepRoom} disabled={loading}>
      <option value="true">Tak (+0,00 zł)</option>
      <option value="false" selected>Nie (+0,00 zł)</option>
    </select>
  </label>

  <label class="label">
    <span>Imię "nick" Nazwisko:</span>
    <input
      bind:value={user}
      placeholder="np. Michał &quot;Miki&quot; Kowalski"
      type="text"
      autocomplete="given-name"
      class="input"
      disabled={loading}
      maxlength="60"
    />
  </label>

  <label class="label">
    <span
      >E-mail, na który wyślemy <b>akredytację</b>:
      <span class="required">*</span></span
    >
    <input
      bind:value={email}
      placeholder="Twój adres e-mail"
      type="email"
      autocomplete="email"
      inputmode="email"
      class="input"
      required
      disabled={loading}
    />
  </label>

  <label class="label">
    <span>Powtórz adres e-mail: <span class="required">*</span></span>
    <input
      bind:value={repeatEmail}
      placeholder="Twój adres e-mail"
      type="email"
      autocomplete="email"
      inputmode="email"
      class="input"
      required
      disabled={loading}
    />
    {#if emailError}
      <span
        class="error"
        aria-errormessage="Adresy e-mail muszą być jednakowe!"
      >
        Adresy e-mail muszą być jednakowe!
      </span>
    {/if}
  </label>

  <div class="mt-8 mb-12">
    {#if sum > 0}
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
    {/if}
    <label class="label label--checkbox">
      <input type="checkbox" required class="checkbox" disabled={loading} />
      Zapoznałem/am się z&nbsp;
      <a
        href="https://cech.skiercon.pl/nasze-akcje/kongres-2023#h.fbm1a0thmvgo"
        target="_blank"
        rel="noopener noreferrer"
        class="link">Regulaminem KONgresu</a
      >
      i&nbsp;akceptuję go. Przebywanie na terenie KONgresu uważane jest za jednoznaczne
      z&nbsp;faktem zapoznania się z&nbsp;Regulaminem i&nbsp;akceptacją jego treści.
      Nieznajomość Regulaminu nie zwalnia z&nbsp;obowiązku jego przestrzegania.&nbsp;<span
        class="required">*</span
      >
    </label>

    <label class="label label--checkbox">
      <input type="checkbox" required class="checkbox" disabled={loading} />
      Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z&nbsp;<a
        href="https://cech.skiercon.pl/cech/rodo"
        target="_blank"
        rel="noopener noreferrer"
        class="link">klauzulą RODO</a
      >
      w&nbsp;celu realizacji preakredytacji.&nbsp;<span class="required">*</span
      >
    </label>
  </div>

  <button
    type="submit"
    class="submit"
    class:opacity-60={loading}
    class:cursor-wait={loading}
  >
    {#if loading}
      Ładowanie...
    {:else if sum > 0}
      Przejdź do płatności (<span class="price">{sum},00 zł</span>)
    {:else}
      Wyślij akredytację
    {/if}
  </button>

  {#if responseError}
    <p class="text-center my-10 text-red-300">
      Wystąpił nieznany błąd, prosimy spróbować później.
    </p>
  {/if}
</form>

<style lang="scss">
  .label {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;

    &--checkbox {
      font-size: 14px;
    }

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .input {
    display: block;
    padding: 15px 25px;
    background: var(--kongres-0);
    color: var(--kongres-3);
    border: 1px solid var(--kongres-1);
    border-radius: 30px;
    width: calc(100% + 30px);
    margin: 0 -15px;

    &:focus {
      outline: var(--kongres-4) solid 2px;
    }
  }

  .error {
    color: white;
  }

  .checkbox {
    margin-right: 5px;
    transform: scale(1.2);
    accent-color: var(--kongres-0);
    cursor: pointer;
  }

  .select {
    cursor: pointer;
    appearance: none;
  }

  .submit {
    margin-top: 20px;
    padding: 15px 40px;
    border: 2px solid var(--kongres-1);
    border-radius: 30px;
    margin: 0 auto;
    display: block;

    background: var(--kongres-0);

    color: var(--kongres-4);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 18px;

    transition: all 0.2s;

    &:hover,
    &:focus {
      transform: scale(1.05);
    }
  }

  .link,
  .price {
    color: var(--kongres-3);
  }

  .required {
    color: tomato;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
</style>
