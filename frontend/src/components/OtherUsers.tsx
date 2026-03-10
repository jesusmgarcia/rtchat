
import OtherUser from './OtherUser';

const OtherUsers = ({ users }) => {

  if (!users) return; // early return in react

  return (
    <div className='overflow-auto flex-1'>
      {users?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
