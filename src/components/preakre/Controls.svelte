<script lang="ts">
  import { preakreStep } from './preakreStore'
  export let lastStep = false
  export let loading = false
  export let firstStep = false

  function back() {
    if (loading) return
    $preakreStep--
  }
</script>

<div
  class="flex md:flex-row mt-20"
  class:flex-col-reverse={lastStep}
  class:justify-end={firstStep}
  class:justify-between={!firstStep}
>
  {#if !firstStep}
    <button type="button" class="btn" on:click={back} disabled={loading}>
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
  {/if}
  <button type="submit" class="btn btn-warning" class:mb-5={lastStep}>
    {#if lastStep}
      Przejdź do płatności
    {:else}
      Dalej
    {/if}
    {#if loading}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="animate-spin ml-2 inline-block"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3a9 9 0 1 0 9 9"
        />
      </svg>
    {:else}
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
        />
      </svg>
    {/if}
  </button>
</div>
