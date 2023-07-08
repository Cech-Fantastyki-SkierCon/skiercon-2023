<script lang="ts">
  import Controls from '../Controls.svelte'
  import { preakreForm, preakreStep } from '../preakreStore'
</script>

<form on:submit|preventDefault={() => $preakreStep++}>
  {#if $preakreForm.preakreType === 'premium'}
    <p class="mb-2">
      U nas zawsze jest jak w&nbsp;ulu i&nbsp;pracujemy dzielnie jak pszczółki,
      by przygotować dla Was naprawdę magiczny konwent. W&nbsp;tym roku możecie
      wesprzeć nas i&nbsp;objąć Pszczelim Patronatem.
    </p>
    <label class="label cursor-pointer justify-start">
      <input
        type="radio"
        name="payMore"
        class="radio mr-4"
        checked
        value={false}
        bind:group={$preakreForm.payMore}
      />
      <span class="label-text text-cyan-400">100,00 zł</span>
    </label>
    <label class="label cursor-pointer justify-start">
      <input
        type="radio"
        name="payMore"
        class="radio mr-4"
        value={true}
        bind:group={$preakreForm.payMore}
      />
      <span class="label-text">wincyj!</span>
    </label>
    {#if $preakreForm.payMore}
      <div class="form-control w-full mb-6">
        <label class="label" for="additional">
          <span class="text-xl">
            Ile chcesz przeznaczyć? <br />(Co najmniej 100,00 zł, zaokrąglij do
            10)
          </span>
        </label>
        <input
          id="additional"
          type="number"
          min="100"
          max="10000"
          step="10"
          required
          placeholder="np. 150 zł"
          class="input input-bordered w-full text-cyan-400"
          bind:value={$preakreForm.additionalPayment}
          maxlength="60"
          autocomplete="given-name"
        />
      </div>
    {/if}
    <p class="my-4">
      <b>Pszczeli Patron</b> poszczycić się będzie mógł dostojną pszczelą koroną
      (znaną w&nbsp;szerszym gronie jako opaska z&nbsp;czułkami) i&nbsp;specjalnym
      identyfikatorem, a&nbsp;ubytek w portfelu uzupełni pamiątkowym SkierCoinem.
      Życie osłodzimy mu w&nbsp;podzięce miodkiem z&nbsp;lokalnej pasieki i&nbsp;ogromem
      wdzięczności za wsparcie.
    </p>
    <p class="my-6 alert alert-info shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current flex-shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      Pszczelego Patrona nie obejmują zniżki na akredytację (jako Twórcy Programu
      lub uczestnika konkursu JaSkier/OSkier).
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
      Na podany <b>adres e-mail</b> zostanie wysłany <b>kod QR</b>, który należy
      okazać przy akredytacji.
    </p>
    {#if $preakreForm.preakreType === 'normal'}
      <p class="my-6 alert alert-info shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        Jeśli planujesz być Twórcą Programu lub uczestnikiem któregoś z&nbsp;konkursów
        (JaSkier/OSkier), zwróć uwagę, żeby podać ten sam adres e-mail co w zgłoszeniu
        punktu programu lub zgłoszeniu konkursowym. W&nbsp;oparciu o e-mail będziemy
        mogli zweryfikować Twoją zniżkę.
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
          required
          checked
          value={18}
          bind:group={$preakreForm.age}
        />
        <span class="label-text">18+</span>
      </label>
      <label class="label cursor-pointer justify-start">
        <input
          type="radio"
          name="radio-10"
          class="radio mr-4"
          required
          value={13}
          bind:group={$preakreForm.age}
        />
        <span class="label-text">13-18</span>
      </label>
      {#if $preakreForm.preakreType === 'normal'}
        <label class="label cursor-pointer justify-start">
          <input
            type="radio"
            name="radio-10"
            class="radio mr-4"
            required
            value={7}
            bind:group={$preakreForm.age}
          />
          <span class="label-text">7-13</span>
        </label>
      {/if}
    </div>
  </div>
  {#if $preakreForm.age === 7}
    <p>
      Pamiętaj, jeśli jesteś osobą poniżej 13 roku życia, po terenie konwentu
      możesz poruszać się jedynie z pełnoletnim opiekunem.
    </p>
  {/if}
  {#if $preakreForm.age === 13}
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
  <Controls firstStep={true} />
</form>
