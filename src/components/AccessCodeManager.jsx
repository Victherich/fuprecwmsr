
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AccessCodeManager = () => {
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

 const fetchCodes = () => {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    axios.get('https://www.cwmsrfupre.com.ng/api/get_access_codes.php')
      .then(res => {
        Swal.close();
        if (res.data.success) {
          setCodes(res.data.codes);
        } else {
          Swal.fire('Error', 'Failed to fetch access codes', 'error');
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Failed to fetch access codes', 'error');
      });
  };

  const handleAdd = () => {
    if (!newCode.trim()) return;

    Swal.fire({
      title: 'Adding...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    axios.post('https://www.cwmsrfupre.com.ng/api/add_access_code.php', {
      code: newCode,
      description: description
    })
    .then(() => {
      Swal.close();
      Swal.fire('Success', 'Access code added!', 'success');
      setNewCode('');
      setDescription('');
      fetchCodes();
    })
    .catch(() => {
      Swal.close();
      Swal.fire('Error', 'Failed to add code', 'error');
    });
  };

const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This code will be deleted permanently.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      axios.delete(`https://www.cwmsrfupre.com.ng/api/delete_access_code.php?id=${id}`)
        .then(() => {
          Swal.close();
          Swal.fire('Deleted!', 'Access code has been deleted.', 'success');
          fetchCodes();
        })
        .catch(() => {
          Swal.close();
          Swal.fire('Error', 'Failed to delete code', 'error');
        });
    }
  });
};


  useEffect(() => {
    fetchCodes();
  }, []);





  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI' }}>
      <h2 style={{color:"green"}}>Manage Access Codes</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ marginBottom: '1rem' }}>
       <input
  type="text"
  placeholder="Access code"
  value={newCode}
  onChange={e => setNewCode(e.target.value.toUpperCase())}
  maxLength={16}
  style={{ padding: '0.5rem', marginRight: '1rem' }}
/>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', width: '300px' }}
        />
        <button onClick={handleAdd} style={{ padding: '0.5rem 1rem',cursor:"pointer", backgroundColor: 'green', color: 'white', border: 'none' }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {codes.map(code => (
          <li key={code.id} style={{ marginBottom: '1rem' }}>
            <strong>{code.code}</strong><br />
            <em>{code.description || 'No description'}</em><br />
            <button
              onClick={() => handleDelete(code.id)}
              style={{ color: 'white', cursor:"pointer", backgroundColor: 'red', border: 'none', padding: '5px 10px', marginTop: '5px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessCodeManager;
