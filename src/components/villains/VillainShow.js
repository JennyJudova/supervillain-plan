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
    <div className="villainWrapper">
      {villain && (
        <div>
          <h2>{villain.username}</h2>
          <img
            src={
              villain.image
                ? villain.image
                : 'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg'
            }
            alt="villain portrait"
          />
          <p>{villain.universe}</p>
          <p>{villain.bio}</p>
          {villain.plans.length > 0 && (
            <div>
              <h3>Plans</h3>
              <div className="villainPlans">
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
