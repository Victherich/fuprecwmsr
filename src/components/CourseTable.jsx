import React, { useContext } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Context } from './Context';

// Styled Components
const Container = styled.div`
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h2`
  color: #333;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#2b6cb0' : '#2f855a'};
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.primary ? '#2c5282' : '#276749'};
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  background-color: #f7fafc;
  color: #4a5568;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 12px 16px;
  color: #2d3748;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

// CourseTable Component
const CourseTable = () => {
    const {courses}=useContext(Context);
  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.text('Course Details Report', 14, 15);
    
    const tableColumn = ['ID', 'Course Code', 'Title', 'Credit Unit'];
    const tableRows = courses.map(course => [
      course.id,
      course.code,
      course.title,
      course.unit
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [43, 108, 176] },
    });

    doc.save('course_details.pdf');
  };

  // Export to Excel function
  const exportToExcel = () => {
    // Map data to clean headers for Excel
    const excelData = courses.map(course => ({
      ID: course.id,
      'Course Code': course.code,
      Title: course.title,
      'Credit Unit': course.unit,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Courses');
    
    XLSX.writeFile(workbook, 'course_details.xlsx');
  };

  return (
    <Container>
      <Header>
        <Title>Course List ({courses.length})</Title>
        <ButtonGroup>
          <Button primary onClick={exportToPDF}>Export to PDF</Button>
          <Button onClick={exportToExcel}>Export to Excel</Button>
        </ButtonGroup>
      </Header>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Course Code</Th>
              <Th>Title</Th>
              <Th>Credit Unit</Th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map(course => (
                <Tr key={course.id}>
                  <Td>{course.id}</Td>
                  <Td>{course.code}</Td>
                  <Td>{course.title}</Td>
                  <Td>{course.unit}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4" style={{ textAlign: 'center' }}>No courses available.</Td>
              </Tr>
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </Container>
  );
};

export default CourseTable;