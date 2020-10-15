import React, { useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

const image = require('../../assets/main-background.jpeg');

export default ({ setCurrentPage }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <img className='bg img-fluid' src={image} alt='' />
      <Menu setCurrentPage={setCurrentPage} />
      <Footer />
    </>
  );
};
