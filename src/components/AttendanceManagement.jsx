

// import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Swal from "sweetalert2";
// import CreateAttendanceForm from "./CreateAttendanceForm";
// import { Context } from "./Context";

// const Container = styled.div`
//   max-width: 1100px;
//   margin: 2rem auto;
//   padding: 1rem;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background: #119458;
//   color: white;
//   border: none;
//   padding: 10px 16px;
//   border-radius: 6px;
//   cursor: pointer;
//   font-weight: bold;
//   &:hover {
//     background: #0d7d45;
//   }
// `;

// const ActionButton = styled(Button)`
//   background: ${(p) =>
//     p.delete ? "#dc3545" : p.toggle ? "#ffc107" : "#007bff"};
//   color: white;
//   padding: 6px 10px;
//   font-size: 0.85rem;
//   margin-right: 6px;
//   &:hover {
//     background: ${(p) =>
//       p.delete ? "#c82333" : p.toggle ? "#e0a800" : "#0056b3"};
//   }
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 20px;
// `;

// const Card = styled.div`
//   background: #fff;
//   border-radius: 12px;
//   box-shadow: 0 6px 16px rgba(0,0,0,0.3);
//   padding: 18px 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   transition: transform 0.2s ease, box-shadow 0.2s ease;
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 20px rgba(0,0,0,0.3);
//   }
// `;

// const Title = styled.h3`
//   margin: 0;
//   color: #119458;
//   font-size: 1.2rem;
// `;

// const Meta = styled.div`
//   font-size: 0.9rem;
//   color: #444;
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;

// const Status = styled.span`
//   align-self: flex-start;
//   padding: 4px 10px;
//   border-radius: 5px;
//   color: white;
//   background: ${(props) => (props.status === "active" ? "#28a745" : "#dc3545")};
//   font-size: 12px;
//   font-weight: 600;
// `;

// const Actions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 8px;
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.6);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 300;
// `;

// const ModalBox = styled.div`
//   background: white;
//   width: 90%;
//   max-width: 750px;
//   border-radius: 12px;
//   overflow-y: auto;
//   max-height: 90vh;
//   position: relative;
// `;

// const CloseBtn = styled.button`
//   background: transparent;
//   border: none;
//   font-size: 20px;
//   font-weight: bold;
//   color: #333;
//   position: absolute;
//   top: 10px;
//   right: 15px;
//   cursor: pointer;
// `;

// const AttendanceManagement = ({
//   adminId,
//   apiBase = "https://www.cwmsrfupre.com.ng/api",
// }) => {
//   const [attendanceList, setAttendanceList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const { courses } = useContext(Context);

//   const fetchAttendance = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${apiBase}/get_attendance.php`, {
//         headers: { "Cache-Control": "no-cache" },
//       });
//       if (res.data.success) setAttendanceList(res.data.attendance);
//       else Swal.fire("Error", "Failed to fetch attendance", "error");
//     } catch (err) {
//       Swal.fire("Error", "Network or server error", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Toggle Status Function
//   const handleToggleStatus = async (item) => {
//     const newStatus = item.status === "active" ? "inactive" : "active";

