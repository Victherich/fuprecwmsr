import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #0a7f3f;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #333;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #0a7f3f;
  margin-bottom: 20px;
  outline: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s ease;

  background: ${(props) => (props.variant === "cancel" ? "#ccc" : "#0a7f3f")};
  color: ${(props) => (props.variant === "cancel" ? "#333" : "#fff")};

  &:hover {
    opacity: 0.85;
  }
`;

const generateSessions = () => {
  const sessions = [];
  for (let year = 2025; year < 2050; year++) {
    sessions.push(`${year}/${year + 1}`);
  }
  return sessions;
};

const AdmissionSessionsModal = ({ isOpen, onClose, student , handleAdmitStudent}) => {
  const sessions = generateSessions();
  const [selectedSession, setSelectedSession] = useState("");

  

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!selectedSession) {
  
      Swal.fire({text:"Please select a session"})
      return;
    }
    handleAdmitStudent(student.id,selectedSession);
  };

  return (
    <Overlay>
      <ModalContainer>
        <Title>Select Admission Session</Title>
        <Text>
          Please select the academic session in which you want to admit the student.
        </Text>

        <Select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="">-- Select Session --</option>
          {sessions.map((session) => (
            <option key={session} value={session}>
              {session}
            </option>
          ))}
        </Select>

        <ButtonGroup>
          <Button variant="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleProceed}>Proceed</Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default AdmissionSessionsModal;

// Example Usage:
//
// import React, { useState } from "react";
// import AdmissionModal from "./AdmissionModal";
//
// const App = () => {
//   const [open, setOpen] = useState(false);
//
//   return (
//     <div>
//       <button onClick={() => setOpen(true)}>Open Modal</button>
//
//       <AdmissionModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onProceed={(session) => {
//           console.log("Selected session:", session);
//           setOpen(false);
//         }}
//       />
//     </div>
//   );
//
// export default App;