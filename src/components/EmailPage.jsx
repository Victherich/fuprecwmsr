
// InboxPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import Swal from 'sweetalert2'
import EmailComposeModal from './EmailComposeModal';
import { FaChevronDown } from 'react-icons/fa';

// Styled layout
const Page = styled.div`
  display: flex;
  height: 100vh;
  padding:20px;
  // background: #f4f6f8;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: white;
  border-right: 1px solid lightgreen;
  padding: 20px;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  gap:12px;

  @media (max-width: 900px) {
    display: none; /* collapse on small device (optional) */
  
  }
`;


const SidebarMobile = styled.div`
  width: 250px;
  background: #f9fafb; /* light gray (fix typo: "lightygray" → valid color) */
  border-right: 1px solid lightgreen;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius:10px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.5); /* ✅ subtle shadow on right */
  position:absolute;
  top:120px;
  
`;



const SidebarItem = styled.button`
  background: ${({ active }) => (active ? 'lightgreen' : 'transparent')};
  border: none;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #1f2937;
  font-weight: 600;
  display:flex;
  align-items:center;
  gap:10px;
`;

const LeftPane = styled.div`
  width: 420px;
  border-right: 1px solid lightgreen;
  background: white;
  display: flex;
  flex-direction: column;

  @media(max-width:900px){
  width:100%;
  }
`;

const SearchBar = styled.div`
  padding: 12px;
  border-bottom: 1px solid lightgreen;
  display:flex;
  gap:10px;
`;

const SearchInput = styled.input`
  flex:1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid lightgreen;
`;

const MessageList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const MessageRow = styled.div`
  padding: 5px;
  border-bottom: 1px solid lightgreen;
  display:flex;
  gap:10px;
  align-items:center;
  cursor:pointer;
  background:${({ selected }) => (selected ? 'lightgreen' : 'transparent')};

  &:hover { 

  }
`;

const Avatar = styled.div`
  width:30px;height:30px;border-radius:50%;
  background: linear-gradient(135deg,#cfe3ff,#e6f0ff);
  display:flex;align-items:center;justify-content:center;font-weight:700;color:#1f2937; font-size:0.9rem;
  // flex-shrink:0;
`;

const MessagePreview = styled.div`
  flex:1;
  min-width:0;
`;

const RowTop = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`;

const Subject = styled.div`
  font-weight: 700;
  color: #0b1220;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Snippet = styled.div`
  color:#556173;
  font-size: 0.95rem;
  margin-top:6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightPane = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  background:white;

  @media(max-width:900px){
  // display:none;
  position:absolute;
  top:50px;
  left:0px;
  width:100%;
  z-index:400;
  height:100vh;
  overflow-y:scroll;
  }
`;

const MessageHeader = styled.div`
  padding: 18px;
  border-bottom: 1px solid lightgreen;
  display:flex;flex-direction:column;gap:6px;flex-wrap:wrap;
`;

const MessageBody = styled.div`
  padding: 10px;
  overflow-y: auto;
  font-size:0.9rem;

`;

const EmptyState = styled.div`
  padding: 30px; text-align:center; color:#6b7280;
`;



const ActionButton = styled.button`
  background: #e5e7eb; /* light gray */
  color: green; /* dark text */
  border: none;
  padding: 5px 5px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 5px;
  transition: background 0.2s ease;
  font-size:0.7rem;
  width:60px;
  font-weight:bold;

  &:hover {
    background: lightgreen; /* darker gray on hover */
  }

  &:last-child {
    margin-right: 0;
  }
`;

const DangerButton = styled(ActionButton)`
  background: #fee2e2; /* light red */
  color: #b91c1c; /* dark red */
  font-size:0.7rem;
  font-weight:bold;
  margin-bottom:5px;

  &:hover {
    background: #fecaca; /* deeper red hover */
  }
`;


const H3 = styled.h3`
text-align:center;
color:green;
display:none;

@media(max-width:900px){
display:block;
}

`

const Overlay = styled.div`
position:fixed;
  width:100vw;
  height:100vh;
  background:rgba(0,0,0,0.5);
  top:0;
  left:0;
