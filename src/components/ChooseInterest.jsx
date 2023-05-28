import React from 'react';
import { memo } from 'react';

import Sphere from './Sphere';

import interest_data from '../data/interest_data.json';

import '../css/Sphere.css';

import bg1 from '../img/spheres/bg1.jpg';
import bg2 from '../img/spheres/bg2.jpg';
import bg3 from '../img/spheres/bg3.jpg';
import bg4 from '../img/spheres/bg4.jpg';
import bg5 from '../img/spheres/bg5.jpg';

const ChooseInterest = memo(() => {
  const bgs = [bg1, bg2, bg3, bg4, bg5];
  return (
    <div className="choose_div">
      <h3 className="choose_header">Какие сферы Вам интересны?</h3>
      <div className="choose_container">
        {[...new Array(28)].map((_, index) => {
          bgs.sort(() => Math.random() - 0.5);
          return (
            <Sphere
              sign={interest_data[index].name}
              bg={bgs[index % 4]}
              icon={index + 1}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
});
export default ChooseInterest;
