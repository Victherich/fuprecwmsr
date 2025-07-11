
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

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



const ButtonWrap = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  gap:20px;

`


const Button = styled.button`
padding:5px;
color:white;
background-color:green;
cursor:pointer;
border:none;
border-radius:5px;

&:hover{
background-color:gray;
}
`



const AllLecturers = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

 const handleGetAllLecturers = ()=>{
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
    }


 useEffect(() => {
handleGetAllLecturers();
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



  
// ddeleting as student
const deleteLecturer = async (lecturerId) => {
  // Confirm before deleting
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the lecturer record.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    // Show loading
    Swal.fire({
      title: 'Deleting...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    try {
      const res = await axios.post('https://www.cwmsrfupre.com.ng/api/delete_lecturer.php', { id: lecturerId });
      
      if (res.data.success) {
        Swal.fire('Deleted!', 'Lecturer has been deleted.', 'success');
  
       handleGetAllLecturers();

      } else {
        Swal.fire('Error', res.data.error || 'Something went wrong.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to delete lecturer. Please try again.', 'error');
    }
  }
};






// suspend a lecturer

const suspendLecturer = async (lecturerId) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to suspend this lecturer?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, suspend!',
    cancelButtonText: 'Cancel'
  });

  if (confirmation.isConfirmed) {
    try {
      Swal.fire({
        title: 'Suspending...',
        text: 'Please wait while the lecturer is being suspended.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post('https://www.cwmsrfupre.com.ng/api/suspend_lecturer.php', {
        id: lecturerId
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: response.data.message || 'Lecturer has been suspended successfully.',
        });
        handleGetAllLecturers(); // Replace with your actual refresh logic if needed
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.error || 'Failed to suspend lecturer.',
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while suspending the lecturer.',
      });
    }
  }
};



// unsuspend lecturer
const unsuspendLecturer = (lecturerId) => {
  // Show confirmation before unsuspending the lecturer
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will unsuspend the lecturer and change their status to "Not Suspended".',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Unsuspend!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Show loading state while the action is being processed
      setLoading(true);
      Swal.showLoading();

      // Make the API call to unsuspend the lecturer
      axios
        .post('https://www.cwmsrfupre.com.ng/api/unsuspend_lecturer.php', { id: lecturerId })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            Swal.fire({
              title: 'Success!',
              text: response.data.message,
              icon: 'success',
            });
            handleGetAllLecturers(); // Refresh the lecturer list
          } else {
            Swal.fire({
              title: 'Error!',
              text: response.data.error || 'Failed to unsuspend lecturer.',
              icon: 'error',
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error processing the request.',
            icon: 'error',
          });
          console.error(error);
        });
    }
  });
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
            {admin.suspension==='suspended'&&<CardTitle style={{color:"red"}}>{admin.suspension}</CardTitle>}
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

          <ButtonWrap>
                  <Button onClick={()=>deleteLecturer(admin.id)}>Delete</Button>
            <Button onClick={()=>suspendLecturer(admin.id)}>Suspend</Button>
            <Button onClick={()=>unsuspendLecturer(admin.id)}>Unsuspend</Button>
          </ButtonWrap>
          </Card>
        ))}
      </CardsWrapper>
    </Container>
  );
};

export default AllLecturers;
