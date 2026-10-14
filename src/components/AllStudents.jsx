// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import StudentProfile from './StudentProfile';
// import { Context } from './Context';

// const Container = styled.div`
//   background: #ffffff;
//   min-height: 100vh;
//   padding: 5px;
//   font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h2`
//   color: green;
//   text-align: center;
//   font-size: 1.25rem;
//   font-weight: 700;
//   margin: 0 0 5px 0;
//   letter-spacing: -0.025em;
// `;

// const SearchContainer = styled.div`
//   margin-bottom: 5px;
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   align-items: center;
//   width: 100%;
//   max-width: 600px;
//   background: #f0fdf4;
//   border: 1px solid #bbf7d0;
//   border-radius: 6px;
//   padding: 5px;
// `;

// const FilterGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 5px;
//   width: 100%;

//   @media(max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const SearchInput = styled.input`
//   padding: 4px 6px;
//   border: 1px solid #a7f3d0;
//   border-radius: 4px;
//   width: 100%;
//   font-size: 0.85rem;
//   background: #ffffff;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #047857;
//     box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.15);
//   }
// `;

// const CardsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   width: 100%;
//   max-width: 1000px;
// `;

// const Card = styled.div`
//   background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
//   border: 1px solid #bbf7d0;
//   border-radius: 6px;
//   padding: 5px;
//   box-shadow: 0 1px 3px rgba(5, 150, 105, 0.08);
//   display: flex;
//   flex-direction: column;
//   gap: 3px;
//   transition: transform 0.15s ease, box-shadow 0.15s ease;

//   &:hover {
//     box-shadow: 0 2px 5px rgba(5, 150, 105, 0.15);
//   }
// `;

// const CardTitle = styled.h3`
//   color: green;
//   font-size: 0.95rem;
//   font-weight: 600;
//   margin: 0 0 3px 0;
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 5px;

//   @media(max-width: 768px) {
//     flex-direction: column;
//     gap: 2px;
//   }
// `;

// const CardLabel = styled.span`
//   font-weight: 600;
//   font-size: 0.8rem;
//   color: green;
// `;

// const CardValue = styled.span`
//   font-size: 0.8rem;
//   color: #1f2937;
// `;

// const Error = styled.div`
//   color: #dc2626;
//   text-align: center;
//   font-size: 0.85rem;
//   margin-top: 5px;
//   background: #fef2f2;
//   border: 1px solid #fecaca;
//   padding: 4px;
//   border-radius: 4px;
//   width: 100%;
//   max-width: 400px;
// `;

// const Loading = styled.div`
//   text-align: center;
//   color: #4b5563;
//   font-size: 0.85rem;
//   margin-top: 5px;
// `;

// const Button = styled.button`
//   padding: 4px 8px;
//   color: white;
//   background: green;
//   cursor: pointer;
//   border: none;
//   border-radius: 4px;
//   font-size: 0.8rem;
//   font-weight: 600;
//   margin: 0;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//   transition: opacity 0.2s;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const Select = styled.select`
//   padding: 4px 6px;
//   border: 1px solid #a7f3d0;
//   border-radius: 4px;
//   width: 100%;
//   font-size: 0.85rem;
//   background-color: #ffffff;
//   color: #065f46;
//   cursor: pointer;
//   margin: 0;

//   &:focus {
//     outline: none;
//     border-color: #047857;
//     box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.15);
//   }
// `;

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchName, setSearchName] = useState('');
//   const [searchEmail, setSearchEmail] = useState('');
//   const [searchAdmissionNumber, setSearchAdmissionNumber] = useState('');
//   const [studentProfileId, setStudentProfileId] = useState(false);
//   const [filterStatus, setFilterStatus] = useState('');
//   const [sessionFilter, setSessionFilter] = useState('');
  
