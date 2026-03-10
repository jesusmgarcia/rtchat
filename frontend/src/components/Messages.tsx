import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store: RootState) => store.message);

  console.log(messages);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages &&
        messages?.map((message) => {
          return <Message message={message} />;
        })}
    </div>
  );
};

export default Messages;
