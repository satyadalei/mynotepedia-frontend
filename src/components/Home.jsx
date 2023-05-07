import React, { useContext } from 'react';
import Notes from './Notes';
import LoginContext from '../context/loginstatus/loginContext';
import Login from './Login';

const Home = () => {
  const loginContext = useContext(LoginContext);
  const { logedInStatus } = loginContext;
  if (logedInStatus) {
    return (
      <>
        <Notes />
      </>
    )
  } else {
    return (
      <>
        <div className="container">
          <h1>This is home page. Now you are looking to get details</h1>
          <h4>You need to login </h4>
          <Login />
        </div>
      </>
    )
  }


}

export default Home