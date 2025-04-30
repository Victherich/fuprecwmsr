// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Context } from './Context';

// // Styled Components
// const Container = styled.div`
//   padding: 40px;
//   max-width: 900px;
//   margin: 40px auto;
//   background-color: white;
//   border: 2px solid #0a4d24;
//   border-radius: 12px;
//   box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
//   font-family: 'Georgia', serif;
// `;

// const Header = styled.div`
//   text-align: center;
//   border-bottom: 2px solid #0a4d24;
//   padding-bottom: 20px;
//   margin-bottom: 30px;
// `;

// const SchoolName = styled.h1`
//   font-size: 28px;
//   color: #0a4d24;
//   text-transform: uppercase;
//   margin-bottom: 10px;
// `;

// const SubText = styled.p`
//   font-size: 14px;
//   color: #666;
// `;

// const SectionTitle = styled.h3`
//   font-size: 20px;
//   color: #0a4d24;
//   margin-top: 30px;
//   margin-bottom: 10px;
// `;

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 12px;
//   font-size: 16px;
// `;

// const Row = styled.div`
//   margin-bottom: 10px;
// `;

// const Label = styled.span`
//   font-weight: bold;
//   color: #333;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 14px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   background-color: #0a4d24;
//   color: white;
//   font-size: 16px;
//   padding: 10px 24px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-top: 10px;
//   transition: background-color 0.2s ease-in;

//   &:hover {
//     background-color: darkorange;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 30px;
// `;

// const Th = styled.th`
//   padding: 12px;
//   border: 1px solid #ccc;
//   background-color: #e6f2ea;
//   color: #0a4d24;
// `;

// const Td = styled.td`
//   padding: 10px;
//   border: 1px solid #ccc;
//   text-align: center;
// `;

// const StudentResult = ({ studentId }) => {
//   const { levels, semesters, courses } = useContext(Context);

//   const [student, setStudent] = useState({});
//   const [enrollments, setEnrollments] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');

//   useEffect(() => {
//     if (!studentId) return;
//     axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
//       .then(res => {
//         if (res.data.success) setStudent(res.data.student);
//       })
//       .catch(err => console.error("Failed to fetch student", err));
//   }, [studentId]);

//   const fetchResults = () => {
//     axios.get(`https://www.cwmsrfupre.com.ng/api/get_enrolled_courses.php?student_id=${student.id}`)
//       .then(res => {
//         if (res.data.success) {
//           const filtered = res.data.enrollments.filter(e => {
//             const course = courses.find(c => c.id == e.course_id);
//             return course?.level_id == selectedLevel && course?.semester_id == selectedSemester;
//           });
//           setEnrollments(filtered);
//         } else {
//           setEnrollments([]);
//         }
//       });
//   };

//   return (
//     <Container>
//       <Header>
//         <SchoolName>College of XYZ</SchoolName>
//         <SubText>Academic Transcript / Result Sheet</SubText>
//       </Header>

//       <SectionTitle>Student Details</SectionTitle>
//       <InfoGrid>
//         <Row><Label>Full Name:</Label> {student.fullname}</Row>
//         <Row><Label>Matric No:</Label> {student.matric_no}</Row>
//         <Row><Label>Programme:</Label> {student.program_name}</Row>
//         <Row><Label>Department:</Label> {student.department_name}</Row>
//       </InfoGrid>

//       <SectionTitle>Select Session</SectionTitle>
//       <div>
//         <Label>Level</Label>
//         <Select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
//           <option value="">Select Level</option>
//           {levels.map(level => (
//             <option key={level.id} value={level.id}>{level.name}</option>
//           ))}
//         </Select>

//         <Label>Semester</Label>
//         <Select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
//           <option value="">Select Semester</option>
//           {semesters.map(sem => (
//             <option key={sem.id} value={sem.id}>{sem.name}</option>
//           ))}
//         </Select>

//         <Button onClick={fetchResults}>View Result</Button>
//       </div>

//       {enrollments.length > 0 && (
//         <>
//           <SectionTitle>Semester Results</SectionTitle>
//           <Table>
//             <thead>
//               <tr>
//                 <Th>Code</Th>
//                 <Th>Title</Th>
//                 <Th>Assignment</Th>
//                 <Th>Quiz</Th>
//                 <Th>Exam</Th>
//                 <Th>Total</Th>
//                 <Th>Grade</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {enrollments.map((e, index) => {
//                 const course = courses.find(c => c.id == e.course_id);
//                 const total = parseInt(e.assignment_score) + parseInt(e.quiz_score) + parseInt(e.exam_score);
//                 const grade = total >= 70 ? 'A' :
//                               total >= 60 ? 'B' :
//                               total >= 50 ? 'C' :
//                               total >= 45 ? 'D' :
//                               total >= 40 ? 'E' : 'F';

