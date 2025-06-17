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
    const response = await fetch('https://www.cwmsrfupre.com.ng/api/contact_form_endpoint.php', {
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
        <div style={{textAlign:"center", padding:"20px 10px", color:"green"}}>
          <h4>
          Wish to enquire about admissions, syllabus, or anything else? We welcome inquiries, partnerships, and collaborations. Please reach out to us using the following contact details:
          </h4>
          
        </div>
        <br/>
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
<br/>
        <div style={{textAlign:"center"}}>
          <h4>
          Office Hours: 
          </h4>
<p>Monday – Friday: 9:00 AM – 5:00 PM (WAT)</p>
<br/>
<h4>Follow Us: </h4>

<p>Stay connected with us on social media for updates on our programs, research, and events:</p>
<p>
For specific inquiries regarding collaboration, research opportunities, or academic programs, please contact us via phone or send us a mail. 
 
</p>
         
        </div>

        <div className="contact-info">
          <div className="info-item">
            <FaPhone className="contact-icon" />
            
            <p>
            +234 903 0223 041<br/> +234 808 2407 735<br/> +234 803 619 3299<br/> +234 811 931 7782
            </p>
          </div>
          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <p> wmsr@fupre.edu.ng</p>
            <p> contact@cwmsrfupre.com.ng</p>
            <p>admin@cwmsrfupre.com.ng</p>
            <p>academic@cwmsrfupre.com.ng</p>
         
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>
            Centre for Waste Management and Sustainable<br/> Resources (CWMSR)<br/> 
            </p>
            <p>Federal University of Petroleum Resources,<br/> Effurun (FUPRE),<br/> Delta State, Nigeria.</p>
<br/>
<p>
  No, 2. Olanikpeku Street APIS ( Bassan Plaza)<br/>  Central Business District FCT, Abuja
</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
