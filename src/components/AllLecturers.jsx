
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const AllLecturers = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    axios.get('https://www.cwmsrfupre.com.ng/api/get_all_lecturer.php')
      .then(res => {
        if (res.data.success) {
          setAdmins(res.data.lecturers);
          setFilteredAdmins(res.data.lecturers);
        } else {
          setError(res.data.error || 'Failed to load admins.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch admins.');
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = admins.filter(admin => 
      admin.name.toLowerCase().includes(searchName.toLowerCase()) && 
      admin.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredAdmins(filtered);
  };

  const handleNameChange = (e) => {
    setSearchName(e.target.value);
    handleSearch();
  };

  const handleEmailChange = (e) => {
    setSearchEmail(e.target.value);
    handleSearch();
  };

  return (
    <Container>
      <Title>All Lecturers / Admins</Title>
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

      {loading && <Loading>Loading admins...</Loading>}
      {error && <Error>{error}</Error>}

      {!loading && !error && filteredAdmins.length === 0 && (
        <Error>No admins found matching your search.</Error>
      )}

      <CardsWrapper>
        {!loading && !error && filteredAdmins.length > 0 && filteredAdmins.map(admin => (
          <Card key={admin.id}>
            <CardTitle>{admin.name}</CardTitle>
            {/* <CardRow>
              <CardLabel>ID:</CardLabel><CardValue>{admin.id}</CardValue>
            </CardRow> */}
            <CardRow>
              <CardLabel>Email:</CardLabel><CardValue>{admin.email}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Phone:</CardLabel><CardValue>{admin.phone}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Role:</CardLabel><CardValue>{admin.role}</CardValue>
            </CardRow>
            {/* <CardRow>
              <CardLabel>Created At:</CardLabel><CardValue>{new Date(admin.created_at).toLocaleString()}</CardValue>
            </CardRow> */}
          </Card>
        ))}
      </CardsWrapper>
    </Container>
  );
};

export default AllLecturers;
