import React, { useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useCardSpin } from "./useCardSpin";

/**
 * CardSpin Component
 *
 * A functional component that renders a card with 3D rotation effects based
 * on user interactions. The card can spin automatically, be dragged for
 * manual rotation, and can be flipped on click. It utilizes the
 * `useCardSpin` custom hook to manage rotation behavior.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {number} props.height - The height of the card (CSS units like '200px', '100%').
 * @param {number} props.width - The width of the card (CSS units like '200px', '100%').
 * @param {number} [props.rotationSpeed=0] - The speed of automatic rotation (degrees per frame).
 * @param {boolean} [props.draggable=false] - If true, the card can be dragged to rotate it.
 * @param {boolean} [props.hoverToStop=false] - If true, the rotation stops when the card is hovered.
 * @param {boolean} [props.clickToFlip=false] - If true, the card flips on click.
 * @param {Object} [props.rest] - Any additional props to be passed to the card element.
 *
 * @returns {JSX.Element} The rendered CardSpin component.
 */
const CardSpin = ({
  children,
  height,
  width,
  rotationSpeed,
  draggable,
  hoverToStop,
  clickToFlip,
  ...props
}) => {
  const cardRef = useRef(null);
  const {
    dragging,
    setIsHovered,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCardSpin(cardRef, rotationSpeed, draggable, hoverToStop, clickToFlip);

  const style = {
    width: width,
    height: height,
    cursor: draggable ? (dragging ? "grabbing" : "grab") : "pointer",
    userSelect: "none",
    willChange: "transform",
    transition: dragging ? "none" : "transform ease",
  };

  return (
    <motion.div
      ref={cardRef}
      className="card"
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={style}
    >
      {children}
    </motion.div>
  );
};

CardSpin.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  rotationSpeed: PropTypes.number,
  draggable: PropTypes.bool,
  hoverToStop: PropTypes.bool,
  clickToFlip: PropTypes.bool,
};

CardSpin.displayName = "CardSpin";

export default CardSpin;