//   const { programs, api_url } = useContext(Context);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleGetAllstudents = () => {
//     axios.get(`${api_url}/get_all_students.php`)
//       .then(res => {
//         if (res.data.success) {
//           setStudents(res.data.students);
//           setFilteredStudents(res.data.students);
//         } else {
//           setError(res.data.error || 'Failed to load students.');
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Failed to fetch students.');
//         setLoading(false);
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     handleGetAllstudents();
//   }, []);

//   // Combined Comprehensive Filter Logic
//   useEffect(() => {
//     let result = students;

//     if (searchName.trim()) {
//       result = result.filter(s => s.full_name?.toLowerCase().includes(searchName.toLowerCase()));
//     }

//     if (searchEmail.trim()) {
//       result = result.filter(s => s.email?.toLowerCase().includes(searchEmail.toLowerCase()));
//     }

//     if (searchAdmissionNumber.trim()) {
//       result = result.filter(s => s.admission_number?.toLowerCase().includes(searchAdmissionNumber.toLowerCase()));
//     }

//     if (filterStatus.trim()) {
//       result = result.filter(s => s.status?.toLowerCase() === filterStatus.toLowerCase());
//     }

//     if (sessionFilter.trim()) {
//       result = result.filter(s => s.admission_session === sessionFilter);
//     }

//     setFilteredStudents(result);
//   }, [searchName, searchEmail, searchAdmissionNumber, filterStatus, sessionFilter, students]);

//   const clearFilters = () => {
//     setSearchName('');
//     setSearchEmail('');
//     setSearchAdmissionNumber('');
//     setFilterStatus('');
//     setSessionFilter('');
//     setFilteredStudents(students);
//   };

//   return (
//     <Container>
//       <Title>All Students Directory</Title>
      
//       <SearchContainer>
//         <FilterGrid>
//           <SearchInput
//             type="text"
//             placeholder="Search by name..."
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//           />
//           <SearchInput
//             type="text"
//             placeholder="Search by admission number..."
//             value={searchAdmissionNumber}
//             onChange={(e) => setSearchAdmissionNumber(e.target.value)}
//           />
//           <SearchInput
//             type="text"
//             placeholder="Search by email..."
//             value={searchEmail}
//             onChange={(e) => setSearchEmail(e.target.value)}
//           />
//           <Select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
//             <option value="">Filter by Admission Session</option>
//             {[...new Set(students.map(s => s.admission_session).filter(Boolean))].map((session, index) => (
//               <option key={index} value={session}>{session}</option>
//             ))}
//           </Select>
//         </FilterGrid>

//         {(searchName || searchEmail || searchAdmissionNumber || sessionFilter || filterStatus) && (
//           <Button onClick={clearFilters} style={{ backgroundColor: '#dc2626', width: '100%' }}>
//             Clear All Filters
//           </Button>
//         )}
//       </SearchContainer>

//       {loading && <Loading>Loading students...</Loading>}
//       {error && <Error>{error}</Error>}

//       {!loading && !error && filteredStudents.length === 0 && (
//         <Error>No students found matching your criteria.</Error>
//       )}

//       <CardsWrapper>
//         {!loading && !error && filteredStudents.length > 0 && filteredStudents.map(student => (
//           <Card key={student.id}>
//             <CardTitle>{student.full_name} — {student.admission_number ? student.admission_number : "Not yet Admitted"}</CardTitle>
            
//             <CardRow>
//               <CardLabel>Status:</CardLabel>
//               <CardValue style={{ backgroundColor: "#047857", color: "white", padding: "2px 5px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>
//                 {student.status.toUpperCase()}
//               </CardValue>
//             </CardRow>

//             {student.admission_session && (
//               <CardRow>
//                 <CardLabel>Admission Session:</CardLabel>
//                 <CardValue>{student.admission_session}</CardValue>
//               </CardRow>
//             )}

//             <CardRow>
//               <CardLabel>Institution Email:</CardLabel>
//               <CardValue>{student.email}</CardValue>
//             </CardRow>

