
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

const VerifyAccessCodeForLecturerSignUp = ({status, setStatus}) => {
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();
  

  const handleVerify = () => {
    if (!accessCode.trim()) {
      Swal.fire('Missing', 'Please enter an access code.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Verifying...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post('https://www.cwmsrfupre.com.ng/api/verify_access_code.php', {
        code: accessCode.trim(),
      })
      .then((res) => {
        Swal.close();
        if (res.data.status === 'existing') {
          setStatus(res.data.status);
          Swal.fire('Success', 'You can now register!', 'success');
        } else {
          setStatus(res.data.status);
          Swal.fire('Invalid', 'Access code not found.', 'error');
        }
      })
      .catch(() => {
        Swal.close();
        Swal.fire('Error', 'Failed to verify access code.', 'error');
      });
  };

  return (
    <div style={{ padding: '100px 5px', maxWidth: '500px', margin: 'auto', height:"500px", color:"green"}}>
      <h2>Verify Access Code</h2>
      <input
        type="text"
        placeholder="Enter access code"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        maxLength={16}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button
        onClick={handleVerify}
        style={{ padding: '0.5rem 1rem', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Verify
      </button>
      {status && <p style={{ marginTop: '1rem', color: 'green' }}>{status}</p>}
      <p style={{marginTop:"20px",color:"green", cursor:"pointer", textDecoration:"underline"}} onClick={()=>navigate('/lecturerlogin')}>Back to login</p>
    </div>
  );
};

export default VerifyAccessCodeForLecturerSignUp;
