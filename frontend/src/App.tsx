import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store: RootState) => store.user);
  const { socket } = useSelector((store: RootState) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${import.meta.env.VITE_SERVER_URL}`, {
        query: {
          userId: authUser._id,
        },
      });

      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
