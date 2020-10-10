import React, { useState } from 'react';
import './style.css';

import MainPage from './components/MainPage';
import MusicPage from './components/MusicPage';
import ContactPage from './components/ContactPage';
import SocialPage from './components/SocialPage';

const pages = {
  MAIN: 'MAIN',
  MUSIC: 'MUSIC',
  CONTACT: 'CONTACT',
  SOCIAL: 'SOCIAL',
};

export default () => {
  const [currentPage, setCurrentPage] = useState(pages.MAIN);

  switch (currentPage) {
    case 'MAIN':
      return <MainPage />;
    case 'MUSIC':
      return <MusicPage />;
    case 'CONTACT':
      return <ContactPage />;
    case 'SOCIAL':
      return <SocialPage />;
  }
};
