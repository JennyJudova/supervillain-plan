import React, { useState } from 'react';
import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import Auth from '../../lib/auth';

export default function Register() {
  const [login, setLogin] = useState();
  const [errors, setErrors] = useState();
  const history = useHistory();

  const handleChange = (e) => {
    const updateLogin = { ...login };
    setLogin({ ...updateLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('user', login);
    e.preventDefault();
    axios
      .post('/api/login', login)
      .then((res) => {
        Auth.setToken(res.data.token);
        console.log(res.data.token);
        history.push('/villains');
      })
      .catch((err) => setErrors(err));
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="formWrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <p>Email</p>
        <input
          name="email"
          placeholder="Name@email.com"
          onChange={handleChange}
        />
        <p>Password</p>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        {errors && <p>Oops, something went wrong. please try again</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/register">
        <small>No account yet? Click here to register.</small>
      </Link>
    </div>
  );
}
