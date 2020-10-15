import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sendStatus = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default ({ showContact, sent, setSent }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState(null);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(null);

  const validateEmail = () => {
    if (!email || email === '') {
      setEmailError('Please fill in email');
      return false;
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      setEmailError('Invalid format');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateSubject = () => {
    if (!subject || subject === '') {
      setSubjectError('Please fill in subject');
      return false;
    }
    setSubjectError(null);
    return true;
  };

  const validateMessage = () => {
    if (!message || message === '') {
      setMessageError('Please fill in message');
      return false;
    }
    if (message && message.length < 10) {
      setMessageError('Please provide at least 10 symbols');
      return false;
    }
    setMessageError(null);
    return true;
  };

  const handleSend = async () => {
    let valid = validateEmail();
    valid = validateSubject() && valid;
    valid = validateMessage() && valid;

    if (valid) {
      try {
        emailjs.send();
        const res = await emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          {
            subject,
            email,
            message,
          },
          process.env.EMAILJS_USER_ID
        );
        setSent(sendStatus.SUCCESS);
      } catch (error) {
        setSent(sendStatus.ERROR);
      }

      setTimeout(() => {
        setEmail('');
        setSubject('');
        setMessage('');
      }, 1000);
    }
  };

  return (
    <div
      className={`container contactForm ${
        showContact ? 'openContactForm' : 'closeContactForm'
      }`}
    >
      {sent ? (
        sent === sendStatus.ERROR ? (
          <h1>Something went wrong</h1>
        ) : (
          <>
            <h1>Message sent blablabla</h1>
            <h1>senk u fak u</h1>
          </>
        )
      ) : (
        <>
          <div className='container-fluid'>
            <div className='flex-row'>
              <input
                value={email}
                placeholder='E-MAIL'
                onChange={e => setEmail(e.target.value)}
                className='col-8'
              />
            </div>
            {emailError && <span>{emailError}</span>}
          </div>

          <div className='container-fluid'>
            <div className='flex-row'>
              <input
                value={subject}
                placeholder='SUBJECT'
                onChange={e => setSubject(e.target.value)}
                className='col-8'
              />
            </div>
            {subjectError && <span>{subjectError}</span>}
          </div>

          <div className='container-fluid'>
            <div className='flex-row'>
              <textarea
                value={message}
                placeholder='MESSAGE'
                onChange={e => setMessage(e.target.value)}
                className='col-8 contact'
                rows='4'
              />
            </div>
            {messageError && <span>{messageError}</span>}
          </div>

          <div className='container-fluid'>
            <span className='sendButton col-8' onClick={handleSend}>
              send
            </span>
          </div>
        </>
      )}
    </div>
  );
};
