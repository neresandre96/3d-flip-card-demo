import React from "react";
import PropTypes from "prop-types";
import CardSpin from "./cardSpin";

/**
 * Card3D Component
 *
 * A functional component that represents a 3D card that can flip
 * to reveal content on either side. The card supports different
 * interaction modes, including dragging and clicking to flip.
 * The card's appearance can be customized with various styles
 * including colors and dimensions.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode[]} props.children - The content to be displayed on the front and back of the card.
 * @param {number} props.height - The height of the card (CSS units like '200px', '100%').
 * @param {number} props.width - The width of the card (CSS units like '200px', '100%').
 * @param {number} props.thickness - The thickness of the card (in pixels).
 * @param {number} [props.rotationSpeed=0] - The speed of rotation (degrees per frame). Applies only in "dragToFlip" mode.
 * @param {boolean} [props.hoverToStop=false] - If true, the card's rotation stops when hovered over.
 * @param {"dragToFlip"|"clickToFlip"} props.mode - The interaction mode for flipping the card.
 * @param {string} props.leftColor - The background color for the left side of the card.
 * @param {string} props.rightColor - The background color for the right side of the card.
 *
 * @returns {JSX.Element} The rendered Card component.
 */
const Card3D = ({
  children,
  height,
  width,
  thickness,
  rotationSpeed,
  hoverToStop,
  mode,
  leftColor,
  rightColor,
}) => {
  if (children.length !== 2) {
    console.warn("Card component expects exactly two children.");
    return;
  }
  const halfThickness = thickness / 2;
  const isDragToFlip = mode === "dragToFlip";
  const isClickToFlip = mode === "clickToFlip";
  const effectiveRotationSpeed = isClickToFlip ? 0 : rotationSpeed;

  const frontStyle = {
    transform: `rotateY(0deg) translateZ(${halfThickness}px)`,
    background: "red",
  };

  const backStyle = {
    transform: `rotateY(180deg) translateZ(${halfThickness}px)`,
    background: "blue",
  };

  const leftSideStyle = {
    width: `${thickness}px`,
    left: `-${halfThickness}px`,
    backgroundColor: leftColor,
  };

  const rightSideStyle = {
    width: `${thickness}px`,
    right: `-${halfThickness}px`,
    backgroundColor: rightColor,
  };

  return (
    <div className="card-container" role="button" tabIndex={0}>
      <CardSpin
        height={height}
        width={width}
        rotationSpeed={effectiveRotationSpeed}
        draggable={isDragToFlip}
        hoverToStop={hoverToStop}
        clickToFlip={isClickToFlip}
      >
        <div className="card-face card-front" style={frontStyle}>
          {children[0]}
        </div>

        <div className="card-face card-back" style={backStyle}>
          {children[1]}
        </div>

        <div className="card-side card-side-left" style={leftSideStyle}></div>
        <div className="card-side card-side-right" style={rightSideStyle}></div>
      </CardSpin>
    </div>
  );
};

Card3D.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  rotationSpeed: PropTypes.number,
  hoverToStop: PropTypes.bool,
  mode: PropTypes.oneOf(["dragToFlip", "clickToFlip"]).isRequired,
  leftColor: PropTypes.string.isRequired,
  rightColor: PropTypes.string.isRequired,
};

Card3D.displayName = "Card3D";

export default Card3D;
