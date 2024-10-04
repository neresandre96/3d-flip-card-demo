import React, { useState } from "react";
import Card3D from "../3d-flip-card/index.modern.js";
import "../3d-flip-card/card-styles.css";
import ControlPanel from "../control-panel/controlPanel.jsx";
import "./main.css";

const MainContent = () => {
  const [height, setHeight] = useState("250px");
  const [width, setWidth] = useState("200px");
  const [thickness, setThickness] = useState(8);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [hoverToStop, setHoverToStop] = useState(true);
  const [mode, setMode] = useState("clickToFlip");

  return (
    <div className="main">
      <Card3D
        height={height}
        width={width}
        thickness={thickness}
        rotationSpeed={rotationSpeed}
        hoverToStop={hoverToStop}
        mode={mode}
        borderColor="black"
        leftColor="white"
        rightColor="white"
      >
        <div className="card-face-container">
          <h1>Card Front</h1>
          <p>Front content here.</p>
        </div>
        <div className="card-face-container">
          <h1>Card Back</h1>
          <p>Back content here.</p>
        </div>
      </Card3D>

      <div className="pseudo-control-panel"></div>

      <ControlPanel
        setHeight={setHeight}
        height={height}
        setWidth={setWidth}
        width={width}
        setThickness={setThickness}
        thickness={thickness}
        setRotationSpeed={setRotationSpeed}
        rotationSpeed={rotationSpeed}
        setHoverToStop={setHoverToStop}
        hoverToStop={hoverToStop}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};

export default MainContent;
