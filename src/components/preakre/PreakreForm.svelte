<script lang="ts">
  import type { CreateTransactionDto } from 'src/__gen-api'
  import { api } from 'src/api'
  import InfoSvelte from './Info.svelte'
  import { preakreForm, preakreState } from './preakreStore'

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

  function nextStep(akreType: 'premium' | 'normal') {
    $preakreState.step = 1
    $preakreState.preakreType = akreType
  }
</script>

<h1 class="mb-6 text-4xl font-bold text-center">
  {#if $preakreState.step === 0}
    Preakredytacja
  {:else}
    {$preakreState.preakreType === 'normal'
      ? 'Akredytacja'
      : 'Kruczy dobrodziej'}
  {/if}
</h1>

{#if $preakreState.step === 0}
  <div class="flex flex-col md:flex-row justify-center gap-10 pt-10">
    <div class="card w-full md:w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          Akredytacja
          <div class="badge badge-error">50 zł</div>
        </h2>
        <p>Omiń kolejki i akredytuj się on-line!</p>
        <div class="flex justify-between">
          <div class="card-actions justify-end mt-4">
            <div class="badge badge-outline">on-line</div>
            <div class="badge badge-outline">BLIK</div>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-warning"
              on:click={() => nextStep('normal')}
            >
              Kup bilet
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card w-full md:w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          Kruczy dobrodziej
          <div class="badge badge-error">100 zł</div>
        </h2>
        <p>Wspieram SkierCon! Chcę zostać mecenasem!</p>
        <div class="flex justify-between">
          <div class="card-actions justify-end mt-4">
            <div class="badge badge-outline">on-line</div>
            <div class="badge badge-outline">BLIK</div>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-warning"
              on:click={() => nextStep('premium')}
            >
              Kup bilet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center mt-16">
    Informacje dla osób ze szczególnymi potrzebami - <a
      href="/dostepny-skiercon"
      class="link link-info">Dostępny SkierCon</a
    >
  </div>
{/if}

{#if $preakreState.step > 0}
  <div class="flex justify-center">
    <ul class="steps steps-vertical lg:steps-horizontal mb-20">
      <li class="step step-info">Info</li>
      <li class="step">Sleep</li>
      <li class="step">Gadżety</li>
      <li class="step">Podsumowanie</li>
    </ul>
  </div>
{/if}

<div class="w-full max-w-xl mx-auto">
  {#if $preakreState.step === 1}
    <InfoSvelte />
  {/if}

  {#if $preakreState.step > 0}
    <div class="flex justify-between mt-10">
      <button type="button" class="btn" on:click={() => $preakreState.step--}>
        Wstecz
      </button>
      <button
        type="button"
        class="btn btn-warning"
        on:click={() => $preakreState.step++}
      >
        Dalej
      </button>
    </div>
  {/if}
</div>

<!-- <div class="mt-24" /> -->
<!-- 
Form:
<pre>{JSON.stringify($preakreForm, null, 2)}</pre>
<br />
State:
<pre>{JSON.stringify($preakreState, null, 2)}</pre> -->

<!--
<div class="mb-96" />

<div class="form-control max-w-xs">
  <label class="label cursor-pointer">
    <span class="label-text">SkierQubas</span>
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={formValues.mug}
      disabled={loading}
    />
  </label>
</div>

<div class="form-control max-w-xs">
  <label class="label cursor-pointer">
    <span class="label-text">Koszulka konwnentowa</span>
    <input type="checkbox" class="checkbox" bind:checked={wantTshirt} />
  </label>
</div>

{#if wantTshirt}
  <div class="form-control w-full max-w-xs">
    <label class="label" for="tsize">
      <span class="label-text">Rozmiar koszulki</span>
    </label>
    <select
      class="select select-bordered w-full max-w-xs"
      bind:value={formValues.tshirt}
      disabled={loading}
      id="tsize"
    >
      {#each tshirtSizes as size}
        <option value={size}>{size}</option>
      {/each}
    </select>
  </div>
{/if}

<label class="label label--checkbox">
  <input type="checkbox" class="checkbox" bind:checked={formValues.sleep} />
  <span>Miejsce na sleep-roomie (5 zł)</span>
</label>
<label class="label label--checkbox">
  <input type="checkbox" class="checkbox" bind:checked={formValues.paper} />
  <span>Papierowy egzemplarz informatora konwentowego (0 zł)</span>
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
</label> -->
