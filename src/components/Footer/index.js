import React, { useState } from 'react';
import './styles.css';

export default () => {
  const [showContact, setShowContact] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [title, setTitle] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [sent, setSent] = useState(false);

  return (
    <div className='fixed-bottom footer'>
      <div
        className={`container contactForm ${
          showContact ? 'openContactForm' : 'closeContactForm'
        }`}
      >
        {sent ? (
          <>
            <h1>Message sent blablabla</h1>
            <h1>senk u fak u</h1>
          </>
        ) : (
          <>
            <input
              value={title}
              placeholder='TITLE'
              onChange={e => setTitle(e.target.value)}
              className='col-sm'
            />
            <input
              value={subject}
              placeholder='SUBJECT'
              onChange={e => setSubject(e.target.value)}
              className='col-sm'
            />

            <input
              value={message}
              placeholder='MESSAGE'
              onChange={e => setMessage(e.target.value)}
              className='col-sm'
            />

            <h1 className='sendButton' onClick={() => setSent(true)}>
              send
            </h1>
          </>
        )}
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm'>
            <span
              onClick={() =>
                setShowContact(prev => {
                  if (sent) {
                    setTimeout(() => {
                      setSent(null);
                      setTitle(null);
                      setSubject(null);
                      setMessage(null);
                    }, 1000);
                  }
                  return !prev;
                })
              }
            >
              CONTACT
            </span>
          </div>
          <div className='col-sm'>
            <span onClick={() => setShowNewsletter(true)}>NEWSLETTER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
