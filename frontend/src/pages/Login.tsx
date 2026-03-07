import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
