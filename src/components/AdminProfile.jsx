
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaUserShield,
  FaUserGraduate,
  FaKey,
  FaEnvelope,
  FaComments,
  FaSignOutAlt,
  FaPhoneAlt,
  FaIdCard,
  FaSchool,
  FaClock,
  FaFileCsv,
  FaSpeakerDeck,
  FaReply,
  FaPaperclip,
  FaFileDownload,
  FaBookmark,
} from "react-icons/fa";
import AdminEditControl from "./AdminEditControl";
import AdminResultControl from "./AdminResultControl";
import { Context } from "./Context";

const Container = styled.div`
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 10px; /* Max 10px */
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Max 10px */
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, #16a34a, #15803d);
  color: white;
  padding: 10px; /* Max 10px */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* Max 10px */
  flex-wrap: wrap;
  gap: 10px; /* Max 10px */
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 250px;
`;

const AdminName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px; /* Max 10px */
  letter-spacing: -0.025em;
`;

const AdminEmail = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ProfileDetails = styled.div`
  text-align: right;
  font-size: 0.85rem;
  min-width: 200px;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-top: 6px; /* Max 10px */
  }
`;

const EditButton = styled.button`
  background: white;
  color: #16a34a;
  border: none;
  border-radius: 6px;
  padding: 6px 10px; /* Max 10px */
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  margin-top: 6px; /* Max 10px */

  &:hover {
    background: #f1f5f9;
  }
`;

const DashboardTitle = styled.h3`
  font-size: 1.2rem;
  color: #15803d;
  margin-bottom: 8px; /* Max 10px */
  font-weight: 700;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px; /* Max 10px */
  margin-bottom: 10px; /* Max 10px */
`;

const StatCard = styled.div`
  background: white;
  padding: 10px; /* Max 10px */
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: #16a34a;
  }
`;

const StatIcon = styled.div`
  font-size: 1.6rem;
  color: #16a34a;
  margin-bottom: 6px; /* Max 10px */
`;

const StatLabel = styled.h4`
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px; /* Max 10px */
`;

const StatValue = styled.p`
  color: #64748b;
  font-size: 0.85rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Max 10px */
  z-index: 500;
`;

const Modal = styled.div`
  background: white;
  padding: 10px; /* Max 10px */
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px; /* Max 10px */
  font-size: 0.95rem;
  margin: 6px 0; /* Max 10px */
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  outline: none;
  background: #f8fafc;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #16a34a;
  }
`;

const SaveButton = styled.button`
  background-color: #16a34a;
  color: white;
  padding: 8px 10px; /* Max 10px */
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #15803d;
  }
`;

const CancelButton = styled.button`
  margin-left: 6px; /* Max 10px */
  padding: 8px 10px; /* Max 10px */
  background-color: #e2e8f0;
  color: #475569;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #cbd5e1;
  }
