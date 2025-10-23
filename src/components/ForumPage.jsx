


// // ForumPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";

// const API_BASE = "https://www.cwmsrfupre.com.ng/api"; // change if necessary

// const ForumPage = ({ user }) => {
//   const [posts, setPosts] = useState([]);
//   const [newMsg, setNewMsg] = useState("");
//   const [replyTo, setReplyTo] = useState(null); // object { id, content } or null
//   const chatEndRef = useRef(null);
//   const chatAreaRef = useRef(null);

//   // fetch posts
//   const fetchForumData = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/get_forum_data.php?_=${Date.now()}`, { cache: "no-store" });
//       const data = await res.json();
//       if (data.success) {
//         setPosts(data.posts || []);
//       } else {
//         console.error("Fetch posts error:", data.error);
//       }
//     } catch (err) {
//       console.error("Network error fetching posts:", err);
//     }
//   };

//   useEffect(() => {
//     fetchForumData();
//     const interval = setInterval(fetchForumData, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // auto-scroll to bottom when posts change
// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [posts]);

//   // send a message (post or reply)
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMsg.trim()) return;

//     const formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("user_type", user.role ? user.role.toLowerCase() : "student");
//     formData.append("content", newMsg);
//     if (replyTo) formData.append("reply_to", replyTo.id);

//     try {
//       const res = await fetch(`${API_BASE}/forum_add_post.php`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         setNewMsg("");
//         setReplyTo(null);
//         // after posting, fetch new data and scroll to bottom
//         await fetchForumData();
//         // optionally scroll to the new message (backend returned post_id)
//         if (data.post_id) {
//           setTimeout(() => {
//             const el = document.getElementById(`msg-${data.post_id}`);
//             if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//           }, 300);
//         }
//       } else {
//         console.error("Failed to post:", data.error);
//       }
//     } catch (err) {
//       console.error("Network error on send:", err);
//     }
//   };

//   // scroll to referenced message and highlight
//   const scrollToMessage = (id) => {
//     const el = document.getElementById(`msg-${id}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//       el.classList.add("highlight");
//       setTimeout(() => el.classList.remove("highlight"), 1400);
//     }
//   };

//   // When user clicks reply on a message, set replyTo object
//   const onReplyClick = (post) => {
//     setReplyTo({ id: post.id, content: post.content, email: post.email });
//     // focus input
//     const input = document.querySelector("#chat-input");
//     if (input) input.focus();
//   };

//   // Render
//   return (
//     <ChatWrapper>
//       <Title>💬 CWMSRFUPRE COMMUNITY FORUM</Title>

//       <ChatArea ref={chatAreaRef}>
//         {posts.sort((a, b) => a.id - b.id).map((m) => {
//           const mine = m.user_id === user.id;
//           return (
//             <MsgBubble key={m.id} id={`msg-${m.id}`} $mine={mine}>
//               <MsgHeader>{(m.email || "unknown").split("@")[0]}</MsgHeader>

//               {m.reply_to && (
//                 <ReplyPreview onClick={() => scrollToMessage(m.reply_to)}>
//                   <small>↪ Reply to:</small>
//                   <div className="preview-text">{(m.replied_content || "").slice(0, 80)}</div>
//                 </ReplyPreview>
//               )}

//               <MsgText>{m.content}</MsgText>

//               <FooterRow>
//                 <MsgTime>{new Date(m.created_at).toLocaleTimeString()}</MsgTime>
//                 <ReplyLink onClick={() => onReplyClick(m)}>Reply</ReplyLink>
//               </FooterRow>
//             </MsgBubble>
//           );
//         })}

//         <div ref={chatEndRef} />
//       </ChatArea>

//       <InputArea onSubmit={sendMessage}>
//         {replyTo && (
//           <ReplyBar>
//             <div>
//               Replying to <strong>{replyTo.email?.split("@")[0] || "unknown"}</strong>:
//               <div className="snippet">{replyTo.content.slice(0, 50)}{replyTo.content.length > 50 ? "..." : ""}</div>
//             </div>
//             <button type="button" onClick={() => setReplyTo(null)}>✕</button>
//           </ReplyBar>
//         )}

