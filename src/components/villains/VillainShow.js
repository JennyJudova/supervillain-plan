/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VillainShow(props) {
  const [villain, setVillain] = useState();
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

  const getData = () => {
    axios
      .get(`/api/villains/${id}`)
      .then((res) => {
        console.log(res.data);
        setVillain(res.data);
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
      <h2>Villain show</h2>
      {villain && (
        <div>
          <img src={villain.image} alt="Evil villain" height="100px" />
          <p>{villain.username}</p>
          <p>{villain.universe}</p>
          <p>{villain.bio}</p>
          {villain.plans.length > 0 && (
            <div>
              <h3>Plans</h3>
              <div>
                {villain.plans.map((plan) => (
                  <div key={plan._id}>
                    <img src={plan.image} alt="Plan" height="100px" />
                    <p>{plan.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
