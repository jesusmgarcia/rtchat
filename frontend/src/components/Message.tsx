import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const time = new Date(message.createdAt);
  time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); // "14:05"
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  if (!message) return;

  return (
    <div
      ref={scroll}
      className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}
    >
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Tailwind CSS chat bubble component'
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className='chat-header'>
        <time className='text-xs opacity-50 text-white'>{hours + ':' + minutes}</time>
      </div>
      <div
        className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
