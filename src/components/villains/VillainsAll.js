/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function VillainsAll() {
  const [allVillains, setAllVillains] = useState();
  const [errors, setErrors] = useState();

  const getData = () => {
    axios
      .get(`/api/villains/`)
      .then((res) => {
        console.log(res.data);
        setAllVillains(res.data);
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
      <h2>All Villains</h2>
      {allVillains &&
        allVillains.map((villain) => (
          <Link to={`/villains/${villain._id}`}>
            <div key={villain._id}>
              <img src={villain.image} alt="villain portrait" height="100px" />
              <h3>{villain.username}</h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
