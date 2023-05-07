<script lang="ts">
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreState, step } from '../preakreStore'
</script>

<form on:submit|preventDefault={() => $step++}>
  {#if $preakreForm.preakreType === 'premium'}
    <p class="mb-4">
      Jako <b>Pszczeli Patron</b> wpierasz finansowo organizację SkierConu - otrzymasz
      specjalny identyfikator, kilka drobnych upominków (w&nbsp;tym pamiątkowego
      SkierCoina) i&nbsp;naszą wdzięczność.
    </p>
    <p>
      Pszczelego Patrona <b>nie obejmują zniżki</b> na akredytację (jako Twórcy Programu
      lub uczestnika konkursu).
    </p>
    <div class="divider" />
  {/if}

  <div class="form-control w-full mb-4">
    <label class="label" for="person">
      <span class="text-xl">Imię "pseudonim" nazwisko</span>
    </label>
    <input
      id="person"
      type="text"
      placeholder="Król Julian"
      class="input input-bordered w-full"
      bind:value={$preakreForm.person}
      maxlength="60"
      autocomplete="given-name"
    />
  </div>

  <div class="form-control w-full mb-4">
    <label class="label" for="email">
      <span class="text-xl">E-mail<span class="required">*</span></span>
    </label>
    <input
      id="email"
      type="email"
      class="input input-bordered w-full"
      bind:value={$preakreForm.email}
      placeholder="shrek@bagno.com"
      autocomplete="email"
      inputmode="email"
      required
    />
  </div>

  <div class="mt-7">
    <p>
      Na podany adres e-mail zostanie wysłany <b>kod QR</b>, który należy okazać
      przy akredytacji.
    </p>
    {#if $preakreForm.preakreType === 'normal'}
      <p class="mt-4">
        Jeśli planujesz być Twórcą Programu lub uczestnikiem któregoś
        z&nbsp;konkursów (JaSkier/OSkier), zwróć uwagę, żeby podać ten sam adres
        e-mail co w zgłoszeniu punktu programu lub zgłoszeniu konkursowym.
        W&nbsp;oparciu o e-mail będziemy mogli zweryfikować Twoją zniżkę.
      </p>
    {/if}
  </div>

  <div class="divider" />

  <div class="form-control mb-3">
    <div class="mb-2 text-xl">
      Twój wiek na dzień 28 lipca 2023 r. <span class="required">*</span>
    </div>
    <div class="w-24">
      <label class="label cursor-pointer justify-start">
        <input
          type="radio"
          name="radio-10"
          class="radio mr-4"
          checked
          value={18}
          bind:group={$preakreState.age}
        />
        <span class="label-text">18+</span>
      </label>
      <label class="label cursor-pointer justify-start">
        <input
          type="radio"
          name="radio-10"
          class="radio mr-4"
          value={13}
          bind:group={$preakreState.age}
        />
        <span class="label-text">13-18</span>
      </label>
      {#if $preakreForm.preakreType === 'normal'}
        <label class="label cursor-pointer justify-start">
          <input
            type="radio"
            name="radio-10"
            class="radio mr-4"
            value={7}
            bind:group={$preakreState.age}
          />
          <span class="label-text">7-13</span>
        </label>
      {/if}
    </div>
  </div>
  {#if $preakreState.age === 7}
    <p>
      Pamiętaj, jeśli jesteś osobą poniżej 13 roku życia, po terenie konwentu
      możesz poruszać się jedynie z pełnoletnim opiekunem.
    </p>
  {/if}
  {#if $preakreState.age === 13}
    <p>
      Pamiętaj, jeśli jesteś osobą, która skończyła 13 lat, ale nie jest jeszcze
      pełnoletnia, zabierz ze sobą zgodę opiekuna prawnego - <a
        href="https://drive.google.com/file/d/1JPMskT2EQtDTEyjflPNGquzyjDsvfvBv/view"
        class="link link-info link-blank"
        target="_blank"
      >
        Karta Młodego SkierConauty</a
      > Jest niezbędna do poruszania się po konwencie.
    </p>
  {/if}

  <div class="divider" />

  <div class="form-control mt-4">
    <label class="label cursor-pointer items-start justify-start">
      <input
        type="checkbox"
        class="checkbox mr-4 mt-1"
        bind:checked={$preakreForm.transportHelp}
      />
      <div>
        <p class="mb-3 text-xl">
          Jestem osobą z&nbsp;niepełnosprawnością wzroku
        </p>

        {#if $preakreForm.transportHelp}
          <p class="mt-4">
            Nasi wolontariusze mogą pomóc ci między innymi w&nbsp;dotarciu
            z&nbsp;dworca PKP Skierniewice na teren konwentu. Napisz do nas na
            adres <a
              href="mailto:dostepnosc@skiercon.pl"
              class="link link-info"
            >
              dostepnosc@skiercon.pl
            </a> w&nbsp;celu ustalenia szczegółów.
          </p>
        {/if}
      </div>
    </label>
  </div>
  <Controls />
</form>
