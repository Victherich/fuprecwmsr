
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Context } from './Context';




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
  background-color:  #e6f5ea;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  // background-color: #e6f5ea;
  // border: 1px solid #b2d8c8;
  border-radius: 16px;
  // padding: 2rem;
  max-width: 500px;
  width: 100%;
  // box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
`;

const Title = styled.h2`
  color: #006400;
  margin-bottom: 1.5rem;
  text-align: center;
  text-decoration:underline;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  @media(max-width:768px){
    flex-direction:column;
    text-align:left;
  }
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
   @media(max-width:768px){

    // text-align:center;
  }
`;

const Value = styled.div`
  color: #444;
  text-align: right;
 @media(max-width:768px){

    text-align:left;
  }

`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 2rem;
`;


const StudentProfile2 = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const {programs}=useContext(Context);
//   console.log(studentId)

  useEffect(() => {
    if (!studentId) return;

    axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
        //   console.log(res.data.student)
        
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError('Failed to fetch admin details.');
      });
  }, [studentId]);

  const openModal = () => {
    setNewPhone(student.phone);
    setModalOpen(true);
  };

  const handleSave = () => {
    axios.post('https://www.cwmsrfupre.com.ng/api/update_student_phone.php', {
      id: student.id,
      phone: newPhone,
    }).then(res => {
      if (res.data.success) {
        setStudent(prev => ({ ...prev, phone: newPhone }));
        setModalOpen(false);
        Swal.fire({text:"Phone number updated", icon:"success"});
      } else {
        Swal.fire({text:'Update failed: ' + res.data.error});
      }
    }).catch(() => {
      Swal.fire({text:'Error updating phone number.'});
    });
  };

  return (
    <Container>
      {student ? (
        <>
          <Card>
            <Title>Student Details</Title>
            {/* <InfoRow><Label>ID:</Label><Value>{student.id}</Value></InfoRow> */}
            <InfoRow><Label>Admission Number:</Label><Value>{student.admission_number}</Value></InfoRow>
            <InfoRow><Label>Name:</Label><Value>{student.full_name}</Value></InfoRow>
            <InfoRow><Label>Email:</Label><Value>{student.email}</Value></InfoRow>
            <InfoRow>
              <Label>Phone:</Label>
              <Value>
                {student.phone}
                <EditButton onClick={openModal}>Edit</EditButton>
              </Value>
            </InfoRow>

            <InfoRow>
  <Label>Program:</Label>
  <Value>
    {
      programs.find(p => p.id == student.program)?.name || 'N/A'
    }
  </Value>
</InfoRow>
            <InfoRow><Label>Created At:</Label><Value>{new Date(student.created_at).toLocaleString()}</Value></InfoRow>
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


export default StudentProfile2