<script lang="ts">
  import { step } from './preakreStore'
</script>

{#if $step > 0}
  <div class="flex justify-center">
    <ul class="steps steps-vertical lg:steps-horizontal mb-12">
      <li class="step step-info">Informacje</li>
      <li class="step" class:step-info={$step >= 2}>Sleep</li>
      <li class="step" class:step-info={$step >= 3}>Gadżety</li>
      <li class="step" class:step-info={$step >= 4}>Podsumowanie</li>
    </ul>
  </div>
{/if}
