import Sidebar from '../components/Sidebar';
import MessageContainer from '../components/MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { RootState } from '../redux/store';

const HomePage = () => {
  const { authUser } = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden glass bg-clip-padding bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
