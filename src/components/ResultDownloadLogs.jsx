// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import Swal from "sweetalert2";

// const Container = styled.div`
//   padding: 2rem;
//   font-family: Arial, sans-serif;
// `;

// const Title = styled.h2`
//   text-align: center;
//   color: green;
//   margin-bottom: 2rem;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   th, td {
//     padding: 10px;
//     border: 1px solid #ccc;
//     text-align: left;
//     font-size: 14px;
//   }

//   th {
//     background-color: green;
//     color: white;
//   }

//   tr:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `;

// const Message = styled.p`
//   text-align: center;
//   color: #555;
// `;

// const ResultDownloadLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   console.log(logs)

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await axios.get("https://www.cwmsrfupre.com.ng/api/get_result_download_logs.php?t=" + Date.now());
//         if (res.data.success) {
//           setLogs(res.data.logs);
//         } else {
//           Swal.fire("Error", res.data.error || "Failed to fetch logs.", "error");
//         }
//       } catch (err) {
//         Swal.fire("Error", "Could not connect to server.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLogs();
//   }, []);

//   if (loading) return <Message>Loading logs...</Message>;
//   if (!logs.length) return <Message>No result download logs available.</Message>;

//   return (
//     <Container>
//       <Title>Student Result Download Logs</Title>
//       <Table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Student Name</th>
//             <th>Email</th>
//             {/* <th>Email2</th> */}
//             <th>Admission No</th>
//             {/* <th>Program</th> */}
//             {/* <th>Level/Semester</th> */}
//             <th>Payment Reference</th>
//             <th>Amount Paid (₦)</th>
//             <th>Downloaded At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs?.map((log, index) => (
//             <tr key={log.id}>
//               <td>{index + 1}</td>
//               <td>{log.full_name}</td>
//               <td>{log.email}</td>
//               {/* <td>{log.email2}</td> */}
//               <td>{log.admission_number}</td>
//               {/* <td>{log.program}</td> */}
//               {/* <td>{log.result_for_level_semester}</td> */}
//               <td>{log.payment_reference || "—"}</td>
//               <td>{log.amount_paid}</td>
//               <td>{new Date(log.downloaded_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ResultDownloadLogs;





import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 1rem;
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
  position: relative;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px; /* Ensure it overflows if viewport is smaller */

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
    font-size: 14px;
    white-space: nowrap; /* Prevent wrapping */
  }

  th {
    background-color: green;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #555;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 128, 0, 0.8);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
  z-index: 10;
  &:hover {
    background-color: green;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

const RightArrow = styled(ArrowButton)`
  right: 0;
`;

const ResultDownloadLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          "https://www.cwmsrfupre.com.ng/api/get_result_download_logs.php?t=" +
            Date.now()
        );
        if (res.data.success) {
          setLogs(res.data.logs);
        } else {
          Swal.fire("Error", res.data.error || "Failed to fetch logs.", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Could not connect to server.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return <Message>Loading logs...</Message>;
  if (!logs.length) return <Message>No result download logs available.</Message>;

  return (
    <Container>
      <Title>Student Result Download Logs</Title>

      <LeftArrow onClick={() => scroll("left")}>&#8592;</LeftArrow>
      <RightArrow onClick={() => scroll("right")}>&#8594;</RightArrow>

      <ScrollWrapper ref={scrollRef}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              {/* <th>Email2</th> */}
              <th>Admission No</th>
              {/* <th>Program</th> */}
              {/* <th>Level/Semester</th> */}
              <th>Payment Reference</th>
              <th>Amount Paid (₦)</th>
              <th>Downloaded At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.full_name}</td>
                <td>{log.email}</td>
                {/* <td>{log.email2}</td> */}
                <td>{log.admission_number}</td>
                {/* <td>{log.program}</td> */}
                {/* <td>{log.result_for_level_semester}</td> */}
                <td>{log.payment_reference || "—"}</td>
                <td>{log.amount_paid}</td>
                <td>{new Date(log.downloaded_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Container>
  );
};

export default ResultDownloadLogs;