//             {student.email2 && (
//               <CardRow>
//                 <CardLabel>Personal Email:</CardLabel>
//                 <CardValue>{student.email2}</CardValue>
//               </CardRow>
//             )}

//             <CardRow>
//               <CardLabel>Phone:</CardLabel>
//               <CardValue>{student.phone || 'N/A'}</CardValue>
//             </CardRow>

//             <CardRow>
//               <CardLabel>Program:</CardLabel>
//               <CardValue>
//                 {programs.find(p => p.id == student.program)?.name || 'N/A'}
//               </CardValue>
//             </CardRow>

//             {student.qualification && (
//               <CardRow>
//                 <CardLabel>Qualification:</CardLabel>
//                 <CardValue>{student.qualification}</CardValue>
//               </CardRow>
//             )}

//             {location.pathname === '/admin' && (
//               <Button onClick={() => setStudentProfileId(student.id)}>
//                 View Profile
//               </Button>
//             )}
//           </Card>
//         ))}
//       </CardsWrapper>

//       {studentProfileId && (
//         <StudentProfile 
//           id={studentProfileId} 
//           setStudentProfileId={setStudentProfileId}
//           handleGetAllstudents={handleGetAllstudents}
//         />
//       )}
//     </Container>
//   );
// };

// export default AllStudents;




import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import { Context } from './Context';

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
  padding: 5px;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: green;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 5px 0;
  letter-spacing: -0.025em;
`;

const SearchContainer = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background: #f0fff5;
  border: 1px solid green;
  border-radius: 6px;
  padding: 5px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  width: 100%;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  padding: 4px 6px;
  border: 1px solid green;
  border-radius: 4px;
  width: 100%;
  font-size: 0.85rem;
  background: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: green;
    box-shadow: 0 0 0 2px rgba(0, 128, 0, 0.2);
  }
`;

const Select = styled.select`
  padding: 4px 6px;
  border: 1px solid green;
  border-radius: 4px;
  width: 100%;
  font-size: 0.85rem;
  background-color: #ffffff;
  color: green;
  cursor: pointer;
  margin: 0;

  &:focus {
    outline: none;
    border-color: green;
    box-shadow: 0 0 0 2px rgba(0, 128, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 4px 8px;
  color: white;
  background: green;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

/* --- Scrollable Table Wrapper --- */
const TableWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  max-height: 70vh; /* Enables vertical scrolling */
  overflow-x: auto; /* Enables horizontal scrolling */
  overflow-y: auto; /* Enables vertical scrolling */
  border: 1px solid green;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 128, 0, 0.1);
  margin-top: 5px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.85rem;
  white-space: nowrap; /* Forces horizontal scroll if content is wide */
`;

const Th = styled.th`
  background-color: green;
  color: white;
  padding: 6px 8px;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Td = styled.td`
  padding: 5px 8px;
  border-bottom: 1px solid #e2e8f0;
  color: #1f2937;
`;

const Tr = styled.tr`
  transition: background 0.15s ease;
  background-color: ${props => props.index % 2 === 0 ? '#f0fff5' : '#ffffff'};
  cursor:pointer;

  &:hover {
    background-color: #e6ffed;
  }
