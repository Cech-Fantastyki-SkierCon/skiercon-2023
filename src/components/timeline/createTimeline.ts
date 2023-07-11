import type { ProgramEvent, ProgramPlace } from 'src/__gen-api'
import { type TimelineOptions, Timeline } from 'vis-timeline'
import { itemTemplate } from './itemTemplate'
import { DataSet } from 'vis-data'
import moment from 'moment'

function eventToItem(event: ProgramEvent) {
  return {
    id: event.id + '',
    start: new Date(event.dateStart!),
    end: moment(event.dateStart!)
      .add(event.durationMinutes, 'minutes')
      .toDate(),
    content: '',
    group: event.placeId,
    event,
  }
}

export function createTimeline(
  events: ProgramEvent[],
  places: ProgramPlace[],
  options: TimelineOptions = {}
) {
  const eventsDs = new DataSet(events.map(event => eventToItem(event)))
  const groups = places.map(place => ({
    id: place.id,
    content:
      window.innerWidth < 600
        ? ''
        : `<div font-size="14px">${place.name}</div>` +
          (place.programBlock
            ? ` <div style="font-size: 11px; line-height: 12x;">${place.programBlock.name}</div>`
            : ''),
  }))

  const container = document.getElementById('container')!
  const timeline = new Timeline(container, eventsDs, new DataSet(groups), {
    locale: 'pl',
    zoomMax: 1000 * 60 * 60 * 5,
    zoomMin: 1000 * 60 * 60 * 5,
    xss: { disabled: true },
    selectable: true,
    showWeekScale: false,
    zoomable: false,
    orientation: { axis: 'top' },
    groupHeightMode: 'fixed',
    margin: { item: { horizontal: 0, vertical: 2 } },
    stack: true,
    showMajorLabels: false,
    timeAxis: { scale: 'hour' },
    moment(date: any) {
      return moment(date).utcOffset('+02:00')
    },
    // @ts-ignore
    loadingScreenTemplate() {
      return `<div class="flex justify-center items-center h-screen w-full">
        <div class="mb-20">
          Ładowanie programu...
        </div>
      </div>`
    },
    template: itemTemplate,

    ...options,
  })

  timeline.on('select', a => {
    const selectId = a.items[0]
    const event = events.find(e => e.id == selectId)
    const startH = moment(event?.dateStart).format('HH:mm')
    const startDate = moment(event?.dateStart).format('DD') + ' lipca 2023'
    const endH = moment(event?.dateEnd).format('HH:mm')

    const a11y: string[] = []
    if (event?.place?.a11y)
      a11y.push('Miejsce dostępne dla osób z niepełnosprawnością ruchu')
    if (event?.a11yForAdults || event?.a11yOnlyForAdults)
      a11y.push('Sugerowany wiek uczestnika 18+')
    else if (event?.a11yForChildren) a11y.push('Sugerowany wiek uczestnika 7+')
    else a11y.push('Sugerowany wiek uczestnika 13+')

    if (event?.a11yForAutistic) a11y.push('Odpowiedni dla osób z autyzmem')
    if (event?.a11yForVisualImpairment)
      a11y.push('Odpowiedni dla osób z wadami wzroku')
    if (event?.a11yForHearingImpairment)
      a11y.push('Odpowiedni dla osób z wadami słuchu')
    if (event?.i18nEnglish)
      a11y.push('Wydarzenie z materiałami w języku angielskim')
    if (event?.i18nUkrainian)
      a11y.push('Wydarzenie w materiałami w języku ukraińskim')

    if (event) {
      // Set popup content
      const popup = document.querySelector('#eventModal')!
      popup.innerHTML = `
      <h3 class="text-lg font-bold pb-4">
        ${event.name}
      </h3>
      <div class="pb-3">
        <div>${event.place?.name}</div>
        <div class="text-sm text-gray-400">${
          event.place?.programArea?.name
        }</div>
      </div>
      <div class="pb-3">
        <div> ${startH} - ${endH}</div>
        <div class="text-sm text-gray-400">${startDate}</div>
      </div>
      <div class="pb-3">
        <div>${event.type?.name}</div>
        <div class="text-sm text-gray-400">${
          event.block ? `${event.block.name}` : ''
        }</div>
      </div>

        ${
          (event.triggers?.length ?? 0) > 0
            ? `<div class="pb-3">
                 <div class="py-1">
                  <div>Triggery</div>
                  ${event.triggers
                    ?.map(
                      t =>
                        `<div class="text-sm text-gray-400">- ${t.name}</div>`
                    )
                    .join('')}
                </div>
              </div>`
            : ``
        }

      <div class="pb-3">
        <div>Dostępność</div>
        <div class="text-sm text-gray-400">
          ${a11y.map(a => `<div>- ${a}</div>`).join('')}
        </div>
      </div>
      <div class="pb-2">
        <div>${event.authors.length > 1 ? 'Autorzy' : 'Autor'}</div>
        <div class="text-sm text-gray-400">
          ${event.authors
            .map(
              a =>
                `<div class="flex items-center py-1">
                  <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full mr-2 bg-zinc-900 overflow-hidden">
                    <img src="${a.image?.url ?? '/icons/person.svg'}"  />
                  </div>
                  </div>
                  <div>${a.displayName}</div>
                </div>`
            )
            .join('')}
        </div>
      </div>
      ${
        event.organization
          ? `<div class="pb-3">
              <div>Organizator</div>
              <div class="text-sm text-gray-400">
                ${event.organization.name}
              </div>
            </div>`
          : ''
      }
    
      <div class="pt-2">
        <div>Opis wydarzenia</div>
        <div class="text-sm text-gray-400">
        ${event.description}
        </div>
      </div>

      <div class="modal-action">
        <label onclick="eventModalCheckbox.checked = false" class="btn">Zamknij</label>
      </div>
      `

      // Open popup
      const checkbox = document.querySelector(
        '#eventModalCheckbox'
      )! as HTMLInputElement
      checkbox.checked = true
    }
  })

  window.scrollTo(0, 0)
  setTimeout(() => {
    timeline.moveTo('2023-07-27T16:00:00+02:00')
  }, 0)

  return timeline
}
