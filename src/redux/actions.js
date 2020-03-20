
import { history } from '../App'
// import { browserHistory } from 'react-router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

const MySwal = withReactContent(Swal)


// API CONSTANTS


const BASE_URL = 'http://localhost:3000';
const USERS_URL = BASE_URL + '/users';
const PERSIST_URL = BASE_URL + '/persist';
const LOGIN_URL = BASE_URL + '/login';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const setUserAction = userObj => ({
  type: 'SET_USER',
  payload: userObj
});

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

const authError =  error => ({
  type: 'AUTH_ERROR',
  payload: error
})

// Fetch

const newUserToDB = userObj => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  fetch(USERS_URL, config)
  .then(r => r.json())
  .then(data => {
    dispatch(setUserAction(data.user));
    localStorage.setItem('token', data.token);
  });
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const loginUserToDB = userCredentials => dispatch => {
  // console.log("fetch hit")
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };

  fetch(LOGIN_URL, config)
  .then(r => r.json())
  .then(data => {
    if (data.errors){
      console.log(data)
      MySwal.fire({title: "Login not found.", footer: "Check your password, try again or signup."})
    } else {
      console.log("fetch hit")
      MySwal.fire({title: "Login successful", footer: "Welcome back to artCollect."})
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
      window.location = '/usercollection'
    }
    
  })}
    
    const persistUser = () => dispatch => {
      const config = {
        method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(PERSIST_URL, config)
  .then(r => r.json())
  .then(userInstance => {
    dispatch(setUserAction(userInstance));
  });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
  MySwal.fire({title: "Logout successful", footer: "Come back soon!"})
};


        export default {
          newUserToDB,
          deleteUserFromDB,
          loginUserToDB,
          persistUser,
          logoutUser
        };
