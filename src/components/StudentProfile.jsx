import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserGraduate, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { MdWork, MdSchool } from 'react-icons/md';
import Swal from 'sweetalert2';
import { use } from 'react';
import { useContext } from 'react';
import { Context } from './Context';


// ---------- Styled Components ----------
const Container = styled.div`
  background-color: #f9fff9;
  padding: 100px 20px;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  // flex-direction:column;
  justify-content: center;
  align-items: flex-start;
  position:fixed;
  left:0;
  top:0;
  z-index:999;
  width:100%;
  height:100%;
  overflow-y:scroll;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  // box-shadow: 0 4px 12px rgba(0, 100, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  color: #006400;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  flex-wrap: wrap;
  color: #333;
`;

const Label = styled.span`
  font-weight: 600;
  color: #006400;
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
  font-style: italic;
`;

const ButtonWrap = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:10px;
flex-wrap:wrap;
width:100%;
`


const Button = styled.button`
padding:10px;
color:green;
background-color:white;

cursor:pointer;
border:1px solid green;
border-radius :10px;

&:hover{
background-color:green;
color:white;
}
`



// ---------- Main Component ----------
const StudentProfile = ({id, setStudentProfileId, handleGetAllstudents}) => {
  // const { id } = useParams(); // Get ID from route param
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {programs}=useContext(Context);



  // fetching a student by id
 

    const handleGetStudentById = ()=>{
    axios.get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${id}`)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
        } else {
          setError(res.data.error || 'Student not found.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching student data.');
        setLoading(false);
      });

    };

    useEffect(() => {
      handleGetStudentById()
  }, [id]);




// ddeleting as student
const deleteStudent = async (studentId) => {
  // Confirm before deleting
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the student record.',
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
      const res = await axios.post('https://www.cwmsrfupre.com.ng/api/delete_student.php', { id: studentId });
      
      if (res.data.success) {
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
       setStudentProfileId(false);
       handleGetAllstudents();

      } else {
        Swal.fire('Error', res.data.error || 'Something went wrong.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to delete student. Please try again.', 'error');
    }
  }
};



// admitting a student
const admitStudent = async (studentId) => {


  if(student.status==="admitted"){
    Swal.fire({text:"student is already admitted"})
    return;
  }
  // Confirm with the user
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "This will mark the student as 'Admitted'.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, admit student'
  });

  if (confirmation.isConfirmed) {
    // Show loading
    Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the student status.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post('https://www.cwmsrfupre.com.ng/api/admit_student.php', {
        id: studentId
      });

      if (response.data.success) {
        Swal.fire({
          title: 'Success ✅',
          text: response.data.message || 'Student status updated to admitted.',
          icon: 'success'
        });
        handleGetStudentById();
      } else {
        throw new Error(response.data.error || 'Unknown error occurred.');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error ❌',
        text: error.message || 'Failed to update student status.',
        icon: 'error'
      });
    }
  }
};






const cancelStudentAdmission = async (studentId) => {

  if(student.status==="applied"){
    Swal.fire({text:"student is not admitted"})
    return;
  }


  const confirm = await Swal.fire({
    title: 'Reset Status to Applied?',
    text: 'This will reset the student’s status back to "applied".',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel',
  });

  if (confirm.isConfirmed) {
    try {
      Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we update the student status.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post('https://www.cwmsrfupre.com.ng/api/cancel_student_admission.php', {
        id: studentId,
      });

      Swal.close();

      if (response.data.success) {
        Swal.fire({
          title: '✅ Updated!',
          text: response.data.message || 'Student status has been reset to applied.',
          icon: 'success',
        });
        handleGetStudentById();
      } else {

        Swal.fire({
          title: '❌ Failed!',
          text: response.data.error || 'Could not update the student status.',
          icon: 'error',
        });
        console.log(response.data)
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: '🚫 Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      });
      console.error('Update error:', error);
    }
  }
};




// suspend a student

const suspendStudent = async (studentId) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to suspend this student?',
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
        text: 'Please wait while the student is being suspended.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post('https://www.cwmsrfupre.com.ng/api/suspend_student.php', {
        id: studentId
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: response.data.message || 'Student has been suspended successfully.',
        });
        handleGetStudentById();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.error || 'Failed to suspend student.',
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while suspending the student.',
      });
    }
  }
};




