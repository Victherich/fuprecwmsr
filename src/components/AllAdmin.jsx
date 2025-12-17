// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// const Container = styled.div`
//   background-color: white;
//   min-height: 100vh;
//   padding: 0.5rem;
//   font-family: 'Segoe UI', sans-serif;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h2`
//   color: #006400;
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const SearchContainer = styled.div`
//   margin-bottom: 2rem;
//   display: flex;
//   gap: 1rem;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   max-width: 400px;
// `;

// const SearchInput = styled.input`
//   padding: 0.5rem;
//   border: 1px solid #d4ecd7;
//   border-radius: 8px;
//   width: 100%;
//   font-size: 1rem;

//   &:focus {
//     outline: none;
//     border-color: #006400;
//   }
// `;

// const CardsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   width: 100%;
//   max-width: 1000px;
// `;

// const Card = styled.div`
//   background-color: #f0fff5;
//   border: 1px solid #d4ecd7;
//   border-radius: 8px;
//   padding: 0.5rem;
//   box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
//   display: flex;
//   flex-direction: column;
  
// `;

// const CardTitle = styled.h3`
//   color: #006400;
//   margin-bottom: 1rem;
// `;

// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;


//   @media(max-width:768px){
//   flex-direction:column;
//   }
// `;

// const CardLabel = styled.span`
//   font-weight: bold;
//   color: #006400;
// `;

// const CardValue = styled.span`
//   color: #333;
// `;

// const Error = styled.div`
//   color: red;
//   text-align: center;
//   margin-top: 2rem;
// `;

// const Loading = styled.div`
//   text-align: center;
//   color: #666;
//   margin-top: 2rem;
// `;

// const AllAdmin = () => {
//   const [admins, setAdmins] = useState([]);
//   const [filteredAdmins, setFilteredAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchName, setSearchName] = useState('');
//   const [searchEmail, setSearchEmail] = useState('');

//   useEffect(() => {
//     axios.get('https://www.cwmsrfupre.com.ng/api/get_all_admin.php')
//       .then(res => {
//         if (res.data.success) {
//           setAdmins(res.data.admins);
//           setFilteredAdmins(res.data.admins);
//         } else {
//           setError(res.data.error || 'Failed to load admins.');
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Failed to fetch admins.');
//         setLoading(false);
//         console.error(error);
//       });
//   }, []);

//   const handleSearch = () => {
//     const filtered = admins.filter(admin => 
//       admin.name.toLowerCase().includes(searchName.toLowerCase()) && 
//       admin.email.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredAdmins(filtered);
//   };

//   const handleNameChange = (e) => {
//     setSearchName(e.target.value);
//     handleSearch();
//   };

//   const handleEmailChange = (e) => {
//     setSearchEmail(e.target.value);
//     handleSearch();
//   };

//   return (
//     <Container>
//       <Title>All Lecturers / Admins</Title>
//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={handleNameChange}
//         />
//         <SearchInput
//           type="text"
//           placeholder="Search by email"
//           value={searchEmail}
//           onChange={handleEmailChange}
//         />
//       </SearchContainer>

//       {loading && <Loading>Loading admins...</Loading>}
//       {error && <Error>{error}</Error>}

//       {!loading && !error && filteredAdmins.length === 0 && (
//         <Error>No admins found matching your search.</Error>
//       )}

//       <CardsWrapper>
//         {!loading && !error && filteredAdmins.length > 0 && filteredAdmins.map(admin => (
//           <Card key={admin.id}>
//             <CardTitle>{admin.name}</CardTitle>
//             {/* <CardRow>
//               <CardLabel>ID:</CardLabel><CardValue>{admin.id}</CardValue>
//             </CardRow> */}
//             <CardRow>
//               <CardLabel>Email:</CardLabel><CardValue>{admin.email}</CardValue>
//             </CardRow>
//             <CardRow>
//               <CardLabel>Phone:</CardLabel><CardValue>{admin.phone}</CardValue>
//             </CardRow>
//             <CardRow>
//               <CardLabel>Role:</CardLabel><CardValue>{admin.role}</CardValue>
//             </CardRow>
//             {/* <CardRow>
//               <CardLabel>Created At:</CardLabel><CardValue>{new Date(admin.created_at).toLocaleString()}</CardValue>
//             </CardRow> */}
//           </Card>
//         ))}
//       </CardsWrapper>
//     </Container>
//   );
// };

// export default AllAdmin;




import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2'

/* ================= STYLES ================= */

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 0.5rem;
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
  padding: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);
`;

const CardTitle = styled.h3`
  color: #006400;
  margin-bottom: 0.8rem;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

const CardLabel = styled.span`
  font-weight: bold;
  color: #006400;
`;

const CardValue = styled.span`
  color: #333;
`;

const DeleteBtn = styled.button`
  margin-top: 0.8rem;
  padding: 0.4rem 0.8rem;
  background-color: #c62828;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #b71c1c;
  }
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

/* ================= COMPONENT ================= */

const AllAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    axios.get('https://www.cwmsrfupre.com.ng/api/get_all_admin.php')
      .then(res => {
        if (res.data.success) {
          setAdmins(res.data.admins);
          setFilteredAdmins(res.data.admins);
        } else {
          setError(res.data.error || 'Failed to load admins.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch admins.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (name, email) => {
    const filtered = admins.filter(admin =>
      admin.name.toLowerCase().includes(name.toLowerCase()) &&
      admin.email.toLowerCase().includes(email.toLowerCase())
    );
    setFilteredAdmins(filtered);
  };

  const handleDelete = async (adminId) => {
  const result = await Swal.fire({
    title: 'Delete Admin?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#c62828',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete',
  });

  if (!result.isConfirmed) return;

  // 🔄 Loading
  Swal.fire({
    title: 'Deleting...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const res = await axios.post(
      'https://www.cwmsrfupre.com.ng/api/delete_admin.php',
      { id: adminId },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (res.data.success) {
      // Update UI
      const updated = admins.filter(a => a.id !== adminId);
      setAdmins(updated);
      setFilteredAdmins(updated);

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Admin has been deleted successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: res.data.error || 'Failed to delete admin.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Something went wrong. Please try again.',
    });
    console.error(error);
  }
};


  return (
    <Container>
      <Title>All Lecturers / Admins</Title>

      <SearchContainer>
        <SearchInput
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            handleSearch(e.target.value, searchEmail);
          }}
        />
        <SearchInput
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => {
            setSearchEmail(e.target.value);
            handleSearch(searchName, e.target.value);
          }}
        />
      </SearchContainer>

      {loading && <Loading>Loading admins...</Loading>}
      {error && <Error>{error}</Error>}

      <CardsWrapper>
        {!loading && !error && filteredAdmins.map(admin => (
          <Card key={admin.id}>
            <CardTitle>{admin.name}</CardTitle>

            <CardRow>
              <CardLabel>Email:</CardLabel>
              <CardValue>{admin.email}</CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Phone:</CardLabel>
              <CardValue>{admin.phone}</CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Role:</CardLabel>
              <CardValue>{admin.role}</CardValue>
            </CardRow>

            <DeleteBtn onClick={() => handleDelete(admin.id)}>
              Delete Admin
            </DeleteBtn>
          </Card>
        ))}
      </CardsWrapper>
    </Container>
  );
};

export default AllAdmin;
