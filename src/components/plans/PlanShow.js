/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PlanShow(props) {
  const [evilPlan, setEvilPlan] = useState();
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

  const getData = () => {
    const planid = id;
    axios
      .get(`/api/evilplans/${planid}`)
      .then((res) => {
        console.log(res.data);
        setEvilPlan(res.data);
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
      <h2>Plan show</h2>
      {evilPlan && (
        <div>
          <img src={evilPlan.image} alt="Evil Plan" height="100px" />
          <p>{evilPlan.name}</p>
          <p>{evilPlan.resources}</p>
          <p>plan by {evilPlan.user.username}</p>
          <p>{evilPlan.user.universe}</p>
          <p>{evilPlan.description}</p>
          {evilPlan.comments.length > 0 && (
            <div>
              <h3>Comments</h3>
              <ul>
                {evilPlan.comments.map((comment) => {
                  return <li key={comment._id}>{comment.text}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
