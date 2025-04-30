import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: green;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 12px;
  background-color: green;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: lightgreen;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${props => props.success ? 'green' : 'red'};
`;

const LinksContainer = styled.div`
  margin-top: 2rem;
`;

const LinkCard = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const MeetingLink = styled.a`
  color: blue;
  word-break: break-all;
`;

const MeetingLinkUploader = () => {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState(null);
  const [meetingLinks, setMeetingLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ text: 'Please wait...' });
    Swal.showLoading();

    try {
      const res = await fetch('https://www.cwmsrfupre.com.ng/api/create_meeting_link.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meeting_link: link }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ text: data.message, success: true });
        setLink('');
        fetchMeetingLinks(); // refresh list
        Swal.fire({ text: 'Uploaded', icon: 'success' });
      } else {
        setMessage({ text: data.error, success: false });
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', success: false });
    }
  };



  
  const fetchMeetingLinks = async () => {
    try {
      const res = await fetch('https://www.cwmsrfupre.com.ng/api/get_all_meeting_links.php');
      const data = await res.json();
      if (data.success) {
        setMeetingLinks(data.meeting_links);
      }
    } catch (error) {
      console.error('Failed to fetch meeting links', error);
    }
  };

  useEffect(() => {
    fetchMeetingLinks();
  }, []);



  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This meeting link will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      const res = await fetch('https://www.cwmsrfupre.com.ng/api/delete_meeting_link.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      const data = await res.json();
      if (data.success) {
        Swal.fire('Deleted!', data.message, 'success');
        fetchMeetingLinks(); // refresh the list
      } else {
        Swal.fire('Error!', data.error, 'error');
      }
    } catch (err) {
      Swal.fire('Network Error', 'Please try again later.', 'error');
    }
  };



  return (
    <Container>
      <Title>Upload Meeting Link</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Paste Google Meet or Zoom link here..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <Button>Submit</Button>
        {message && <Message success={message.success}>{message.text}</Message>}
      </form>

      <LinksContainer>
        <h3>Available Meeting Links</h3>
        {meetingLinks.length === 0 ? (
          <p>No meeting links uploaded yet.</p>
        ) : (
          meetingLinks.map((item) => (
            <LinkCard key={item.id}>
              <p><strong>Date:</strong> {new Date(item.created_at).toLocaleString()}</p>
              <p>
                <MeetingLink href={item.meeting_link} target="_blank" rel="noopener noreferrer">
                  {item.meeting_link}
                </MeetingLink>
              </p>
              <Button onClick={()=>handleDelete(item.id)}>
                Delete
              </Button>
            </LinkCard>
          ))
        )}
      </LinksContainer>
    </Container>
  );
};

export default MeetingLinkUploader;
