<script lang="ts">
  export let lastStep = false
  import { step } from './preakreStore'
</script>

<div class="flex justify-between mt-20">
  <button type="button" class="btn" on:click={() => $step--}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      class="mr-2 inline-block"
      viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14M5 12l6 6m-6-6l6-6"
      /></svg
    > Wstecz
  </button>
  <button type="submit" class="btn btn-warning">
    {#if lastStep}
      Przejdź do płatności
    {:else}
      Dalej
    {/if}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ml-2 inline-block"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14m-6 6l6-6m-6-6l6 6"
      /></svg
    >
  </button>
</div>
