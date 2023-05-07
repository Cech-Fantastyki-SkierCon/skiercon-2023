<script lang="ts">
  import type { CreateTransactionDto } from 'src/__gen-api'
  import { preakreForm, step } from '../preakreStore'
  import Controls from '../Controls.svelte'

  let wantTshirt = $preakreForm.tshirt !== undefined
  $: if (!wantTshirt) {
    $preakreForm.tshirt = undefined
  }

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
</script>

<form on:submit|preventDefault={() => $step++}>
  {#if $preakreForm.preakreType === 'premium'}
    <div class="mt-5 mb-3">
      <p class="mb-3">
        Jako <b>Pszczeli Patron</b> otrzymasz <b>specjalny identyfikator</b>,
        oraz kilka drobnych upominków - w&nbsp;tym pamiątkowego
        <b>SkierCoina</b>.
      </p>
      <p>Dodatkowo możesz zamówić nasze SkierConowe gadżety:</p>
    </div>
  {/if}

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        bind:checked={$preakreForm.mug}
      />
      <div>
        <p class="mb-3 text-xl">
          SkierQubas - Kubek (<span class="text-cyan-400">+50,00 zł</span>)
        </p>
        <p>
          Legendarny offhand, stworzony w&nbsp;<b
            >Warsztacie Garncarskim Rodziny Konopczyńskich</b
          > w&nbsp;Bolimowie, mieści ok. 400 ml many.
        </p>
        <div
          class="rounded-2xl border-4 border-stone-900 overflow-hidden mt-4 mb-1"
        >
          <img
            src="/skiercon-kubki.jpg"
            class="object-cover h-56 w-full transition-all duration-200"
            class:opacity-40={!$preakreForm.mug}
            alt="Kubki SkierQubas z poprzednich lat"
            width="641"
            height="335"
          />
        </div>
        <p class="text-sm text-center">
          (Zdjęcie podglądowe - kolory i kształty kubków mogą się różnić)
        </p>
      </div>
    </label>
  </div>

  <div class="divider" />

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        bind:checked={wantTshirt}
      />
      <div>
        <p class="mb-3 text-xl">
          Koszulka konwentowa (<span class="text-cyan-400">+40,00 zł</span>)
        </p>
        <p>
          Wysokiej jakości czarny t-shirt unisex, 100% bawełna, gramatura
          200g/m², nadruk z&nbsp;przodu. <a
            href="https://share.adler.info/files//label/137---product_size.pdf"
            class="link link-info link-blank"
            target="_blank">Tabela rozmiarów</a
          >
        </p>
      </div>
    </label>
  </div>

  {#if wantTshirt}
    <div class="form-control w-full pl-10 my-2">
      <label class="label" for="size">
        <span>Wybierz rozmiar <span class="required">*</span></span>
      </label>
      <select
        class="select select-bordered"
        id="size"
        bind:value={$preakreForm.tshirt}
      >
        {#each tshirtSizes as size}
          <option value={size}>{size}</option>
        {/each}
      </select>
    </div>
  {/if}

  <div class="divider" />

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        bind:checked={$preakreForm.paper}
      />
      <div>
        <p class="mb-3 text-xl">
          Papierowy informator konwentowy (<span class="text-cyan-400"
            >+0,00 zł</span
          >)
        </p>
        <p class="">
          Chcemy oszczędzać papier i&nbsp;nie produkować niepotrzebnej
          makulatury, dlatego wydrukujemy tylko tyle informatorów konwentowych,
          ile zostanie zamówionych przez uczestników. Dla każdego dostępny
          będzie informator w&nbsp;wersji elektronicznej oraz w&nbsp;<a
            href="https://konwencik.pl/"
            target="_blank"
            class="link link-info link-blank">aplikacji Konwencik</a
          >
        </p>
      </div>
    </label>
  </div>
  <Controls />
</form>
