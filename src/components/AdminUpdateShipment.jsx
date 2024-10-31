import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../CSS/AdminPostShipment.css'; // Ensure this CSS file is used for styling
import { Context } from './Context';
import "../CSS/AdminUpdateShipment.css"

const AdminUpdateShipment = ({ shipment, onClose ,fetchShipments}) => {
  const { setAdminMenu } = useContext(Context);
  const [shipmentData, setShipmentData] = useState({
    id: '',
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
    trackingNumber: '',
    status: '',
    comment: '',
    deliveryDate: '',
  });

  // Initialize state with shipment data when component mounts or shipment changes
  useEffect(() => {
    if (shipment) {
      setShipmentData({
        id: shipment.id,
        title: shipment.title,
        shipmentDescription: shipment.shipmentDescription,
        sender: shipment.sender,
        senderEmail: shipment.senderEmail,
        senderPhoneNumber: shipment.senderPhoneNumber,
        senderAddress: shipment.senderAddress,
        receiver: shipment.receiver,
        receiverEmail: shipment.receiverEmail,
        receiverPhoneNumber: shipment.receiverPhoneNumber,
        receiverAddress: shipment.receiverAddress,
        trackingNumber: shipment.trackingNumber,
        status: shipment.status,
        comment: shipment.comment,
        deliveryDate: shipment.deliveryDate,
      });
    }
  }, [shipment]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      [name]: value,
    });
  };

  // Handle form submission for updating the shipment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingAlert = Swal.fire({ title: 'Updating Shipment...' });
    Swal.showLoading();

    try {
      const response = await fetch('https://vinrichards.com/api2/update_shipment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
      });

      const result = await response.json();
      if (result.status === 'success') {
        Swal.fire({ icon: 'success', title: 'Shipment updated successfully!' });
       onClose()
       fetchShipments()
      } else {
        Swal.fire({ text: 'Error updating shipment.' });
      }
    } catch (error) {
      Swal.fire({ text: 'There was an error updating the shipment.' });
    } finally {
      loadingAlert.close();
    }
  };

  return (
    <div className="AdminUpdateShipmentWrap">
      <div className="admin-post-shipment-containe" style={{ padding:"20px",width:"100%",backgroundColor: "white",height:"100%", overflowY: "scroll" }}>
        <h1 className="admin-post-shipment-title">Update Shipment</h1>
        <form onSubmit={handleSubmit} className="admin-post-shipment-form">
          {/* Shipment ID */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="id" className="admin-post-shipment-label">Shipment ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={shipmentData.id}
              disabled
              className="admin-post-shipment-input"
            />
          </div>

          {/* Tracking Number */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="trackingNumber" className="admin-post-shipment-label">Tracking Number</label>
            <input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              value={shipmentData.trackingNumber}
              disabled
              className="admin-post-shipment-input"
            />
          </div>

          {/* Shipment Title */}
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

          {/* Shipment Description */}
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

          {/* Sender Details */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="sender" className="admin-post-shipment-label">Sender Name</label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={shipmentData.sender}
              onChange={handleChange}
              required
              className="admin-post-shipment-input"
              placeholder='Enter Sender Name'
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

          {/* Receiver Details */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="receiver" className="admin-post-shipment-label">Receiver Name</label>
            <input
              type="text"
              id="receiver"
              name="receiver"
              value={shipmentData.receiver}
              onChange={handleChange}
              required
              className="admin-post-shipment-input"
              placeholder='Enter Receiver Name'
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

          {/* Expected Delivery Date */}
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

          {/* Delivery Status */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="status" className="admin-post-shipment-label">Delivery Status</label>
            <select
              name="status"
              id="status"
              value={shipmentData.status}
              onChange={handleChange}
              className="admin-post-shipment-input"
            >
              <option value="">Select Delivery Status</option>
              <option value="orderReceived">Order Received</option>
              <option value="pickedUp">Picked Up</option>
              <option value="inTransit">In Transit</option>
              <option value="arrivedAtFacility">Arrived at Facility</option>
              <option value="outForDelivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {/* Comments */}
          <div className="admin-post-shipment-form-group">
            <label htmlFor="comment" className="admin-post-shipment-label">Comments</label>
            <input
              id="comment"
              name="comment"
              value={shipmentData.comment}
              onChange={handleChange}
              className="admin-post-shipment-input"
              placeholder='Enter Comments'
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="admin-post-shipment-submit-button">Update Shipment</button>
          <button
            type="button"
            className="admin-post-shipment-submit-button"
            style={{ width: "100px", marginTop: "10px", border: "1px solid orange", backgroundColor: "white", color: "orange" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateShipment;
