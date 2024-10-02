import React from 'react';
import Card3D from './dist/index.modern.js';
import './dist/card-styles.css';

const MainContent = () => {
  return (
    <Card3D
      height={350}
      width={200}
      thickness={8}
      rotationSpeed={0.5}
      hoverToStop={true}
      mode="dragToFlip"
      borderColor="black"
    >
      <div>
        <h1>Frente do Card</h1>
        <p>Conteúdo da frente aqui.</p>
      </div>
      <div>
        <h1>Verso do Card</h1>
        <p>Conteúdo do verso aqui.</p>
      </div>
    </Card3D>
  );
};

export default MainContent;
