import { useMemo, useState } from 'react';
import './index.css';
import { useCreateRows } from './utils';
import { Zoom } from './zoom';
import { DayHeader } from './dayHeader';
import { Rows } from './rows';

const Timeline = (props) => {
  const { timelineItems } = props;
  const [colWidth, setColWidth] = useState(40);
  const {
    events: rows,
    startDate,
    endDate,
    dayHeader,
  } = useCreateRows(timelineItems);

  return (
    <div className='m-8'>
      <div className='flex gap-8 items-center'>
        <h1 className=' font-bold text-lg'>
          Showing {startDate} through {endDate}
        </h1>
        <Zoom colWidth={colWidth} setColWidth={setColWidth} />
      </div>

      <div className='flex flex-col gap-4 border-4 border-black/30 w-fit relative'>
        <DayHeader dayHeader={dayHeader} colWidth={colWidth} />
        <Rows colWidth={colWidth} startDate={startDate} rows={rows} />
      </div>
    </div>
  );
};

export default Timeline;
