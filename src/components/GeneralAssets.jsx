import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: green;
  font-weight: 800;
`;

const Label = styled.label`
  font-weight: bold;
  color: green;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background: green;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: darkorange;
  }
`;

const AssetList = styled.div`
  margin-top: 40px;
`;

const AssetItem = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const FileLink = styled.a`
  color: #0077b6;
  text-decoration: underline;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:300;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NewPostButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  background: linear-gradient(90deg, #0cc0e0ff, #119459ff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const GeneralAssets = () => {
  const [assets, setAssets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();

  const fetchAssets = async () => {
    try {
      const res = await axios.get(
        "https://www.cwmsrfupre.com.ng/api/get_general_assets.php"
      );
      if (res.data.success) setAssets(res.data.assets);
    } catch (err) {
      Swal.fire("Error", "Failed to load assets.", "error");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      Swal.fire("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      Swal.fire({ text: "Uploading..." });
      Swal.showLoading();
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/create_general_asset.php",
        formData
      );
      Swal.close();

      if (res.data.success) {
        Swal.fire("Success", "Asset uploaded successfully.", "success");
        setTitle("");
        setDescription("");
        setFile(null);
        setOpenForm(false);
        fetchAssets();
      } else {
        Swal.fire("Error", res.data.error || "Failed to upload.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const deleteAsset = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the asset.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.post(
        "https://www.cwmsrfupre.com.ng/api/delete_general_asset.php",
        { asset_id: id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        Swal.fire("Deleted!", "Asset removed successfully.", "success");
        fetchAssets();
      } else {
        Swal.fire("Error", res.data.error || "Failed to delete.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <Container>
      <Title>General Assets</Title>

     {location.pathname==='/admin'&& <NewPostButton onClick={() => setOpenForm(true)}>
        <FaPlus />
      </NewPostButton>}

      <AssetList>
        {assets.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          assets.map((asset) => (
            <AssetItem key={asset.id}>
              <h3>{asset.title.toUpperCase()}</h3>
              <p>{asset.description}</p>
              {asset.file_url && (
                <FileLink href={asset.file_url} target="_blank">
                  View / Download
                </FileLink>
              )}
              {location.pathname==='/admin'&&<Button
                style={{
                  backgroundColor: "white",
                  color: "green",
                  border: "1px solid green",
                  marginTop: "10px",
                }}
                onClick={() => deleteAsset(asset.id)}
              >
                Delete
              </Button>}
            </AssetItem>
          ))
        )}
      </AssetList>

      {openForm && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setOpenForm(false)}>
              <FaTimes />
            </CloseButton>
            <Title>Upload New Document</Title>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Description</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label>Upload File (PDF, DOC, DOCX)</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default GeneralAssets;
