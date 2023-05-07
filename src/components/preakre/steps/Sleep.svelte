<script lang="ts">
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreStep } from '../preakreStore'
</script>

<form on:submit|preventDefault={() => $preakreStep++}>
  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        bind:checked={$preakreForm.sleep}
      />
      <div>
        <p class="mb-2 text-xl">
          Miejsce na sleep-roomie (<span class="text-cyan-400">+5,00 zł</span>)
        </p>
        <p>
          Za symboliczną opłatą udostępniamy uczestnikom konwentu miejsce na
          sleep-roomie. <b>Hala sportowa</b> pobliskiej szkoły.
        </p>
      </div>
    </label>
  </div>
  <Controls />
</form>
