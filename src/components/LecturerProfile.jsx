

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import Swal from 'sweetalert2';



// // Add this near the top, after your imports
// const EditButton = styled.button`
//   background-color: #006400;
//   color: white;
//   border: none;
//   padding: 4px 10px;
//   font-size: 0.85rem;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-left: 10px;

//   &:hover {
//     background-color: #004d00;
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0,0,0,0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Modal = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 10px;
//   max-width: 400px;
//   width: 100%;
//   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   font-size: 1rem;
//   margin-top: 1rem;
//   margin-bottom: 1rem;
//   border-radius: 8px;
//   border: 1px solid #ccc;
// `;

// const SaveButton = styled.button`
//   background-color: #006400;
//   color: white;
//   padding: 10px 16px;
//   border: none;
//   border-radius: 6px;
//   font-size: 1rem;
//   cursor: pointer;
// `;

// const CancelButton = styled.button`
//   margin-left: 10px;
//   padding: 10px 16px;
//   background-color: #ccc;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
// `;




// const Container = styled.div`
//   background-color:  #e6f5ea;
//   min-height: 100vh;
//   padding: 1rem;
//   font-family: 'Segoe UI', sans-serif;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Card = styled.div`
//   // background-color: #e6f5ea;
//   // border: 1px solid #b2d8c8;
//   border-radius: 16px;
//   // padding: 2rem;
//   max-width: 500px;
//   width: 100%;
//   // box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
// `;

// const Title = styled.h2`
//   color: #006400;
//   margin-bottom: 1.5rem;
//   text-align: center;
//   text-decoration:underline;
// `;

// const InfoRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 0.75rem;
//   font-size: 1rem;
//   @media(max-width:768px){
//     flex-direction:column;
//     text-align:left;
//   }
// `;

// const Label = styled.div`
//   font-weight: bold;
//   color: #333;
//    @media(max-width:768px){

//     // text-align:center;
//   }
// `;

// const Value = styled.div`
//   color: #444;
//   text-align: right;
//  @media(max-width:768px){

//     text-align:left;
//   }

// `;

// const Error = styled.div`
//   color: red;
//   text-align: center;
//   margin-top: 2rem;
// `;


// const LecturerDetailsPage = ({ lecturerId }) => {
//   const [admin, setAdmin] = useState(null);
//   const [error, setError] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [newPhone, setNewPhone] = useState('');

//   useEffect(() => {
//     if (!lecturerId) return;

//     axios.get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerId}`)
//       .then(res => {
//         if (res.data.success) {
//           setAdmin(res.data.user);
//         } else {
//           setError(res.data.error);
//         }
//       })
//       .catch(() => {
//         setError('Failed to fetch admin details.');
//       });
//   }, [lecturerId]);

//   const openModal = () => {
//     setNewPhone(admin.phone);
//     setModalOpen(true);
//   };

//   const handleSave = () => {
//     axios.post('https://www.cwmsrfupre.com.ng/api/update_lecturer_phone.php', {
//       id: admin.id,
//       phone: newPhone,
//     }).then(res => {
//       if (res.data.success) {
//         setAdmin(prev => ({ ...prev, phone: newPhone }));
//         setModalOpen(false);
//         Swal.fire({text:"Phone number updated", icon :"success"})
//       } else {
//         Swal.fire({text:'Update failed: ' + res.data.error});
//       }
//     }).catch(() => {
//       Swal.fire({text:'Error updating phone number.'});
//     });
//   };

//   return (
//     <Container>
//       {admin ? (
//         <>
//           <Card>
//             <Title>Lecturer Details</Title>
//             {/* <InfoRow><Label>ID:</Label><Value>{admin.id}</Value></InfoRow> */}
//             <InfoRow><Label>Name:</Label><Value>{admin.name}</Value></InfoRow>
//             <InfoRow><Label>Email:</Label><Value>{admin.email}</Value></InfoRow>
//             <InfoRow>
//               <Label>Phone:</Label>
//               <Value>
//                 {admin.phone}
//                 <EditButton onClick={openModal}>Edit</EditButton>
//               </Value>
//             </InfoRow>
//             <InfoRow><Label>Role:</Label><Value>{admin.role}</Value></InfoRow>
//             <InfoRow><Label>Created At:</Label><Value>{new Date(admin.created_at).toLocaleString()}</Value></InfoRow>
//           </Card>

//           {isModalOpen && (
//             <ModalOverlay>
//               <Modal>
//                 <h3>Edit Phone Number</h3>
//                 <Input
//                   type="text"
//                   value={newPhone}
//                   onChange={(e) => setNewPhone(e.target.value)}
//                 />
//                 <div>
//                   <SaveButton onClick={handleSave}>Save</SaveButton>
//                   <CancelButton onClick={() => setModalOpen(false)}>Cancel</CancelButton>
//                 </div>
//               </Modal>
//             </ModalOverlay>
//           )}
//         </>
//       ) : (
//         <Error>{error || 'Loading...'}</Error>
//       )}
//     </Container>
//   );
// };


// export default LecturerDetailsPage



import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaComments,
  FaEnvelope,
  FaVideo,
  FaClipboardList,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaPhoneAlt,
  FaIdCard,
  FaClock,
} from "react-icons/fa";

// 🌿 Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 2rem;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, #006400, #00b36b);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 100, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 250px;
`;

const LecturerName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const LecturerEmail = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

const ProfileDetails = styled.div`
  text-align: right;
  font-size: 0.9rem;
  min-width: 200px;
  @media (max-width: 768px) {
    text-align: left;
    margin-top: 1rem;
  }
`;

const EditButton = styled.button`
  background: white;
  color: #006400;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background: #f1f1f1;
  }
