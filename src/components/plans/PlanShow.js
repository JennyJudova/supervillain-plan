import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlanShow(props) {
  const [evilPlan, setEvilPlan] = useState();
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

  const getData = () => {
    console.log('2', id);
    const planid = id;
    axios
      .get(`/api/evilplans/${planid}`)
      .then((res) => {
        console.log(res.data);
        setEvilPlan(res.data);
      })
      .catch((err) => console.log(err));
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
        </div>
      )}
      {evilPlan && evilPlan.comments && (
        <div>
          <h3>Comments</h3>
          <ul>
            {evilPlan.comments.map((comment) => {
              return <li key={comment.id}>{comment.text}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
