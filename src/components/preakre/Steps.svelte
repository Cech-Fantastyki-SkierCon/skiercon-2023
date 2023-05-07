<script lang="ts">
  import { preakreStep } from './preakreStore'
</script>

{#if $preakreStep > 0}
  <div class="flex justify-center">
    <ul class="steps steps-vertical lg:steps-horizontal mb-12">
      <li class="step step-info">Informacje</li>
      <li class="step" class:step-info={$preakreStep >= 2}>Sleep</li>
      <li class="step" class:step-info={$preakreStep >= 3}>Gadżety</li>
      <li class="step" class:step-info={$preakreStep >= 4}>Podsumowanie</li>
    </ul>
  </div>
{/if}
