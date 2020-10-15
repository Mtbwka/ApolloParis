import React from 'react';

const image = require('../../assets/music-background.jpeg');

export default () => {
  return (
    <>
      <img className='bg img-fluid' src={image} alt='' />
    </>
  );
};
