// EmailVerificationModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

// --- Styled Components ---
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
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: green;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 1rem 0;
  border: 2px solid green;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: orange;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: 0.3s;

  &:hover {
    background: green;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function EmailVerificationModal({ onClose, onVerified }) {
  const [step, setStep] = useState(1); // 1 = email step, 2 = code step
  const [email2, setEmail2] = useState("");
  const [code, setCode] = useState("");

  // Step 1: Request verification code
  const handleSendCode = async () => {
    if (!email2) {
      Swal.fire("Oops!", "Please enter your email", "warning");
      return;
    }

    Swal.fire({
      title: "Please wait...",
      text: "Sending verification code...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(
        "https://www.cwmsrfupre.com.ng/api/student_send_email_code_mail_function.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email2 }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Success", `${data.message}. Please check your email inbox or spam folder.` , "success");
        setStep(2);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error. Please try again.", "error");
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async () => {
    if (!code) {
      Swal.fire("Oops!", "Please enter the verification code", "warning");
      return;
    }

    Swal.fire({
      title: "Please wait...",
      text: "Verifying your code...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(
        "https://www.cwmsrfupre.com.ng/api/student_verify_email_code.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email2, code }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Verified!", `${data.message} You can proceed with the application`, "success");
        setTimeout(() => onClose(), 1500);
        onVerified(email2);

      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error. Please try again.", "error");
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        

        {step === 1 && (
          <>
          <Title>Please Verify your email and then proceed with the Application</Title>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
            <Button onClick={handleSendCode}>Verify</Button>
          </>
        )}

        {step === 2 && (
          <>
          <Title>Please Enter the code sent to your email</Title>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
            <Button onClick={handleVerifyCode}>Verify Code</Button>
          </>
        )}

        <Button
          style={{ marginTop: "1rem", background: "green" }}
          onClick={onClose}
        >
          Close
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
}
