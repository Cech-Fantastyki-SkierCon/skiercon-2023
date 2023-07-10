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

//  Piątek 16:00-01:00
//  Sobota 8:00-04:00
//  Niedziela 9:00-16:30

function isEventInDay(
  event: ProgramEvent,
  day: 'friday' | 'saturday' | 'sunday'
) {
  const dateStart = moment(event.dateStart)
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
    moment.locale('pl')
  }, [])

  useEffect(() => {
    if (timeline) timeline.destroy()

    const events = props.events.filter(event => isEventInDay(event, activeDay))

    const options = {
      min: '',
      max: '',
    }

    if (activeDay === 'friday') {
      options.min = '2023-07-28T16:00:00+02:00'
      options.max = '2023-07-29T01:00:00+02:00'
    } else if (activeDay === 'saturday') {
      options.min = '2023-07-29T08:00:00+02:00'
      options.max = '2023-07-30T04:00:00+02:00'
    } else if (activeDay === 'sunday') {
      options.min = '2023-07-30T09:00:00+02:00'
      options.max = '2023-07-30T16:30:00+02:00'
    }

    setTimeline(createTimeline(events, props.places, options))
  }, [activeDay])

  return (
    <div>
      <nav className="fixed bottom-0 bg-base-200 z-10 p-1 w-full ">
        <div className="container flex justify-center">
          <div className="tabs">
            <a
              onClick={() => setActiveDay('friday')}
              className={`tab  tab-lg tab-bordered ${
                activeDay === 'friday' && 'tab-active'
              }`}
            >
              Piątek
            </a>
            <a
              onClick={() => setActiveDay('saturday')}
              className={`tab  tab-lg tab-bordered ${
                activeDay === 'saturday' && 'tab-active'
              }`}
            >
              Sobota
            </a>
            <a
              onClick={() => setActiveDay('sunday')}
              className={`tab  tab-lg tab-bordered ${
                activeDay === 'sunday' && 'tab-active'
              }`}
            >
              Niedziela
            </a>
          </div>
        </div>
      </nav>
      <div id="container"></div>
    </div>
  )
}
