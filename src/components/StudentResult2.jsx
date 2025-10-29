





// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { Context } from "./Context";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const Container = styled.div`
//   padding: 2rem 1rem;
//   background-color: #f9fff9;
//   min-height: 100vh;
//   font-family: "Arial", sans-serif;
// `;

// const Title = styled.h2`
//   color: green;
//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

//   th,
//   td {
//     padding: 0.8rem;
//     text-align: left;
//     border-bottom: 1px solid #eee;
//   }

//   th {
//     background-color: #008000;
//     color: white;
//     text-transform: uppercase;
//     font-size: 0.9rem;
//   }

//   tr:hover {
//     background-color: #f0fdf4;
//   }
// `;

// const Message = styled.p`
//   text-align: center;
//   color: #555;
// `;

// const Button = styled.button`
//   background-color: #008000;
//   color: white;
//   border: none;
//   padding: 0.8rem 1.5rem;
//   border-radius: 6px;
//   font-weight: bold;
//   cursor: pointer;
//   margin: 1rem 0;
//   transition: background 0.3s;

//   &:hover {
//     background-color: #006400;
//   }
// `;

// const StudentResult2 = () => {
//   const studentInfo = useSelector((state) => state.studentInfo);
//   const studentId = studentInfo?.id;
//   const { courses, categories, programs } = useContext(Context);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [student, setStudent] = useState(null);

//   console.log(results)

//   // 🔹 Fetch student details
//   useEffect(() => {
//     if (!studentId) return;
//     axios
//       .get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
//       .then((res) => {
//         if (res.data.success) setStudent(res.data.student);
//       })
//       .catch(() => Swal.fire("Error", "Failed to fetch student details", "error"));
//   }, [studentId]);

//   // 🔹 Fetch results
//   useEffect(() => {
//     if (!studentId) return;
//     const fetchResults = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `https://www.cwmsrfupre.com.ng/api/get_student_results.php`,
//           { params: { student_id: studentId, t: Date.now() } }
//         );
//         if (res.data.success) setResults(res.data.results || []);
//         else Swal.fire("Error", res.data.error || "Failed to fetch results.", "error");
//       } catch {
//         Swal.fire("Error", "Could not connect to the server.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, [studentId]);

//   const programName =
//     programs.find((p) => p.id === Number(student?.program))?.name || "—";

//   // 🔹 Group scores by course
//  // 🔹 Group scores by course
// const groupedResults = courses
//   .map((course) => {
//     const courseResults = results.filter(
//       (r) => Number(r.course_id) === Number(course.id)
//     );
//     if (courseResults.length === 0) return null;

//     // ✅ Sum all submissions for each category
//     const getScore = (catName) => {
//       const cat = categories.find(
//         (c) => c.name.toLowerCase() === catName.toLowerCase()
//       );
//       if (!cat) return 0;
//       const catResults = courseResults.filter(
//         (r) => Number(r.category_id) === Number(cat.id)
//       );
//       return catResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
//     };

//     const assignment = getScore("assignment");
//     const quiz = getScore("quiz");
//     const exam = getScore("exam");
//     const total = assignment + quiz + exam;

//     return {
//       code: course.code,
//       title: course.title,
//       assignment,
//       quiz,
//       exam,
//       total,
//     };
//   })
//   .filter(Boolean);


//   const grandTotal = groupedResults.reduce((acc, r) => acc + r.total, 0);

//   // 🔹 Generate Beautiful PDF
//   const generatePDF = () => {
//     if (groupedResults.length === 0) {
//       Swal.fire("No results", "You have no results to download.", "info");
//       return;
//     }

//     const doc = new jsPDF("p", "pt", "a4");
//     const pageWidth = doc.internal.pageSize.getWidth();

//     // Centered logo
//     const logo = "/logo2.png"; // ensure this exists in /public
//     const logoWidth = 300;
//     const logoHeight = 60;
//     const logoX = (pageWidth - logoWidth) / 2;
//     doc.addImage(logo, "PNG", logoX, 40, logoWidth, logoHeight);

//     // Title
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(0, 128, 0);
//     doc.text("STUDENT RESULT", pageWidth / 2, 130, { align: "center" });

