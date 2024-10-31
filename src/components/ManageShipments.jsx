import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert for the alerts
import '../CSS/ManageShipments.css'; // Ensure you create this CSS file
import AdminUpdateShipment from './AdminUpdateShipment';

const ManageShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [modalData, setModalData] = useState(null); // Initialize modalData as null

  // Fetch all shipments from the backend
  
    const fetchShipments = async () => {
      try {
        const response = await fetch('https://vinrichards.com/api2/get_all_shipments.php');
        const data = await response.json();
        setShipments(data);
        setFilteredShipments(data); // Initialize with all shipments
      } catch (error) {
        console.error('Error fetching shipments:', error);
        Swal.fire('Error', 'Failed to load shipments', 'error');
      }
    };

    useEffect(()=>{
      fetchShipments()
    },[])

 

  // Search/filter shipments
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredShipments(shipments);
    } else {
      const filtered = shipments.filter((shipment) =>
        shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredShipments(filtered);
    }
  }, [searchQuery, shipments]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle delete shipment with confirmation
  const handleDeleteShipment = (shipment) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to recover shipment ${shipment.trackingNumber}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Show a loading indicator
        Swal.fire({
          title: 'Deleting...',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Send DELETE request to the backend
        try {
          const response = await fetch('https://vinrichards.com/api2/delete_shipment.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: shipment.id }),
          });

          const result = await response.json();
          if (result.status === 'success') {
            // Remove shipment from the state
            setShipments(shipments.filter((s) => s.id !== shipment.id));
            setFilteredShipments(filteredShipments.filter((s) => s.id !== shipment.id));
            Swal.fire('Deleted!', 'The shipment has been deleted.', 'success');
          } else {
            Swal.fire('Error', 'Error deleting shipment', 'error');
          }
        } catch (error) {
          Swal.fire('Failed', 'Failed to delete shipment', 'error');
        }
      }
    });
  };

  const handleOpenEditModal = (id) => {
    const shipment = filteredShipments.find((e) => e.id === id);
    
    if (shipment) {
      setModalData(shipment); // Set shipment data for editing
    } else {
      console.error('Shipment not found');
    }
  };

  const handleCloseModal = () => {
    setModalData(null); // Close the modal by setting modalData to null
  };

  return (
    <div className="admin-view-shipments-container">
      <h1 className="admin-view-shipments-title">All Shipments ({filteredShipments.length})</h1>
      <div className="admin-view-shipments-search">
        <input
          type="text"
          placeholder="Search by Tracking Number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="admin-view-shipments-search-input"
        />
      </div>
      <div className="admin-view-shipments-content">
        {filteredShipments.map((shipment) => (
          <div key={shipment.id} className="shipment-card">
            <div className="shipment-card-header">
              <h2>{shipment.title}</h2>
              <span className="shipment-id">{shipment.id}</span>
            </div>
            <div className="shipment-details">
              <div className='shipmentInlineDetail'>
                <div className="shipment-detail"><strong>Sender Name:</strong> {shipment.sender}</div>
                <div className="shipment-detail" style={{textAlign:"right"}}><strong>Receiver Name:</strong> {shipment.receiver}</div>
              </div>
              <div className='shipmentInlineDetail'>
                <div className="shipment-detail"><strong>Tracking Number:</strong> {shipment.trackingNumber}</div>
                <div className="shipment-detail" style={{textAlign:"right"}}><strong>Delivery Status:</strong> {shipment.status}</div>
              </div>
              <div className='shipmentInlineDetail'>
                <div className="shipment-detail"><strong>Expected Delivery Date:</strong> {shipment.deliveryDate}</div>
                <div className="shipment-detail" style={{textAlign:"right"}}><strong>Created At:</strong> {shipment.created_at}</div>
              </div>
              <div className='shipmentInlineDetail'>
              <div className="shipment-detail"><strong>Last Updated At:</strong> {shipment.edited_at}</div>
              
              
              </div>
              </div>
            <button onClick={() => handleDeleteShipment(shipment)}>Delete Shipment</button>
            <button onClick={() => handleOpenEditModal(shipment.id)}>Edit Shipment</button>
            <button onClick={()=>window.open(`https://vinrichards.com/api2/attachments/${shipment.id}.png`,"_blank")}>View Attachment</button>
          </div>
        ))}
      </div>
      {modalData && (
        <div className="modal-overlay">
          <AdminUpdateShipment shipment={modalData} onClose={handleCloseModal} fetchShipments={fetchShipments}/>
        </div>
      )}
    </div>
  );
};

export default ManageShipments;