`;

const DashboardTitle = styled.h3`
  font-size: 1.4rem;
  color: #006400;
  margin-bottom: 1.2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 100, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 100, 0, 0.05);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 100, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #00994d;
  margin-bottom: 0.8rem;
`;

const StatLabel = styled.h4`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const StatValue = styled.p`
  color: #777;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  margin: 1rem 0;
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

// 🌿 Component
const LecturerDetailsPage = ({ lecturerId, onNavigate, onLogout }) => {
  const [lecturer, setLecturer] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    if (!lecturerId) return;
    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_lecturer_by_id.php?id=${lecturerId}`)
      .then((res) => {
        if (res.data.success) setLecturer(res.data.user);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch lecturer details", "error"));
  }, [lecturerId]);

  const handleSave = () => {
    axios
      .post("https://www.cwmsrfupre.com.ng/api/update_lecturer_phone.php", {
        id: lecturer.id,
        phone: newPhone,
      })
      .then((res) => {
        if (res.data.success) {
          setLecturer((prev) => ({ ...prev, phone: newPhone }));
          setModalOpen(false);
          Swal.fire("Updated", "Phone number updated successfully", "success");
        } else {
          Swal.fire("Error", res.data.error, "error");
        }
      });
  };

  if (!lecturer)
    return <p style={{ textAlign: "center", color: "green" }}>Loading...</p>;

  return (
    <Container>
      <DashboardWrapper>
        {/* 🌿 Profile Section */}
        <ProfileCard>
          <ProfileInfo>
            <LecturerName>👋 Hello, {lecturer.name}</LecturerName>
            <LecturerEmail>{lecturer.email}</LecturerEmail>
            <EditButton onClick={() => { setNewPhone(lecturer.phone); setModalOpen(true); }}>
              <FaPhoneAlt style={{ marginRight: "6px" }} /> Edit Phone
            </EditButton>
          </ProfileInfo>

          <ProfileDetails>
            <p><FaIdCard /> <b>Role:</b> {lecturer.role}</p>
            <p><FaUsers /> <b>ID:</b> {lecturer.id}</p>
            <p><FaBook /> <b>Created:</b> {new Date(lecturer.created_at).toLocaleDateString()}</p>
          </ProfileDetails>
        </ProfileCard>

        {/* 🌿 Quick Access Dashboard */}
        <DashboardTitle>Quick Access</DashboardTitle>
        <StatsGrid>
          <StatCard onClick={() => onNavigate("enrollment")}>
            <StatIcon><FaBook /></StatIcon>
            <StatLabel>Course Enrollment</StatLabel>
            <StatValue>Ensure to enroll to all the courses that you will be handling</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("allstudents")}>
            <StatIcon><FaGraduationCap /></StatIcon>
            <StatLabel>My Students</StatLabel>
            <StatValue>View all your students</StatValue>
          </StatCard>

          {/* <StatCard onClick={() => onNavigate("scoring")}>
            <StatIcon><FaClipboardList /></StatIcon>
            <StatLabel>Scoring</StatLabel>
            <StatValue>Upload and manage scores</StatValue>
          </StatCard> */}

          <StatCard onClick={() => onNavigate("assignments")}>
            <StatIcon><FaBook /></StatIcon>
            <StatLabel>Post Assignments / Quizes / Exam papers / Lecture notes / Handouts</StatLabel>
            {/* <StatValue>Post assignments</StatValue> */}
          </StatCard>

           <StatCard onClick={() => onNavigate("managevideolessons")}>
            <StatIcon><FaVideo /></StatIcon>
            <StatLabel>Manage Video Lessons / Courses</StatLabel>
            {/* <StatValue>Post </StatValue> */}
          </StatCard>


           <StatCard onClick={() => onNavigate("submissions")}>
            <StatIcon><FaBook /></StatIcon>
            <StatLabel>Students Submissions</StatLabel>
            {/* <StatValue>Post assignments</StatValue> */}
          </StatCard>

          {/* <StatCard onClick={() => onNavigate("lecturenotes")}>
            <StatIcon><FaChalkboardTeacher /></StatIcon>
            <StatLabel>Lecture Notes</StatLabel>
            <StatValue>Upload materials</StatValue>
          </StatCard> */}

          <StatCard onClick={() => onNavigate("LiveLecture")}>
            <StatIcon><FaVideo /></StatIcon>
            <StatLabel>Online Live Class / Meeting / Examination / Quiz</StatLabel>
            <StatValue>Start or join a session</StatValue>
          </StatCard>

            <StatCard onClick={() => onNavigate("clockin")}>
                      <StatIcon>
                        <FaClock />
                      </StatIcon>
                      <StatLabel>Clock-in to your Classes and meetings</StatLabel>
                      <StatValue></StatValue>
                    </StatCard>

          <StatCard onClick={() => onNavigate("email")}>
            <StatIcon><FaEnvelope /></StatIcon>
            <StatLabel>Email Center</StatLabel>
            <StatValue>Send & read messages</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("forum")}>
            <StatIcon><FaComments /></StatIcon>
            <StatLabel>Forum</StatLabel>
            <StatValue>Join community discussions</StatValue>
          </StatCard>

          <StatCard onClick={onLogout}>
            <StatIcon style={{ color: "red" }}><FaSignOutAlt /></StatIcon>
            <StatLabel>Logout</StatLabel>
            <StatValue>Sign out securely</StatValue>
          </StatCard>
        </StatsGrid>

        {/* 🌿 Edit Phone Modal */}
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
      </DashboardWrapper>
    </Container>
  );
};

export default LecturerDetailsPage;
