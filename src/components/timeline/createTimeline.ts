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
      `<div font-size="14px">${place.name}</div>` +
      (place.programBlock
        ? ` <div style="font-size: 11px; line-height: 12x;">${place.programBlock.name}</div>`
        : ''),
  }))

  const container = document.getElementById('container')!
  const timeline = new Timeline(container, eventsDs, new DataSet(groups), {
    locale: 'pl',
    zoomMax: 1000 * 60 * 60 * 5,
    zoomMin: 1000 * 60 * 60 * 5,
    start: '2023-07-28T16:00:00+02:00',
    end: '2023-07-30T16:30:00+02:00',
    min: '2023-07-28T16:00:00+02:00',
    max: '2023-07-30T16:30:00+02:00',
    xss: { disabled: true },
    selectable: false,
    showWeekScale: false,
    zoomable: false,
    orientation: { axis: 'top' },
    groupHeightMode: 'fixed',
    margin: { item: { horizontal: 0, vertical: 2 } },
    stack: true,
    showMajorLabels: false,
    moment(date: any) {
      return moment(date).utcOffset('+02:00')
    },
    // @ts-ignore
    loadingScreenTemplate() {
      return `<div class="flex justify-center items-center h-screen w-full">
        <div>
        Ładowanie programu...
        </div>
      </div>`
    },
    template: itemTemplate,
    ...options,
  })

  return timeline
}
