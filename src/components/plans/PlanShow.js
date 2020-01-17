import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PlanShow() {
  const setData = (props) => {
    const { id } = props.match.params;
    axios
      .get(`/api/evilplans/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setData();
  }, []);
}
