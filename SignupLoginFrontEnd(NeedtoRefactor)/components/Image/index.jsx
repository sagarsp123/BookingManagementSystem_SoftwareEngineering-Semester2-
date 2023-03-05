import React from "react";
import "./Image.css";

function Image(props) {
  const { image, birdLogo2, birdLogo3, birdLogo4 } = props;

  return (
    <div className="image" style={{ backgroundImage: `url(${image})` }}>
      <img className="bird-logo-2" src={birdLogo2} alt="Bird Logo 2" />
      <img className="bird-logo-3" src={birdLogo3} alt="Bird Logo 3" />
      <img className="bird-logo-4" src={birdLogo4} alt="Bird Logo 4" />
    </div>
  );
}

export default Image;
