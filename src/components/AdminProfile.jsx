import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';



// Add this near the top, after your imports
const EditButton = styled.button`
  background-color: #006400;
  color: white;
  border: none;
  padding: 4px 10px;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #004d00;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  background-color: #006400;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-left: 10px;
  padding: 10px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;




const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #e6f5ea;
  border: 1px solid #b2d8c8;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
`;

const Title = styled.h2`
  color: #006400;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
`;

const Value = styled.div`
  color: #444;
  text-align: right;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 2rem;
`;

const AdminDetailsPage = ({ adminId }) => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    if (!adminId) return;

    axios.get(`https://www.cwmsrfupre.com.ng/api/get_admin_by_id.php?id=${adminId}`)
      .then(res => {
        if (res.data.success) {
          setAdmin(res.data.user);
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError('Failed to fetch admin details.');
      });
  }, [adminId]);

  const openModal = () => {
    setNewPhone(admin.phone);
    setModalOpen(true);
  };

  const handleSave = () => {
    axios.post('https://www.cwmsrfupre.com.ng/api/update_admin_phone.php', {
      id: admin.id,
      phone: newPhone,
    }).then(res => {
      if (res.data.success) {
        setAdmin(prev => ({ ...prev, phone: newPhone }));
        setModalOpen(false);
        Swal.fire({text:"Phone number updated", icon :"success"})
      } else {
        Swal.fire({text:'Update failed: ' + res.data.error});
      }
    }).catch(() => {
      Swal.fire({text:'Error updating phone number.'});
    });
  };

  return (
    <Container>
      {admin ? (
        <>
          <Card>
            <Title>Admin Details</Title>
            {/* <InfoRow><Label>ID:</Label><Value>{admin.id}</Value></InfoRow> */}
            <InfoRow><Label>Name:</Label><Value>{admin.name}</Value></InfoRow>
            <InfoRow><Label>Email:</Label><Value>{admin.email}</Value></InfoRow>
            <InfoRow>
              <Label>Phone:</Label>
              <Value>
                {admin.phone}
                <EditButton onClick={openModal}>Edit</EditButton>
              </Value>
            </InfoRow>
            <InfoRow><Label>Role:</Label><Value>{admin.role}</Value></InfoRow>
            <InfoRow><Label>Created At:</Label><Value>{new Date(admin.created_at).toLocaleString()}</Value></InfoRow>
          </Card>

          {isModalOpen && (
            <ModalOverlay>
              <Modal>
                <h3>Edit Phone Number</h3>
                <Input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <div>
                  <SaveButton onClick={handleSave}>Save</SaveButton>
                  <CancelButton onClick={() => setModalOpen(false)}>Cancel</CancelButton>
                </div>
              </Modal>
            </ModalOverlay>
          )}
        </>
      ) : (
        <Error>{error || 'Loading...'}</Error>
      )}
    </Container>
  );
};


export default AdminDetailsPage