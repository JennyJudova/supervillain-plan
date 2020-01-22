/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlansAll() {
  const [allEvilPlans, setAllEvilPlans] = useState();
  const [errors, setErrors] = useState();

  const getData = () => {
    axios
      .get(`/api/evilplans/`)
      .then((res) => {
        console.log(res.data);
        setAllEvilPlans(res.data);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>All Plans</h2>
      <div className="indexWrapper">
        {allEvilPlans &&
          allEvilPlans.map((plan) => (
            <div key={plan._id}>
              <Link to={`/evilplans/${plan._id}`}>
                <img src={plan.image} alt="Evil Plan" />
                <h3>{plan.name}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
