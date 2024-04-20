import Event from './event';

export const Rows = ({ rows, colWidth, startDate }) => {
  return rows.map((row) => (
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
  ));
};
