
// import { useEffect, useState } from "react";
// import JitsiMeet from "./JitsiMeet";

// const StudentOnlineClass = () => {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/list_classes.php")
//       .then(res => res.json())
//       .then(data => setClasses(data));
//   }, []);

//   return (
//     <div>
//       <h1>Student Dashboard</h1>
//       {classes.map(cls => (
//         <div key={cls.id}>
//           <h3>{cls.course_name}</h3>
//           <p>{new Date(cls.start_time).toLocaleString()}</p>
//           <JitsiMeet roomName={cls.room_name} displayName="Student" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentOnlineClass;





// // src/pages/StudentDashboard.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import JitsiMeet from "../components/JitsiMeet";

// const StudentOnlineClass = () => {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [displayName, setDisplayName] = useState("Student");

//   useEffect(() => {
//     axios.get("http://localhost/your-path/api/classes.php").then((res) => {
//       setClasses(res.data);
//     });
//   }, []);

//   return (
//     <div className="p-4">
//       <h2>Student Dashboard</h2>

//       {!selectedClass ? (
//         <ul>
//           {classes.map((cls) => (
//             <li key={cls.id} className="mb-2">
//               <strong>{cls.title}</strong> @ {new Date(cls.start_time).toLocaleString()}
//               <br />
//               <button
//                 onClick={() => setSelectedClass(cls)}
//                 className="bg-green-500 text-white px-4 py-1 mt-1"
//               >
//                 Join Class
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <JitsiMeet roomName={selectedClass.room_name} displayName={displayName} />
//       )}
//     </div>
//   );
// };

// export default StudentOnlineClass;



import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 30px;
`;

const ClassCard = styled.div`
  background: #f7f7f7;
  margin-bottom: 20px;
  padding: 20px;
  border-left: 6px solid #0f9d58;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  color: green;
`;

const Text = styled.p`
  margin: 5px 0;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 12px 20px;
  background-color: #0f9d58;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #0c7c43;
  }
`;

const StudentOnlineClass = () => {
  const [classes, setClasses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const fetchClasses = async () => {
    try {
      const res = await fetch(
        `https://www.cwmsrfupre.com.ng/api/get_all_online_classes.php?t=${Date.now()}`
      );
      const data = await res.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        console.error('Error:', data.error);
      }
    } catch (err) {
      console.error("Failed to fetch online classes", err);
    }
  };

  const fetchLecturers = async () => {
    try {
      const res = await axios.get('https://www.cwmsrfupre.com.ng/api/get_all_lecturer.php');
      if (res.data.success) {
        setLecturers(res.data.lecturers);
      } else {
        Swal.fire({ text: res.data.error || 'Failed to load admins.' });
      }
    } catch (error) {
      Swal.fire({ text: 'Failed to fetch admins.' });
      console.error(error);
    }
  };



  useEffect(() => {
    fetchClasses();
    fetchLecturers();
  }, []);

  return (
    <Container>
      <h2>All Online Meeting / Classes</h2>
      {classes.length === 0 ? (
        <p>No online meeting / classes available.</p>
      ) : (
        classes.map((item) => {
          const lecturer = lecturers.find(lecturer => parseInt(lecturer.id) === parseInt(item.lecturer_id));
          const lecturerName = lecturer ? lecturer.name : `Lecturer ID ${item.lecturer_id}`;

          return (
            <ClassCard key={item.id}>
              <Title>Lecturer: {lecturerName}</Title>
              <Title>Title: {item.title.toUpperCase()}</Title>
              <Text><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</Text>
              <Button onClick={() => window.open(item.meeting_link, "_blank")}>
                Join Meeting / Class
              </Button>
            </ClassCard>
          );
        })
      )}
    </Container>
  );
};

export default StudentOnlineClass;
