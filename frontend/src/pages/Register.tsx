import { useState, type SubmitEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender: string) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler: SubmitEventHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
      console.log(error);
    }

    setUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    });
  };
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding glass border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action=''>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-primary input-bordered h-10'
              type='text'
              placeholder='Full Name'
            />
          </div>
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
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-primary input-bordered h-10'
              type='password'
              placeholder='Confirm Password'
            />
          </div>
          <div className='join my-6'>
            <input
              className='join-item btn btn-primary btn-soft'
              type='radio'
              checked={user.gender === 'male'}
              onChange={() => handleCheckbox('male')}
              name='options'
              aria-label='Male'
            />
            <input
              className='join-item btn btn-primary btn-soft'
              type='radio'
              checked={user.gender === 'female'}
              onChange={() => handleCheckbox('female')}
              name='options'
              aria-label='Female'
            />
          </div>
          <p className='text-center my-2'>
            Already have an account?{' '}
            <Link className='text-primary' to='/login'>
              Login here
            </Link>
          </p>
          <div>
            <button type='submit' className='btn btn-soft btn-primary btn-block btn-md mt-2 border'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
