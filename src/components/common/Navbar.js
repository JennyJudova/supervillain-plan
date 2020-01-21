import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/auth';

export default function Navbar() {
  const [burgerOpen, setBurger] = useState(false);

  const handleLogout = () => {
    Auth.logout();
    // this.props.history.push('/evilplans')
  };

  const toggleNavbar = () => {
    const burgerUpdate = burgerOpen;
    setBurger(!burgerUpdate);
  };

  return (
    <nav className={`${burgerOpen ? 'burgerOpen' : ''}`}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/villains">Villains</Link>
        <Link to="/evilplans">Plans</Link>
        {Auth.isAuthenticated() && <Link to="/profile">Dashboard</Link>}
        {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
        {!Auth.isAuthenticated() && <Link to="/login">Sign in</Link>}
        {Auth.isAuthenticated() && <a onClick={handleLogout}>Logout</a>}
      </div>
      <button
        className="burgerMenu"
        onClick={toggleNavbar}
        onKeyDown={toggleNavbar}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </nav>
  );
}
