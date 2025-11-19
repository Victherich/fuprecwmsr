// // // src/pages/LecturerDashboard.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import JitsiMeet from "./JitsiMeet";

// // const LecturerOnlineClass = () => {
// //   const [roomName, setRoomName] = useState("");
// //   const [title, setTitle] = useState("");
// //   const [startTime, setStartTime] = useState("");
// //   const [displayName, setDisplayName] = useState("Lecturer John");
// //   const [started, setStarted] = useState(true);

// //   const handleStartClass = async () => {
// //     await axios.post("http://localhost/your-path/api/classes.php", {
// //       title,
// //       room_name: roomName,
// //       created_by: 1,
// //       start_time: startTime,
// //     });

// //     setStarted(true);
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2>Lecturer Dashboard</h2>

// //       {!started ? (
// //         <>
// //           <input
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             placeholder="Class Title"
// //             className="border p-2 block mb-2"
// //           />
// //           <input
// //             value={roomName}
// //             onChange={(e) => setRoomName(e.target.value)}
// //             placeholder="Room Name"
// //             className="border p-2 block mb-2"
// //           />
// //           <input
// //             type="datetime-local"
// //             value={startTime}
// //             onChange={(e) => setStartTime(e.target.value)}
// //             className="border p-2 block mb-2"
// //           />
// //           <button onClick={handleStartClass} className="bg-blue-500 text-white px-4 py-2">
// //             Start Class
// //           </button>
// //         </>
// //       ) : (
// //         <JitsiMeet roomName={roomName} displayName={displayName} />
// //       )}
// //     </div>
// //   );
// // };

// // export default LecturerOnlineClass;






// import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Context } from './Context';
// import Swal from 'sweetalert2';

// const Container = styled.div`
//   max-width: 600px;
//   margin: auto;
//   padding: 30px;
// `;

// const Input = styled.input`
//   width: 100%;
//   margin-bottom: 15px;
//   padding: 12px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
// `;

// const Button = styled.button`
//   margin-top: 30px;
//   padding: 12px 20px;
//   background-color: #0f9d58;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   margin-right:20px;

//   &:hover {
//     background-color: #0c7c43;
//   }
// `;

// const ClassItem = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   background: #f9f9f9;
// `;

// const LecturerOnlineClass = ({ lecturerId }) => {
//   const [meetingLinks, setMeetingLinks] = useState([]);
//   const [onlineClasses, setOnlineClasses] = useState([]);

//   const fetchMeetingLinks = async () => {
//     try {
//       const res = await fetch('https://www.cwmsrfupre.com.ng/api/get_all_meeting_links.php');
//       const data = await res.json();
//       if (data.success) {
//         setMeetingLinks(data.meeting_links);
//         console.log('Meeting links:', data.meeting_links);
//       }
//     } catch (error) {
//       console.error('Failed to fetch meeting links', error);
//     }
//   };

//   const fetchOnlineClasses = async () => {
//     try {
//       const res = await fetch(`https://www.cwmsrfupre.com.ng/api/get_online_classes_by_lecturer.php?lecturer_id=${lecturerId}&t=${Date.now()}`);
//       const data = await res.json();
//       if (data.success) {
//         setOnlineClasses(data.classes);
//         console.log('Online classes:', data.classes);
//       }
//     } catch (error) {
//       console.error('Failed to fetch online classes', error);
//     }
//   };

//   useEffect(() => {
//     fetchMeetingLinks();
//     fetchOnlineClasses();
//   }, [lecturerId]);

//   const handleSubmit = async () => {
//     if (meetingLinks.length === 0 || !meetingLinks[0].meeting_link.trim()) {
//       Swal.fire({ text: 'Meeting link is not present' });
//       return;
//     }

//     Swal.fire({ text: 'Please wait...' });
//     Swal.showLoading();

