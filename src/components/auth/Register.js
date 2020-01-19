import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Auth from '../../lib/auth';

export default function Register() {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState();

  const handleUserChange = (e) => {
    const updateUser = { ...user };
    setUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('user', user);
    e.preventDefault();
    axios
      .post('/api/register', user)
      .then((res) => {
        Auth.setToken(res.data.token);
        console.log(res.data.token);
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
    <div className="mainFormWrapRegister">
      <div className="formWrapper">
        <form className="panelWrapper" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div>
            Username<span>*</span>
          </div>
          <input
            name="username"
            placeholder="This field is required."
            onChange={handleUserChange}
          />

          <div>
            Email<span>*</span>
          </div>
          <input
            name="email"
            placeholder="This field is required."
            onChange={handleUserChange}
          />

          <div>
            Password<span>*</span>
          </div>
          <input
            name="password"
            type="password"
            placeholder="This field is required."
            onChange={handleUserChange}
          />

          <div>
            Password Confirmation<span>*</span>
          </div>
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="This field is required."
            onChange={handleUserChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

{
  /* <Link to="/login">
<small>Already have an account yet? Click here to login.</small>
</Link> */
}
