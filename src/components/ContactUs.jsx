import React, { useState } from 'react';
import '../CSS/ContactUs.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import Swal if not already imported

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  // Show loading state
  Swal.fire({
    title: 'Sending...',
    text: 'Please wait while we send your message.',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    } 
  });

  try {
    const response = await fetch('https://vinrichards.com/api2/contact_form_endpoint.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      // Close the loading alert and show success
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'Your message has been sent successfully!',
        confirmButtonText: 'OK'
      });
      // Optionally clear the form fields after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      // Close the loading alert and show error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.error || 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    // Close the loading alert and show error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error sending the message. Please try again later.',
      confirmButtonText: 'OK'
    });
  }
};


  return (
    <div className="contact-page">
      <div className="contact-heading animate__animated animate__slideInLeft animate__slower">
        <h2 className='animate__animated animate__slideInRight animate__slower'>Contact Us</h2>
      </div>
      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="contact-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="phone"
              name="phone"
              placeholder="Your Phone number"
              className="contact-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="contact-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button className="contact-button" type="submit">Send Message</button>
          </form>

          {feedback && <p>{feedback}</p>}
        </div>

        <div className="contact-info">
          <div className="info-item">
            <FaPhone className="contact-icon" />
            <p>+234 803 306 2743</p>
            <p>+1 929 631 9254</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <p>info@vinrichards.com</p>
            <p>vvpassmak@gmail.com</p>
            <p>vinrichardsca@gmail.com</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Room 101 NPA Commercial Building, Lagos, Nigeria</p>
            <p>120-33 195th St, Saint Albans, Queens, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
