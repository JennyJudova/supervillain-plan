import React, { useState } from 'react';
import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import Auth from '../../lib/auth';

export default function Register() {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState();
  // const { history } = useHistory();
  // const history = require("react-router-dom").History;

  const handleUserChange = (e) => {
    const updateUser = { ...user };
    setUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('user', user);
    e.preventDefault();
    // const history = useHistory();
    // const history = useHistory;
    axios
      .post('/api/register', user)
      .then((res) => {
        Auth.setToken(res.data.token);
        console.log(res.data.token);
        // history.push('/villains');
        // this.props.history.goBack();
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Username<span>*</span>
        </p>
        <input
          name="username"
          placeholder="This field is required."
          onChange={handleUserChange}
        />

        <p>
          Email<span>*</span>
        </p>
        <input
          name="email"
          placeholder="This field is required."
          onChange={handleUserChange}
        />

        <p>
          Password<span>*</span>
        </p>
        <input
          name="password"
          type="password"
          placeholder="This field is required."
          onChange={handleUserChange}
        />

        <p>
          Password Confirmation<span>*</span>
        </p>
        <input
          name="passwordConfirmation"
          type="password"
          placeholder="This field is required."
          onChange={handleUserChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">
        <small>Already have an account yet? Click here to login.</small>
      </Link>
    </div>
  );
}
