import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import FeedbackModal from "./FeedbackModal";

// === Styled Components ===
const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: green;
  font-weight: 800;
`;

const Label = styled.label`
  font-weight: bold;
  color: green;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: darkorange;
  }
`;

const AssetList = styled.div`
  margin-top: 40px;
`;

const AssetItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const FileLink = styled.a`
  color: #0077b6;
  text-decoration: underline;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NewPostButton = styled.button`
  position: fixed;
  bottom: 140px;
  right: 20px;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 60px;
  font-size: 0.9rem;
  cursor: pointer;
`;



const NewPostButton2 = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 60px;
  font-size: 0.9rem;
  cursor: pointer;
`;



const NewPostButton3 = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 60px;
  font-size: 0.9rem;
  cursor: pointer;
`;




// === Main Component ===
const AssessmentAndFeedbacks = () => {
  const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);

   const [openForm2, setOpenForm2] = useState(false);
     const [openForm3, setOpenForm3] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [userName, setUserName] = useState("");
const [userEmail, setUserEmail] = useState("");

  const location = useLocation();

 // === FETCH ALL ASSESSMENT FORMS ===
const fetchItems = async () => {
  try {
    const res = await axios.get(
      "https://www.cwmsrfupre.com.ng/api/get_assessment_forms.php",
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    if (res.data.success) setItems(res.data.forms || []);
  } catch (err) {
    Swal.fire("Error", "Failed to load assessment & feedback forms.", "error");
  }
};

// Auto-fetch every 10 seconds
useEffect(() => {
  fetchItems();
  const interval = setInterval(fetchItems, 10000);
  return () => clearInterval(interval);
}, []);


// === UPLOAD NEW FORM ===
const handleSubmit = async () => {
  if (!title || !description) {
    Swal.fire("Please fill all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (file) formData.append("file", file);

  try {
    Swal.fire({ text: "Uploading..." });
    Swal.showLoading();

    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/create_assessment_form.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache",
        },
      }
    );

    Swal.close();

    if (res.data.success) {
      Swal.fire("Success", "Assessment form uploaded successfully!", "success");
      setTitle("");
      setDescription("");
      setFile(null);
      setOpenForm(false);
      fetchItems();
    } else {
      Swal.fire("Error", res.data.error || "Failed to upload.", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong during upload.", "error");
  }
};


// === DELETE FORM ===
const deleteItem = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete this assessment form.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/delete_assessment_form.php",
      { item_id: id },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (res.data.success) {
      Swal.fire("Deleted!", "Form removed successfully.", "success");
      fetchItems();
    } else {
      Swal.fire("Error", res.data.error || "Failed to delete form.", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong while deleting.", "error");
  }
};




const handleSubmit2 = async () => {
  if (!file2) {
    Swal.fire("Please select a file to upload.");
    return;
  }

  if (!userName || !userEmail) {
    Swal.fire("Please provide your name and email.");
    return;
  }

  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    Swal.fire("Invalid email", "Please enter a valid email address.", "warning");
    return;
  }

  // Ask for confirmation before uploading
  const confirm = await Swal.fire({
    title: "Confirm Submission",
    text: "Are you sure you want to submit this feedback?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, submit it",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return;

  const formData = new FormData();
  formData.append("file2", file2);
  formData.append("name", userName);
  formData.append("email", userEmail);

  try {
    Swal.fire({ text: "Uploading..." });
    Swal.showLoading();

    const res = await axios.post(
      "https://www.cwmsrfupre.com.ng/api/create_feedback.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Cache-Control": "no-cache",
        },
      }
    );

    Swal.close();

    if (res.data.success) {
      Swal.fire("Success", "Feedback uploaded successfully!", "success");
      setFile2(null);
      setUserName("");
      setUserEmail("");
      setOpenForm2(false);
      fetchItems(); // refresh list if needed
    } else {
      Swal.fire("Error", res.data.error || "Failed to upload.", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong during upload.", "error");
  }
};





  return (
    <Container>
      <Title>Assessments & Feedback Forms</Title>
<p style={{textAlign:"center"}}>
    Download the respective form or forms , fill and then submit here .
</p>
      {location.pathname === "/admin" && (
        <NewPostButton onClick={() => setOpenForm(true)}>
          <FaPlus /> Upload Form
        </NewPostButton>
      )}

        {location.pathname === "/admin" && (
        <NewPostButton2 onClick={() => setOpenForm3(true)}>
          <FaPlus /> View Feedbacks
        </NewPostButton2>
      )}


      
        <NewPostButton3 onClick={() => setOpenForm2(true)}>
          <FaPlus /> Submit Feedback
        </NewPostButton3>
      

      <AssetList>
        {items.length === 0 ? (
          <p>No assessments or feedbacks forms found.</p>
        ) : (
          items.map((item) => (
            <AssetItem key={item.id}>
              <h3>{item.title.toUpperCase()}</h3>
              <p>{item.description}</p>
              {item.file_url && (
                <FileLink href={item.file_url} target="_blank">
                  View / Download
                </FileLink>
              )}
              {location.pathname === "/admin" && (
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "green",
                    border: "1px solid green",
                    marginTop: "10px",
                  }}
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </Button>
              )}
            </AssetItem>
          ))
        )}
      </AssetList>

      {openForm && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setOpenForm(false)}>
              <FaTimes />
            </CloseButton>
            <Title>Upload Assessment or Feedback Form</Title>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Description</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label>Upload File (PDF, DOC, DOCX)</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalContent>
        </ModalOverlay>
      )}


{openForm2 && (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={() => setOpenForm2(false)}>
        <FaTimes />
      </CloseButton>
      <Title>Submit Feedback</Title>

      <Label>Name</Label>
      <Input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your full name"
      />

      <Label>Email</Label>
      <Input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <Label>Upload File (PDF, DOC, DOCX)</Label>
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile2(e.target.files[0])}
      />

      <Button onClick={handleSubmit2}>Submit</Button>
    </ModalContent>
  </ModalOverlay>
)}

{<FeedbackModal
open={openForm3}
onClose={()=>setOpenForm3(false)}
/>}
    </Container>
  );
};

export default AssessmentAndFeedbacks;
