import './index.css';
import { useForm } from 'react-hook-form';
import { datediff } from './utils';

const Event = (props) => {
  const { id, name, start, end } = props.event;
  const { colWidth, prevEventDate, isFirst } = props;
  const { register } = useForm({ defaultValues: { name } });
  const interval = datediff(new Date(start), new Date(end));
  const padding = isFirst
    ? datediff(new Date(prevEventDate), new Date(start))
    : datediff(new Date(prevEventDate), new Date(start)) - 1;

  return (
    <div
      key={id}
      className='px-2 rounded-md border-2 bg-blue-100 border-blue-200'
      style={{
        width: `calc(${colWidth} * ${interval + 1})`,
        marginLeft: `calc(${colWidth} * ${padding > 0 ? padding : 0})`,
      }}
    >
      <textarea
        {...register('name')}
        className='bg-transparent resize-none text-center w-full overflow-hidden'
        rows={2}
      />
    </div>
  );
};

export default Event;
