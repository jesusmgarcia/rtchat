import { useState, type SubmitEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const onSubmitHandler: SubmitEventHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      console.log(error);
    }

    setUser({
      username: '',
      password: '',
    });
  };
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding glass bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action=''>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-primary input-bordered h-10'
              type='text'
              placeholder='Username'
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-primary input-bordered h-10'
              type='password'
              placeholder='Password'
            />
          </div>
          <p className='text-center my-4'>
            Don't have an account?{' '}
            <Link className='text-primary' to='/register'>
              Register here
            </Link>
          </p>
          <div>
            <button
              type='submit'
              className='btn btn-primary btn-block btn-md mt-2 border border-slate-700'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
