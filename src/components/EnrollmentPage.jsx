import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { Context } from './Context';
import { useSelector } from 'react-redux';

// Styled Components
const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
//   box-shadow: 0 8px 24px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #0a4d24;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  color: #444;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
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
  background-color: green;
  color: white;
  font-size: 16px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: darkorange;
  }
`;



const EnrolledCoursesSection = styled.div`
  margin-top: 40px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CardLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const CardValue = styled.span`
  color: #222;
`;


const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;


const EnrollPage = ({ studentId }) => {
const [student, setStudent]=useState({})
    const { levels, semesters, courses } = useContext(Context);
    const [error, setError]=useState("");
  
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [searchTerm, setSearchTerm]=useState('');

    
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

  
  
    // Filter courses based on level, semester, and program
    const filteredCourses = courses.filter(course => 
      course.level_id == selectedLevel &&
      course.semester_id == selectedSemester &&
      course.program_id == student.program
    );
  
    const handleEnroll = async () => {
      if (!selectedCourse) {
        return Swal.fire('Error', 'Please select a course.', 'error');
      }
  
      try {
        Swal.fire({
          title: 'Enrolling...',
          didOpen: () => Swal.showLoading()
        });
  
        const res = await axios.post('https://www.cwmsrfupre.com.ng/api/enroll_course.php', {
          student_id: student.id,
          course_id: selectedCourse
        });
  
        if (res.data.success) {
          Swal.fire('Success', res.data.message, 'success');
          fetchEnrolledCourses();
        } else {
          Swal.fire('Error', res.data.error, 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Something went wrong.', 'error');
      }
    };



    

    const fetchEnrolledCourses = () => {
      axios.get(`https://www.cwmsrfupre.com.ng/api/get_enrolled_courses.php?student_id=${student.id}`)
        .then(res => {
          if (res.data.success) {
            setEnrolledCourses(res.data.enrollments);
          } else {
            setEnrolledCourses([]);
          }
        })
        .catch(() => {
          console.error("Error fetching enrolled courses");
        });
    };
    
    useEffect(() => {
      if (student.id) {
        fetchEnrolledCourses();
      }
    }, [student]);
    

// const search = ()=>{
//     const newObj=enrolledCourses.filter(course => course.code.toLowerCase().includes(searchTerm.toLowerCase()));
// setEnrolledCourses(newObj);
// }

// useEffect(()=>{
//     search();
// },[searchTerm])

  
    return (
      <Container>
        <Title>Course Enrollment</Title>
        <Description>
          Please enroll in your courses by selecting the appropriate level and semester.
        </Description>
  
        <div>
          <Label>Level</Label>
          <Select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setSelectedCourse('');
            }}
          >
            <option value="">Select Level</option>
            {levels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </Select>
        </div>
  
        <div>
          <Label>Semester</Label>
          <Select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setSelectedCourse('');
            }}
          >
            <option value="">Select Semester</option>
            {semesters.map(sem => (
              <option key={sem.id} value={sem.id}>{sem.name}</option>
            ))}
          </Select>
        </div>
  
        <div>
          <Label>Courses</Label>
          <Select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            disabled={!selectedLevel || !selectedSemester}
          >
            <option value="">Select Course</option>
            {filteredCourses.map(course => (
              <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
            ))}
          </Select>
        </div>
  
        <Button onClick={handleEnroll}>Enroll</Button>

        <EnrolledCoursesSection>
  <Title>My Enrolled Courses</Title>

    {/* 🔍 Search by Course Code */}
    {/* <div>
        <Label>You can also search by Course Code</Label>
        <SearchInput
          type="text"
          placeholder="e.g., CSC101"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
      
        />
      </div> */}



  {enrolledCourses.length === 0 ? (
    <Description>No courses enrolled yet.</Description>
  ) : (
    enrolledCourses.map((enroll) => {
      const course = courses.find(c => c.id == enroll.course_id);
      return (
        <Card key={enroll.id}>
          <CardRow>
            <CardLabel>Code:</CardLabel>
            <CardValue>{course?.code || 'N/A'}</CardValue>
          </CardRow>
          <CardRow>
            <CardLabel>Title:</CardLabel>
            <CardValue>{course?.title || 'N/A'}</CardValue>
          </CardRow>
          <CardRow>
            <CardLabel>Assignment Score:</CardLabel>
            <CardValue>{enroll.assignment_score}</CardValue>
          </CardRow>
          <CardRow>
            <CardLabel>Quiz Score:</CardLabel>
            <CardValue>{enroll.quiz_score}</CardValue>
          </CardRow>
          <CardRow>
            <CardLabel>Exam Score:</CardLabel>
            <CardValue>{enroll.exam_score}</CardValue>
          </CardRow>
          <CardRow>
            <CardLabel>Total Score:</CardLabel>
            <CardValue>{enroll.total_score}</CardValue>
          </CardRow>
        </Card>
      );
    })
  )}
</EnrolledCoursesSection>

      </Container>
    );
  };
  
export default EnrollPage;

