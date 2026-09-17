import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Context } from "./Context";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const ModalTitle = styled.h3`
  color: #006400;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 1.2rem;

  label {
    display: block;
    font-weight: bold;
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 0.4rem;
  }

  input[type="file"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fdfdfd;
    font-size: 0.9rem;
  }

  .info-text {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.3rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  background-color: ${(props) => (props.$secondary ? "#e5e7eb" : "#008000")};
  color: ${(props) => (props.$secondary ? "#374151" : "white")};

  &:hover {
    background-color: ${(props) => (props.$secondary ? "#d1d5db" : "#006400")};
  }
`;



const UploadProofModal = ({ isOpen, onClose, api_url }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
    const studentInfo = useSelector((state) => state.studentInfo);
    const studentId = studentInfo?.id;
  const semesterId=studentInfo?.selected_semester;
  const {semesters}=useContext(Context);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate 5MB max size (5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      Swal.fire("File Too Large", "Please select a file smaller than 5MB.", "error");
      setFile(null);
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire("Missing File", "Please select a proof of payment file to upload.", "warning");
      return;
    }

    if (!studentId || !semesterId) {
      Swal.fire("Error", "Student ID or Semester ID is missing.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("student_id", studentId);
    formData.append("semester_id", semesterId);
    formData.append("result_proof_file", file);

    try {
      setLoading(true);
      const res = await axios.post(`${api_url}/upload_payment_proof.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Uploaded Successfully",
          text: "Your payment proof has been submitted and is awaiting administrative approval.",
        });
        setFile(null);
        onClose();
      } else {
        Swal.fire("Error", res.data.error || "Failed to upload proof.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Could not connect to the server.", "error");
    } finally {
      setLoading(false);
    }
  };





  return (
    <ModalOverlay>
      <ModalCard>
        <ModalTitle>Upload Payment Proof ( {semesters?.find((s) => Number(s.id) === Number(semesterId))?.name || `Semester ${semesterId}`} Result)</ModalTitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="proofFile">Select Receipt / Teller (Max 5MB):</label>
            <input 
              type="file" 
              id="proofFile" 
              accept="image/*,.pdf" 
              onChange={handleFileChange} 
            />
            <div className="info-text">Accepted formats: Images (JPG, PNG) or PDF.</div>
          </FormField>

          <ButtonGroup>
            <ActionButton type="button" $secondary onClick={onClose} disabled={loading}>
              Cancel
            </ActionButton>
            <ActionButton type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit Proof"}
            </ActionButton>
          </ButtonGroup>
        </form>
      </ModalCard>
    </ModalOverlay>
  );
};

export default UploadProofModal;