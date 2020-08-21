import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };
  return (
    <Fragment>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        {' '}
        <h1> artCollect </h1>{' '}
      </header>
      <br></br>
      <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
        <Link to="/usercollection"> User Collection</Link>
      </nav>
    </Fragment>
  );
};

export default Nav;
