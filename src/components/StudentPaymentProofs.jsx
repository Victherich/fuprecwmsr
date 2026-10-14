import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { useSelector } from 'react-redux';

// --- STYLED COMPONENTS ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 30px;
  padding: 0px;
`;

const StatusMessage = styled.div`
  padding: 5px;
  margin: 5px;
  color: ${props => (props.error ? 'red' : 'green')};
  font-size: 13px;
`;

const Card = styled.div`
  border: 1px solid green;
  border-radius: 4px;
  padding: 5px;
  margin: 2px 0px;
  gap: 3px;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
`;

const Header = styled.h4`
  margin: 0px 0px 5px 0px;
  padding: 3px;
  font-size: 14px;
//   color:green ;
  background-color: lightgreen;
  border-radius: 2px;
  text-align:center;
`;

// Scrollable wrapper to enable visible vertical and horizontal scrolling
const TableScrollContainer = styled.div`
  max-height: 250px;
  overflow: auto;
  border: 1px solid lightgreen;
  border-radius: 3px;

  /* Custom green theme scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: whitesmoke;
  }
  &::-webkit-scrollbar-thumb {
    background: green;
    border-radius: 3px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  white-space: nowrap;
`;

const TableHeaderRow = styled.tr`
  border-bottom: 1px solid green;
  background-color: green;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
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

const StatusBadge = styled.span`
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  background-color: ${props => 
    props.status === 'approved' ? 'green' : 
    props.status === 'rejected' ? 'red' : 'orange'};
`;

const DownloadLink = styled.a`
  color: darkgreen;
  text-decoration: underline;
  font-weight: bold;
  &:hover {
    color: green;
  }
`;

export default function StudentPaymentProofs({id}) {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationFee, setApplicationFee] = useState(null);
  const { api_url, semesters } = useContext(Context);
  const studentInfo = useSelector((state) => state.studentInfo);
  const studentId = id

  useEffect(() => {
    if (!studentId) return;

    const fetchProofs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api_url}/get_student_payment_proofs.php?student_id=${studentId}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch payment proofs');
        }

        setProofs(data.proofs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProofs();
  }, [studentId, api_url]);




useEffect(() => {
    if (!studentId) return;

    const fetchProofs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api_url}/get_student_payment_proofs.php?student_id=${studentId}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch payment proofs');
        }

        setProofs(data.proofs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // NEW: Fetch Application Fee details
    const fetchApplicationFee = async () => {
      try {
        const response = await fetch(`${api_url}/get_student_application_fee.php?student_id=${studentId}`);
        const data = await response.json();
        if (data.success) {
          setApplicationFee(data.applicationFee);
        }
      } catch (err) {
        console.error("Failed to fetch application fee:", err);
      }
    };

    fetchProofs();
    fetchApplicationFee();
  }, [studentId, api_url]);



  // if (loading) return <StatusMessage>Loading payment proofs...</StatusMessage>;
  // if (error) return <StatusMessage error>Error: {error}</StatusMessage>;
  // if (proofs.length === 0) return <StatusMessage>No payment proofs uploaded yet.</StatusMessage>;

  return (
    <Container>
        <h2 style={{textAlign:"center"}}>Payments and Financials</h2>

        {/* NEW: Application Fee Table Card */}
      <Card>
        <Header>Admission Application Fee Payment</Header>
        <TableScrollContainer>
          <StyledTable>
            <thead>
              <TableHeaderRow>
                <Th>Amount Paid</Th>
                {/* <Th align="center">Transaction Ref</Th> */}
                <Th align="center">Date Submitted</Th>
                <Th align="right">Action</Th>
              </TableHeaderRow>
            </thead>
            <tbody>
              {applicationFee ? (
                <TableRow>
                  <Td style={{ fontWeight: '600' }}>{applicationFee.amount_paid || 'N/A'}</Td>
                  {/* <Td align="center">{applicationFee.transaction_reference || 'N/A'}</Td> */}
                  <Td align="center">
                    {applicationFee.created_at ? new Date(applicationFee.created_at).toLocaleDateString() : 'N/A'}
                  </Td>
                  <Td align="right">
                    {applicationFee.proof_of_payment_path ? (
                      <DownloadLink 
                        href={`${api_url}/${applicationFee.proof_of_payment_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Download Proof
                      </DownloadLink>
                    ) : 'No Proof Uploaded'}
                  </Td>
                </TableRow>
              ) : (
                <TableRow>
                  <Td colSpan="4" align="center" style={{ padding: '10px' }}>
                    No application fee record found.
                  </Td>
                </TableRow>
              )}
            </tbody>
          </StyledTable>
        </TableScrollContainer>
      </Card>


      <Card>
        <Header>Result Payment Proofs</Header>
        
        <TableScrollContainer>
          <StyledTable>
            <thead>
              <TableHeaderRow>
                <Th>ID</Th>
                <Th align="center">Semester</Th>
                <Th align="center">Status</Th>
                <Th align="center">Date</Th>
                <Th align="right">Action</Th>
              </TableHeaderRow>
            </thead>
            <tbody>
              {proofs.map((item) => (
                <TableRow key={item.id}>
                  <Td>{item.id}</Td>
                  <Td align="center"> {semesters?.find((s) => Number(s.id) === Number(item.semester_id))?.name || `Semester ${item.semester_id}`}
          </Td>
                  <Td align="center">
                    <StatusBadge status={item.status}>
                      {item.status.toUpperCase()}
                    </StatusBadge>
                  </Td>
                  <Td align="center">
                    {item.created_at ? new Date(item.created_at).toLocaleString() : 'N/A'}
                  </Td>
                  <Td align="right">
                    <DownloadLink 
                      href={`${api_url}/${item.file_path}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Download Proof
                    </DownloadLink>
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableScrollContainer>
      </Card>
    </Container>
  );
}