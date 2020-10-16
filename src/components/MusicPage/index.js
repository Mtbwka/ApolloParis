import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

import { pages } from '../../common/index';

import './style.css';

const image = require('../../assets/music-background.jpeg');

const links = [
  { label: 'APPLE MUSIC', link: 'http://itunes.apple.com/album/id/1535368566' },
  { label: 'SPOTIFY', link: '' },
  {
    label: 'iTUNES',
    link: 'http://itunes.apple.com/album/id1535368566?ls=1&app=itunes',
  },
  { label: 'BANDCAMP', link: 'https://apolloparis.bandcamp.com/' },
  { label: 'SOUNDCLOUD', link: 'https://soundcloud.com/apolloparis6' },
];

export default ({ setCurrentPage }) => {
  return (
    <>
      <Menu setCurrentPage={setCurrentPage} />
      <span
        className='back-button pulse'
        onClick={() => setCurrentPage(pages.MAIN)}
      >
        BACK
      </span>

      <div className='music-menu-container d-flex justify-content-center'>
        <ul className='music-list'>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.link} className='pulse' target='_blank'>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};
