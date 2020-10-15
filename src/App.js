import React, { useState } from 'react';
import './style.css';
import { pages } from './common';

import MainPage from './components/MainPage';
import MusicPage from './components/MusicPage';
import ContactPage from './components/ContactPage';

export default () => {
  const [currentPage, setCurrentPage] = useState(pages.MAIN);

  switch (currentPage) {
    case 'MAIN':
      return <MainPage setCurrentPage={setCurrentPage} />;
    case 'MUSIC':
      return <MusicPage setCurrentPage={setCurrentPage} />;
    case 'CONTACT':
      return <ContactPage setCurrentPage={setCurrentPage} />;
  }
};
