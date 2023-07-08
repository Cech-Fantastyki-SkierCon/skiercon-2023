<script lang="ts">
  import InfoSvelte from './steps/Info.svelte'
  import SleepSvelte from './steps/Sleep.svelte'
  import GadgetsSvelte from './steps/Gadgets.svelte'
  import SummarySvelte from './steps/Summary.svelte'
  import { preakreStep } from './preakreStore'
  import Steps from './Steps.svelte'
</script>

<h1 class="mt-28 md:mb-6 text-3xl md:text-4xl font-bold text-center">
  Preakredytacja
</h1>

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
