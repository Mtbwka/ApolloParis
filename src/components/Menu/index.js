import React, { useState } from 'react';
import { pages } from '../../common';

const socialLinks = [
  { label: 'INSTAGRAM', link: 'https://www.instagram.com/apolloparis_/' },
  { label: 'TWITTER', link: 'https://twitter.com/apollopari' },
  {
    label: 'YOUTUBE',
    link:
      'https://www.youtube.com/channel/UCYIgLPBhpgDfkBBV6MlSZvg?view_as=subscriber',
  },
];

const musicLinks = [
  { label: 'APPLE MUSIC', link: 'http://itunes.apple.com/album/id/1535368566' },
  { label: 'SPOTIFY', link: '' },
  {
    label: 'iTUNES',
    link: 'http://itunes.apple.com/album/id1535368566?ls=1&app=itunes',
  },
  { label: 'BANDCAMP', link: 'https://apolloparis.bandcamp.com/' },
  { label: 'SOUNDCLOUD', link: 'https://soundcloud.com/apolloparis6' },
];

export default ({ setCurrentPage, bgRef }) => {
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  return (
    <header>
      <nav role='navigation'>
        <div className='container'>
          <div className='mainMenuContainer'>
            <span
              className={`pulse ${
                showMainMenu ? 'openMenuButton' : 'closeMenuButton'
              }`}
              onClick={() => setShowMainMenu(prev => !prev)}
            >
              {showMainMenu ? 'X' : 'MENU'}
            </span>
            <ul className={`menu ${showMainMenu ? 'openMenu' : 'closeMenu'}`}>
              {socialLinks.map(l => (
                <li key={l.label}>
                  <a href={l.link} className='pulse' target='_blank'>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='musicMenuContainer'>
            <span
              className={`${
                showMusicMenu ? 'openMusicMenuButton' : 'closeMusicMenuButton'
              } pulse`}
              onClick={() => setShowMusicMenu(prev => !prev)}
            >
              {showMusicMenu ? 'X' : 'MUSIC'}
            </span>
            <ul
              className={`menu musicMenu ${
                showMusicMenu ? 'openMenu' : 'closeMenu'
              }`}
            >
              {musicLinks.map(l => (
                <li key={l.label}>
                  <a href={l.link} className='pulse' target='_blank'>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* <div
            className={`${
              showMainMenu ? 'openMenu' : 'closeMenu'
            } music-menu-container`}
          >
            <ul className='music-list'>
              {musicLinks.map(l => (
                <li key={l.label}>
                  <a href={l.link} className='pulse' target='_blank'>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
};
