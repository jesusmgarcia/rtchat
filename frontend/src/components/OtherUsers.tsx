import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUser from './OtherUser';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const OtherUsers = () => {
  useGetOtherUsers();

  const { otherUsers } = useSelector((store: RootState) => store.user);
  if (!otherUsers) return; // early return in react

  return (
    <div className='overflow-auto flex-1'>
      {otherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
