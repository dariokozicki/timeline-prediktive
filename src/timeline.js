import { useMemo, useState } from 'react';
import './index.css';
import Event from './event';
import { createRows, maxColWidth, minColWidth } from './utils';

const Timeline = (props) => {
  const { timelineItems } = props;
  const [colWidth, setColWidth] = useState(40);
  const {
    events: rows,
    startDate,
    endDate,
    dayHeader,
  } = useMemo(() => createRows(timelineItems), []);

  return (
    <div className='m-8'>
      <div className='flex gap-8 items-center'>
        <h1 className=' font-bold text-lg'>
          Showing {startDate} through {endDate}
        </h1>
        <button
          className='rounded-md bg-green-200 px-2'
          onClick={() => colWidth < maxColWidth && setColWidth(colWidth + 20)}
        >
          Zoom in
        </button>
        <button
          className='rounded-md bg-red-200 px-2'
          onClick={() => colWidth > minColWidth && setColWidth(colWidth - 20)}
        >
          Zoom out
        </button>
      </div>

      <div className='flex flex-col gap-4 border-4 border-black/30 w-fit relative'>
        <div className=' flex font-semibold border-b-2 border-black'>
          {dayHeader.map((day) => (
            <div className='text-center' style={{ width: colWidth }} key={day}>
              {day}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className='flex justify-start items-center before:absolute before:w-full before:h-2 before:bg-blue-400/80 before:-z-10'
          >
            {row.events.map((event, i) => (
              <Event
                key={event.id}
                event={event}
                colWidth={colWidth + 'px'}
                prevEventDate={i ? row.events[i - 1].end : startDate}
                isFirst={!i}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
