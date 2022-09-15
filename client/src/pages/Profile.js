import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_USER } from '../utils/queries';
import DibsList from '../components/DibsList'
import Auth from '../utils/auth';

export default function Profile() {
const [ProfilePage, setProfilePage] = useState('dibs');
const token = Auth.loggedIn() ? Auth.getProfile() : null;

const { loading, data } = useQuery(QUERY_USER, {
  variables: { _id: token.data._id}
});

const user = data ? data.user : null;

if(user) {
  return (
    <div>
      <div >
      <h1>Profile</h1>
      {
        ProfilePage === 'dibs' ? 
          <div>
            <button onClick={() => setProfilePage('posts')}>Dibs</button> 
            <DibsList itemIds={user.dibsCalled} userId={token.data._id} />
          </div>
        : 
          <div>
            <button onClick={() => setProfilePage('dibs')}>My Posts</button>
            {/* <PostList /> */}
          </div>
      }
      </div>
    </div>
  );
} else {
  return(<h1>No user</h1>)
}
  
}
