
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import { Context } from './Context';

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #006400;
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d4ecd7;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #006400;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`;

const Card = styled.div`
  background-color: #f0fff5;
  border: 1px solid #d4ecd7;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  color: #006400;
  margin-bottom: 1rem;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardLabel = styled.span`
  font-weight: bold;
  color: #006400;
`;

const CardValue = styled.span`
  color: #333;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 2rem;
`;

const Loading = styled.div`
  text-align: center;
  color: #666;
  margin-top: 2rem;
`;


const Button = styled.button`
padding:5px;
color:white;
background-color:green;
cursor:pointer;
border:none;
`

const Select = styled.select`

`

const AllLecturerStudents = ({lecturerId}) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const navigate = useNavigate();
  const [studentProfileId, setStudentProfileId]=useState(false);
  const {programs}=useContext(Context);
  const [filterStatus, setFilterStatus]=useState('');
  const location = useLocation();



const handleGetLecturerStudents = () => {
  // Replace this with actual logged-in lecturer ID
// Assuming `user` comes from Context or Auth

  if (!lecturerId) {
    setError('Lecturer ID is missing.');
    setLoading(false);
    return;
  }

  axios.post('https://www.cwmsrfupre.com.ng/api/get_students_in_lecturer_courses.php', {
    lecturer_id: lecturerId
  })
  .then(res => {
    if (res.data.success) {
      setStudents(res.data.students);
      setFilteredStudents(res.data.students);
    } else {
      setError(res.data.error || 'Failed to load students.');
    }
    setLoading(false);
  })
  .catch(err => {
    console.error(err);
    setError('An error occurred while fetching students.');
    setLoading(false);
  });
};


    useEffect(() => {
handleGetLecturerStudents();

}, []);

  const handleSearch = () => {
    const filtered = students.filter(student => 
      student.full_name.toLowerCase().includes(searchName.toLowerCase()) && 
      student.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleNameChange = (e) => {
    setSearchName(e.target.value);
    handleSearch();
  };

  const handleEmailChange = (e) => {
    setSearchEmail(e.target.value);
    handleSearch();
  };


  const filterByStatus=()=>{
    const filtered = students.filter(student => 
      student.status.toLowerCase()==filterStatus.toLowerCase()) 
      // student.email.toLowerCase().includes(searchEmail.toLowerCase())
    
    setFilteredStudents(filtered);
  }

  useEffect(()=>{
    filterByStatus();
  },[filterStatus])

  return (
    <Container>
      <Title>All Lecturer's Students</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleNameChange}
        />
        <SearchInput
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleEmailChange}
        />
      </SearchContainer>
      {/* <Select>
        <option>
          Applied
        </option>
      </Select> */}

      {loading && <Loading>Loading students...</Loading>}
      {error && <Error>{error}</Error>}

      {!loading && !error && filteredStudents.length === 0 && (
        <Error>No students found matching your search.</Error>
      )}

      <CardsWrapper>
        {!loading && !error && filteredStudents.length > 0 && filteredStudents.map(student => (
          <Card key={student.id}>
            <CardTitle>{student.full_name} -  {student.admission_number?student.admission_number:"Not yet Admitted"}</CardTitle>
            <CardRow>
              <CardLabel>Status:</CardLabel><CardValue style={{borderRadius:"5px", backgroundColor:"green", color:"white", padding:"5px"}}>{student.status.toUpperCase()}</CardValue>
            </CardRow>
            {/* <CardRow>
              <CardLabel>ID:</CardLabel><CardValue>{student.id}</CardValue>
            </CardRow> */}
            <CardRow>
              <CardLabel>Email:</CardLabel><CardValue>{student.email}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Phone:</CardLabel><CardValue>{student.phone}</CardValue>
            </CardRow>
           <CardRow>
  <CardLabel>Program:</CardLabel>
  <CardValue>
    {
      programs.find(p => p.id == student.program)?.name || 'N/A'
    }
  </CardValue>
</CardRow>

            <CardRow>
              <CardLabel>Qualification:</CardLabel><CardValue>{student.qualification}</CardValue>
            </CardRow>
            {/* <CardRow>
              <CardLabel>Experience:</CardLabel><CardValue>{student.experience || 'N/A'}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Statement:</CardLabel><CardValue>{student.statement || 'N/A'}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Application Amount Paid:</CardLabel><CardValue>{student.amount_paid}</CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Transaction Reference:</CardLabel><CardValue>{student.transaction_reference}</CardValue>
            </CardRow> */}

            {location.pathname==='/admin'&&<Button onClick={()=>setStudentProfileId(student.id)}>
                View
            </Button>}
          </Card>
        ))}
      </CardsWrapper>
      {/* {studentProfileId&&<StudentProfile 
      id={studentProfileId} 
      setStudentProfileId={setStudentProfileId}
      handleGetAllstudents={handleGetAllstudents}/>} */}
    </Container>
  );
};

export default AllLecturerStudents;
