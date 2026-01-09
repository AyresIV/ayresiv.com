import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navigation from '../components/Navigation';
import './contact-page.css';

const Contact = () => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    // Initialize EmailJS with your public key from environment variables
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    try {
      // Get form values
      const formData = new FormData(formRef.current);
      const name = formData.get('name');
      const email = formData.get('email');
      const title = formData.get('title');
      const message = formData.get('message');

      // Send email using emailjs.send() with explicit parameters
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'ayresivbiz@gmail.com',
          name: name,
          email: email,
          title: title,
          message: message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);

      if (result.text === 'OK') {
        setStatusMessage('✓ Message sent successfully! I\'ll get back to you soon.');
        setStatusType('success');
        formRef.current.reset();
        setTimeout(() => setStatusMessage(''), 5000);
      } else {
        setStatusMessage('✗ Failed to send message. Please try again.');
        setStatusType('error');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      console.error('Error code:', error.status);
      console.error('Error text:', error.text);
      setStatusMessage(`✗ Failed to send message: ${error.text || error.message}`);
      setStatusType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      {/* Animated particles for Contact page */}
      <div className="page-particles"></div>
      <div className="page-particle page-particle-1"></div>
      <div className="page-particle page-particle-2"></div>
      <div className="page-particle page-particle-3"></div>
      <div className="page-particle page-particle-4"></div>
      <div className="page-particle page-particle-5"></div>
      <div className="page-particle page-particle-6"></div>
      <div className="page-particle page-particle-7"></div>
      <div className="page-particle page-particle-8"></div>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Get In Touch</h1>
            <div className="contact-divider"></div>
            <p className="contact-subtitle">Have a question or want to work together? Drop me a message!</p>
          </div>

          <div className="contact-content">
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="title"
                  className="form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              {statusMessage && (
                <div className={`status-message ${statusType}`}>
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="contact-info">
              <div className="info-card">
                <h3>Discord</h3>
                <p>AyresIV</p>
              </div>
              <div className="info-card">
                <h3>Twitter/X</h3>
                <p><a href="https://x.com/AyresIV" target="_blank" rel="noopener noreferrer">@AyresIV</a></p>
              </div>
              <div className="info-card">
                <h3>Email</h3>
                <p><a href="mailto:Ayresivbiz@gmail.com">Ayresivbiz@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Contact;