//         <InputRow>
//           <ChatInput
//             id="chat-input"
//             type="text"
//             placeholder={replyTo ? `Replying to ${replyTo.email.split("@")[0]}...` : "Type a message"}
//             value={newMsg}
//             onChange={(e) => setNewMsg(e.target.value)}
//             autoComplete="off"
//           />
//           <SendBtn type="submit">Send</SendBtn>
//         </InputRow>
//       </InputArea>
//     </ChatWrapper>
//   );
// };

// export default ForumPage;

// /* ===== styles ===== */

// const ChatWrapper = styled.div`
//   margin: 12px auto;
//   max-width: 820px;
//   height: 80vh;
//   display: flex;
//   flex-direction: column;
//   border-radius: 8px;
//   overflow: hidden;
//   border: 1px solid #ddd;
//   background: #ece5dd;
// `;

// const Title = styled.h3`
//   margin: 8px 12px;
//   color: #075e54;
// `;

// const ChatArea = styled.div`
//   flex: 1;
//   overflow-y: auto;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//   .highlight {
//     box-shadow: 0 0 0 3px rgba(255,255,0,0.6) inset;
//     transition: box-shadow 1s ease;
//   }
// `;

// const MsgBubble = styled.div`
//   align-self: ${(p) => (p.$mine ? "flex-end" : "flex-start")};
//   background: ${(p) => (p.$mine ? "#dcf8c6" : "#fff")};
//   padding: 10px 14px;
//   border-radius: 12px;
//   max-width: 78%;
//   word-break: break-word;
//   position: relative;
// `;

// const MsgHeader = styled.div`
//   font-weight: 700;
//   color: #075e54;
//   margin-bottom: 6px;
// `;

// const ReplyPreview = styled.div`
//   background: #f2f2f2;
//   border-left: 3px solid #34b7f1;
//   padding: 6px 8px;
//   margin-bottom: 8px;
//   border-radius: 6px;
//   cursor: pointer;
//   .preview-text { color: #333; font-size: 13px; margin-top: 4px; }
// `;

// const MsgText = styled.div`
//   font-size: 15px;
//   color: #111;
// `;

// const FooterRow = styled.div`
//   display:flex;
//   gap: 12px;
//   justify-content: space-between;
//   align-items:center;
//   margin-top: 8px;
// `;

// const MsgTime = styled.small`
//   color: #666;
//   font-size: 12px;
// `;

// const ReplyLink = styled.span`
//   color: #34b7f1;
//   font-size: 13px;
//   cursor: pointer;
//   margin-left: 8px;
// `;

// const InputArea = styled.form`
//   background: #fff;
//   padding: 8px;
//   border-top: 1px solid #ddd;
// `;

// const ReplyBar = styled.div`
//   background: #fafafa;
//   border-left: 4px solid #34b7f1;
//   padding: 8px;
//   margin-bottom: 8px;
//   display:flex;
//   justify-content:space-between;
//   align-items:center;
//   .snippet { color: #444; margin-top:4px; font-size: 13px; }
//   button { background:transparent; border:none; font-size:18px; cursor:pointer; color:#666; }
// `;

// const InputRow = styled.div`
//   display:flex;
//   gap:8px;
//   align-items:center;
// `;

// const ChatInput = styled.input`
//   flex:1;
//   padding: 10px 14px;
//   border-radius: 24px;
//   border: 1px solid #ccc;
//   font-size: 14px;
// `;

// const SendBtn = styled.button`
//   background: #075e54;
//   color: white;
//   border-radius: 20px;
//   padding: 8px 14px;
//   border: none;
//   cursor: pointer;
// `;



// ForumPage.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const API_BASE = "https://www.cwmsrfupre.com.ng/api";

const ForumPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
  const chatEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  console.log(user)

  // fetch posts
  const fetchForumData = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_forum_data.php?_=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) setPosts(data.posts || []);
    } catch (err) {
      console.error("Fetch posts error:", err);
    }
  };

  useEffect(() => {
    fetchForumData();
    const interval = setInterval(fetchForumData, 4000);
    return () => clearInterval(interval);
  }, []);

  // send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("user_type", user.role ? user.role.toLowerCase() : "student");
    formData.append("content", newMsg);
    if (replyTo) formData.append("reply_to", replyTo.id);

    try {
      const res = await fetch(`${API_BASE}/forum_add_post.php`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setNewMsg("");
        setReplyTo(null);
        await fetchForumData();
        if (data.post_id) {
          setTimeout(() => {
            const el = document.getElementById(`msg-${data.post_id}`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 300);
        }
      }
    } catch (err) {
      console.error("Network error on send:", err);
    }
  };

  // scroll + highlight
  const scrollToMessage = (id) => {
    const el = document.getElementById(`msg-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("highlight");
      setTimeout(() => el.classList.remove("highlight"), 1400);
    }
  };

  const onReplyClick = (post) => {
    setReplyTo({ id: post.id, content: post.content, email: post.email });
    document.querySelector("#chat-input")?.focus();
  };

  // --- NEW: Edit post ---
  const onEditClick = (post) => {
    setEditingPost(post);
    setEditContent(post.content);
  };

  const saveEdit = async (postId) => {
    if (!editContent.trim()) return alert("Message cannot be empty.");
    const formData = new FormData();
    formData.append("post_id", postId);
    formData.append("user_id", user.id);
    formData.append("user_type", user.role ? user.role.toLowerCase() : "student");
    formData.append("content", editContent);

    try {
      const res = await fetch(`${API_BASE}/forum_edit_post.php`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setEditingPost(null);
        setEditContent("");
        await fetchForumData();
      } else {
        alert(data.error || "Unable to edit post.");
      }
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditContent("");
  };





  const deleteMessage = async (id) => {
  if (!window.confirm("Are you sure you want to delete this message?")) return;

  const formData = new FormData();
  formData.append("post_id", id);
  formData.append("user_id", user.id);
  formData.append("user_type", user.role ? user.role.toLowerCase() : "student");

  try {
    const res = await fetch(`${API_BASE}/forum_delete_post.php`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(data.error || "Failed to delete post");
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
};






  // --- Render ---
  return (
    <ChatWrapper>
      <Title>💬 CWMSRFUPRE COMMUNITY FORUM</Title>

      <ChatArea ref={chatAreaRef}>
        {posts.sort((a, b) => a.id - b.id).map((m) => {
          const mine = m.user_id === user.id;
          const createdTime = new Date(m.created_at);
          const now = new Date();
          const canEdit = mine && (now - createdTime) / 60000 < 5;

          return (
            <MsgBubble key={m.id} id={`msg-${m.id}`} $mine={mine}>
              <MsgHeader>{(m.email || "unknown").split("@")[0]}</MsgHeader>

              {m.reply_to && (
                <ReplyPreview onClick={() => scrollToMessage(m.reply_to)}>
                  <small>↪ Reply to:</small>
                  <div className="preview-text">{(m.replied_content || "").slice(0, 80)}</div>
                </ReplyPreview>
              )}

              {/* Editing mode */}
              {editingPost?.id === m.id ? (
                <div>
                  <EditInput
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <EditActions>
                    <button onClick={() => saveEdit(m.id)}>💾 Save</button>
                    <button onClick={cancelEdit}>✕ Cancel</button>
                  </EditActions>
                </div>
              ) : (
                <MsgText>{m.content}</MsgText>
              )}

              <FooterRow>
                <MsgTime>{new Date(m.created_at).toLocaleTimeString()}</MsgTime>
                <MsgTime>{m.updated_at?"Edited":""}</MsgTime>
                <div>
                  <ReplyLink onClick={() => onReplyClick(m)}>Reply</ReplyLink>
                  {canEdit && (
                    <EditLink onClick={() => onEditClick(m)}>Edit</EditLink>
                  )}
                    {m.user_id === user.id && (
      <DeleteLink onClick={() => deleteMessage(m.id)}>🗑 Delete</DeleteLink>
    )}
                </div>
              </FooterRow>
            </MsgBubble>
          );
        })}
        <div ref={chatEndRef} />
      </ChatArea>

      <InputArea onSubmit={sendMessage}>
        {replyTo && (
          <ReplyBar>
            <div>
              Replying to <strong>{replyTo.email?.split("@")[0] || "unknown"}</strong>:
              <div className="snippet">
                {replyTo.content.slice(0, 50)}
                {replyTo.content.length > 50 ? "..." : ""}
              </div>
            </div>
            <button type="button" onClick={() => setReplyTo(null)}>✕</button>
          </ReplyBar>
        )}
        <InputRow>
          <ChatInput
            id="chat-input"
            type="text"
            placeholder={replyTo ? `Replying to ${replyTo.email.split("@")[0]}...` : "Type a message"}
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
          />
          <SendBtn type="submit">Send</SendBtn>
        </InputRow>
      </InputArea>
    </ChatWrapper>
  );
};

export default ForumPage;

/* ====== Styles ====== */
const ChatWrapper = styled.div`
  margin: 12px auto;
  max-width: 820px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  background: #ece5dd;
  @media(max-width:884px){
   height: 90vh;
   padding-top:15px;
  }
`;
const Title = styled.h3`margin: 8px 12px; color: #075e54; font-size:0.9rem`;
const ChatArea = styled.div`
  flex: 1; overflow-y: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
  .highlight { box-shadow: 0 0 0 5px green inset; transition: box-shadow 1s ease; }
`;
const MsgBubble = styled.div`
  align-self: ${(p) => (p.$mine ? "flex-end" : "flex-start")};
  background: ${(p) => (p.$mine ? "#dcf8c6" : "#fff")};
  padding: 10px 14px; border-radius: 12px; max-width: 78%;
`;
const MsgHeader = styled.div`font-weight: 700; color: #075e54; margin-bottom: 6px;`;
const ReplyPreview = styled.div`
  background: #f2f2f2; border-left: 3px solid #34b7f1; padding: 6px 8px;
  margin-bottom: 8px; border-radius: 6px; cursor: pointer;
  .preview-text { color: #333; font-size: 13px; margin-top: 4px; }
`;
const MsgText = styled.div`font-size: 15px; color: #111;`;
const FooterRow = styled.div`
  display: flex; gap: 12px; justify-content: space-between;
  align-items: center; margin-top: 8px;
`;
const MsgTime = styled.small`color: #666; font-size: 12px;`;
const ReplyLink = styled.span`color: #34b7f1; font-size: 13px; cursor: pointer; margin-left: 8px;`;
const EditLink = styled.span`color: #f39c12; font-size: 13px; cursor: pointer; margin-left: 12px;`;
const InputArea = styled.form`background: #fff; padding: 8px; border-top: 1px solid #ddd;`;
const ReplyBar = styled.div`
  background: #fafafa; border-left: 4px solid #34b7f1; padding: 8px;
  margin-bottom: 8px; display: flex; justify-content: space-between;
  align-items: center;
  .snippet { color: #444; margin-top: 4px; font-size: 13px; }
  button { background: transparent; border: none; font-size: 18px; cursor: pointer; color: #666; }
`;
const InputRow = styled.div`display: flex; gap: 8px; align-items: center;`;
const ChatInput = styled.input`flex: 1; padding: 10px 14px; border-radius: 24px; border: 1px solid #ccc; font-size: 14px;`;
const SendBtn = styled.button`background: #075e54; color: white; border-radius: 20px; padding: 8px 14px; border: none; cursor: pointer;`;
const EditInput = styled.textarea`
  width: 100%; border: 1px solid #ccc; border-radius: 8px;
  padding: 8px; margin-top: 4px; font-size: 14px; resize: none;
`;
const EditActions = styled.div`
  display: flex; gap: 10px; margin-top: 4px;
  button { border: none; border-radius: 6px; padding: 4px 8px; cursor: pointer; }
  button:first-child { background: #075e54; color: white; }
  button:last-child { background: #ccc; color: black; }
`;


const DeleteLink = styled.span`
  color: #d9534f;
  font-size: 13px;
  cursor: pointer;
  margin-left: 10px;
`;
