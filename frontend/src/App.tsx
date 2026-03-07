import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

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
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