//     // Student info
//     doc.setFontSize(11);
//     doc.setTextColor(0, 128, 0);
//     doc.text(`Name: ${student?.full_name || "—"}`, 40, 160);
//     doc.text(`Admission No: ${student?.admission_number || "—"}`, 40, 180);
//     doc.text(`Program: ${programName}`, 40, 200);
//     doc.text(`Level: ${student?.level || "Default"}`, 40, 220);
//     doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 40, 240);

//     // Table
//     const columns = ["S/N", "Course", "Assignment", "Quiz", "Exam", "Total"];
//     const rows = groupedResults.map((r, i) => [
//       i + 1,
//       `${r.code} - ${r.title}`,
//       r.assignment,
//       r.quiz,
//       r.exam,
//       r.total,
//     ]);

//     doc.autoTable({
//       head: [columns],
//       body: rows,
//       startY: 270,
//       theme: "grid",
//       headStyles: { fillColor: [0, 128, 0], textColor: 255 },
//       bodyStyles: { textColor: 20 },
//       styles: { fontSize: 10, halign: "center" },
//       columnStyles: { 1: { halign: "left", cellWidth: 180 } },
//       alternateRowStyles: { fillColor: [245, 255, 245] },
//     });

//     const finalY = doc.lastAutoTable.finalY + 30;
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(0, 128, 0);
//     doc.text(`GRAND TOTAL: ${grandTotal}`, 40, finalY);
//     doc.text(
//       `AVERAGE: ${(grandTotal / groupedResults.length).toFixed(2)}%`,
//       250,
//       finalY
//     );

//     doc.setFontSize(9);
//     doc.setTextColor(100);
//     doc.text("Generated by CWMSRFUPRE Portal", 200, 820);

//     doc.save(`Result_${student?.admission_number || "student"}.pdf`);
//   };

//   return (
//     <Container>
//       <Title>My Results</Title>

//       {loading ? (
//         <Message>Loading results...</Message>
//       ) : groupedResults.length === 0 ? (
//         <Message>No results available yet.</Message>
//       ) : (
//         <>
//           <Button onClick={generatePDF}>Download Result as PDF</Button>

//           <Table>
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Assignment</th>
//                 <th>Quiz</th>
//                 <th>Exam</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {groupedResults.map((r, i) => (
//                 <tr key={i}>
//                   <td>{`${r.code} - ${r.title}`}</td>
//                   <td>{r.assignment}</td>
//                   <td>{r.quiz}</td>
//                   <td>{r.exam}</td>
//                   <td>
//                     <strong style={{ color: "green" }}>{r.total}</strong>
//                   </td>
//                 </tr>
//               ))}
//               <tr style={{ background: "#e9fce9", fontWeight: "bold" }}>
//                 <td colSpan="4" style={{ textAlign: "right" }}>
//                   Grand Total
//                 </td>
//                 <td>{grandTotal}</td>
//               </tr>
//             </tbody>
//           </Table>
//         </>
//       )}
//     </Container>
//   );
// };

// export default StudentResult2;