//     try {
//       const response = await axios.post(
//         'https://www.cwmsrfupre.com.ng/api/create_online_class.php',
//         {
//           lecturer_id: lecturerId,
//           link: meetingLinks[0].meeting_link,
//         },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data.success) {
//         Swal.fire({ text: 'Online class created!' });
//         fetchOnlineClasses(); // Refresh class list
//         fetchMeetingLinks();
//       } else {
//         Swal.fire({ text: response.data.error || 'Failed to create class' });
//       }
//     } catch (error) {
//       Swal.fire({ text: 'Error: Could not connect to server' });
//     }
//   };



//   const deleteClass = async (classId) => {
//     const confirm = await Swal.fire({
//       text: "Are you sure you want to delete this class?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });
  
//     if (!confirm.isConfirmed) return;
  
//     try {
//       const res = await axios.post(
//         'https://www.cwmsrfupre.com.ng/api/delete_online_class.php',
//         { id: classId },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
  
//       if (res.data.success) {
//         Swal.fire({ text: 'Class deleted successfully!' });
//         fetchOnlineClasses(); // Refresh class list
//       } else {
//         Swal.fire({ text: res.data.error || 'Failed to delete class.' });
//       }
//     } catch (err) {
//       Swal.fire({ text: 'Server error during deletion.' });
//     }
//   };
  



//   return (
//     <Container>
//       <h2 style={{color:"green"}}>Your Online Meeting / Class</h2>

//       {onlineClasses.length===0&&<Button onClick={handleSubmit}>Create Your Online Meeting / Class</Button>}

//       {/* <h3 style={{ marginTop: '40px' }}>Previous Online Classes</h3> */}
//       {onlineClasses.length === 0 ? (
//         <p>No online Meeting / Class found.</p>
//       ) : (
//         onlineClasses.map((cls, index) => (
//           <ClassItem key={index}>
//             <h3 style={{color:"green"}}>This is your online Meeting / Class </h3>
//             {/* <div><strong>Meeting Link:</strong> <a href={cls.meeting_link} target="_blank" rel="noopener noreferrer">{cls.meeting_link}</a></div> */}
//             <div><strong>Created At:</strong> {cls.created_at}</div>
//             <Button onClick={()=>window.open(cls.meeting_link, "_blank")}>
//               Enter Meeting / Class
//             </Button>
//             {/* <Button onClick={()=>deleteClass(cls.id)} style={{color:"green", backgroundColor:"white", border:"1px solid green"}}>
//               Delete Meeting / Class
//             </Button> */}
//           </ClassItem>
//         ))
//       )}
//     </Container>
//   );
// };

// export default LecturerOnlineClass;





import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 30px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 12px 20px;
  background-color: #0f9d58;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right:10px;

  &:hover {
    background-color: #0c7c43;
  }