//     const confirm = await Swal.fire({
//       title: `Change status to ${newStatus.toUpperCase()}?`,
//       text: `This will mark the attendance as ${newStatus}.`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: `Yes, set to ${newStatus}`,
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#119458",
//       reverseButtons: true,
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await axios.post(`${apiBase}/update_attendance_status.php`, {
//         id: item.id,
//         status: newStatus,
//       });

//       if (res.data.success) {
//         Swal.fire("Updated", `Status changed to ${newStatus}`, "success");
//         fetchAttendance();
//       } else {
//         Swal.fire("Error", res.data.error || "Failed to update status", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Server error", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This record will be deleted permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc3545",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await axios.post(`${apiBase}/delete_attendance.php`, { id });
//       if (res.data.success) {
//         Swal.fire("Deleted!", "Record deleted successfully", "success");
//         fetchAttendance();
//       } else Swal.fire("Error", "Failed to delete", "error");
//     } catch (err) {
//       Swal.fire("Error", "Server error", "error");
//     }
//   };

//   const getCourseTitle = (courseId) => {
//     if (!courseId) return "—";
//     const course = courses.find((c) => c.id === parseInt(courseId));
//     return course ? `${course.code} - ${course.title}` : "Unknown Course";
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   return (
//     <Container>
//       <Header>
//         <h2 style={{ color: "#119458" }}>Attendance Sheet Management</h2>
//         <Button onClick={() => { setEditData(null); setShowModal(true); }}>
//           + Create Attendance
//         </Button>
//       </Header>

//       {loading ? (
//         <p>Loading...</p>
//       ) : attendanceList.length === 0 ? (
//         <p>No attendance sheets created yet.</p>
//       ) : (
//         <Grid>
//           {attendanceList.map((item) => (
//             <Card key={item.id}>
//               <Title>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Title>
//               <Status status={item.status}>{item.status}</Status>
//               <Meta>
//                 <div><strong>Type:</strong> {item.type}</div>
//                 {item.course_id && (
//                   <div><strong>Course:</strong> {getCourseTitle(item.course_id)}</div>
//                 )}
//                 {item.description && (
//                   <div><strong>Description:</strong> {item.description}</div>
//                 )}
//                 <div>
//                   <strong>Date:</strong> {new Date(item.created_at).toLocaleString()}
//                 </div>
//               </Meta>
//               <Actions>
//                 <ActionButton
//                   toggle
//                   onClick={() => handleToggleStatus(item)}
//                 >
//                   {item.status === "active" ? "Set Inactive" : "Set Active"}
//                 </ActionButton>
//                 <ActionButton delete onClick={() => handleDelete(item.id)}>
//                   Delete
//                 </ActionButton>
//               </Actions>
//             </Card>
//           ))}
//         </Grid>
//       )}

//       {showModal && (
//         <ModalOverlay onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
//           <ModalBox>
//             <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
//             <CreateAttendanceForm
//               adminId={adminId}
//               apiBase={apiBase}
//               fetchAttendance={fetchAttendance}
//               onClose={() => setShowModal(false)}
//               editData={editData}
//             />
//           </ModalBox>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// };

// export default AttendanceManagement;


import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import CreateAttendanceForm from "./CreateAttendanceForm";
import { Context } from "./Context";

const Container = styled.div`max-width:1100px;margin:2rem auto;padding:1rem;`;
const Header = styled.div`display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;`;
const Button = styled.button`
  background:#119458;color:white;border:none;padding:10px 16px;border-radius:6px;
  cursor:pointer;font-weight:bold;&:hover{background:#0d7d45;}
`;
const ActionButton = styled(Button)`
  background:${(p)=>p.delete?"#dc3545":p.toggle?"#ffc107":"#007bff"};
  padding:6px 10px;font-size:0.85rem;margin-right:6px;
  &:hover{background:${(p)=>p.delete?"#c82333":p.toggle?"#e0a800":"#0056b3"};}
`;
const Grid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;`;
const Card = styled.div`
  background:#fff;border-radius:12px;box-shadow:0 6px 16px rgba(0,0,0,0.3);
  padding:18px 20px;display:flex;flex-direction:column;gap:8px;
  transition:transform 0.2s ease, box-shadow 0.2s ease;
  &:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.3);}
`;
const Title = styled.h3`margin:0;color:#119458;font-size:1.2rem;`;
const Meta = styled.div`font-size:0.9rem;color:#444;display:flex;flex-direction:column;gap:4px;`;
const Status = styled.span`
  align-self:flex-start;padding:4px 10px;border-radius:5px;color:white;
  background:${(p)=>p.status==="active"?"#28a745":"#dc3545"};font-size:12px;font-weight:600;
`;
const Actions = styled.div`display:flex;justify-content:flex-end;margin-top:8px;`;
const ModalOverlay = styled.div`
  position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.6);
  display:flex;justify-content:center;align-items:center;z-index:300;
`;
const ModalBox = styled.div`
  background:white;width:90%;max-width:750px;border-radius:12px;
  overflow-y:auto;max-height:90vh;position:relative;padding:20px;
`;
const CloseBtn = styled.button`
  background:transparent;border:none;font-size:20px;font-weight:bold;color:#333;
  position:absolute;top:10px;right:15px;cursor:pointer;
`;
const TableContainer = styled.div`
  max-height: 400px; /* adjust as needed */
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

// Keep your existing table styling clean
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background: #119458;
    color: white;
    position: sticky;
    top: 0; /* keeps the header visible while scrolling */
    z-index: 2;
  }
`;


const AttendanceManagement = ({ adminId, apiBase = "https://www.cwmsrfupre.com.ng/api" }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const { courses } = useContext(Context);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiBase}/get_attendance.php`);
      if (res.data.success) setAttendanceList(res.data.attendance);
      else Swal.fire("Error", "Failed to fetch attendance", "error");
    } catch {
      Swal.fire("Error", "Network or server error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleViewParticipants = async (item) => {
    setSelectedAttendance(item);
    try {
      const res = await axios.get(`${apiBase}/get_attendance_participants.php?attendance_id=${item.id}`);
      if (res.data.success) {
        setParticipants(res.data.participants);
        setParticipantsModal(true);
        console.log(res.data)
      } else {
        Swal.fire("Error", res.data.error || "Failed to load participants", "error");
      }
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === "active" ? "inactive" : "active";
    const confirm = await Swal.fire({
      title: `Change status to ${newStatus.toUpperCase()}?`,
      text: `This will mark the attendance as ${newStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, set to ${newStatus}`,
      confirmButtonColor: "#119458",
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await axios.post(`${apiBase}/update_attendance_status.php`, { id: item.id, status: newStatus });
      if (res.data.success) {
        Swal.fire("Updated", `Status changed to ${newStatus}`, "success");
        fetchAttendance();
      } else Swal.fire("Error", res.data.error || "Failed to update", "error");
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This attendance record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(`${apiBase}/delete_attendance.php`, { id });
      if (res.data.success) {
        Swal.fire("Deleted!", "Attendance deleted successfully", "success");
        fetchAttendance();
      } else Swal.fire("Error", "Failed to delete record", "error");
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const getCourseTitle = (courseId) => {
    if (!courseId) return "—";
    const course = courses.find((c) => c.id === parseInt(courseId));
    return course ? `${course.code} - ${course.title}` : "Unknown Course";
  };

useEffect(() => {
  // Run immediately on mount
  fetchAttendance();

  // Then re-run every 10 seconds
//   const interval = setInterval(() => {
//     fetchAttendance();
//   }, 10000); // 10,000 ms = 10 seconds

//   // Cleanup on unmount to prevent memory leaks
//   return () => clearInterval(interval);
}, []);


  

  return (
    <Container>
      <Header>
        <h2 style={{ color: "#119458" }}>Attendance Sheet Management</h2>
        <Button onClick={() => setShowModal(true)}>+ Create Attendance</Button>
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid>
          {attendanceList.map((item) => (
            <Card key={item.id}>
              <Title>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Title>
              <Status status={item.status}>{item.status}</Status>
              <Meta>
                <div><strong>Type:</strong> {item.type}</div>
                {item.course_id && <div><strong>Course:</strong> {getCourseTitle(item.course_id)}</div>}
                {item.description && <div><strong>Description:</strong> {item.description}</div>}
                <div><strong>Date:</strong> {new Date(item.created_at).toLocaleString()}</div>
              </Meta>
              <Actions>
                <ActionButton onClick={() => handleViewParticipants(item)}>View Participants</ActionButton>
                <ActionButton toggle onClick={() => handleToggleStatus(item)}>
                  {item.status === "active" ? "Set Inactive" : "Set Active"}
                </ActionButton>
                <ActionButton delete onClick={() => handleDelete(item.id)}>Delete</ActionButton>
              </Actions>
            </Card>
          ))}
        </Grid>
      )}

      {/* Create Attendance Modal */}
      {showModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalBox>
            <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
            <CreateAttendanceForm
              adminId={adminId}
              apiBase={apiBase}
              fetchAttendance={fetchAttendance}
              onClose={() => setShowModal(false)}
            />
          </ModalBox>
        </ModalOverlay>
      )}

      {/* Participants Modal */}
      {participantsModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setParticipantsModal(false)}>
          <ModalBox>
            <CloseBtn onClick={() => setParticipantsModal(false)}>×</CloseBtn>
            <h3 style={{ color: "#119458" }}>
              Participants for: {selectedAttendance?.title}
            </h3>
            {participants.length === 0 ? (
              <p>No participants have clocked in yet.</p>
            ) : (
                <TableContainer>

                
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Clock In Time</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, i) => (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.identifier}</td>
                      <td>{p.user_type}</td>
                      <td>{new Date(p.clock_in_time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </TableContainer>
            )}
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default AttendanceManagement;
