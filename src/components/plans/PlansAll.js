/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlanShow(props) {
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
      {allEvilPlans &&
        allEvilPlans.map((plan) => (
          <Link to={`/evilplans/${plan._id}`}>
            <div key={plan._id}>
              <img src={plan.image} alt="Evil Plan" height="100px" />
              <h3>{plan.name}</h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
