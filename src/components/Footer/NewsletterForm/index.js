import React, { useState, useRef } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import ReCAPTCHA from 'react-google-recaptcha';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sendStatus = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default ({ showNewsLetter, sent, setSent }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

  const recaptchaRef = useRef(null);

  const validateEmail = () => {
    if (!email || email === '') {
      setEmailError(true);
      return false;
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      setEmailError(true);
      return false;
    }
    setEmailError(null);
    return true;
  };

  return (
    <div
      className={`container newsletterForm ${
        showNewsLetter ? 'openNewsletterForm' : 'closeNewsletterForm'
      }`}
    >
      {sent ? (
        <h1>SUBSCRIBED</h1>
      ) : (
        <MailchimpSubscribe
          url={process.env.REACT_APP_MAILCHIMP_URL}
          render={({ subscribe, status, message }) => {
            if (!status) {
              return (
                <div className='container-fluid'>
                  <div className='flex-row'>
                    <input
                      value={email}
                      placeholder='E-MAIL'
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                      className={`col-8 ${emailError && 'pulse-red'}`}
                    />
                  </div>
                  {emailError && <span>{emailError}</span>}
                  <div className='container-fluid'>
                    <ReCAPTCHA
                      theme='dark'
                      ref={recaptchaRef}
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      stoken={process.env.REACT_APP_RECAPTCHA_SERVER_TOKEN}
                      size='invisible'
                    />
                    <span
                      className='sendButton pulse col-8'
                      disabled
                      onClick={async () => {
                        if (validateEmail()) {
                          const token = await recaptchaRef.current.executeAsync();
                          if (token && token.length > 0 && validateEmail()) {
                            subscribe({ EMAIL: email });
                          }
                        }
                      }}
                    >
                      SUBSCRIBE
                    </span>
                  </div>
                </div>
              );
            }

            if (status && status === 'success') {
              setSent(sendStatus.SUCCESS);

              setTimeout(() => {
                setEmail('');
              }, 1000);
            }

            if (status && status === 'error') {
              return <h1>Email is already subscribed</h1>;
            }

            return <h1>Sending request...</h1>;
          }}
        />
      )}
    </div>
  );
};
