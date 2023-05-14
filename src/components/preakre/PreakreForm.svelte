<script lang="ts">
  import InfoSvelte from './steps/Info.svelte'
  import SleepSvelte from './steps/Sleep.svelte'
  import GadgetsSvelte from './steps/Gadgets.svelte'
  import SummarySvelte from './steps/Summary.svelte'
  import { preakreForm, preakreStep } from './preakreStore'
  import Steps from './Steps.svelte'

  function nextStep(preakreType: 'premium' | 'normal') {
    $preakreStep = 1
    $preakreForm.preakreType = preakreType
  }
</script>

<h1 class="mt-32 mb-6 text-4xl font-bold text-center">
  {#if $preakreStep === 0}
    Preakredytacja
  {:else}
    {$preakreForm.preakreType === 'normal' ? 'Akredytacja' : 'Pszczeli Patron'}
  {/if}
</h1>

{#if $preakreStep === 0}
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
            <div class="badge badge-outline">Przelewy24</div>
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
          Pszczeli Patron
          <div class="badge badge-error">100 zł</div>
        </h2>
        <p>Wspieram SkierCon! Chcę zostać mecenasem!</p>
        <div class="flex justify-between">
          <div class="card-actions justify-end mt-4">
            <div class="badge badge-outline">Przelewy24</div>
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

<Steps />

<div class="w-full max-w-xl mx-auto">
  {#if $preakreStep === 1}
    <InfoSvelte />
  {:else if $preakreStep === 2}
    <SleepSvelte />
  {:else if $preakreStep === 3}
    <GadgetsSvelte />
  {:else if $preakreStep === 4}
    <SummarySvelte />
  {/if}
</div>
