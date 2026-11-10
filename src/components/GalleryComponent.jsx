import React, { useState } from "react";
import "../CSS/GalleryComponent.css"; // Import CSS file
import img1 from "../Images/gl1.jpeg";
import img2 from "../Images/gl2.jpeg";
import img3 from "../Images/gl3.jpeg";
import img4 from "../Images/gl4.jpeg";
import img5 from "../Images/gl5.jpeg";
import img6 from "../Images/gl6.jpg";
import HeroImg1 from "../Images3/im1.jpeg";
import HeroImg2 from "../Images3/im2.jpeg";
import HeroImg3 from "../Images3/im3.jpeg";
import HeroImg4 from "../Images3/im4.jpeg";
import HeroImg5 from "../Images3/im5.jpeg";
import HeroImg6 from "../Images3/im6.jpeg";
import HeroImg7 from "../Images3/im7.jpeg";
import HeroImg8 from "../Images3/im8.jpeg";
import HeroImg9 from "../Images3/im9.jpeg";
import HeroImg10 from "../Images3/im10.jpeg";
import HeroImg11 from "../Images3/im11.jpeg";
import HeroImg12 from "../Images3/im12.jpeg";
import HeroImg13 from "../Images3/im13.jpeg";
import HeroImg14 from "../Images3/im14.jpeg";
import HeroImg15 from "../Images3/im15.jpeg";
import HeroImg16 from "../Images3/im16.jpeg";
import HeroImg17 from "../Images3/im17.jpeg";
import HeroImg18 from "../Images3/im18.jpeg";
import HeroImg19 from "../Images3/im19.jpeg";
import HeroImg20 from "../Images3/im20.jpeg";
import HeroImg21 from "../Images3/im21.jpeg";
import HeroImg22 from "../Images3/im22.jpeg";
import HeroImg23 from "../Images3/im23.jpeg";
import HeroImg24 from "../Images3/im24.jpeg";
import HeroImg25 from "../Images3/im25.jpeg";
import HeroImg26 from "../Images3/im26.jpeg";
import HeroImg27 from "../Images3/im27.jpeg";
import HeroImg28 from "../Images3/im28.jpeg";
import HeroImg29 from "../Images3/im29.jpeg";
import HeroImg30 from "../Images3/im30.jpeg";
import HeroImg31 from "../Images3/im31.jpeg";
import HeroImg32 from "../Images3/im32.jpeg";
import HeroImg33 from "../Images3/im33.jpeg";
import HeroImg34 from "../Images3/im34.jpeg";
import HeroImg35 from "../Images3/im35.jpeg";
import HeroImg36 from "../Images3/im36.jpeg";
import HeroImg37 from "../Images3/im37.jpeg";
import { useNavigate } from "react-router-dom";


const images = [
  img1, img2, img3, img4, img5, img6,
  HeroImg1,
  HeroImg2,
  HeroImg3,
  HeroImg4,
  HeroImg5,
  HeroImg6,
  HeroImg7,
  HeroImg8,
  HeroImg9,
  HeroImg10,
  HeroImg11,
  HeroImg12,
  HeroImg13,
  HeroImg14,
  HeroImg15,
  HeroImg16,
  HeroImg17,
  HeroImg18,
  HeroImg19,
  HeroImg20,
  HeroImg21,
  HeroImg22,
  HeroImg23,
  HeroImg24,
  HeroImg25,
  HeroImg26,
  HeroImg27,
  HeroImg28,
  HeroImg29,
  HeroImg30,
  HeroImg31,
  HeroImg32,
  HeroImg33,
  HeroImg34,
  HeroImg35,
  HeroImg36,
  HeroImg37
];

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
