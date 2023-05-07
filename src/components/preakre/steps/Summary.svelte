<script>
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreState } from '../preakreStore'
</script>

<form on:submit|preventDefault={() => {}}>
  <p class="text-center mt-6">
    Wiadomość z <b>kodem QR</b> zostanie wysłana na adres
  </p>
  <p class="text-cyan-400 text-center my-2 text-2xl mb-6">
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
            {$preakreForm.preakreType === 'premium' ? '100 zł' : '50 zł'}
          </td>
        </tr>
        {#if $preakreForm.mug}
          <tr>
            <td>Kubek</td>
            <td>50 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.tshirt}
          <tr>
            <td>Koszulka ({$preakreForm.tshirt})</td>
            <td>40 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.sleep}
          <tr>
            <td>Nocleg</td>
            <td>5 zł</td>
          </tr>
        {/if}
        {#if $preakreForm.paper}
          <tr>
            <td>Informator</td>
            <td>0 zł</td>
          </tr>
        {/if}
        <tr class="font-bold uppercase">
          <td>Do zapłaty</td>
          <td class="text-cyan-400 text-2xl">{$preakreState.amount} zł</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="divider my-8" />

  <h2>Wymagane zgody <span class="required">*</span></h2>

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        required
        disabled={$preakreState.loading}
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
        disabled={$preakreState.loading}
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
        disabled={$preakreState.loading}
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
  <Controls lastStep />
</form>
