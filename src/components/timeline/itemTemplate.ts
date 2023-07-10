import moment from 'moment'
import type { ProgramEvent } from 'src/__gen-api'

export function itemTemplate({ event }: { event: ProgramEvent }) {
  const author = event.authors
    // @ts-ignore
    .map(a => (a.guest ? '★' : '') + a.displayName)
    .join(', ')

  const organization = event.organization?.name
  const who =
    author === organization
      ? author
      : `${author} ${organization ? `(${organization})` : ''}`

  return `<div style="background-color: ${
    event.type?.color
  }; width: 100%; height: 100%; padding: 5px 7px;">
          <div style="font-weight: 700;">${event.name}</div>
          <div style="font-size: 13px">${who}</div>
          <div style="font-size: 13px">${event.type!.name} ${
    event.a11yForAdults ? '(18+)' : ''
  }</div>
          <div style="font-size: 13px">${moment(event.dateStart).format(
            'HH:mm'
          )} - ${moment(event.dateEnd).format('HH:mm')}</div>
        </div>`
}
