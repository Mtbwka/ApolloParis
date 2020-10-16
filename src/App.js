import React, { useState } from 'react';
import './style.css';
import { pages } from './common';

import MainPage from './components/MainPage';

const mainImage = require('./assets/main-background.jpeg');

console.log('process.env :>> ', process.env);

export default () => {
  const [currentPage, setCurrentPage] = useState(pages.MAIN);

  return (
    <>
      <img className='bg img-fluid' src={mainImage} alt='Main' />
      <MainPage setCurrentPage={setCurrentPage} />
    </>
  );
};
