import React, { useEffect, useRef, useState } from 'react';
import '../CSS/RequestQuote.css'; // Import the CSS file
import 'animate.css'; // Import animate.css for animations
import Swal from 'sweetalert2';
import axios from 'axios';


const RequestQuote = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.tagName === 'H2') {
            element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slow');
          } else if (element.tagName === 'H3' || element.tagName === 'P') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
          } else if (element.tagName === 'LABEL') {
            element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slow');
          }

          // Unobserve the element after animation to avoid re-triggering
          observer.current.unobserve(element);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Trigger when 30% of the element is visible
    });

    // Observe the h2, h3, p tags, and labels
    const headings2 = document.querySelectorAll('.request-quote h2');
    const headings3 = document.querySelectorAll('.request-quote h3');
    const paragraphs = document.querySelectorAll('.request-quote p');
    const labels = document.querySelectorAll('.request-quote label');

    headings2.forEach((heading) => {
      if (heading) observer.current.observe(heading);
    });

    headings3.forEach((heading) => {
      if (heading) observer.current.observe(heading);
    });

    paragraphs.forEach((paragraph) => {
      if (paragraph) observer.current.observe(paragraph);
    });

    labels.forEach((label) => {
      if (label) observer.current.observe(label);
    });

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);



  // handling submit quote request
  // quote request
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone:'',
    details: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({text:"Sending request..."})
    Swal.showLoading();

    try {
      const response = await axios.post('https://vinrichards.com/api2/submit_quote_request.php', formData);

      if (response.data.success) {
        Swal.fire('Success', response.data.message, 'success');
        setFormData({ name: '', email: '',phone:'', details: '' }); // Reset form
  
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }finally{
      loadingAlert.close();
    }
  };


  return (
    <div className='RequestQuoteWrap'>
      <div className="request-quote">
        <h2 className="title">Request a Quote</h2>
        <form onSubmit={handleSubmit} className="quote-form">
          <label>
            Name:
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          <label>
            Phone Number:
            <input 
              type="text" 
              name="phone"
              value={formData.phone} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          <label>
            Message:
            <textarea 
              value={formData.details}
              name="details" 
              onChange={handleInputChange} 
              rows="4" 
              required 
            />
          </label>
          <button type="submit" className="submit-button">Submit</button>
        </form>

        {/* {submitted && (
          <div className="confirmation">
            <h3>Thank you!</h3>
            <p>Your request has been submitted successfully. We will get back to you soon.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default RequestQuote;
