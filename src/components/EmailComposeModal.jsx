



// EmailComposeModal.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

/* ===== Styles ===== */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 25, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:500;
  padding: 16px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(10, 15, 25, 0.35);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height:100%;

  @media (max-width: 600px) {
    max-width: 100%;
    height: 100%;
    // border-radius: 0;
  }
`;

const Header = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #eef3f8;
`;

const Title = styled.h3`
  margin:0;
  font-size: 1.1rem;
  color: green;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #6b7280;
`;

const Body = styled.form`
  padding: 18px 20px;
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const Row = styled.div`
  display:flex;
  gap:12px;
  align-items:center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #bbd7fcff;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #bbd7fcff;
  font-size: 0.95rem;
  min-height: 180px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

const Footer = styled.div`
  padding: 12px 20px;
  border-top: 1px solid #eef3f8;
  display:flex;
  justify-content:flex-end;
  gap:10px;
  background: #fbfeff;
`;

const Button = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
`;

const CancelBtn = styled(Button)`
  background: transparent;
  color: #374151;
  border: 1px solid #c4dcf3ff;
`;

const SendBtn = styled(Button)`
  background: green;
  color: white;
  &:hover { background: #176fd1; }
`;

/* Autocomplete styles */
const SuggestionBox = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  background: lightgreen;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-height: 180px;
  overflow-y: auto;
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  z-index: 2000;
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f1f5f9;
  }
`;

/* ===== Component ===== */
const EmailComposeModal = ({ userEmail, userName = "", onSent = () => {}, onClose = () => {}, prefill }) => {
  const [toEmail, setToEmail] = useState("");
  const [toName, setToName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [attachments, setAttachments] = useState([]);


  const handleFileChange = (e) => {
  setAttachments(Array.from(e.target.files));
};

  console.log(prefill?.cc)

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);



useEffect(() => {
  if (prefill) {
    // For Reply, Reply All: prefill To, CC, Subject, Body
    const isReplyAll = prefill?.cc; // optional flag
    setToEmail(prefill.to_email);
    setToName(prefill.to_name);

    // CC logic: include original CCs except yourself if Reply All
    if (isReplyAll && prefill?.cc) {
      const ccList = prefill?.cc
        .map(e => e.trim())
        .filter(e => e && e.toLowerCase() !== userEmail.toLowerCase());
      setCcEmails(ccList.join(', '));
    } else {
      setCcEmails(''); // Reply only has no CC by default
    }

    // Subject: prefix "Re:" if not already
    let subj = prefill.subject || '';
    if (!/^Re:/i.test(subj)) subj = `Re: ${subj}`;
    setSubject(subj);

    // Quote original body in reply
    const quotedBody = prefill.body ? `\n\n--- Original Message ---\n${prefill.body}` : '';
    setBody(quotedBody);
  } else {
    setToEmail('');
    setToName('');
    setCcEmails('');
    setSubject('');
    setBody('');
  }
}, []);





  // Fetch all possible recipients
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://www.cwmsrfupre.com.ng/api/get_users_emails.php?t=${Date.now()}`, {
          cache: "no-store"
        });
        const data = await res.json();
        if (data.success) {
          setAllUsers(data.users);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setToEmail(value);

    if (value.length > 1) {
      const filtered = allUsers.filter(
        (u) =>
          u.email.toLowerCase().includes(value.toLowerCase()) ||
          (u.name && u.name.toLowerCase().includes(value.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 6)); // max 6 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (email, name) => {
    setToEmail(email);
    if (name) setToName(name);
    setSuggestions([]);
  };








//   const handleSend = async (e) => {
//     e.preventDefault();

//     if (!toEmail || !validateEmail(toEmail)) {
//       return Swal.fire({ icon: "error", title: "Invalid recipient", text: "Please provide a valid recipient email." });
//     }
//     if (!subject.trim()) {
//       return Swal.fire({ icon: "error", title: "Missing subject", text: "Please provide an email subject." });
//     }
//     if (!body.trim()) {
//       return Swal.fire({ icon: "error", title: "Empty message", text: "Please write your message." });
//     }

//     // 🚨 Ask for confirmation first
//     const confirmResult = await Swal.fire({
//       title: "Send this email?",
//       text: `To: ${toEmail}\nSubject: ${subject}`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, send it",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#2B32B2",
//       cancelButtonColor: "#6b7280"
//     });

//     if (!confirmResult.isConfirmed) {
//       return; // user canceled
//     }

//     // Show transparent white-spinner loading (scoped)
//     Swal.fire({
//       title: "",
//       html: "",
//       allowOutsideClick: false,
//       background: "transparent",
//       customClass: { popup: "no-bg-popup" },
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//     //   const payload = {
//     //     from_name: userName || "",
//     //     from_email: userEmail.trim(),
//     //     to_name: toName || "",
//     //     to_email: toEmail.trim(),
//     //     subject: subject.trim(),
//     //     body: body.trim()
//     //   };


//     // In handleSend()
// const payload = {
//   from_name: userName || "",
//   from_email: userEmail.trim(),
//   to_name: toName || "",
//   to_email: toEmail.trim(),
//   cc: ccEmails.split(",").map((e) => e.trim()).filter(Boolean), // send as array
//   subject: subject.trim(),
//   body: body.trim()
// };


//       const res = await fetch("https://www.cwmsrfupre.com.ng/api/send_mail.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();
//       if (data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Sent!",
//           text: "Message delivered to recipient inbox and saved to your Sent box.",
//           confirmButtonColor: "#2B32B2"
//         });
//         onSent();
//         setToEmail(""); setToName(""); setSubject(""); setBody("");
//         onClose();
//       } else {
//         Swal.fire({ icon: "error", title: "Failed", text: data.error || "Could not send message." });
//       }
//     } catch (err) {
//       console.error("Send failed:", err);
//       Swal.fire({ icon: "error", title: "Server error", text: "Could not connect to server." });
//     } finally {
//     //   Swal.close();
//     }
//   };



// inside EmailComposeModal.jsx


const handleSend = async (e) => {
  e.preventDefault();

  if (!toEmail || !validateEmail(toEmail)) {
    return Swal.fire({ icon: "error", title: "Invalid recipient", text: "Please provide a valid recipient email." });
  }
  if (!subject.trim()) {
    return Swal.fire({ icon: "error", title: "Missing subject", text: "Please provide an email subject." });
  }
  if (!body.trim()) {
    return Swal.fire({ icon: "error", title: "Empty message", text: "Please write your message." });
  }

  const confirmResult = await Swal.fire({
    title: "Send this email?",
    text: `To: ${toEmail}\nSubject: ${subject}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, send it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2B32B2",
    cancelButtonColor: "#6b7280"
  });

  if (!confirmResult.isConfirmed) return;

  Swal.fire({ allowOutsideClick: false, didOpen: () => Swal.showLoading() });

  try {
    // 🚨 Use FormData instead of JSON
    const formData = new FormData();
    formData.append("from_name", userName || "");
    formData.append("from_email", userEmail.trim());
    formData.append("to_name", toName || "");
    formData.append("to_email", toEmail.trim());
    formData.append("subject", subject.trim());
    formData.append("body", body.trim());
    formData.append("cc", ccEmails); // send as string (server can explode it)

    // append attachments
    attachments.forEach((file, i) => {
      formData.append("attachments[]", file);
    });

    const res = await fetch("https://www.cwmsrfupre.com.ng/api/send_mail.php", {
      method: "POST",
      body: formData // no headers -> browser sets boundary
    });

    const data = await res.json();
    if (data.success) {
      Swal.fire({ icon: "success", title: "Sent!", text: "Message delivered with attachments." });
      onSent();
      setToEmail(""); setToName(""); setSubject(""); setBody(""); setCcEmails(""); setAttachments([]);
      onClose();
    } else {
      Swal.fire({ icon: "error", title: "Failed", text: data.error || "Could not send message." });
    }
  } catch (err) {
    console.error("Send failed:", err);
    Swal.fire({ icon: "error", title: "Server error", text: "Could not connect to server." });
  }
};



const [ccEmails, setCcEmails] = useState("");
const [ccSuggestions, setCcSuggestions] = useState([]);

const handleCcChange = (e) => {
  const value = e.target.value;
  setCcEmails(value);

  const lastEmail = value.split(",").pop().trim();
  if (lastEmail.length > 1) {
    const filtered = allUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(lastEmail.toLowerCase()) ||
        (u.name && u.name.toLowerCase().includes(lastEmail.toLowerCase()))
    );
    setCcSuggestions(filtered.slice(0, 6));
  } else {
    setCcSuggestions([]);
  }
};

const selectCcSuggestion = (email) => {
  let emails = ccEmails.split(",").map((e) => e.trim()).filter(Boolean);
  emails[emails.length - 1] = email; // replace the last typed part
  setCcEmails(emails.join(", ") + ", ");
  setCcSuggestions([]);
};




  return (
    <Overlay role="dialog" aria-modal="true">
      <Modal>
        <Header>
          <Title>Compose</Title>
          <CloseButton onClick={onClose} aria-label="Close compose">✕</CloseButton>
        </Header>

        <Body onSubmit={handleSend}>
          {/* To + Suggestions */}
          <Row style={{ position: "relative", flexDirection: "column", alignItems: "stretch" }}>
            <Input
              placeholder="To (email)"
              value={toEmail}
              onChange={handleEmailChange}
              required
            />
            {suggestions.length > 0 && (
              <SuggestionBox>
                {suggestions.map((s, i) => (
                  <SuggestionItem key={i} onClick={() => selectSuggestion(s.email, s.name)}>
                    {s.name ? `${s.name} <${s.email}>` : s.email}
                  </SuggestionItem>
                ))}
              </SuggestionBox>
            )}
            <Input
              placeholder="To name (optional)"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
            />
          </Row>

          {/* CC Input */}
<Row style={{ position: "relative", flexDirection: "column", alignItems: "stretch" }}>
  <Input
    placeholder="Cc (comma separated emails)"
    value={ccEmails}
    onChange={handleCcChange}
  />
  {ccSuggestions.length > 0 && (
    <SuggestionBox>
      {ccSuggestions.map((s, i) => (
        <SuggestionItem key={i} onClick={() => selectCcSuggestion(s.email)}>
          {s.name ? `${s.name} <${s.email}>` : s.email}
        </SuggestionItem>
      ))}
    </SuggestionBox>
  )}
</Row>


          {/* Subject */}
          <Row>
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Row>

          {/* Body */}
          <Row>
            <Textarea
              placeholder="Write your message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Row>


          {/* Attachments */}

          <h4 style={{color:"green"}}>Attachments</h4>
<Row>
  <input
    type="file"
    multiple
    onChange={handleFileChange}
  />
</Row>

{/* Show selected files */}
{attachments.length > 0 && (
  <ul style={{ fontSize: "0.85rem", color: "#374151" }}>
    {attachments.map((file, i) => (
      <li key={i} style={{marginLeft:"20px"}}>{file.name}</li>
    ))}
  </ul>
)}


          {/* Footer */}
          <Footer>
            <CancelBtn type="button" onClick={onClose}>Cancel</CancelBtn>
            <SendBtn type="submit">Send</SendBtn>
          </Footer>
        </Body>
      </Modal>
    </Overlay>
  );
};

export default EmailComposeModal;
