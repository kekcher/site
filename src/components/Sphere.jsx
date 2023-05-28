import React from 'react';

import '../css/Sphere.css';

const Sphere = ({ sign, bg, icon }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const interestRef = React.useRef();

  let image = require(`../img/spheres/icon${icon}.png`);
  const selectInterest = () => {
    setIsSelected(!isSelected);
    isSelected
      ? interestRef.current.classList.remove('interest_selected')
      : interestRef.current.classList.add('interest_selected');
  };

  return (
    <div className="interest" onClick={selectInterest}>
      <div
        className="interest_sphere"
        ref={interestRef}
        style={{ backgroundImage: `url('${bg}')` }}>
        <img src={image} className="interest_icon" alt="interest icon" />
      </div>
      <p className="interest_sign">{sign ? sign : 'TestTestTest'}</p>
    </div>
  );
};

export default Sphere;
