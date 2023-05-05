<script lang="ts">
  import type { CreateTransactionDto } from 'src/__gen-api'
  import { api } from 'src/api'
  import InfoSvelte from './Info.svelte'
  import SleepSvelte from './Sleep.svelte'
  import GadgetsSvelte from './Gadgets.svelte'
  import SummarySvelte from './Summary.svelte'
  import { preakreForm, preakreState } from './preakreStore'

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
    <ul class="steps steps-vertical lg:steps-horizontal mb-12">
      <li class="step step-info">Info</li>
      <li class="step" class:step-info={$preakreState.step >= 2}>Sleep</li>
      <li class="step" class:step-info={$preakreState.step >= 3}>Gadżety</li>
      <li class="step" class:step-info={$preakreState.step >= 4}>
        Podsumowanie
      </li>
    </ul>
  </div>
{/if}

<div class="w-full max-w-xl mx-auto">
  {#if $preakreState.step === 1}
    <InfoSvelte />
  {/if}
  {#if $preakreState.step === 2}
    <SleepSvelte />
  {/if}
  {#if $preakreState.step === 3}
    <GadgetsSvelte />
  {/if}
  {#if $preakreState.step === 4}
    <SummarySvelte />
  {/if}

  {#if $preakreState.step > 0}
    <div class="flex justify-between mt-20">
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
