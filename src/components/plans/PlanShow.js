import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlanShow(props) {
  const { id } = props.match.params;
  console.log({ id });

  const setData = () => {
    console.log('id', id);
    axios
      .get(`http://localhost:8000/api/evilplans/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('3');
    setData();
  }, []);

  return (
    <div>
      <h2>Plan show</h2>
    </div>
  );
}