//                 return (
//                   <tr key={index}>
//                     <Td>{course?.code}</Td>
//                     <Td>{course?.title}</Td>
//                     <Td>{e.assignment_score}</Td>
//                     <Td>{e.quiz_score}</Td>
//                     <Td>{e.exam_score}</Td>
//                     <Td>{total}</Td>
//                     <Td>{grade}</Td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </>
//       )}
//     </Container>
//   );
// };

// export default StudentResult;





import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { Context } from './Context';
import Swal from 'sweetalert2';
import logo from '../Images/logo2.png'
import { FaPrint, FaDownload } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 40px auto;
  background-color: white;
  border: 2px solid #0a4d24;
  border-radius: 12px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;
`;

const Header = styled.div`
  text-align: center;
  border-bottom: 2px solid #0a4d24;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

const SchoolName = styled.h1`
  font-size: 28px;
  color: #0a4d24;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #666;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: #0a4d24;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  font-size: 16px;
`;

const Row = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: white;
  color: #0a4d24 ;
  font-size: 16px;
  padding: 10px 24px;
  border: 1px solid  #0a4d24;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: darkorange;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  padding: 12px;
  border: 1px solid #ccc;
  background-color: #e6f2ea;
  color: #0a4d24;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;


const Img = styled.img`
// width:100px;
// height:100px;
`

const StudentResult = ({ studentId }) => {
  const { levels, semesters, courses , programs} = useContext(Context);
  const [student, setStudent] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const resultRef = useRef();

  useEffect(() => {
    if (!studentId) return;
    axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then(res => {
        if (res.data.success) setStudent(res.data.student);
      })
      .catch(err => console.error("Failed to fetch student", err));
  }, [studentId]);

  const fetchResults = () => {
if (!selectedLevel || !selectedSemester){
    Swal.fire({text:"Select Level and Semester"});
    return;
}


    axios.get(`https://www.cwmsrfupre.com.ng/api/get_enrolled_courses.php?student_id=${student.id}`)
      .then(res => {
        if (res.data.success) {
          const filtered = res.data.enrollments.filter(e => {
            const course = courses.find(c => c.id == e.course_id);
            return course?.level_id == selectedLevel && course?.semester_id == selectedSemester;
          });
          setEnrollments(filtered);
        } else {
          setEnrollments([]);
        }
      });
  };

  const downloadPDF = () => {
    const element = resultRef.current;
    html2pdf()
      .set({
        margin:       10,
        filename:     `${student.fullname || 'result'}-Result.pdf`,
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };

  return (
    <Container ref={resultRef}>
      <Header>
        <Img src={logo} alt='logo'/>
        {/* <SchoolName>Centre for Waste Management and Sustainable Resources (CWMSR)</SchoolName> */}
        <SubText>Academic Result</SubText>
      </Header>

      <SectionTitle>Student Details</SectionTitle>
      <InfoGrid>
        <Row><Label>Full Name:</Label> {student.full_name}</Row>
        <Row><Label>Matric No:</Label> {student.admission_number}</Row>
        <Row><Label>Programme:</Label> {
      programs.find(p => p.id == student.program)?.name || 'N/A'
    }</Row>
        
      </InfoGrid>

      <SectionTitle>Session</SectionTitle>
      <div>
        <Label>Level</Label>
        <Select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
          <option value="">Select Level</option>
          {levels.map(level => (
            <option key={level.id} value={level.id}>{level.name}</option>
          ))}
        </Select>

        <Label>Semester</Label>
        <Select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {semesters.map(sem => (
            <option key={sem.id} value={sem.id}>{sem.name}</option>
          ))}
        </Select>

        <Button onClick={fetchResults}><FaPrint /></Button>
        <Button onClick={downloadPDF} style={{ marginLeft: '10px' }}>
          <FaDownload />
        </Button>
      </div>

      {enrollments.length > 0 && (
        <>
          <SectionTitle>Semester Results</SectionTitle>
          <Table>
            <thead>
              <tr>
                <Th>Code</Th>
                <Th>Title</Th>
                <Th>Assignment</Th>
                <Th>Quiz</Th>
                <Th>Exam</Th>
                <Th>Total</Th>
                <Th>Grade</Th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e, idx) => {
                const course = courses.find(c => c.id == e.course_id) || {};
                const total = (+e.assignment_score) + (+e.quiz_score) + (+e.exam_score);
                const grade = total >= 70 ? 'A' :
                              total >= 60 ? 'B' :
                              total >= 50 ? 'C' :
                              total >= 45 ? 'D' :
                              total >= 40 ? 'E' : 'F';
                return (
                  <tr key={idx}>
                    <Td>{course.code}</Td>
                    <Td>{course.title}</Td>
                    <Td>{e.assignment_score}</Td>
                    <Td>{e.quiz_score}</Td>
                    <Td>{e.exam_score}</Td>
                    <Td>{total}</Td>
                    <Td>{grade}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default StudentResult;