`;

const AdminDetailsPage = ({ adminId, onNavigate, onLogout }) => {
  const [admin, setAdmin] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const {api_url}=useContext(Context);

  useEffect(() => {
    if (!adminId) return;
    axios
      .get(`${api_url}/get_admin_by_id.php?id=${adminId}`)
      .then((res) => {
        if (res.data.success) {
          setAdmin(res.data.user);
        }
      })
      .catch(() => Swal.fire("Error", "Failed to fetch admin details", "error"));
  }, [adminId]);

  const handleSave = () => {
    axios
      .post(`${api_url}/update_admin_phone.php`, {
        id: admin.id,
        phone: newPhone,
      })
      .then((res) => {
        if (res.data.success) {
          setAdmin((prev) => ({ ...prev, phone: newPhone }));
          setModalOpen(false);
          Swal.fire("Updated", "Phone number updated successfully", "success");
        } else {
          Swal.fire("Error", res.data.error, "error");
        }
      });
  };






const closeSemesterAndOpenNext = async () => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will close current semester and open the next level/semester for all current students.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return;

  Swal.fire({
    title: "Processing...",
    text: "Please wait while we update student records.",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    const res = await axios.post(`${api_url}/rollover_semester.php`);
    Swal.close();

    if (res.data.success) {
      Swal.fire("Done!", res.data.message, "success");
    } else {
      Swal.fire("Error!", res.data.error, "error");
    }
  } catch (err) {
    Swal.close();
    Swal.fire("Error!", "Request failed. Try again.", "error");
  }
};



  if (!admin)
    return <p style={{ textAlign: "center", color: "green" }}>Loading...</p>;

  return (
    <Container>
      <DashboardWrapper>
        {/* ✅ Profile Overview (Top like bank card) */}
        <ProfileCard>
          <ProfileInfo>
            <AdminName>👋 Hello, {admin.name}</AdminName>
            <AdminEmail>{admin.email}</AdminEmail>
            <EditButton onClick={() => { setNewPhone(admin.phone); setModalOpen(true); }}>
              <FaPhoneAlt style={{ marginRight: "6px" }} /> Edit Phone
            </EditButton>
          </ProfileInfo>

          <ProfileDetails>
            <p><FaIdCard /> <b>Role:</b> {admin.role}</p>
            <p><FaUsers /> <b>ID:</b> {admin.id}</p>
            <p><FaKey /> <b>Created:</b> {new Date(admin.created_at).toLocaleDateString()}</p>
          </ProfileDetails>
        </ProfileCard>

        {/* ✅ Dashboard Tiles */}
        <DashboardTitle>Quick Access</DashboardTitle>
        <StatsGrid>
          <StatCard onClick={() => onNavigate("alladmin")}>
            <StatIcon><FaUserShield /></StatIcon>
            <StatLabel>Admins</StatLabel>
            <StatValue>Manage administrators</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("alllecturers")}>
            <StatIcon><FaUsers /></StatIcon>
            <StatLabel>Lecturers</StatLabel>
            <StatValue>Manage lecturers</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("allstudents")}>
            <StatIcon><FaUserGraduate /></StatIcon>
            <StatLabel>Students</StatLabel>
            <StatValue>View student list</StatValue>
          </StatCard>

           <StatCard onClick={() => onNavigate("paymentapproval")}>
            <StatIcon><FaBookmark /></StatIcon>
            <StatLabel>Result Payments Approval</StatLabel>
            <StatValue>View and approvove result payments</StatValue>
          </StatCard>

             <StatCard onClick={() => onNavigate("announcements")}>
                                          <StatIcon>
                                            <FaSpeakerDeck/>
                                          </StatIcon>
                                          <StatLabel>Announcements</StatLabel>
                                          <StatValue style={{fontSize:"0.8rem"}}>Manage Announcements</StatValue>
                                        </StatCard>

          <StatCard onClick={() => onNavigate("manageaccesscode")}>
            <StatIcon><FaKey /></StatIcon>
            <StatLabel>Access Codes</StatLabel>
            <StatValue>Access management</StatValue>
          </StatCard>

            <StatCard onClick={() => onNavigate("manageattendance")}>
            <StatIcon><FaSchool /></StatIcon>
            <StatLabel>Manage Attendance</StatLabel>
            <StatValue>Manage Attendances
            </StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("clockin")}>
                                <StatIcon>
                                  <FaClock />
                                </StatIcon>
                                <StatLabel>Clock-in to your Classes and meetings</StatLabel>
                                <StatValue></StatValue>
                              </StatCard>

                                <StatCard onClick={() => onNavigate("generalassets")}>
                                          <StatIcon>
                                            <FaFileCsv />
                                          </StatIcon>
                                          <StatLabel>General Assets</StatLabel>
      <StatValue style={{fontSize:"0.8rem"}}></StatValue>
     </StatCard>

 <StatCard onClick={() => onNavigate("feedback")}>
    <StatIcon>
    <FaReply />
    </StatIcon>
      <StatLabel>Assessment forms and Feedback</StatLabel>
      <StatValue style={{fontSize:"0.8rem"}}></StatValue>
      </StatCard>


       <StatCard onClick={() => onNavigate("resultdownloadhistory")}>
    <StatIcon>
    <FaFileDownload />
    </StatIcon>
      <StatLabel>Result Download History</StatLabel>
      <StatValue style={{fontSize:"0.8rem"}}></StatValue>
      </StatCard>


          <StatCard onClick={() => onNavigate("email")}>
            <StatIcon><FaEnvelope /></StatIcon>
            <StatLabel>Email Center</StatLabel>
            <StatValue>Send & check mail</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("forum")}>
            <StatIcon><FaComments /></StatIcon>
            <StatLabel>Forum</StatLabel>
            <StatValue>Join discussions</StatValue>
          </StatCard>

           <StatCard onClick={() => onNavigate("adminsignup")}>
            <StatIcon><FaComments /></StatIcon>
            <StatLabel>Add Admin</StatLabel>
            <StatValue>Register another admin</StatValue>
          </StatCard>

          <StatCard onClick={() => onNavigate("zerowaste")}>
            <StatIcon><FaUserShield /></StatIcon>
            <StatLabel>Zero Waste Members</StatLabel>
            {/* <StatValue>Register </StatValue> */}
          </StatCard>

          <StatCard onClick={onLogout}>
            <StatIcon style={{ color: "red" }}><FaSignOutAlt /></StatIcon>
            <StatLabel>Logout</StatLabel>
            <StatValue>Sign out securely</StatValue>
          </StatCard>
        </StatsGrid>

        <AdminEditControl/>
        <br/>
        <br/>
        <AdminResultControl/>

        {/* ✅ Edit Modal */}
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

<button onClick={closeSemesterAndOpenNext} style={{color:"white", background:"red", cursor:"pointer", marginTop:"20px", padding:"5px", border:"none", borderRadius:"5px"}}>
  Close Semester & Advance Students
</button>


      </DashboardWrapper>
    </Container>
  );
};

export default AdminDetailsPage;
