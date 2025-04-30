import React, { useState } from "react";
import "../CSS/GalleryComponent.css"; // Import CSS file
import img1 from "../Images/gl1.jpeg";
import img2 from "../Images/gl2.jpeg";
import img3 from "../Images/gl3.jpeg";
import img4 from "../Images/gl4.jpeg";
import img5 from "../Images/gl5.jpeg";
import img6 from "../Images/gl6.jpg";
import { useNavigate } from "react-router-dom";

const images = [img1, img2, img3, img4, img5, img6];

const GalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()

  return (
    <div className="gallery-section">
      <h2 className="gallery-title">Artistic Gallery</h2>
      <p>(Click image to Enlarge)</p>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className={`gallery-item item-${index + 1}`} onClick={() => setSelectedImage(image)}>
            <img src={image} alt={`Gallery ${index + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>

      <button className="view-more-btn" onClick={() =>navigate( "/gallery")}>View More</button>

      {selectedImage && (
        <div className="fullscreen-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full-Screen" className="fullscreen-img" />
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