`;

const StatusBadge = styled.span`
  background-color: green;
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  font-size: 0.85rem;
  margin-top: 5px;
  background: #fff5f5;
  border: 1px solid red;
  padding: 4px;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const Loading = styled.div`
  text-align: center;
  color: gray;
  font-size: 0.85rem;
  margin-top: 5px;
`;

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchAdmissionNumber, setSearchAdmissionNumber] = useState('');
  const [studentProfileId, setStudentProfileId] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [sessionFilter, setSessionFilter] = useState('');
  
  const { programs, api_url } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetAllstudents = () => {
    axios.get(`${api_url}/get_all_students.php`)
      .then(res => {
        if (res.data.success) {

       const sortedStudents = res.data.students.sort((a, b) => b.id - a.id);
          
          setStudents(sortedStudents);
          setFilteredStudents(sortedStudents);
        } else {
          setError(res.data.error || 'Failed to load students.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch students.');
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetAllstudents();
  }, []);

  useEffect(() => {
    let result = students;

    if (searchName.trim()) {
      result = result.filter(s => s.full_name?.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (searchEmail.trim()) {
      result = result.filter(s => s.email?.toLowerCase().includes(searchEmail.toLowerCase()));
    }

    if (searchAdmissionNumber.trim()) {
      result = result.filter(s => s.admission_number?.toLowerCase().includes(searchAdmissionNumber.toLowerCase()));
    }

    if (filterStatus.trim()) {
      result = result.filter(s => s.status?.toLowerCase() === filterStatus.toLowerCase());
    }

    if (sessionFilter.trim()) {
      result = result.filter(s => s.admission_session === sessionFilter);
    }

    setFilteredStudents(result);
  }, [searchName, searchEmail, searchAdmissionNumber, filterStatus, sessionFilter, students]);

  const clearFilters = () => {
    setSearchName('');
    setSearchEmail('');
    setSearchAdmissionNumber('');
    setFilterStatus('');
    setSessionFilter('');
    setFilteredStudents(students);
  };

  return (
    <Container>
      <Title>All Students Directory</Title>
      
      <SearchContainer>
        <FilterGrid>
          <SearchInput
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <SearchInput
            type="text"
            placeholder="Search by admission number..."
            value={searchAdmissionNumber}
            onChange={(e) => setSearchAdmissionNumber(e.target.value)}
          />
          <SearchInput
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <Select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
            <option value="">Filter by Admission Session</option>
            {[...new Set(students.map(s => s.admission_session).filter(Boolean))].map((session, index) => (
              <option key={index} value={session}>{session}</option>
            ))}
          </Select>
        </FilterGrid>

        {(searchName || searchEmail || searchAdmissionNumber || sessionFilter || filterStatus) && (
          <Button onClick={clearFilters} style={{ backgroundColor: 'red', width: '100%' }}>
            Clear All Filters
          </Button>
        )}
      </SearchContainer>

      {loading && <Loading>Loading students...</Loading>}
      {error && <Error>{error}</Error>}

      {!loading && !error && filteredStudents.length === 0 && (
        <Error>No students found matching your criteria.</Error>
      )}

      {!loading && !error && filteredStudents.length > 0 && (
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <Th>Full Name</Th>
                <Th>Admission Number</Th>
                <Th>Status</Th>
                <Th>Admission Session</Th>
                <Th>Institution Email</Th>
                <Th>Personal Email</Th>
                <Th>Phone</Th>
                <Th>Program</Th>
                <Th>Qualification</Th>
                {/* {location.pathname === '/admin' && <Th>Actions</Th>} */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <Tr key={student.id} index={index} onClick={() => setStudentProfileId(student.id)}>
                  <Td style={{ fontWeight: '600' }}>{student.full_name}</Td>
                  <Td>{student.admission_number ? student.admission_number : "Not yet Admitted"}</Td>
                  <Td><StatusBadge>{student.status}</StatusBadge></Td>
                  <Td>{student.admission_session || 'N/A'}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.email2 || 'N/A'}</Td>
                  <Td>{student.phone || 'N/A'}</Td>
                  <Td>{programs.find(p => p.id == student.program)?.name || 'N/A'}</Td>
                  <Td>{student.qualification || 'N/A'}</Td>
                  {/* {location.pathname === '/admin' && (
                    <Td>
                      <Button onClick={() => setStudentProfileId(student.id)}>
                        View
                      </Button>
                    </Td>
                  )} */}
                </Tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      )}

      {studentProfileId && (
        <StudentProfile 
          id={studentProfileId} 
          setStudentProfileId={setStudentProfileId}
          handleGetAllstudents={handleGetAllstudents}
        />
      )}
    </Container>
  );
};

export default AllStudents;