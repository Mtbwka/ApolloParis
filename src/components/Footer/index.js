import React, { useState } from 'react';
import './styles.css';

import ContactForm from './ContactForm';

export default () => {
  const [showContact, setShowContact] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const [sent, setSent] = useState(false);

  return (
    <div className='fixed-bottom footer'>
      <div className='row'>
        <ContactForm showContact={showContact} setSent={setSent} sent={sent} />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm'>
              <span
                onClick={() =>
                  setShowContact(prev => {
                    if (sent) {
                      setTimeout(() => {
                        setSent(null);

                        return false;
                      }, 1000);
                    } else {
                      return !prev;
                    }
                  })
                }
              >
                {showContact ? 'HIDE CONTACT' : 'CONTACT'}
              </span>
            </div>
            <div className='col-sm'>
              <span onClick={() => setShowNewsletter(prev => !prev)}>
                NEWSLETTER
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