`;

const ClassItem = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const LecturerOnlineClass = ({ lecturerId }) => {
  const [meetingLinks, setMeetingLinks] = useState([]);
  const [onlineClasses, setOnlineClasses] = useState([]);

  /* NEW STATES */
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editModal, setEditModal] = useState(false); // NEW
  const [editTitle, setEditTitle] = useState(""); // NEW
  const [editClassId, setEditClassId] = useState(null); // NEW

  const fetchMeetingLinks = async () => {
    try {
      const res = await fetch('https://www.cwmsrfupre.com.ng/api/get_all_meeting_links.php');
      const data = await res.json();
      if (data.success) {
        setMeetingLinks(data.meeting_links);
      }
    } catch (error) {
      console.error('Failed to fetch meeting links', error);
    }
  };

  const fetchOnlineClasses = async () => {
    try {
      const res = await fetch(
        `https://www.cwmsrfupre.com.ng/api/get_online_classes_by_lecturer.php?lecturer_id=${lecturerId}&t=${Date.now()}`
      );
      const data = await res.json();
      if (data.success) {
        setOnlineClasses(data.classes);
      }
    } catch (error) {
      console.error('Failed to fetch online classes', error);
    }
  };

  useEffect(() => {
    fetchMeetingLinks();
    fetchOnlineClasses();
  }, [lecturerId]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Swal.fire({ text: "Please enter a class or meeting title." });
      return;
    }

    if (meetingLinks.length === 0 || !meetingLinks[0].meeting_link.trim()) {
      Swal.fire({ text: 'Meeting link is not present' });
      return;
    }

    Swal.fire({ text: 'Please wait...' });
    Swal.showLoading();

    try {
      const response = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/create_online_class.php',
        {
          lecturer_id: lecturerId,
          link: meetingLinks[0].meeting_link,
          title: title
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        Swal.fire({ text: 'Online class created!' });
        fetchOnlineClasses();
        fetchMeetingLinks();
      } else {
        Swal.fire({ text: response.data.error || 'Failed to create class' });
      }
    } catch (error) {
      Swal.fire({ text: 'Error: Could not connect to server' });
    }

    setShowModal(false);
    setTitle("");
  };

  /* ------------------------------------------
      NEW: OPEN EDIT MODAL WITH CURRENT TITLE
  ------------------------------------------ */
  const openEditModal = (cls) => {
    setEditClassId(cls.id);
    setEditTitle(cls.title);
    setEditModal(true);
  };

  /* ---------------------------------------------------
     NEW: UPDATE TITLE IN BACKEND
  ---------------------------------------------------- */
  const updateTitle = async () => {
    if (!editTitle.trim()) {
      Swal.fire({ text: 'Title cannot be empty.' });
      return;
    }

    Swal.fire({ text: 'Updating title...' });
    Swal.showLoading();

    try {
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/update_online_class_title.php",
        {
          id: editClassId,
          title: editTitle
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        Swal.fire({ text: "Title updated successfully!" });
        fetchOnlineClasses();
        setEditModal(false);
      } else {
        Swal.fire({ text: res.data.error || "Failed to update title." });
      }
    } catch (err) {
      Swal.fire({ text: "Server error updating title." });
    }
  };

  const deleteClass = async (classId) => {
    const confirm = await Swal.fire({
      text: "Are you sure you want to delete this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(
        'https://www.cwmsrfupre.com.ng/api/delete_online_class.php',
        { id: classId },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        Swal.fire({ text: 'Class deleted successfully!' });
        fetchOnlineClasses();
      } else {
        Swal.fire({ text: res.data.error || 'Failed to delete class.' });
      }
    } catch (err) {
      Swal.fire({ text: 'Server error during deletion.' });
    }
  };

  return (
    <Container>
      <h2 style={{color:"green"}}>Your Online Meeting / Class</h2>

      {onlineClasses.length === 0 && (
        <Button onClick={() => setShowModal(true)}>
          Create Your Online Meeting / Class
        </Button>
      )}

      {onlineClasses.length === 0 ? (
        <p>No online Meeting / Class found.</p>
      ) : (
        onlineClasses.map((cls, index) => (
          <ClassItem key={index}>
            <h3 style={{color:"green"}}>This is your online Meeting / Class </h3>

            <div style={{fontWeight:"bold"}}>
              <strong style={{color:"green"}}>Title:</strong> {cls.title.toUpperCase()}
            </div>

            <div><strong style={{color:"green"}}>Created At:</strong> {cls.created_at}</div>

            <Button onClick={() => window.open(cls.meeting_link, "_blank")}>
              Enter Meeting / Class
            </Button>

            {/* NEW: EDIT BUTTON */}
            <Button 
              onClick={() => openEditModal(cls)} 
              style={{ backgroundColor: "#f39c12" }}
            >
              Edit Title
            </Button>
          </ClassItem>
        ))
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <ModalBg>
          <ModalBox>
            <h3>Enter Class / Meeting Title</h3>
            <Input
              placeholder="e.g. PHY101 - Mechanics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <Button 
              onClick={() => setShowModal(false)} 
              style={{ backgroundColor: "gray" }}
            >
              Cancel
            </Button>
          </ModalBox>
        </ModalBg>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <ModalBg>
          <ModalBox>
            <h3>Edit Class Title</h3>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Button onClick={updateTitle}>Update</Button>
            <Button 
              onClick={() => setEditModal(false)} 
              style={{ backgroundColor: "gray" }}
            >
              Cancel
            </Button>
          </ModalBox>
        </ModalBg>
      )}

    </Container>
  );
};

export default LecturerOnlineClass;
