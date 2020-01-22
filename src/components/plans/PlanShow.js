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
    <div className="planWrapper">
      {evilPlan && (
        <div>
          <h2>{evilPlan.name}</h2>
          <img src={evilPlan.image} alt="Evil Plan" />
          <p>Plan by: {evilPlan.user.username}</p>
          <p>Universe: {evilPlan.user.universe}</p>
          <p>Description: {evilPlan.description}</p>
          <div className="commentWrapper">
            <h3>Comments</h3>
            {evilPlan.comments.length > 0 && (
              <div>
                <ul>
                  {evilPlan.comments.map((comment) => {
                    return <li key={comment._id}>{comment.text}</li>;
                  })}
                </ul>
              </div>
            )}
            <textarea
              rows="4"
              cols="50"
              name="comment"
              placeholder="Like the plan? Leave your comment here."
            />
          </div>
        </div>
      )}
    </div>
  );
}
