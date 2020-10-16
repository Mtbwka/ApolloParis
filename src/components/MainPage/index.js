import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

export default ({ setCurrentPage, bgRef }) => {
  return (
    <>
      <Menu setCurrentPage={setCurrentPage} bgRef={bgRef} />
      <Footer />
    </>
  );
};
