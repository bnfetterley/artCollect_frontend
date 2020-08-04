import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions';
import { withRouter } from 'react-router-dom';
import App from '../App';

const LoginPage = (props) => {
  // initializing dispatch
  const dispatch = useDispatch();
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const login = useSelector((state) => state);

  const errorMessage = (error) => {
    if (this.props.errorMessage) {
      return <div className="info-red">{this.props.errorMessage}</div>;
    }
  };

  // controlled form functions
  const handleSubmit = (e, login) => {
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));

    // (localStorage.token ? props.history.push('./') : props.history.push("/login"))
  };

  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;

  // Component code
  console.log(props, login);
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login Page</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input type="submit" />
    </form>
  );
};

export default withRouter(LoginPage);
