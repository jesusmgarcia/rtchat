import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [showUsers, setShowUsers] = useState(null);

  useGetOtherUsers();
  const { otherUsers } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout`);

      navigate('/login');

      toast.success(res.data.message);

      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (search === '') {
      setShowUsers(null);
    } else {
      const conversationUser = otherUsers?.find((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase()),
      );
      if (conversationUser) {
        //dispatch(setOtherUsers([conversationUser]));
        const showFindUsers = [];
        showFindUsers.push(conversationUser);

        setShowUsers(showFindUsers);
      } else {
        toast.error('User not found!');
      }
    }
  };

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action='' className='flex items-center gap-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered rounded-md'
          type='text'
          placeholder='Search...'
        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none' />
        </button>
      </form>
      <div className='divider px-3'></div>
      <OtherUsers users={showUsers ? showUsers : otherUsers} />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
