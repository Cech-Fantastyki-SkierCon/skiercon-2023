<script>
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreState } from '../preakreStore'
</script>

<form on:submit|preventDefault={() => {}}>
  <div />

  <div class="divider" />

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
          class="link link-info">obowiązkiem informacyjnym</a
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
