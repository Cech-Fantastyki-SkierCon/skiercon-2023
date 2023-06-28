<script>
  import { api } from 'src/api'
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreAmount } from '../preakreStore'
  import { getRecaptchaToken } from '../recaptcha'

  let loading = false

  async function onSubmit() {
    if (loading) return
    loading = true
    try {
      $preakreForm.captchaToken = await getRecaptchaToken()
      const data = { ...$preakreForm }
      delete data.payMore
      if (data.preakreType === 'normal') {
        data.additionalPayment = undefined
      } else {
        data.additionalPayment -= 100
      }

      if (data.additionalPayment === 0) {
        data.additionalPayment = undefined
      }

      // migration
      const tshirtsMap = [
        { id: 1, name: 'XS' },
        { id: 2, name: 'S' },
        { id: 3, name: 'M' },
        { id: 4, name: 'L' },
        { id: 5, name: 'XL' },
        { id: 6, name: '2XL' },
        { id: 7, name: '3XL' },
        { id: 8, name: '4XL' },
      ]

      const migrationData = {}
      migrationData.p24email = data.email
      migrationData.person = data.person
      migrationData.captchaToken = data.captchaToken
      migrationData.order = []
      migrationData.order.push({
        shopItemId: data.preakreType === 'premium' ? 2 : 1,
        quantity: 1,
      })
      if (data.mug) {
        migrationData.order.push({
          shopItemId: 3,
          quantity: 1,
        })
      }
      if (data.sleep) {
        migrationData.order.push({
          shopItemId: 5,
          quantity: 1,
        })
      }
      if (data.paper) {
        migrationData.order.push({
          shopItemId: 6,
          quantity: 1,
        })
      }
      if (data.tshirt) {
        migrationData.order.push({
          shopItemId: 4,
          quantity: 1,
          shopItemVariantId: tshirtsMap.find(
            tshirt => tshirt.name === data.tshirt
          ).id,
        })
      }
      if (data.additionalPayment) {
        const mecenats = Math.ceil(data.additionalPayment / 10)
        new Array(mecenats).fill(0).forEach(() => {
          migrationData.order.push({
            shopItemId: 7,
            quantity: 1,
          })
        })
      }

      const res = await api.transactions.create(migrationData)
      window.localStorage.removeItem('preakreForm')
      window.localStorage.removeItem('preakreState')
      window.localStorage.removeItem('preakreStep')
      window.location.href = res.data.redirectUrl
    } catch (err) {
      console.error(err)
      loading = false
      alert('Wystąpił nieznany błąd. Prosimy spróbować później.')
    }
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <p class="text-center mt-6">
    Wiadomość z <b>kodem QR</b> zostanie wysłana na adres
  </p>
  <p class="text-cyan-400 text-center my-2 text-lg md:text-2xl mb-6">
    {$preakreForm.email}
  </p>

  <div class="divider my-8" />

  <h2 class="mb-4">Akredytacja i gadżety - podsumowanie</h2>
  <div class="overflow-x-auto border-2 border-base-300 rounded-1xl">
    <table class="table table-zebra table-compact w-full">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Akredytacja</td>
          <td>
            {$preakreForm.preakreType === 'premium'
              ? `${$preakreForm.additionalPayment},00 zł`
              : '50,00 zł'}
          </td>
        </tr>
        {#if $preakreForm.mug}
          <tr>
            <td>Kubek</td>
            <td>60,00 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.tshirt}
          <tr>
            <td>Koszulka ({$preakreForm.tshirt})</td>
            <td>40,00 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.sleep}
          <tr>
            <td>Nocleg</td>
            <td>5,00 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.paper}
          <tr>
            <td>Informator</td>
            <td>0,00 zł</td>
          </tr>
        {/if}
        <tr class="font-bold uppercase">
          <td>Do zapłaty</td>
          <td class="text-cyan-400 text-2xl">{$preakreAmount},00 zł</td>
        </tr>
      </tbody>
    </table>
  </div>

  {#if $preakreForm.mug || $preakreForm.tshirt || $preakreForm.paper}
    <div class="divider mb-6" />
    <p class="my-6 alert alert-info shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current flex-shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      Nie wysyłamy zamówionych przedmiotów. Odbiór osobisty wyłącznie na miejscu
      podczas akredytacji.
    </p>
  {/if}

  <div class="divider mb-8" />

  <h2>Wymagane zgody <span class="required">*</span></h2>

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        required
        disabled={loading}
      />
      <div>
        Oświadczam, że zapoznałem się z&nbsp;<a
          href="https://www.przelewy24.pl/regulamin"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-info link-blank">regulaminem</a
        >
        i&nbsp;<a
          href="https://www.przelewy24.pl/obowiazek-informacyjny-rodo-platnicy"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-info link-blank">obowiązkiem informacyjnym</a
        >
        serwisu Przelewy24.&nbsp;<span class="required">*</span>
      </div>
    </label>
  </div>

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        required
        disabled={loading}
      />
      <div>
        Zapoznałem się z&nbsp;<a
          href="/regulamin"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-info link-blank">Regulaminem SkierConu</a
        >
        i&nbsp;akceptuję go. Przebywanie na terenie SkierConu uważane jest za jednoznaczne
        z&nbsp;faktem zapoznania się z&nbsp;Regulaminem i&nbsp;akceptacją jego treści.
        Nieznajomość Regulaminu nie zwalnia z&nbsp;obowiązku jego przestrzegania.&nbsp;<span
          class="required">*</span
        >
      </div>
    </label>
  </div>

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        required
        disabled={loading}
      />
      <div>
        Wyrażam zgodę na przetwarzanie moich danych zgodnie z&nbsp;<a
          href="https://cech.skiercon.pl/cech/rodo"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-info link-blank">Polityką Prywatności</a
        >
        oraz akceptuję
        <a
          href="https://cech.skiercon.pl/cech/regulamin-sprzedaży"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-info link-blank"
          >Regulamin sprzedaży towarów i&nbsp;usług</a
        > <span class="required">*</span>
      </div>
    </label>
  </div>
  <Controls lastStep {loading} />
</form>