import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Context } from "./Context";
import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode"; // ✅ Import QRCode

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: #f9fff9;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  color: green;
  text-align: center;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #008000;
    color: white;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  tr:hover {
    background-color: #f0fdf4;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #555;
`;

const Button = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin: 1rem 0;
  transition: background 0.3s;

  &:hover {
    background-color: #006400;
  }
`;

const StudentResult2 = () => {
  const studentInfo = useSelector((state) => state.studentInfo);
  const studentId = studentInfo?.id;
  const { courses, categories, programs } = useContext(Context);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  // 🔹 Fetch student details
  useEffect(() => {
    if (!studentId) return;
    axios
      .get(`https://www.cwmsrfupre.com.ng/api/get_student_by_id.php?id=${studentId}`)
      .then((res) => {
        if (res.data.success) setStudent(res.data.student);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch student details", "error"));
  }, [studentId]);

  // 🔹 Fetch results
  useEffect(() => {
    if (!studentId) return;
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.cwmsrfupre.com.ng/api/get_student_results.php`,
          { params: { student_id: studentId, t: Date.now() } }
        );
        if (res.data.success) setResults(res.data.results || []);
        else Swal.fire("Error", res.data.error || "Failed to fetch results.", "error");
      } catch {
        Swal.fire("Error", "Could not connect to the server.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [studentId]);

  const programName =
    programs.find((p) => p.id === Number(student?.program))?.name || "—";

  // 🔹 Group scores by course
  const groupedResults = courses
    .map((course) => {
      const courseResults = results.filter(
        (r) => Number(r.course_id) === Number(course.id)
      );
      if (courseResults.length === 0) return null;

      const getScore = (catName) => {
        const cat = categories.find(
          (c) => c.name.toLowerCase() === catName.toLowerCase()
        );
        if (!cat) return 0;
        const catResults = courseResults.filter(
          (r) => Number(r.category_id) === Number(cat.id)
        );
        return catResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
      };

      const assignment = getScore("assignment");
      const quiz = getScore("quiz");
      const exam = getScore("exam");
      const total = assignment + quiz + exam;

      return {
        code: course.code,
        title: course.title,
        assignment,
        quiz,
        exam,
        total,
      };
    })
    .filter(Boolean);

  const grandTotal = groupedResults.reduce((acc, r) => acc + r.total, 0);

  // 🔹 Generate Beautiful PDF with QR code
  const generatePDF = async () => {
    if (groupedResults.length === 0) {
      Swal.fire("No results", "You have no results to download.", "info");
      return;
    }

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Logo
    const logo = "/logo2.png";
    const logoWidth = 300;
    const logoHeight = 60;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logo, "PNG", logoX, 40, logoWidth, logoHeight);

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text("STUDENT RESULT", pageWidth / 2, 130, { align: "center" });

    // Student info
    doc.setFontSize(11);
    doc.setTextColor(0, 128, 0);
    doc.text(`Name: ${student?.full_name || "—"}`, 40, 160);
    doc.text(`Admission No: ${student?.admission_number || "—"}`, 40, 180);
    doc.text(`Program: ${programName}`, 40, 200);
    // doc.text(`Level: ${student?.level || "Default"}`, 40, 220);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 40, 220);

    // Table
    const columns = ["S/N", "Course", "Assignment", "Quiz", "Exam", "Total"];
    const rows = groupedResults.map((r, i) => [
      i + 1,
      `${r.code} - ${r.title}`,
      r.assignment,
      r.quiz,
      r.exam,
      r.total,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 270,
      theme: "grid",
      headStyles: { fillColor: [0, 128, 0], textColor: 255 },
      bodyStyles: { textColor: 20 },
      styles: { fontSize: 10, halign: "center" },
      columnStyles: { 1: { halign: "left", cellWidth: 180 } },
      alternateRowStyles: { fillColor: [245, 255, 245] },
    });

    const finalY = doc.lastAutoTable.finalY + 30;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text(`GRAND TOTAL: ${grandTotal}`, 40, finalY);
    doc.text(
      `AVERAGE: ${(grandTotal / groupedResults.length).toFixed(2)}%`,
      250,
      finalY
    );

    // ✅ Generate and add QR Code
    const verifyLink = "https://www.cwmsrfupre.com.ng/resultverification";
    const qrCodeData = await QRCode.toDataURL(verifyLink);
    const qrSize = 80;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = 720;

    doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text("(scan to verify)", pageWidth / 2, qrY + qrSize + 6, {
      align: "center",
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, 830, {
      align: "center",
    });

    doc.save(`Result_${student?.admission_number || "student"}.pdf`);
  };

  return (
    <Container>
      <Title>My Results</Title>

      {loading ? (
        <Message>Loading results...</Message>
      ) : groupedResults.length === 0 ? (
        <Message>No results available yet.</Message>
      ) : (
        <>
          <Button onClick={generatePDF}>Download Result as PDF</Button>

          <Table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Assignment</th>
                <th>Quiz</th>
                <th>Exam</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {groupedResults.map((r, i) => (
                <tr key={i}>
                  <td>{`${r.code} - ${r.title}`}</td>
                  <td>{r.assignment}</td>
                  <td>{r.quiz}</td>
                  <td>{r.exam}</td>
                  <td>
                    <strong style={{ color: "green" }}>{r.total}</strong>
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#e9fce9", fontWeight: "bold" }}>
                <td colSpan="4" style={{ textAlign: "right" }}>
                  Grand Total
                </td>
                <td>{grandTotal}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default StudentResult2;
