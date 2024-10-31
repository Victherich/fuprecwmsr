import React, { useContext, useEffect, useState } from 'react';
import Hero from './Hero';
import ShipmentCalculator from './ShipmentCalculator';
import RequestQuote from './RequestQuote';
import TestimonialCarousel from './Testimonial';
import MajorServices from './MajorServices';
import AboutUsBrief from './AboutUsBriefComponent';
import ServicesBrief from './ServicesBrief';
import Popup from './Popup';
import { FaTumblrSquare } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import "animate.css"
import Swal from "sweetalert2"
import axios from "axios"
import { Context } from './Context';

const Landingpage = () => {
  const {trackingID, setTrackingID}=useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  // States for different pop-ups
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [showTrackingPopup, setShowTrackingPopup] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [countdown, setCountdown] = useState(60); 

  // Show lead capture popup after 10 seconds
  const shippingQuote = ()=>{
    const timer = setTimeout(() => {
      setShowLeadPopup(true);
    }, 5000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }
    
  

  // Show exit intent popup
  useEffect(() => {
    const handleExitIntent = (e) => {
      if (e.clientY < 10) {
        setShowExitIntentPopup(true);
      }
    };
    document.addEventListener('mouseout', handleExitIntent);
    return () => document.removeEventListener('mouseout', handleExitIntent);
  }, []);

  // Show promo popup after 5 seconds on the pricing page
  useEffect(() => {
    const promoTimer = setTimeout(() => {
      setShowPromoPopup(true);
    }, 5000);
    return () => clearTimeout(promoTimer);
  }, []);

  // Countdown logic for promo popup
  useEffect(() => {
    if (countdown > 0 && showPromoPopup) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, showPromoPopup]);

  // Automatically show tracking popup after 20 seconds
  const handleTracking = ()=>{
    const trackingTimer = setTimeout(() => {
      setShowTrackingPopup(true);
    }, 5000); // Show after 20 seconds
    return () => clearTimeout(trackingTimer);
  }
    
  

  // Show newsletter subscription popup after 15 seconds
  // const handleNewsLetter = ()=>{
  //   const newsletterTimer = setTimeout(() => {
  //     setShowNewsletterPopup(true);
  //   }, 5000); // Show after 15 seconds
  //   return () => clearTimeout(newsletterTimer);
  // }
    

  // Show feedback popup when the user reaches the end of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setShowFeedbackPopup(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [reRender,setRerender]=useState(true)

  useEffect(()=>{

    const id = setTimeout(()=>{
        setRerender(false)
    },300)

    const id2 = setTimeout(()=>{
      setRerender(true)
    },600)
  },[location.pathname])


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
        setShowLeadPopup(false)
        handleTracking();
      } else {
        Swal.fire('Error', response.data.error, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
    }finally{
      loadingAlert.close();
    }
  };

  // calling tracking function
  const handleTracking2 = () => {
    navigate("/trackshipment")
  }



// handleing join news letter 
const [email, setEmail] = useState('');

const handleInputChange2 = (e) => {
  setEmail(e.target.value);
};

const handleSubmit2 = async (e) => {
  e.preventDefault();
  const loadingAlert = Swal.fire({text:"submitting..."})
  Swal.showLoading();

  try {
    const response = await axios.post('https://vinrichards.com/api2/subscribe_newsletter.php', { email });

    if (response.data.success) {
      Swal.fire('Success', response.data.message, 'success');
      setEmail(''); // Reset form
      setShowNewsletterPopup(false)
    } else {
      Swal.fire('Error', response.data.error, 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
  }finally{
    loadingAlert.close();
  }
};



// handling submit feedback
const [email2, setEmail2] = useState('');
const [feedback, setFeedback] = useState('');

const handleInputChange3 = (e) => {
  if (e.target.name === 'email2') {
    setEmail2(e.target.value);
  } else if (e.target.name === 'feedback') {
    setFeedback(e.target.value);
  }
};

const handleSubmit3 = async (e) => {
  e.preventDefault();
  const loadingAlert = Swal.fire({text:"Submitting..."})
  Swal.showLoading();

  try {
    const response = await axios.post('https://vinrichards.com/api2/submit_feedback.php', {
      email2,
      feedback,
    });

    if (response.data.success) {
      Swal.fire('Success', response.data.message, 'success');
      setEmail2('');
      setFeedback('');
      setShowFeedbackPopup(false)
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
    reRender&&<div>
      <Hero />
      <MajorServices />
      <ServicesBrief />
      <ShipmentCalculator />
      <AboutUsBrief />
      <RequestQuote />
      <TestimonialCarousel />

      {/* Request Quote */}
      <Popup 
        isVisible={showLeadPopup}
        onClose={() => setShowLeadPopup(false)}
        title="Get a Free Shipping Quote!"
      >
        <p className= "animate__animated animate__slideInRight">
          Looking for a reliable air or sea freight solution? Let us know your
          requirements, and we’ll provide a free quote.
        </p>
        <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleInputChange}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <input
        type="text"
        name="phone"
        placeholder="Your Phone number"
        value={formData.phone}
        onChange={handleInputChange}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <input
        type="text"
        name="details"
        placeholder="Shipment Details"
        value={formData.details}
        onChange={handleInputChange}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px',
          cursor: 'pointer',
          color: 'white',
          backgroundColor: 'orange',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Request Quote
      </button>
      <button
        style={{
          marginTop: '10px',
          padding: '10px',
          cursor: 'pointer',
          color: 'orange',
          backgroundColor: 'white',
          border: '1px solid orange',
          borderRadius: '5px',
        }}
        onClick={()=>{setShowLeadPopup(false);handleTracking()}} // Assuming this closes the popup
      >
        Close
      </button>
    </form>
      </Popup>

      {/* Exit Intent Popup */}
      {/* <Popup
        isVisible={showExitIntentPopup}
        onClose={() => setShowExitIntentPopup(false)}
        title="Need Help with Your Shipment?"
      >
        <p>
          Before you go, let us help you with exclusive offers for air or sea
          freight services. Contact us today!
        </p>
        <button
          style={{
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'white',
            backgroundColor: 'orange',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={()=>navigate("/contactus")}
        >
          Contact Us

        </button>
        <button
          style={{
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'orange',
            backgroundColor: "white",
            border: '1px solid orange',
            borderRadius: '5px',
            marginLeft:"10px"
          }}
          onClick={()=>{setShowExitIntentPopup(false)}}
        >
          Close
        </button>
      </Popup> */}

      {/* Welcome message */}
      <Popup
        isVisible={showPromoPopup}
        onClose={() => setShowPromoPopup(false)}
        title=""
          
      >
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <h2 style={{textAlign:"center"}}>Welcome to Vinrichard's Clearing Agents Limited</h2>
        <p style={{textAlign:"center"}}>
          Your reliable shipping agency
        </p>
       
        <button
          style={{
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'orange',
            backgroundColor: "white",
            border: '1px solid orange',
            borderRadius: '5px',
            marginLeft:"10px",
            width:"100px"
          }}
          onClick={()=>{setShowPromoPopup(false);shippingQuote()}}
        >
          Ok
        </button>
        </div>
    
    
        
      </Popup>

      {/* Tracking Popup */}
      {/* <Popup
        isVisible={showTrackingPopup}
        onClose={() => setShowTrackingPopup(false)}
        title="Track Your Shipment"
      >
        <p>Enter your tracking number to track your shipment in real-time.</p>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Tracking Number"
            required
            style={{
              padding: '10px',
              outline: 'none',
            }}
    
            onChange={(e)=>setTrackingID(e.target.value)}
          />
          <button
            type="button"
            style={{
              padding: '10px',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: 'orange',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={handleTracking2}
          >
            Track Now
          </button>
          <button
          style={{
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'orange',
            backgroundColor: "white",
            border: '1px solid orange',
            borderRadius: '5px',
            
          }}
          onClick={()=>{setShowTrackingPopup(false);handleNewsLetter()}}
        >
          Close
        </button>
        </form>
      </Popup> */}

      {/* Newsletter Subscription Popup */}
      {/* <Popup
        isVisible={showNewsletterPopup}
        onClose={() => setShowNewsletterPopup(false)}
        title="Join Our Newsletter"
      >
        <p>
          Subscribe to our newsletter for the latest updates on air and sea
          freight services.
        </p>
        <form
      onSubmit={handleSubmit2}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={handleInputChange2}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px',
          cursor: 'pointer',
          color: 'white',
          backgroundColor: 'orange',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Subscribe
      </button>
      <button
        style={{
          marginTop: '10px',
          padding: '10px',
          cursor: 'pointer',
          color: 'orange',
          backgroundColor: 'white',
          border: '1px solid orange',
          borderRadius: '5px',
        }}
        onClick={() => setShowNewsletterPopup(false)}
      >
        Close
      </button>
    </form>      
    </Popup> */}

      {/* Feedback Popup */}
      {/* <Popup
        isVisible={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
        title="We Value Your Feedback"
      >
        <p>We'd love to hear your thoughts on our services. Please leave your feedback below:</p>
        <form
      onSubmit={handleSubmit3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
      }}
    >
      <input
        type="email"
        name="email2"
        placeholder="Your Email"
        value={email2}
        onChange={handleInputChange3}
        required
        style={{
          padding: '10px',
          outline: 'none',
        }}
      />
      <textarea
        name="feedback"
        placeholder="Your Feedback"
        rows="4"
        value={feedback}
        onChange={handleInputChange3}
        required
        style={{
          padding: '10px',
          outline: 'none',
          width: '100%',
        }}
      ></textarea>
      <button
        type="submit"
        style={{
          marginTop: '10px',
          padding: '10px',
          cursor: 'pointer',
          color: 'white',
          backgroundColor: 'orange',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Submit Feedback
      </button>
    </form>
        <button
          style={{
            marginTop: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'orange',
            backgroundColor: "white",
            border: '1px solid orange',
            borderRadius: '5px',
          
          }}
          onClick={()=>{setShowFeedbackPopup(false)}}
        >
          Close
        </button>
      </Popup> */}
    </div>
  );
};

export default Landingpage;
