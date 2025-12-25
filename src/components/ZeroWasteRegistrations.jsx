
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

/* ---------- styles ---------- */
const Page = styled.div`
  padding: 40px 20px;
  font-family: "Poppins", sans-serif;
  background: #f0fdf4;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #166534;
  margin-bottom: 30px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(20, 83, 45, 0.15);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 14px;
  background: #166534;
  color: white;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px 14px;
  border-bottom: 1px solid #dcfce7;
  color: #14532d;
`;

const Empty = styled.p`
  text-align: center;
  color: #166534;
  margin-top: 40px;
`;

/* ---------- component ---------- */
export default function ZeroWasteRegistrations() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: "Loading registrations...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const res = await fetch(
          "https://cwmsrfupre.com.ng/api/get_zero_waste_registrations.php"
        );

        const data = await res.json();

        if (data.success) {
          setStudents(data.data);
          Swal.close();
        } else {
          Swal.fire("Error", data.message, "error");
        }
      } catch (err) {
        Swal.fire(
          "Network Error",
          "Unable to fetch registrations",
          "error"
        );
      }
    };

    fetchData();
  }, []);

  return (
    <Page>
      <Title>Zero Waste Club Registrations</Title>

      {students.length === 0 ? (
        <Empty>No registrations found.</Empty>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Department</Th>
                <Th>Level</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id}>
                  <Td>{i + 1}</Td>
                  <Td>{s.name}</Td>
                  <Td>{s.email}</Td>
                  <Td>{s.phone}</Td>
                  <Td>{s.department}</Td>
                  <Td>{s.level}</Td>
                  <Td>
                    {new Date(s.created_at).toLocaleDateString()}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Page>
  );
}
