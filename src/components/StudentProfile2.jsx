import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaBook,
  FaEnvelope,
  FaClipboardList,
  FaGraduationCap,
  FaPhoneAlt,
  FaIdCard,
  FaSignOutAlt,
  FaUser,
  FaLaptop,
  FaComments,
  FaClock,
  FaVideo,
  FaFileCsv,
  FaEdit,
  FaSpeakerDeck,
  FaReply,
} from "react-icons/fa";
import { Context } from "./Context";

const Container = styled.div`
  background: linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 2rem;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
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

const Info = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Name = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const Email = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

const Details = styled.div`
  text-align: right;
  font-size: 0.9rem;
  min-width: 220px;
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

const Title = styled.h3`
  font-size: 1.4rem;
  color: #006400;
  margin-bottom: 1.2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
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

const Icon = styled.div`
  font-size: 2rem;
  color: #00994d;
  margin-bottom: 0.8rem;
`;

const Label = styled.h4`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const Value = styled.p`
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

const StudentProfile2 = ({ studentId, onNavigate, onLogout }) => {
  const [student, setStudent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
   const [isModalOpen2, setModalOpen2] = useState(false);
  const [newPhone, setNewPhone] = useState("");
   const [newName, setNewName] = useState('');
  const { programs } = useContext(Context);

  console.log(student)

  useEffect(() => {
    if (!studentId) return;
    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then((res) => {
        if (res.data.success) {
          setStudent(res.data.student);
          setNewName(res.data.student.full_name);
        }
      })
      .catch(() => Swal.fire("Error", "Failed to fetch student details", "error"));
  }, [studentId]);





  const handleSave = () => {
    axios
      .post("https://www.cwmsrfupre.com.ng/api/update_student_phone.php", {
        id: student.id,
        phone: newPhone,
      })
      .then((res) => {
        if (res.data.success) {
          setStudent((prev) => ({ ...prev, phone: newPhone }));
          setModalOpen(false);
          Swal.fire("Updated", "Phone number updated successfully", "success");
        } else {
          Swal.fire("Error", res.data.error, "error");
        }
      });
  };







const handleSaveName = () => {
  if (!newName || newName.trim() === "") {
    Swal.fire("Error", "Name cannot be empty", "error");
    return;
  }

  axios
    .post("https://www.cwmsrfupre.com.ng/api/update_student_name.php", {
      id: student.id,
      full_name: newName.trim(),
    })
    .then((res) => {
      if (res.data.success) {
        // Update student state with new name
        setStudent((prev) => ({ ...prev, full_name: newName.trim() }));
        setModalOpen2(false);
        Swal.fire("Updated", "Student name updated successfully", "success");
      } else {
        Swal.fire("Error", res.data.error, "error");
      }
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Something went wrong while updating the name", "error");
    });
};





 const [allowEdit, setAllowEdit] = useState(false);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await axios.get(
          `https://www.cwmsrfupre.com.ng/api/get_edit_setting.php?nocache=${Date.now()}`
        ); // timestamp to avoid caching
        if (res.data.success) setAllowEdit(res.data.allow_edit);
      } catch (err) {
        console.error("Failed to fetch setting", err);
      }
    };

    // Fetch immediately
    fetchSetting();

    // Fetch every 5 seconds
    const interval = setInterval(fetchSetting, 5000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);



  if (!student)
    return <p style={{ textAlign: "center", color: "green" }}>Loading...</p>;

  return (
    <Container>
      <Wrapper>
        {/* ✅ Profile Card */}
        <ProfileCard>
          <Info>
            <Name>🎓 {student.full_name} 
              
              {allowEdit&&<span 
            style={{cursor:"pointer"}}
            onClick={()=>setModalOpen2(true)}> <FaEdit/></span>}
            
            </Name>
            <Email>{student.email}</Email>
            <EditButton
              onClick={() => {
                setNewPhone(student.phone);
                setModalOpen(true);
              }}
            >
              <FaPhoneAlt style={{ marginRight: "6px" }} /> Edit Phone
            </EditButton>
          </Info>

          <Details>
            <p>
              <FaIdCard /> <b>Admission No:</b> {student.admission_number}
            </p>
            <p>
              <FaBook /> <b>Program:</b>{" "}
              {programs.find((p) => p.id == student.program)?.name || "N/A"}
            </p>
            <p>
              <FaGraduationCap /> <b>Status:</b> {student.status}
            </p>
            <p>
              <FaUser /> <b>Suspension:</b> {student.suspension || "Active"}
            </p>
          </Details>
        </ProfileCard>

        {/* ✅ Dashboard Quick Access */}
        <Title>Quick Access</Title>
        <Grid>
          <Card onClick={() => onNavigate("enrollment")}>
            <Icon>
              <FaBook />
            </Icon>
            <Label>Enrollments</Label>
            <Value>Ensure to enroll for all the courses you are offering.</Value>
          </Card>

          <Card onClick={() => onNavigate("myresults")}>
            <Icon>
              <FaClipboardList />
            </Icon>
            <Label>My Results</Label>
            <Value>View your results & GPA</Value>
          </Card>

          <Card onClick={() => onNavigate("assignments")}>
            <Icon>
              <FaBook />
            </Icon>
            <Label>Assignments / Quizes / Exam papers / Lecture notes / Handouts</Label>
            {/* <Value>View & submit assignments</Value> */}
          </Card>

            <Card onClick={() => onNavigate("videolessons")}>
            <Icon>
              <FaVideo />
            </Icon>
            <Label>Explore Video Lessons</Label>
            {/* <Value>View & submit assignments</Value> */}
          </Card>

          <Card onClick={() => onNavigate("submissions")}>
            <Icon>
              <FaBook />
            </Icon>
            <Label>Submit your Assignments / Quizes / Examinations</Label>
            {/* <Value>View & submit assignments</Value> */}
          </Card>

      

          <Card onClick={() => onNavigate("onlineclass")}>
            <Icon>
              <FaLaptop />
            </Icon>
            <Label>Online Meeting / Class</Label>
            <Value>Join your live Meeting /class</Value>
          </Card>

          <Card onClick={() => onNavigate("clockin")}>
            <Icon>
              <FaClock />
            </Icon>
            <Label>Clock-in to your Classes and meetings</Label>
            <Value></Value>
          </Card>

           <Card onClick={() => onNavigate("announcements")}>
            <Icon>
              <FaSpeakerDeck />
            </Icon>
            <Label>Announcements</Label>
            {/* <Value style={{fontSize:"0.8rem"}}></Value> */}
          </Card>

           <Card onClick={() => onNavigate("generalassets")}>
            <Icon>
              <FaFileCsv />
            </Icon>
            <Label>General Assets</Label>
            <Value style={{fontSize:"0.8rem"}}>Access General Files (eg. Academic Calender, time tables e.t.c.)</Value>
          </Card>


          {["13", "14", "15", "16"].includes(student.program) && (
  <Card onClick={() => onNavigate("feedback")}>
    <Icon>
      <FaReply />
    </Icon>
    <Label>Assessment Forms and Feedbacks</Label>
  </Card>
)}


          <Card onClick={() => onNavigate("email")}>
            <Icon>
              <FaEnvelope />
            </Icon>
            <Label>Email Center</Label>
            <Value>Send and check messages</Value>
          </Card>

          <Card onClick={() => onNavigate("forum")}>
            <Icon>
              <FaComments />
            </Icon>
            <Label>Forum</Label>
            <Value>Join academic discussions</Value>
          </Card>

          <Card onClick={onLogout}>
            <Icon style={{ color: "red" }}>
              <FaSignOutAlt />
            </Icon>
            <Label>Logout</Label>
            <Value>Sign out securely</Value>
          </Card>
        </Grid>

        {/* ✅ Modal */}
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
                <CancelButton onClick={() => setModalOpen(false)}>
                  Cancel
                </CancelButton>
              </div>
            </Modal>
          </ModalOverlay>
        )}

        
      {/* ✅ Modal */}
      {isModalOpen2 && (
        <ModalOverlay>
          <Modal>
            <h3>Edit Name</h3>
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div>
              <SaveButton onClick={handleSaveName}>Save</SaveButton>
              <CancelButton onClick={() => setModalOpen2(false)}>
                Cancel
              </CancelButton>
            </div>
          </Modal>
        </ModalOverlay>
      )}
      </Wrapper>
    </Container>
  );
};

export default StudentProfile2;
