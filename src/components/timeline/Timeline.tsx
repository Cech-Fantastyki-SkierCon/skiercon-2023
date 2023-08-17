import 'vis-timeline/styles/vis-timeline-graph2d.css'
import type { ProgramEvent, ProgramPlace } from 'src/__gen-api'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { createTimeline } from './createTimeline'
import type { Timeline } from 'vis-timeline'

interface Props {
  events: ProgramEvent[]
  places: ProgramPlace[]
}

function isEventInDay(
  event: ProgramEvent,
  day: 'friday' | 'saturday' | 'sunday'
) {
  if (event.durationMinutes! > 60 * 24) return true
  const dateStart = moment(event.dateStart).add(-4, 'hours')
  const dateEnd = moment(event.dateEnd)
  const dayStart = dateStart.day()
  const dayEnd = dateEnd.day()

  if (day === 'friday') {
    return dayStart === 5 || dayEnd === 5
  }

  if (day === 'saturday') {
    return dayStart === 6 || dayEnd === 6
  }

  if (day === 'sunday') {
    return dayStart === 0 || dayEnd === 0
  }
}

export function TimelineComponent(props: Props) {
  const [activeDay, setActiveDay] = useState<'friday' | 'saturday' | 'sunday'>(
    (['friday', 'saturday', 'sunday'] as const)[moment().day() - 5] || 'friday'
  )
  const [timeline, setTimeline] = useState<Timeline>()

  useEffect(() => {
    if (timeline) timeline.destroy()

    const events = props.events.filter(event => isEventInDay(event, activeDay))

    const options = {
      start: '',
      end: '',
      min: '',
      max: '',
    }

    if (activeDay === 'friday') {
      options.start = '2023-09-15T16:00:00+02:00'
      options.end = '2023-09-16T01:00:00+02:00'
    } else if (activeDay === 'saturday') {
      options.start = '2023-09-16T09:00:00+02:00'
      options.end = '2023-09-17T03:00:00+02:00'
    } else if (activeDay === 'sunday') {
      options.start = '2023-09-17T09:00:00+02:00'
      options.end = '2023-09-17T16:30:00+02:00'
    }

    options.min = options.start
    options.max = options.end

    setTimeline(createTimeline(events, props.places, options))
  }, [activeDay])

  return (
    <div>
      <nav
        className="fixed top-0 z-10 p-1 w-full border-b"
        style={{ background: '#212b49', borderColor: 'rgb(56, 72, 117)' }}
      >
        <div className="container flex justify-center">
          <div className="tabs py-1">
            <a
              onClick={() => setActiveDay('friday')}
              className={`tab mx-1 text-lg ${
                activeDay === 'friday' && 'tab-active'
              }`}
            >
              Piątek
            </a>
            <a
              onClick={() => setActiveDay('saturday')}
              className={`tab mx-1 text-lg ${
                activeDay === 'saturday' && 'tab-active'
              }`}
            >
              Sobota
            </a>
            <a
              onClick={() => setActiveDay('sunday')}
              className={`tab mx-1 text-lg ${
                activeDay === 'sunday' && 'tab-active'
              }`}
            >
              Niedziela
            </a>
          </div>
        </div>
      </nav>
      <div id="container"></div>

      {/* Modal */}
      <input type="checkbox" id="eventModalCheckbox" className="modal-toggle" />
      <label htmlFor="eventModalCheckbox" className="modal cursor-pointer">
        <label
          id="eventModal"
          className="modal-box relative"
          htmlFor=""
          style={{ background: '#212b49' }}
        ></label>
      </label>
      {/* eo Modal */}
    </div>
  )
}
