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
        <p class="mb-2 text-lg md:text-xl">
          Miejsce na sleep-roomie (<span class="text-cyan-400"
            >+5,00&nbsp;zł</span
          >)
        </p>
        <p>
          Za symboliczną opłatą udostępniamy uczestnikom konwentu miejsce na
          sleep-roomie, na hali sportowej <b>
          Zespołu Szkół Zawodowych
          Nr&nbsp;2&nbsp;w&nbsp;Skierniewicach</b> (ok.&nbsp;400m od konwentu).
          <a
              href="https://goo.gl/maps/p6pPH4rYa2VnWL5q8"
              target="_blank"
              class="link link-info link-blank">&nbspLink do Google Maps</a
            >        
        </p>
      </div>
    </label>
  </div>
  <Controls />
</form>
