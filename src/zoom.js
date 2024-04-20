import { maxColWidth, minColWidth } from './constants';

export const Zoom = ({ colWidth, setColWidth }) => {
  return (
    <>
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
    </>
  );
};
