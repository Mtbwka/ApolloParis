import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';

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

  const recaptchaRef = useRef(null);

  const validateEmail = () => {
    if (!email || email === '') {
      setEmailError(true);
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
      setSubjectError(true);
      return false;
    }
    setSubjectError(null);
    return true;
  };

  const validateMessage = () => {
    if (!message || message === '') {
      setMessageError(true);
      return false;
    }
    if (message && message.length < 20) {
      setMessageError(true);
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
      const token = await recaptchaRef.current.executeAsync();
      if (token && token.length > 0) {
        try {
          await emailjs.send(
            process.env.REACT_APP_EMAIL_SERVICE_ID,
            process.env.REACT_APP_EMAIL_TEMPLATE_ID,
            {
              subject,
              email,
              message,
            },
            process.env.REACT_APP_EMAIL_USER_ID
          );
          setSent(sendStatus.SUCCESS);
        } catch (error) {
          setSent(sendStatus.ERROR);
        }
      } else {
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
          <h1>SENT</h1>
        )
      ) : (
        <>
          <div className='container-fluid'>
            <div className='flex-row'>
              <input
                value={email}
                placeholder='E-MAIL'
                onChange={e => setEmail(e.target.value)}
                className={`col-8 ${emailError && 'pulse-red'}`}
              />
            </div>
          </div>

          <div className='container-fluid'>
            <div className='flex-row'>
              <input
                value={subject}
                placeholder='SUBJECT'
                onChange={e => setSubject(e.target.value)}
                className={`col-8 ${subjectError && 'pulse-red'}`}
              />
            </div>
          </div>

          <div className='container-fluid'>
            <div className='flex-row'>
              <textarea
                value={message}
                placeholder='MESSAGE (min 20, max 500)'
                onChange={e => {
                  if (
                    e.target.value.length <= 500 ||
                    e.target.value.length === 0
                  ) {
                    setMessage(e.target.value);
                  }
                }}
                className={`col-8 contact ${messageError && 'pulse-red'}`}
                rows='8'
              />
            </div>
          </div>

          <div className='container-fluid'>
            <div className='flex-row'>
              <span className='sendButton pulse col-8' onClick={handleSend}>
                SEND
              </span>
            </div>
            <ReCAPTCHA
              theme='dark'
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              stoken={process.env.REACT_APP_RECAPTCHA_SERVER_TOKEN}
              size='invisible'
            />
          </div>
        </>
      )}
    </div>
  );
};