`

// ---------- Component ----------
const EmailPage = ({ userEmail, user }) => {
  // userEmail should be provided from top-level auth (for dev pass in prop)
  const [folder, setFolder] = useState('inbox');
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newMailModal, setNewMailModal] = useState(false);
console.log(messages);
 const [replyData, setReplyData] = useState(null); // ✅ hold reply prefill data

 const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
 const [openRightPane, setOpenRightPane]=useState(false);




 // handling click away
const menuRef=useRef();
useEffect(()=>{
   const handleClickOutside = (event)=>{
      if(menuRef.current&&!menuRef.current.contains(event.target)){
         setSidebarMobileOpen(false)
      }
   }
   document.addEventListener('mousedown',handleClickOutside)
      return ()=>{
         document.removeEventListener('mousedown',handleClickOutside)
      }
},[])



//  console.log(userEmail)

//  console.log(user)

async function fetchMessages() {
  setLoading(true);
  try {
    const endpoint = folder === 'inbox' 
      ? 'https://www.cwmsrfupre.com.ng/api/inbox_get_messages.php'
      : 'https://www.cwmsrfupre.com.ng/api/sent_get_messages.php';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, folder, search })
    });

    const data = await res.json();
    if (data.success) setMessages(data.messages);
  } catch (err) {
    console.error(err);
  } finally { setLoading(false); }
}

async function openMessage(id) {
  try {
    const endpoint = folder === 'inbox' 
      ? 'https://www.cwmsrfupre.com.ng/api/inbox_get_message.php'
      : 'https://www.cwmsrfupre.com.ng/api/sent_get_message.php';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, id })
    });

    const data = await res.json();
    if (data.success) {
      setSelected(data.message);
 setOpenRightPane(true);
      // only update read state if inbox
      if (folder === 'inbox') {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
      }
    }
  } catch (err) {
    console.error(err);
  }
}



  useEffect(() => {
    if (!userEmail) return;
    fetchMessages();
    const id = setInterval(fetchMessages, 30000); // refresh every 30s
    return () => clearInterval(id);
  }, [userEmail, folder, search]);



  function humanTime(iso) {
    try {
      return formatDistanceToNowStrict(parseISO(iso), { addSuffix: true });
    } catch { return iso; }
  }




// utils/mailApi.js
async function markMessageRead(email, id, isRead) {

 

     Swal.fire({
    title: "", // no text
    html: "",
    allowOutsideClick: false,
    background: "transparent", // transparent background
    customClass: {
      popup: "no-bg-popup" // ✅ custom class only for this swal
    },
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const res = await fetch("https://www.cwmsrfupre.com.ng/api/inbox_mark_read.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, id, is_read: isRead }),
      cache: "no-store" // 🚫 prevent caching
    });

    const data = await res.json();

    if (!data.success) {
      console.error("Failed to mark message as read:", data.error);
      return { success: false, error: data.error || "Unknown error" };
    }
fetchMessages();

    return { success: true };
    
  } catch (err) {
    console.error("Error calling mail_mark_read:", err);
    return { success: false, error: err.message };
  }
  finally{
    Swal.close();
  }
}



async function deleteMessage(email, id) {
  const confirm = await Swal.fire({
    title: "Delete this message?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    reverseButtons: true
  });


  if (!confirm.isConfirmed) return;

  const endpoint = folder === 'inbox'
    ? "https://www.cwmsrfupre.com.ng/api/inbox_delete_mail.php"
    : "https://www.cwmsrfupre.com.ng/api/sent_delete_mail.php";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, id }),
      cache: "no-store"
    });
    const data = await res.json();
    if (data.success) {
      Swal.fire({ icon: "success", title: "Deleted!", timer: 2000, showConfirmButton: false });
      fetchMessages();
    }
  } catch (err) { console.error(err); }
}



const switch1 =()=>{
  if(folder==='inbox'){

  }else{
setMessages([]); setSelected(null)
  }
}


const switch2 =()=>{
  if(folder==='sent'){

  }else{
setMessages([]); setSelected(null)
  }
}


  // ---------------- REPLY HANDLERS ----------------
  function handleReply(msg) {
    setReplyData({
      to_name: msg.from_name,
      to_email: msg.from_email,
      cc: [],
      subject: msg.subject.startsWith('Re:') ? msg.subject : 'Re: ' + msg.subject,
      body: `\n\n--- Original Message ---\nFrom: ${msg.from_name} <${msg.from_email}>\nSent: ${msg.created_at}\nSubject: ${msg.subject}\n\n${msg.body}`,
    });
    setNewMailModal(true);
  }

  function handleReplyAll(msg) {
    let ccList = [];

    // include original To (if not yourself)
    if (msg.to_email && msg.to_email !== userEmail) {
      ccList.push(msg.to_email);
    }

    // include all CCs except yourself
    if (msg.cc) {
      ccList = ccList.concat(
        msg.cc.split(',').map(e => e.trim()).filter(e => e && e !== userEmail),
      );
    }

    setReplyData({
      to_name: msg.from_name,
      to_email: msg.from_email,
      cc: ccList,
      subject: msg.subject.startsWith('Re:') ? msg.subject : 'Re: ' + msg.subject,
      body: `\n\n--- Original Message ---\nFrom: ${msg.from_name} <${msg.from_email}>\nSent: ${msg.created_at}\nSubject: ${msg.subject}\n\n${msg.body}`,
    });
    setNewMailModal(true);
  }





  return (
    <Page>
      <Sidebar>
        <div style={{fontWeight:900, fontSize:18, color:"green"}}>CWMSR Mail</div>
          <SidebarItem onClick={()=>{setNewMailModal(true);setReplyData(null)}}>Send New Email</SidebarItem>
        <SidebarItem active={folder==='inbox'} onClick={()=>{setFolder('inbox');switch1()}}>Inbox</SidebarItem>
        <SidebarItem active={folder==='sent'} onClick={()=>{setFolder('sent');switch2()}}>Sent</SidebarItem>
    
        <div style={{marginTop:'auto', fontSize:12, color:'#556173'}}>Logged in as<br/><b>{userEmail}</b></div>
      </Sidebar>



      <LeftPane>

        {sidebarMobileOpen&&<Overlay></Overlay>}
<H3 onClick={()=>setSidebarMobileOpen(!sidebarMobileOpen)}>Email Menu <FaChevronDown/></H3>


 {sidebarMobileOpen&&<SidebarMobile ref={menuRef}>
        <div style={{fontWeight:900, fontSize:18, color:"green"}}>CWMSR Mail</div>
          <SidebarItem onClick={()=>{setNewMailModal(true);setReplyData(null); setSidebarMobileOpen(false)}}>Send New Email</SidebarItem>
        <SidebarItem active={folder==='inbox'} onClick={()=>{setFolder('inbox');switch1(); setSidebarMobileOpen(false)}}>Inbox</SidebarItem>
        <SidebarItem active={folder==='sent'} onClick={()=>{setFolder('sent');switch2(); setSidebarMobileOpen(false)}}>Sent</SidebarItem>
    
        <div style={{marginTop:'auto', fontSize:12, color:'#556173'}}>Logged in as<br/><b>{userEmail}</b></div>
      </SidebarMobile>}

        <SearchBar>
          <SearchInput placeholder="Search mail" value={search} onChange={e=>setSearch(e.target.value)} />
        </SearchBar>

        <MessageList>
          {/* {loading && <EmptyState>Loading...</EmptyState>} */}
          {!loading && messages.length === 0 && <EmptyState>No messages</EmptyState>}
          {messages.map(m => (
            <MessageRow key={m.id} selected={selected && selected.id === m.id} onClick={()=>openMessage(m.id)}>
              <Avatar>{m.from_name ? m.from_name.split(' ').map(n=>n[0]).slice(0,2).join('') : ''}</Avatar>
              {/* <Avatar>{m.from_name}</Avatar> */}
              <MessagePreview>
                <RowTop>
                  <div style={{display:'flex',flexDirection:"column", alignItems:'flexStart', fontSize:12}}>
                    <div style={{ color:'#6b7280'}}>{m.from_name?.slice(0,20)}...</div>
                    <Subject>{m.subject?.slice(0,40)}</Subject>
                  </div>
                  <div style={{fontSize:12, color:'#0e4dc2ff'}}>{humanTime(m.created_at)}</div>
                </RowTop>
                <Snippet style={{fontWeight:m.is_read==1?"":"bold", fontSize:12}} >{m.snippet.slice(0,40)}...</Snippet>
              </MessagePreview>
            </MessageRow>
          ))}
        </MessageList>
      </LeftPane>

     {openRightPane&& <RightPane>
        {!selected && <EmptyState>Select an email to open</EmptyState>}
        {selected && (
          <>
            <MessageHeader>
              <div>
                   <div>
                  {/* action buttons */}

                   <ActionButton onClick={() => handleReply(selected)}>
                        Reply
                      </ActionButton>
                      <ActionButton onClick={() => handleReplyAll(selected)}>
                        Reply All
                      </ActionButton>
  {folder === 'inbox' && (
  <ActionButton onClick={() => markMessageRead(userEmail, selected.id, 0)}>
    Unread
  </ActionButton>
  
)}

                        <DangerButton onClick={() => deleteMessage(userEmail, selected.id)}>
        Delete
      </DangerButton>
                  <ActionButton onClick={() => setOpenRightPane(false)}>
                    Close
                  </ActionButton>
                
   


      
       </div>
                <div>
                  <div style={{fontSize:18,fontWeight:800, color:"green" }}>{selected.subject}</div>
                  <div style={{color:'#6b7280', fontSize:"0.8rem"}}>From: {selected.from_name} &lt;{selected.from_email}&gt;</div>
                      <div style={{color:'#6b7280', fontSize:"0.8rem"}}>To: {selected.to_name} &lt;{selected.to_email}&gt;</div>
                 {selected.cc?<div style={{ color: '#6b7280', fontSize: "0.8rem" }}>
  CC: {selected.cc ? selected.cc.split(",").map(cc => cc.trim()).join(", ") : "—"}
</div>:<div></div>}

                <div style={{color:'#6b7280', fontSize:"0.8rem"}}>{humanTime(selected.created_at)}</div>
                </div>
             
              </div>
            </MessageHeader>
            {/* <MessageBody>
              <div dangerouslySetInnerHTML={{__html: selected.body.replace(/\n/g,'<br/>')}} />
            </MessageBody> */}
            <MessageBody>
  <div
    dangerouslySetInnerHTML={{
      __html: selected.body.replace(/\n/g, "<br/>"),
    }}
  />

  {/* ✅ Attachments Section */}
  {selected.attachments && selected.attachments.length > 0 && (
    <div style={{ marginTop: "20px" }}>
      <div style={{ fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
        Attachments ({selected.attachments.length})
      </div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {selected?.attachments?.map((att, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                color: "#2563eb",
                wordBreak: "break-all",
              }}
            >
         
<button
  onClick={() =>
    window.open(
      `https://www.cwmsrfupre.com.ng/api/download.php?file=${encodeURIComponent(att)}`
    )
  }
  style={{
    backgroundColor: "#e5e7eb",   // blue background
    color: "green",             // white text
    padding: "6px 12px",          // spacing
    borderRadius: "8px",          // rounded corners
    border: "none",               // remove border
    fontSize: "0.7rem",          // slightly smaller text
    fontWeight: "600",            // bold
    cursor: "pointer",
    display: "inline-flex",       // align icon + text
    alignItems: "center",
    gap: "6px",                   // spacing between icon and text
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // soft shadow
    transition: "background 0.2s ease",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "lightgreen")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
>
  📎 Download {att}
</button>



            </span>
          </li>
        ))}
      </ul>
    </div>
  )}
</MessageBody>

          </>
        )}
      </RightPane>}
      {newMailModal&&<EmailComposeModal
       userEmail={userEmail} 
       userName = {user.name}
        onSent = {fetchMessages}
        onClose = {()=>setNewMailModal(false)}
         prefill={replyData} // ✅ pass reply data into modal
      />}
    </Page>
  );
};

export default EmailPage;
