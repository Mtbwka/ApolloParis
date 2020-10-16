import React, { useState, useEffect } from 'react';
import './styles.css';

import ContactForm from './ContactForm';
import NewsletteForm from './NewsletterForm';

export default () => {
  const [showContact, setShowContact] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const [sent, setSent] = useState(false);

  return (
    <div className='fixed-bottom footer'>
      <div className='row'>
        <ContactForm showContact={showContact} setSent={setSent} sent={sent} />
        <NewsletteForm
          showNewsLetter={showNewsletter}
          setSent={setSent}
          sent={sent}
        />
        <span className='rights'>
          © {new Date().getFullYear()} porcelain paris. All rights reserved
        </span>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm'>
              <span
                className='pulse'
                onClick={() =>
                  setShowContact(prev => {
                    if (sent) {
                      setTimeout(() => {
                        setSent(null);

                        return false;
                      }, 1000);
                    }
                    if (setShowNewsletter) {
                      setShowNewsletter(false);
                    }
                    return !prev;
                  })
                }
              >
                {showContact ? 'HIDE CONTACT' : 'CONTACT'}
              </span>
            </div>
            <div className='col-sm'>
              <span
                className='pulse'
                onClick={() =>
                  setShowNewsletter(prev => {
                    if (sent) {
                      setTimeout(() => {
                        setSent(null);

                        return false;
                      }, 1000);
                    }
                    if (!prev) {
                      setShowContact(false);
                    }
                    return !prev;
                  })
                }
              >
                {showNewsletter ? 'HIDE NEWSLETTER' : 'NEWSLETTER'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
