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
      const noCollisionRow = acc.events.findIndex(
        (row) => !isCollision(event, row.events)
      );
      if (noCollisionRow === -1) {
        acc.events.push({ id: acc.events.length, events: [] });
        acc.events[acc.events.length - 1].events.push(event);
      } else {
        acc.events[noCollisionRow].events.push(event);
      }
      if (!acc.startDate || event.start < acc.startDate) {
        acc.startDate = event.start;
      }
      if (!acc.endDate || event.end > acc.endDate) {
        acc.endDate = event.end;
      }
      return acc;
    },
    { events: [], startDate: null, endDate: null }
  );
  events.forEach((row) =>
    row.events.sort((a, b) => (a.start < b.start ? -1 : 1))
  );
  const interval = datediff(new Date(startDate), new Date(endDate)) + 1;
  return {
    events,
    startDate,
    endDate,
    interval,
    dayHeader: Array.from({ length: interval }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i + 1);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }),
  };
};

export const minColWidth = 40;
export const maxColWidth = 120;
