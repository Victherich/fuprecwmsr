import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

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
  color: darkgreen;
  background-color: lightgreen;
  border-radius: 2px;
`;

const TableScrollContainer = styled.div`
  max-height: 300px;
  overflow: auto;
  border: 1px solid lightgreen;
  border-radius: 3px;

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
  margin-right: 5px;
  &:hover {
    color: green;
  }
`;

const ActionButton = styled.button`
  padding: 2px 5px;
  margin: 0px 2px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  background-color: ${props => props.approve ? 'green' : 'darkorange'};
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 3px;
  justify-content: flex-end;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;


const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 8px;
  border: 1px solid green;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
  background-color: white;
  box-sizing: border-box;
  &:focus {
    box-shadow: 0 0 3px rgba(0, 128, 0, 0.5);
  }
`;



export default function AdminPaymentApprovals() {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { api_url, semesters } = useContext(Context);

  const fetchAllProofs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api_url}/get_all_payment_proofs.php`);
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

  useEffect(() => {
    fetchAllProofs();
  }, [api_url]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setActionLoadingId(id);
      const response = await fetch(`${api_url}/update_payment_status.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update status');
      }

      setProofs(prev => 
        prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };


// Filter proofs by student name or admission number
  const filteredProofs = proofs.filter((item) => {
    const fullName = (item.full_name || '').toLowerCase();
    const admissionNo = (item.admission_number || '').toLowerCase();
    const term = searchTerm.toLowerCase();

    return fullName.includes(term) || admissionNo.includes(term);
  });



  if (loading) return <StatusMessage>Loading all payment proofs...</StatusMessage>;
  if (error) return <StatusMessage error>Error: {error}</StatusMessage>;
  if (proofs.length === 0) return <StatusMessage>No payment proofs found.</StatusMessage>;

return (
    <Container>
      <Card>
        <Header>All Student Result Payment Proofs</Header>
        
        {/* --- ADDED SEARCH INPUT FIELD --- */}
        <SearchInput 
          type="text"
          placeholder="Search by student name or admission number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TableScrollContainer>
          <StyledTable>
            <thead>
              <TableHeaderRow>
                <Th>ID</Th>
                <Th>Student Name</Th>
                <Th>Admission No.</Th>
                <Th align="center">Semester</Th>
                <Th align="center">Status</Th>
                <Th align="center">Date Submitted</Th>
                <Th align="right">Actions / Proof</Th>
              </TableHeaderRow>
            </thead>
            <tbody>
              {filteredProofs.length === 0 ? (
                <TableRow>
                  <Td colSpan="7" style={{ textAlign: 'center', padding: '15px', color: 'gray' }}>
                    No matching student records found.
                  </Td>
                </TableRow>
              ) : (
                filteredProofs.map((item) => (
                  <TableRow key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.full_name || 'N/A'}</Td>
                    <Td>{item.admission_number || 'N/A'}</Td>
                    <Td align="center">
                      {semesters?.find((s) => Number(s.id) === Number(item.semester_id))?.name || `Semester ${item.semester_id}`}
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
                      <ButtonGroup>
                        <DownloadLink 
                          href={`${api_url}/${item.file_path}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View
                        </DownloadLink>
                        
                        {item.status !== 'approved' ? (
                          <ActionButton 
                            approve 
                            disabled={actionLoadingId === item.id}
                            onClick={() => handleStatusChange(item.id, 'approved')}
                          >
                            {actionLoadingId === item.id ? '...' : 'Approve'}
                          </ActionButton>
                        ) : (
                          <ActionButton 
                            disabled={actionLoadingId === item.id}
                            onClick={() => handleStatusChange(item.id, 'pending')}
                          >
                            {actionLoadingId === item.id ? '...' : 'Unapprove'}
                          </ActionButton>
                        )}
                      </ButtonGroup>
                    </Td>
                  </TableRow>
                ))
              )}
            </tbody>
          </StyledTable>
        </TableScrollContainer>
      </Card>
    </Container>
  );
}
