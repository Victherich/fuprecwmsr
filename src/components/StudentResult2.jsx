



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


const ScrollWrapper = styled.div`
  overflow-x: auto;          /* Enable horizontal scroll */
  scroll-behavior: smooth;   /* Smooth scrolling */
  width: 100%;               /* Take full width */
  margin-top: 1rem;

  /* Optional: style the scrollbar */
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
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 900px;          /* Ensure scroll appears on smaller screens */

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #eee;
    white-space: nowrap;      /* Prevent cell content from wrapping */
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



    const groupedResults = courses
  .map((course) => {
    const courseResults = results.filter(
      (r) => Number(r.course_id) === Number(course.id)
    );
    if (courseResults.length === 0) return null;

    const getScoreById = (categoryId) => {
      const catResults = courseResults.filter(
        (r) => Number(r.category_id) === Number(categoryId)
      );
      return catResults.reduce(
        (sum, r) => sum + (Number(r.score) || 0),
        0
      );
    };

    const assignment = getScoreById(1);
    const quiz = getScoreById(2);
    const exam = getScoreById(3);
    const total = assignment + quiz + exam;

    return {
      code: course.code,
      title: course.title,
      credit_unit:course.unit,
      assignment,
      quiz,
      exam,
      total,
    };
  })
  .filter(Boolean);


  const grandTotal = groupedResults.reduce((acc, r) => acc + r.total, 0);





  // 🔹 Generate Beautiful PDF with QR code
  
  
const payWithPaystack = (amount, onSuccess) => {
  if (!studentInfo?.email) {
    Swal.fire("Error", "Student email not found.", "error");
    return;
  }

  const handler = window.PaystackPop.setup({
    // key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
    key: "pk_live_3626fe7772aaca28a10724ebb1f9727dfcc5d6cb",
    email: studentInfo.email,
    amount: amount * 100,
    currency: "NGN",
    channels: ["card"],
    // subaccount: 'ACCT_4l1qt6s8whjszwk',  
    // bearer: "account",

    metadata: {
      custom_fields: [
        {
          display_name: "Student Name",
          variable_name: "student_name",
          value: student?.full_name || "Student",
        },
        {
          display_name: "Purpose",
          variable_name: "purpose",
          value: "Result Download",
        },
      ],
    },

    callback: function (response) {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Payment confirmed. Generating your result...",
        timer: 2000,
        showConfirmButton: false,
      });

      // Async verification
      (async () => {
        try {
          const res = await axios.post(
            "https://www.cwmsrfupre.com.ng/api/verify_payment.php",
            { reference: response.reference }
          );

          if (res.data.status === "success") {

              await axios.post(
          "https://www.cwmsrfupre.com.ng/api/log_result_download.php",
          {
            student_id: studentInfo.id,
            level_semester_code: "current", // Or pick from dropdown if multi-semester login
            payment_reference: response.reference,
             amount_paid: amount
          }
        );

            onSuccess();

          } else {
            Swal.fire("Error", "Payment verification failed. Please contact support.", "error");
          }
        } catch (err) {
          Swal.fire("Error", "Could not verify payment. Please try again.", "error");
        }
      })();
    },

    onClose: function () {
      Swal.fire({
        icon: "info",
        title: "Payment Cancelled",
        text: "You must complete payment to download your result.",
      });
    },
  });

  handler.openIframe();
};


  


const generatePDF = async () => {
  if (groupedResults.length === 0) {
    Swal.fire("No results", "You have no results to download.", "info");
    return;
  }

  // --- 1. GRADING LOGIC (Nigerian 5.0 Scale) ---
  const getGradePoint = (score) => {
    if (score >= 70) return 5; // A
    if (score >= 60) return 4; // B
    if (score >= 50) return 3; // C
    if (score >= 45) return 2; // D (Common PG Pass mark)
    return 0; // F
  };

  // --- 2. AUTOMATIC CALCULATIONS ---
  // Current Semester
  const currentTNU = groupedResults.reduce((sum, r) => sum + (Number(r.credit_unit) || 0), 0);
  const currentTCP = groupedResults.reduce((sum, r) => {
    const gp = getGradePoint(Number(r.total) || 0);
    return sum + (gp * (Number(r.credit_unit) || 0));
  }, 0);
  const currentGPA = currentTNU > 0 ? (currentTCP / currentTNU).toFixed(2) : "0.00";

  // Grand Total of all scores
  const grandTotal = groupedResults.reduce((sum, r) => sum + (Number(r.total) || 0), 0);

  // Previous & Cumulative (Assuming data exists in student object)
  const prevTCP = Number(student?.previous_tcp) || 0;
  const prevTNU = Number(student?.previous_tnu) || 0;
  const prevGPA = prevTNU > 0 ? (prevTCP / prevTNU).toFixed(2) : "0.00";

  const cumTCP = currentTCP + prevTCP;
  const cumTNU = currentTNU + prevTNU;
  const cumGPA = cumTNU > 0 ? (cumTCP / cumTNU).toFixed(2) : "0.00";

  // --- 3. PDF INITIALIZATION ---
  const doc = new jsPDF("l", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Logo (Centered)
  const logo = "/logo.png";
  const logoWidth = 50;
  const logoHeight = 50;
  doc.addImage(logo, "PNG", (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);

  // Header Image (Full width)
  const headerImg = "/resultheader.png";
  const headerWidth = pageWidth - 80; 
  const headerHeight = 250; 
  doc.addImage(headerImg, "PNG", 40, 65, headerWidth, headerHeight);

  // Option/Program Title
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`OPTION: ${programName?.toUpperCase() || "WASTE MANAGEMENT"}`, 40, 340);

  // --- 4. TABLE STRUCTURE ---
  const headerRow1 = [
    { content: 'S/N', rowSpan: 2 },
    { content: 'NAME OF CANDIDATE', rowSpan: 2 },
    { content: 'REGISTRATION NUMBER', rowSpan: 2 },
    { content: 'SEX', rowSpan: 2 },
    ...groupedResults.map(r => ({ content: `${r.code}\n(${r.credit_unit || 0})`, rowSpan: 2 })),
    { content: 'CURRENT', colSpan: 3 },
    { content: 'PREVIOUS', colSpan: 3 },
    { content: 'CUMULATIVE', colSpan: 3 }
  ];

  const headerRow2 = [
    'TCP', 'TNU', 'GPA', 
    'TCP', 'TNU', 'GPA', 
    'TCP', 'TNU', 'GPA'
  ];

  const courseTotals = groupedResults.map(r => r.total || "0");

  const rows = [
    [
      "1.", 
      student?.full_name?.toUpperCase() || "—", 
      student?.admission_number || "—", 
      student?.sex || "M", 
      ...courseTotals,
      currentTCP, currentTNU, currentGPA,
      prevTCP, prevTNU, prevGPA,
      cumTCP, cumTNU, cumGPA
    ]
  ];

  // Generate Table with Green Lines
  doc.autoTable({
    head: [headerRow1, headerRow2],
    body: rows,
    startY: 345,
    theme: "grid",
    styles: { 
      fontSize: 7.5, 
      cellPadding: 2, 
      halign: "center", 
      valign: "middle", 
      lineColor: [0, 128, 0], // Green borders
      lineWidth: 0.5,
      textColor: 0
    },
    headStyles: { 
      fillColor: [255, 255, 255], 
      textColor: [0, 0, 0], 
      fontStyle: "bold",
    },
    columnStyles: {
      1: { halign: "left", cellWidth: 90 },
      2: { cellWidth: 70 }
    }
  });

  // --- 5. SUMMARY & SIGNATURES ---
  const finalY = doc.lastAutoTable.finalY + 40;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  doc.text(`SUMMARY: TOTAL: ${grandTotal}    RANGE OF GPA: ${currentGPA}    RANGE OF CGPA: ${cumGPA}`, 40, finalY);

  const sigLineY = finalY + 60;
  doc.setDrawColor(0, 0, 0); 
  doc.setLineWidth(1);
  
  // Left: Director
  doc.line(40, sigLineY, 300, sigLineY);
  doc.text("AG.DIRECTOR: DR AKINYEMI OGUNKEYEDE", 40, sigLineY + 15);

  // Right: Dean
  const rightSigX = pageWidth - 340;
  doc.line(rightSigX, sigLineY, pageWidth - 40, sigLineY);
  doc.text("DEAN, PG SCHOOL: PROF (MRS) J.E. EMUDIANUGHE", rightSigX, sigLineY + 15);

  // --- 6. QR CODE & FOOTER ---
  const verifyLink = "https://www.cwmsrfupre.com.ng/resultverification";
  const qrCodeData = await QRCode.toDataURL(verifyLink);
  const qrSize = 60;
  const qrX = pageWidth - 100;
  const qrY = pageHeight - 85; 

  doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
  doc.setFontSize(8);
  doc.text("(scan to verify)", qrX + (qrSize/2), qrY + qrSize + 10, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, pageHeight - 15, { align: "center" });

  // --- 7. SAVE ---
  doc.save(`Result_${student?.admission_number || "student"}.pdf`);

  Swal.fire({
    icon: "success",
    title: "Download Successful",
    text: "Your result has been Downloaded, Please check your downloads folder.",
  });
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
          {/* <Button onClick={generatePDF}>Download Result</Button> */}
          <Button
  onClick={() =>
    payWithPaystack(5000, generatePDF) // ₦1000 example fee
  }
>
  Download Result (₦5,000)
</Button>

<ScrollWrapper>
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
</ScrollWrapper>
        
        </>
      )}
    </Container>
  );
};

export default StudentResult2;







  
//   const generatePDF = async () => {
//     if (groupedResults.length === 0) {
//       Swal.fire("No results", "You have no results to download.", "info");
//       return;
//     }

//     const doc = new jsPDF("p", "pt", "a4");
//     const pageWidth = doc.internal.pageSize.getWidth();

//     // Logo
//     const logo = "/logo2.png";
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
//     // doc.text(`Level: ${student?.level || "Default"}`, 40, 220);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 40, 220);

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

//     // ✅ Generate and add QR Code
//     const verifyLink = "https://www.cwmsrfupre.com.ng/resultverification";
//     const qrCodeData = await QRCode.toDataURL(verifyLink);
//     const qrSize = 80;
//     const qrX = (pageWidth - qrSize) / 2;
//     const qrY = 720;

//     doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
//     doc.setFontSize(9);
//     doc.setTextColor(80);
//     doc.text("(scan to verify)", pageWidth / 2, qrY + qrSize + 6, {
//       align: "center",
//     });

//     // Footer
//     doc.setFontSize(9);
//     doc.setTextColor(100);
//     doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, 830, {
//       align: "center",
//     });

//     doc.save(`Result_${student?.admission_number || "student"}.pdf`);

//     Swal.fire({
//   icon: "success",
//   title: "Download Successful",
//   text: "Your result has been downloaded successfully. Please check your Downloads folder.",
// });

//   };






// const generatePDF = async () => {
//   if (groupedResults.length === 0) {
//     Swal.fire("No results", "You have no results to download.", "info");
//     return;
//   }

//   // Set orientation to Landscape ('l') to match the wide table requirement
//   const doc = new jsPDF("l", "pt", "a4");
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   // 1. Logo (Centered)
//   const logo = "/logo.png";
//   const logoWidth = 50;
//   const logoHeight = 50;
//   doc.addImage(logo, "PNG", (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);

//   // 2. Header Image (Spans from left to right)
//   const headerImg = "/resultheader.png";
//   const headerWidth = pageWidth - 80; // 40pt margin on each side
//   const headerHeight = 250; 
//   doc.addImage(headerImg, "PNG", 40, 65, headerWidth, headerHeight);

//   // 3. Option/Program Title
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(0, 0, 0);
//   doc.text(`OPTION: ${programName?.toUpperCase() || "WASTE MANAGEMENT"}`, 40, 340);

//   // 4. Prepare Horizontal Table Data
//   const courseHeaders = groupedResults.map(r => `${r.code}\n(${r.credit_unit || 0})`);
  
//   const tableHeaders = [
//     "S/N", 
//     "NAME OF CANDIDATE", 
//     "REGISTRATION NUMBER", 
//     "SEX", 
//     ...courseHeaders,
//     "CURRENT\nTCP, TNU, GPA",
//     "PREVIOUS\nTCP TNU GPA",
//     "CUMULATIVE\nTCP TNU GPA"
//   ];

//   const courseTotals = groupedResults.map(r => r.total || "0");
  
//   const currentStats = `${currentTCP || 0}  ${currentTNU || 0}  ${currentGPA || 0}`;
//   const prevStats = `${prevTCP || 0}  ${prevTNU || 0}  ${prevGPA || 0}`;
//   const cumStats = `${cumTCP || 0}  ${cumTNU || 0}  ${cumGPA || 0}`;

//   const rows = [
//     [
//       "1.", 
//       student?.full_name?.toUpperCase() || "—", 
//       student?.admission_number || "—", 
//       student?.sex || "M", 
//       ...courseTotals,
//       currentStats,
//       prevStats,
//       cumStats
//     ]
//   ];

//   // 5. Generate Table
//   doc.autoTable({
//     head: [tableHeaders],
//     body: rows,
//     startY: 345,
//     theme: "grid",
//     styles: { 
//       fontSize: 8, 
//       cellPadding: 3, 
//       halign: "center", 
//       valign: "middle", 
//       lineColor: [0, 128, 0], // Green lines
//       lineWidth: 0.5,
//       textColor: 0
//     },
//     headStyles: { 
//       fillColor: [255, 255, 255], 
//       textColor: [0, 0, 0], 
//       fontStyle: "bold",
//       fontSize: 7 
//     },
//     columnStyles: {
//       1: { halign: "left", cellWidth: 100 },
//       2: { cellWidth: 80 }
//     }
//   });

//   // --- ADDED SUMMARY AND SIGNATURE DETAILS ---
//   const finalY = doc.lastAutoTable.finalY + 40;
//   doc.setFontSize(10);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(0, 0, 0);

//   // Summary Row
//   doc.text(`SUMMARY: TOTAL: ${grandTotal || 0}    RANGE OF GPA: ${currentGPA || 0}    RANGE OF CGPA: ${cumGPA || 0}`, 40, finalY);

//   // Signature Lines
//   const sigLineY = finalY + 60;
//   doc.setDrawColor(0, 0, 0); // Black lines for signatures
//   doc.setLineWidth(1);
  
//   // Left Signature (Director)
//   doc.line(40, sigLineY, 300, sigLineY);
//   doc.text("AG.DIRECTOR: DR AKINYEMI OGUNKEYEDE", 40, sigLineY + 15);

//   // Right Signature (Dean)
//   const rightSigX = pageWidth - 340;
//   doc.line(rightSigX, sigLineY, pageWidth - 40, sigLineY);
//   doc.text("DEAN, PG SCHOOL: PROF (MRS) J.E. EMUDIANUGHE", rightSigX, sigLineY + 15);
//   // ------------------------------------------

// // 6. QR Code (Shifted further down)
//   const verifyLink = "https://www.cwmsrfupre.com.ng/resultverification";
//   const qrCodeData = await QRCode.toDataURL(verifyLink);
//   const qrSize = 60;
//   const qrX = pageWidth - 100;
  
//   // Changed qrY from 'pageHeight - 100' to 'pageHeight - 85' to shift it down
//   const qrY = pageHeight - 85; 

//   doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
//   doc.setFontSize(8);
//   // The text is automatically positioned relative to the new qrY
//   doc.text("(scan to verify)", qrX + (qrSize/2), qrY + qrSize + 10, { align: "center" });

//   // 7. Footer (Positioned at the very bottom)
//   doc.setFontSize(9);
//   doc.setTextColor(100);
//   doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, pageHeight - 15, { align: "center" });

//   doc.save(`Result_${student?.admission_number || "student"}.pdf`);

//   Swal.fire({
//     icon: "success",
//     title: "Download Successful",
//     text: "The landscape horizontal result has been generated.",
//   });
// };







// const generatePDF = async () => {
//   if (groupedResults.length === 0) {
//     Swal.fire("No results", "You have no results to download.", "info");
//     return;
//   }

//   // Set orientation to Landscape ('l') to match the wide table requirement
//   const doc = new jsPDF("l", "pt", "a4");
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   // 1. Logo (Centered)
//   const logo = "/logo.png";
//   const logoWidth = 50;
//   const logoHeight = 50;
//   doc.addImage(logo, "PNG", (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);

//   // 2. Header Image (Spans from left to right)
//   const headerImg = "/resultheader.png";
//   const headerWidth = pageWidth - 80; 
//   const headerHeight = 250; 
//   doc.addImage(headerImg, "PNG", 40, 65, headerWidth, headerHeight);

//   // 3. Option/Program Title
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(0, 0, 0);
//   doc.text(`OPTION: ${programName?.toUpperCase() || "WASTE MANAGEMENT"}`, 40, 340);

//   // 4. Prepare Horizontal Table Data with Sub-Headers
//   const headerRow1 = [
//     { content: 'S/N', rowSpan: 2 },
//     { content: 'NAME OF CANDIDATE', rowSpan: 2 },
//     { content: 'REGISTRATION NUMBER', rowSpan: 2 },
//     { content: 'SEX', rowSpan: 2 },
//     ...groupedResults.map(r => ({ content: `${r.code}\n(${r.credit_unit || 0})`, rowSpan: 2 })),
//     { content: 'CURRENT', colSpan: 3 },
//     { content: 'PREVIOUS', colSpan: 3 },
//     { content: 'CUMULATIVE', colSpan: 3 }
//   ];

//   const headerRow2 = [
//     'TCP', 'TNU', 'GPA', 
//     'TCP', 'TNU', 'GPA', 
//     'TCP', 'TNU', 'GPA'
//   ];

//   const courseTotals = groupedResults.map(r => r.total || "0");

//   const rows = [
//     [
//       "1.", 
//       student?.full_name?.toUpperCase() || "—", 
//       student?.admission_number || "—", 
//       student?.sex || "M", 
//       ...courseTotals,
//       currentTCP || 0, currentTNU || 0, currentGPA || 0,
//       prevTCP || 0, prevTNU || 0, prevGPA || 0,
//       cumTCP || 0, cumTNU || 0, cumGPA || 0
//     ]
//   ];

//   // 5. Generate Table
//   doc.autoTable({
//     head: [headerRow1, headerRow2],
//     body: rows,
//     startY: 345,
//     theme: "grid",
//     styles: { 
//       fontSize: 7.5, // Adjusted to fit more sub-columns
//       cellPadding: 2, 
//       halign: "center", 
//       valign: "middle", 
//       lineColor: [0, 128, 0], // Green lines
//       lineWidth: 0.5,
//       textColor: 0
//     },
//     headStyles: { 
//       fillColor: [255, 255, 255], 
//       textColor: [0, 0, 0], 
//       fontStyle: "bold",
//     },
//     columnStyles: {
//       1: { halign: "left", cellWidth: 90 },
//       2: { cellWidth: 70 }
//     }
//   });

//   // --- ADDED SUMMARY AND SIGNATURE DETAILS ---
//   const finalY = doc.lastAutoTable.finalY + 40;
//   doc.setFontSize(10);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(0, 0, 0);

//   // Summary Row
//   doc.text(`SUMMARY: TOTAL: ${grandTotal || 0}    RANGE OF GPA: ${currentGPA || 0}    RANGE OF CGPA: ${cumGPA || 0}`, 40, finalY);

//   // Signature Lines
//   const sigLineY = finalY + 60;
//   doc.setDrawColor(0, 0, 0); 
//   doc.setLineWidth(1);
  
//   // Left Signature (Director)
//   doc.line(40, sigLineY, 300, sigLineY);
//   doc.text("AG.DIRECTOR: DR AKINYEMI OGUNKEYEDE", 40, sigLineY + 15);

//   // Right Signature (Dean)
//   const rightSigX = pageWidth - 340;
//   doc.line(rightSigX, sigLineY, pageWidth - 40, sigLineY);
//   doc.text("DEAN, PG SCHOOL: PROF (MRS) J.E. EMUDIANUGHE", rightSigX, sigLineY + 15);

//   // 6. QR Code (Shifted further down)
//   const verifyLink = "https://www.cwmsrfupre.com.ng/resultverification";
//   const qrCodeData = await QRCode.toDataURL(verifyLink);
//   const qrSize = 60;
//   const qrX = pageWidth - 100;
//   const qrY = pageHeight - 85; 

//   doc.addImage(qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
//   doc.setFontSize(8);
//   doc.text("(scan to verify)", qrX + (qrSize/2), qrY + qrSize + 10, { align: "center" });

//   // 7. Footer
//   doc.setFontSize(9);
//   doc.setTextColor(100);
//   doc.text("Generated by CWMSRFUPRE Portal", pageWidth / 2, pageHeight - 15, { align: "center" });

//   doc.save(`Result_${student?.admission_number || "student"}.pdf`);

//   Swal.fire({
//     icon: "success",
//     title: "Download Successful",
//     text: "The landscape horizontal result has been generated.",
//   });
// };






// const payWithPaystack = (amount, onSuccess) => {
//   const handler = window.PaystackPop.setup({
//     // key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
//      key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
//     email: studentInfo?.email,
//     amount: amount * 100, // kobo
//     currency: "NGN",
//     channels: ["card"],

//     metadata: {
//       custom_fields: [
//         {
//           display_name: "Student Name",
//           variable_name: "student_name",
//           value: student?.full_name || "Student",
//         },
//         {
//           display_name: "Purpose",
//           variable_name: "purpose",
//           value: "Result Download",
//         },
//       ],
//     },

//     callback: function (response) {
//       Swal.fire({
//         icon: "success",
//         title: "Payment Successful",
//         text: "Payment confirmed. Generating your result...",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       onSuccess(); // ✅ proceed to PDF generation
//     },

//     onClose: function () {
//       Swal.fire({
//         icon: "info",
//         title: "Payment Cancelled",
//         text: "You must complete payment to download your result.",
//       });
//     },
//   });

//   handler.openIframe();
// };






