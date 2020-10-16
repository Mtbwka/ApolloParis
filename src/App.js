import React from 'react';
import './style.css';

import MainPage from './components/MainPage';
const mainImage = require('./assets/main-background.jpeg');

export default () => {
  return (
    <>
      <img className='bg img-fluid' src={mainImage} alt='Main' />
      <MainPage />
    </>
  );
};
