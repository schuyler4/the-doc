import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

function Logout() {
  function onClick() {
    cookie.remove('userId', { path: '/' });
    browserHistory.push('/login');
  }

  return (
    <button onClick={onClick}>Logout</button>
  );
}

export default Logout;
