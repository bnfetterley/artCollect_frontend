import App from './App';
import React from 'react';
import { useSelector } from 'react-redux';

const State = (props) => {
  const username = useSelector((state) => state.username);

  const login = useSelector((state) => state);

  console.log(username);

  return <App login={login} />;
};

export default State;
