
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

// === Styled Components ===
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
  max-width: 800px;
  max-height: 90%;
  overflow-y: auto;
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: green;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const FeedbackList = styled.div``;

const FeedbackItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 6px;
  background: #f9f9f9;
`;

const FileLink = styled.a`
  color: #0077b6;
  text-decoration: underline;
`;

// === Modal Component ===
const FeedbackModal = ({ open, onClose }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch feedbacks from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_feedbacks.php",
        { headers: { "Cache-Control": "no-cache" } } // prevent caching
      );
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      } else {
        Swal.fire("Error", res.data.error || "Failed to fetch feedbacks.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong while fetching feedbacks.", "error");
    }
  };

  useEffect(() => {
    if (open) {
      fetchFeedbacks();
    }
  }, [open]);

  // Filter feedbacks based on search query
  const filteredFeedbacks = feedbacks.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!open) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <Title>All Feedbacks</Title>

        <SearchInput
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FeedbackList>
          {filteredFeedbacks.length === 0 ? (
            <p>No feedbacks found.</p>
          ) : (
            filteredFeedbacks.map((f) => (
              <FeedbackItem key={f.id}>
                <strong>Name:</strong> {f.name} <br />
                <strong>Email:</strong> {f.email} <br />
                {f.file_url && (
                  <FileLink href={f.file_url} target="_blank" rel="noopener noreferrer">
                    View / Download File
                  </FileLink>
                )}
                <br />
                <small>Submitted At: {f.uploaded_at}</small>
              </FeedbackItem>
            ))
          )}
        </FeedbackList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FeedbackModal;
