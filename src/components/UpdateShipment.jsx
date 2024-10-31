
import React, { useContext, useState } from 'react';
import '../CSS/AdminPostShipment.css'; // Updated CSS file path if necessary
import Swal from "sweetalert2"
import { Context } from './Context';

const UpdateShipment = () => {
  const {adminMenu,setAdminMenu}=useContext(Context)
  const generateShipmentId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 900000);
    return `VCASHIP${year}${month}${day}${randomNum}`;
  };

    const generateTrackingNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 900000);
    return `VCATRK${randomNum}`;
  };

  const [shipmentData, setShipmentData] = useState({
    id: generateShipmentId(),
    title: '',
    shipmentDescription: '',
    sender: '',
    senderEmail: '',
    senderPhoneNumber: '',
    senderAddress: '',
    receiver: '',
    receiverEmail: '',
    receiverPhoneNumber: '',
    receiverAddress: '',
    trackingNumber: generateTrackingNumber(),
    status: '',
    comment:'',
    deliveryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      [name]: value,
    });
  };

  console.log(shipmentData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({title:"Posting Shipment..."})
    Swal.showLoading();

    try {
      const response = await fetch("https://elexdondigitalacademy.com/api2/post_shipment.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        Swal.fire({icon:"success",title:'Shipment posted successfully!'});
        setShipmentData({
          id: generateShipmentId(),
          title: '',
          shipmentDescription: '',
          sender: '',
          senderEmail: '',
          senderPhoneNumber: '',
          senderAddress: '',
          receiver: '',
          receiverEmail: '',
          receiverPhoneNumber: '',
          receiverAddress: '',
          trackingNumber: generateTrackingNumber(),
          status: '',
          comment:'',
          deliveryDate: '',
        });
        setAdminMenu(0)
      } else {
        Swal.fire({text:'Error posting shipment.'});
      }
    } catch (error) {
      Swal.fire({text:'There was an error posting the shipment.'});
    }finally{
      loadingAlert.close()
    }
  };

  return (
    <div className="admin-post-shipment-container">
      <h1 className="admin-post-shipment-title">Post A Shipment</h1>
      <form onSubmit={handleSubmit} className="admin-post-shipment-form">
        {/* Existing fields */}
        <div className="admin-post-shipment-form-group">
          <label htmlFor="id" className="admin-post-shipment-label">Shipment ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={shipmentData.id}
            required
            disabled
            className="admin-post-shipment-input"
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="trackingNumber" className="admin-post-shipment-label">Tracking Number</label>
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            value={shipmentData.trackingNumber}
            onChange={handleChange}
            required
            disabled
            className="admin-post-shipment-input"
            placeholder='Enter Tracking Number'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="title" className="admin-post-shipment-label">Shipment Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={shipmentData.title}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Shipment Title'
          />
        </div>
        {/* Add new fields */}
        <div className="admin-post-shipment-form-group">
          <label htmlFor="shipmentDescription" className="admin-post-shipment-label">Shipment Description</label>
          <input
            type="text"
            id="shipmentDescription"
            name="shipmentDescription"
            value={shipmentData.shipmentDescription}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Shipment Description'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="shipmentDescription" className="admin-post-shipment-label">Sender Name</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={shipmentData.sender}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Sender name'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="senderEmail" className="admin-post-shipment-label">Sender Email</label>
          <input
            type="email"
            id="senderEmail"
            name="senderEmail"
            value={shipmentData.senderEmail}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Sender Email'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="senderPhoneNumber" className="admin-post-shipment-label">Sender Phone Number</label>
          <input
            type="text"
            id="senderPhoneNumber"
            name="senderPhoneNumber"
            value={shipmentData.senderPhoneNumber}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Sender Phone Number'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="senderAddress" className="admin-post-shipment-label">Sender Address</label>
          <input
            type="text"
            id="senderAddress"
            name="senderAddress"
            value={shipmentData.senderAddress}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Sender Address'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="shipmentDescription" className="admin-post-shipment-label">Receiver Name</label>
          <input
            type="text"
            id="receiver"
            name="receiver"
            value={shipmentData.receiver}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter receiver name'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="receiverEmail" className="admin-post-shipment-label">Receiver Email</label>
          <input
            type="email"
            id="receiverEmail"
            name="receiverEmail"
            value={shipmentData.receiverEmail}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Receiver Email'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="receiverPhoneNumber" className="admin-post-shipment-label">Receiver Phone Number</label>
          <input
            type="text"
            id="receiverPhoneNumber"
            name="receiverPhoneNumber"
            value={shipmentData.receiverPhoneNumber}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Receiver Phone Number'
          />
        </div>
        <div className="admin-post-shipment-form-group">
          <label htmlFor="receiverAddress" className="admin-post-shipment-label">Receiver Address</label>
          <input
            type="text"
            id="receiverAddress"
            name="receiverAddress"
            value={shipmentData.receiverAddress}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Receiver Address'
          />
        </div>
        {/* Existing fields */}
        <div className="admin-post-shipment-form-group">
          <label htmlFor="deliveryDate" className="admin-post-shipment-label">Expected Delivery Date</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={shipmentData.deliveryDate}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
          />
        </div>
        
        <div className="admin-post-shipment-form-group">
          <label htmlFor="status" className="admin-post-shipment-label">Delivery Status</label>
          {/* <input
            type="text"
            id="status"
            name="status"
            value={shipmentData.status}
            onChange={handleChange}
            required
            className="admin-post-shipment-input"
            placeholder='Enter Shipment Status'
          /> */}
          <select name="status" onChange={handleChange} id="status" type="text">
            <option >Select Delivery status</option>
            <option value={"orderReceived"}>Order Received</option>
            <option value={"pickedUp"}>Picked Up</option>
            <option value={"inTransit"}>In Transit</option>
            <option value={"arrivedAtFacility"}>Arrived at Facility</option>
            <option value={"outForDelivery"}>Out for Delivery</option>
            <option value={"Delivered"}>Delivered</option>
          </select>
        </div>

        <div className="admin-post-shipment-form-group">
  <label htmlFor="comment" className="admin-post-shipment-label">Comment on Current Delivery Status</label>
  <input
    type="text"
    id="comment"
    name="comment"
    value={shipmentData.comment}
    onChange={handleChange}
    className="admin-post-shipment-input"
    placeholder="Enter comment"
  />
</div>

        
        <button type="submit" className="admin-post-shipment-submit-button">Post Shipment</button>
      </form>
    </div>
  );
};

export default UpdateShipment;
