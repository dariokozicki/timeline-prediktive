import { useMemo } from 'react';
import timelineItems from './timelineItems';

export const datediff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

export const dateOverlaps = (e1, e2) => {
  return (
    (e1.start <= e2.start && e2.start <= e1.end) ||
    (e1.start <= e2.end && e2.end <= e1.end) ||
    (e2.start < e1.start && e1.end < e2.end) ||
    (e1.start < e2.start && e2.end < e1.end)
  );
};

export const isCollision = (event, timelineItems) => {
  return timelineItems.some((e) => event.id !== e.id && dateOverlaps(event, e));
};

export const createRows = (timelineItems) => {
  const { events, startDate, endDate } = timelineItems.reduce(
    (acc, event) => {
      // Find first row that doesn't overlap with current event
      const noCollisionRow = acc.events.findIndex(
        (row) => !isCollision(event, row.events)
      );
      if (noCollisionRow === -1) {
        // Have to create new row because it overlaps with all previous ones
        acc.events.push({ id: acc.events.length, events: [] });
        acc.events[acc.events.length - 1].events.push(event);
      } else {
        // Otherwise push to the first that doesn't overlap
        acc.events[noCollisionRow].events.push(event);
      }
      //Keep track of first overall date
      if (!acc.startDate || event.start < acc.startDate) {
        acc.startDate = event.start;
      }
      // Keep track of last overall date
      if (!acc.endDate || event.end > acc.endDate) {
        acc.endDate = event.end;
      }
      return acc;
    },
    { events: [], startDate: null, endDate: null }
  );
  // Sort events by start date within the rows
  events.forEach((row) =>
    row.events.sort((a, b) => (a.start < b.start ? -1 : 1))
  );

  const interval = datediff(new Date(startDate), new Date(endDate)) + 1;

  return {
    events,
    startDate,
    endDate,
    dayHeader: Array.from({ length: interval }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i + 1);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }),
  };
};

export const useCreateRows = (timelineItems) => {
  const rows = useMemo(() => createRows(timelineItems), [timelineItems]);

  return rows;
};
