import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { useSelector } from 'react-redux';

// --- STYLED COMPONENTS ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0px;
  padding: 0px;
`;

const StatusMessage = styled.div`
  padding: 5px;
  margin: 5px;
  color: ${props => (props.error ? 'red' : 'green')};
  font-size: 13px;
`;

const SemesterCard = styled.div`
  border: 1px solid green;
  border-radius: 4px;
  padding: 5px;
  margin: 2px 0px;
  gap: 3px;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
`;

const SemesterHeader = styled.h4`
  margin: 0px 0px 5px 0px;
  padding: 3px;
  font-size: 14px;
  color: darkgreen;
  background-color: lightgreen;
  border-radius: 2px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid green;
  background-color: green;
  color: white;
`;

const Th = styled.th`
  padding: 3px;
  text-align: ${props => props.align || 'left'};
  margin: 0px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid lightgreen;
  &:hover {
    background-color: lightgreen;
  }
`;

const Td = styled.td`
  padding: 3px;
  text-align: ${props => props.align || 'left'};
  margin: 0px;
  color: darkgreen;
`;



export default function StudentEnrollmentsForAdmin({student}) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {api_url, courses, semesters}=useContext(Context);

   const studentId = student?.id

  useEffect(() => {
    if (!studentId) return;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api_url}/get_student_enrollments.php?student_id=${studentId}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch enrollments');
        }

        setEnrollments(data.enrollments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [studentId, api_url]);

  if (loading) return <StatusMessage>Loading enrollments...</StatusMessage>;
  if (error) return <StatusMessage error>Error: {error}</StatusMessage>;
  if (enrollments.length === 0) return <StatusMessage>No enrollments found.</StatusMessage>;

  // Group enrollments by semester_id
  const groupedBySemester = enrollments.reduce((acc, enrollment) => {
    const sem = enrollment.semester_id || 'Unknown';
    if (!acc[sem]) acc[sem] = [];
    
    // Match course details from the static courses array
    const courseDetails = courses.find(c => c.id === enrollment.course_id) || {
      code: 'N/A',
      title: 'Unknown Course',
      unit: 0
    };

    acc[sem].push({
      ...enrollment,
      ...courseDetails
    });

    return acc;
  }, {});

  return (
    <Container>
        <h2 style={{textAlign:"center", marginTop:"50px"}}>Enrolled Courses</h2>
      {Object.entries(groupedBySemester).map(([semesterId, semEnrollments]) => {
        // Calculate total registered credit units for this semester
        const totalUnits = semEnrollments.reduce((sum, item) => sum + (item.unit || 0), 0);

        return (
          <SemesterCard key={semesterId}>
            <SemesterHeader>
              {semesters?.find((s) => Number(s.id) === Number(semesterId))?.name || `Semester ${semesterId}`} — Total Credit Units: {totalUnits}
            </SemesterHeader>
            
            <StyledTable>
              <thead>
                <TableHeaderRow>
                  <Th>Course Code & Title</Th>
                  <Th align="center">Credit Unit</Th>
                  {/* <Th align="center">Semester</Th> */}
                  <Th align="right">Registration Date</Th>
                </TableHeaderRow>
              </thead>
              <tbody>
                {semEnrollments.map((item, index) => (
                  <TableRow key={index}>
                    <Td>{item.code} - {item.title}</Td>
                    <Td align="center">{item.unit}</Td>
                    {/* <Td align="center">{item.semester_id}</Td> */}
                    <Td align="right">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</Td>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </SemesterCard>
        );
      })}
    </Container>
  );
}