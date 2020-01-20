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
      <div className="indexwrapper">
        {allVillains &&
          allVillains.map((villain) => (
            <div key={villain._id}>
              <Link to={`/villains/${villain._id}`}>
                <img
                  src={
                    villain.image
                      ? villain.image
                      : 'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg'
                  }
                  alt="villain portrait"
                />
                <h3>{villain.username}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