// unsuspend student
const unsuspendStudent = (studentId) => {
  // Show confirmation before unsuspending the student
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will unsuspend the student and change their status to "Not Suspended".',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Unsuspend!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // Show loading state while the action is being processed
      setLoading(true);
      Swal.showLoading();

      // Make the API call to unsuspend the student
      axios
        .post('https://www.cwmsrfupre.com.ng/api/unsuspend_student.php', { id: studentId })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            Swal.fire({
              title: 'Success!',
              text: response.data.message,
              icon: 'success',
            });
            handleGetStudentById();

          } else {
            Swal.fire({
              title: 'Error!',
              text: response.data.error || 'Failed to unsuspend student.',
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





// admitting a student
const graduateStudent = async (studentId) => {


  if(student.status==="applied"){
    Swal.fire({text:"student is not admitted"})
    return;
  }

  if(student.status==="graduated"){
    Swal.fire({text:"student is already graduated"})
    return;
  }

  if(student.suspension==="suspended"){
    Swal.fire({text:"student is suspended"})
    return;
  }
  // Confirm with the user
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "This will mark the student as 'Graduated'.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Yes, graduate student'
  });

  if (confirmation.isConfirmed) {
    // Show loading
    Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the student status.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post('https://www.cwmsrfupre.com.ng/api/graduate_student.php', {
        id: studentId
      });

      if (response.data.success) {
        Swal.fire({
          title: 'Success ✅',
          text: response.data.message || 'Student status updated to Graduated.',
          icon: 'success'
        });
        handleGetStudentById();
      } else {
        throw new Error(response.data.error || 'Unknown error occurred.');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error ❌',
        text: error.message || 'Failed to update student status.',
        icon: 'error'
      });
    }
  }
};



// jsx
  return (
    <Container>
      {loading && <Loading>⏳ Loading student profile...</Loading>}
      {error && <Error>❌ {error}</Error>}

      {student && (
        <Card>
          <Title><FaUserGraduate /> {student.full_name}</Title>
<Field><FaEnvelope /> <Label>Institution Email:</Label> {student.email}</Field>
          <Field><FaEnvelope /> <Label>Personal Email:</Label> {student.email2}</Field>
          <Field><FaPhone /> <Label>Phone:</Label> {student.phone}</Field>
          <Field><FaMapMarkerAlt /> <Label>Address:</Label> {student.address}</Field>
          <Field><MdSchool /> <Label>Program:</Label>  {
      programs.find(p => p.id == student.program)?.name || 'N/A'
    }</Field>
          <Field><MdWork /> <Label>Qualification:</Label> {student.qualification}</Field>

          {student.experience && (
            <Field><FaFileAlt /> <Label>Experience:</Label> {student.experience}</Field>
          )}

          {student.statement && (
            <Field><FaFileAlt /> <Label>Statement:</Label> {student.statement}</Field>
          )}
          <Field><FaEnvelope /> <Label>Admission number:</Label> {student.admission_number?student.admission_number:"Not yet Admitted"}</Field>
          <Field ><FaCheckCircle /> <Label>Status:</Label><p style={{backgroundColor:"green", padding:"5px", color:"white", borderRadius:"5px"}}>{student.status.toUpperCase()}</p>  </Field>
          <Field ><FaCheckCircle /> <Label>Suspension:</Label><p style={{backgroundColor:student.suspension==="suspended"?"red":"rgba(0,0,255,0.5)", padding:"5px", color:"white", borderRadius:"5px"}}>{student.suspension.toUpperCase()}</p>  </Field>
    
    
    <ButtonWrap>
    <Button onClick={() => window.open(`https://www.cwmsrfupre.com.ng/api/${student.file_path}`, '_blank')}>
  View Application Documents
</Button>
<Button onClick={() => window.open(`https://www.cwmsrfupre.com.ng/api/${student.proof_of_payment_path}`, '_blank')}>
  View Proof of Application payment
</Button>

    {student.status!=='graduated'&&<Button onClick={()=>admitStudent(student.id)}>
        Grant Admission
      </Button>}
      {student.status!=='graduated'&&<Button onClick={()=>cancelStudentAdmission(student.id)}>
        Cancel Admission
      </Button>}
      {student.status!=='graduated'&&<Button onClick={()=>graduateStudent(student.id)}>
        Graduate Student
      </Button>}
      {student.status!=='graduated'&&<Button onClick={()=>suspendStudent(student.id)}>
        Suspend
      </Button>}
      {student.status!=='graduated'&&<Button onClick={()=>unsuspendStudent(student.id)}>
        Unsuspend
      </Button>}
      <Button onClick={()=>deleteStudent(student.id)}>
        Delete
      </Button>
    <Button onClick={()=>{setStudentProfileId(false);handleGetAllstudents()}}>
        Back
      </Button>
    </ButtonWrap>
          
        </Card>
      )}

    
    </Container>
  );
};

export default StudentProfile;


