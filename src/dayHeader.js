export const DayHeader = ({ dayHeader, colWidth }) => {
  return (
    <div className=' flex font-semibold border-b-2 border-black'>
      {dayHeader.map((day) => (
        <div className='text-center' style={{ width: colWidth }} key={day}>
          {day}
        </div>
      ))}
    </div>
  );
};
