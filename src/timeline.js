import { useMemo } from 'react';
import timelineItems from './timelineItems';

function dateOverlaps(e1, e2) {
  return (
    (e1.start <= e2.start && e2.start <= e1.end) ||
    (e1.start <= e2.end && e2.end <= e1.end) ||
    (e2.start < e1.start && e1.end < e2.end) ||
    (e1.start < e2.start && e2.end < e1.end)
  );
}

const isCollision = (event, timelineItems) => {
  return timelineItems.some((e) => event.id !== e.id && dateOverlaps(event, e));
};

const Timeline = () => {
  const rows = useMemo(() => {
    const theRows = timelineItems.reduce((acc, event) => {
      const noCollisionRow = acc.findIndex(
        (row) => !isCollision(event, row.events)
      );
      if (noCollisionRow === -1) {
        acc.push({ id: acc.length, events: [] });
        acc[acc.length - 1].events.push(event);
      } else {
        acc[noCollisionRow].events.push(event);
      }
      return acc;
    }, []);
    theRows.forEach((row) =>
      row.events.sort((a, b) => (a.start < b.start ? -1 : 1))
    );
    return theRows;
  }, []);
  console.log(rows);
  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.events.map((event) => (
            <div key={event.id}>{event.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
