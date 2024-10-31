
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { FaShippingFast } from 'react-icons/fa';
import '../CSS/TrackShipment.css';
import 'animate.css'; // Import animate.css for animations
import { FaCheckCircle,FaMinus } from 'react-icons/fa'; // Icon for delivered status
import { Context } from './Context';

const statusSteps = [
  'Order Received',
  'Picked Up',
  'In Transit',
  'Arrived at Facility',
  'Out for Delivery',
  'Delivered',
];

const statusColors = {
  orderReceived: 'gray',
  pickedUp: 'blue',
  inTransit: 'orange',
  arrivedAtFacility: 'purple',
  outForDelivery: 'green',
  Delivered: 'darkgreen',
};

const statusDescriptions = {
  orderReceived: 'Your shipment has been received and is awaiting processing.',
  pickedUp: 'Your shipment has been picked up and is on its way.',
  inTransit: 'Your shipment is in transit and moving towards its destination.',
  arrivedAtFacility: 'Your shipment has arrived at a facility for processing.',
  outForDelivery: 'Your shipment is out for delivery and will reach you soon.',
  Delivered: 'Your shipment has been delivered successfully.',
};

const TrackShipment = () => {
 const {trackingID, setTrackingID}=useContext(Context)
  const [shipment, setShipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
  const [colorState1,setColorState1]=useState(false)
const [colorState2,setColorState2]=useState(false)    
const [colorState3,setColorState3]=useState(false)
const [colorState4,setColorState4]=useState(false)
const [colorState5,setColorState5]=useState(false)
const [colorState6,setColorState6]=useState(false)
const [modalSwitch,setModalSwitch]=useState(false)



  const handleColorReset = ()=>{
    setColorState1(false)
    setColorState2(false)
    setColorState3(false)
    setColorState4(false)
    setColorState5(false)
    setColorState6(false)
    // alert("yes")
  }

  

  useEffect(()=>{
    const id = setTimeout(() => {
      // alert("yes")
      handleTrack()
    }, 500);
    return ()=>clearInterval(id)
  },[])

  const handleTrack = async () => {
    if (!trackingID) {
      Swal.fire({ icon: 'warning', text: 'Please enter a tracking ID.' });
      return;
    }
    const loadingAlert = Swal.fire({ title: 'Fetching your shipment...' });
    Swal.showLoading();

    try {
      const response = await fetch(`https://vinrichards.com/api2/get_shipment.php?trackingNumber=${trackingID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setModalSwitch(true)
        setShipment(data.shipment);
        setIsModalOpen(true); 
        if(data.shipment.status==="orderReceived"){
          setColorState1(true)
        }else if(data.shipment.status==="pickedUp"){
          setColorState1(true)
          setColorState2(true)
        }else if(data.shipment.status==="inTransit"){
          setColorState1(true)
          setColorState2(true)
          setColorState3(true)
        }else if(data.shipment.status==="arrivedAtFacility"){
          setColorState1(true)
          setColorState2(true)
          setColorState3(true)
          setColorState4(true)
        }else if(data.shipment.status==="outForDelivery"){
          setColorState1(true)
          setColorState2(true)
          setColorState3(true)
          setColorState4(true)
          setColorState5(true)
        }else if (data.shipment.status==="Delivered"){
          setColorState1(true)
          setColorState2(true)
          setColorState3(true)
          setColorState4(true)
          setColorState5(true)
          setColorState6(true)
        }
        console.log(data.shipment)
        // setColorState2(true)
        
      } else {
        Swal.fire({ icon: 'error', text: 'No shipment found with this tracking ID.' });
        setShipment(null);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'There was an error fetching the shipment details.' });
    } finally {
      loadingAlert.close();
    }
  };

  const renderStatusTracker = () => {
    const statusIndex = statusSteps.findIndex((step) => step.toLowerCase() === shipment.status.toLowerCase());
    

    




    return (
      <div className="status-tracker">
        {statusSteps.map((step, index) => (
          <div key={index} className={`status-step ${index <= statusIndex ? 'active' : ''}`}>
            <div className="status-icon">
              {index < statusIndex ? <FaCheckCircle className="status-check" /> : <span>{index + 1}</span>}
            </div>
            <div className="status-text">{step}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="track-shipment-page">
      <div className="track-shipment-heading animate__animated animate__slideInRight animate__slower">
        <h2 className='animate__animated animate__slideInLeft animate__slower'>Track Your Shipment</h2>
      </div>
      <div className="track-shipment-content">
        <p className="track-description">
          Enter your tracking ID below to get the current status of your shipment.
        </p>
        <div className="track-form">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="track-input"
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
          />
          <button className="track-button" onClick={handleTrack}>Track Shipment</button>
        </div>
        <FaShippingFast className="track-icon" />

        {/* Modal for shipment details */}
        {modalSwitch && (
          <div
            isOpen={isModalOpen}
            onRequestClose={()=>{setIsModalOpen(false);handleColorReset()}}
            contentLabel="Shipment Details Modal"
            className="shipment-modal"
            overlayClassName="shipment-modal-overlay"
            // colorstate1={colorstate1}

          >
            <div className="modal-header">
              <h3 style={{color:"orange"}}>Shipment Details</h3>
              <button className="close-modal" onClick={() => {setModalSwitch(false);handleColorReset()}}>X</button>
            </div>
            <div className="modal-body">
              <div className="shipment-info">
                <p><strong style={{color:"orange"}}>Title:</strong> {shipment.title}</p>
                <p><strong style={{color:"orange"}}>Description:</strong> {shipment.shipmentDescription}</p>
                <p><strong style={{color:"orange"}}>Sender:</strong> {shipment.sender}</p>
                <p><strong style={{color:"orange"}}>Receiver:</strong> {shipment.receiver}</p>
                <p><strong style={{color:"orange"}}>Tracking Number:</strong> {shipment.trackingNumber}</p>
                <p><strong style={{color:"orange"}}>Estimated Delivery Date:</strong> {shipment.deliveryDate}</p>
                <p><strong style={{color:"orange"}}>Status:</strong> {statusDescriptions[shipment.status]}</p>
                <button
                style={{backgroundColor:"orange",padding:"5px",borderRadius:"5px",border:"none",cursor:"pointer",color:"white"}} 
                onClick={()=>window.open(`https://vinrichards.com/api2/attachments/${shipment.id}.png`)}>View Attachment</button>
              </div>
              {/* <div className="status-tracker-container">
                {renderStatusTracker()}
              </div> */}
              {console.log(colorState2)}
              <div className='StatusBar'>
                  <div className='CircleAndLine'>
                    <FaCheckCircle className='Circle' style={{color:colorState1?"green":""}}/>
                    <div className='Line'style={{backgroundColor:colorState2?"green":""}}></div>
                    <FaCheckCircle className='Circle'style={{color:colorState2?"green":""}}/>
                    <div className='Line'style={{backgroundColor:colorState3?"green":""}}></div>
                    <FaCheckCircle className='Circle'style={{color:colorState3?"green":""}}/>
                    <div className='Line'style={{backgroundColor:colorState4?"green":""}}></div>
                    <FaCheckCircle className='Circle'style={{color:colorState4?"green":""}}/>
                    <div className='Line'style={{backgroundColor:colorState5?"green":""}}></div>
                    <FaCheckCircle className='Circle'style={{color:colorState5?"green":""}}/>
                    <div className='Line'style={{backgroundColor:colorState6?"green":""}}></div>
                    <FaCheckCircle className='Circle'style={{color:colorState6?"green":""}}/>
                  
                  </div>
                  <div className='StatusLetters'>
                    <p>Order Received</p>
                    <p>Picked Up</p>
                    <p>In Transit</p>
                    <p>Arrived At Facility</p>
                    <p>Out For Delivery</p>
                    <p>Delivered</p>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackShipment;
