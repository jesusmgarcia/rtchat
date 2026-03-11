import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import type { RootState } from '../redux/store';

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store: RootState) => store.socket);
  const { messages } = useSelector((store: RootState) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => socket?.off('newMessage');
  }, [setMessages, messages]);
};
export default useGetRealTimeMessage;
