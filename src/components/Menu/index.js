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

export default ({ setCurrentPage }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header>
      <nav role='navigation'>
        <div className='menuToggle'>
          <span
            className={`${toggleMenu ? 'openMenuButton' : 'closeMenuButton'}`}
            onClick={() => setToggleMenu(prev => !prev)}
          >
            {toggleMenu ? 'X' : 'MENU'}
          </span>

          <ul className={`menu ${toggleMenu ? 'openMenu' : 'closeMenu'}`}>
            <a>
              <li>MUSIC</li>
            </a>
            {socialLinks.map(l => (
              <li key={l.label}>
                <a href={l.link} target='_blank'>
                  {l.label}
                </a>
              </li>
            ))}
            <a>
              <li onClick={() => setCurrentPage(pages.CONTACT)}>CONTACT</li>
            </a>
          </ul>
        </div>
      </nav>
    </header>
  );
};
