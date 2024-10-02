import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for handling the rotation of a card element with hover and drag interactions.
 * It continuously rotates the card when not hovered or dragged and allows users to interact
 * by dragging the card to rotate it manually if enabled.
 *
 * @param {React.RefObject<HTMLElement>} ref - A reference to the card DOM element.
 * @param {number} rotationSpeed - The speed of rotation when the card is not interacted with.
 * @param {boolean} draggable - Whether the card can be dragged to rotate it.
 * @param {boolean} hoverToStop - Whether the rotation should stop when the card is hovered.
 * @param {boolean} clickToFlip - Whether the card should flip on click.
 * @returns {Object} - Functions and states to manage the card's rotation:
 *   - `dragging`: Boolean indicating if the card is currently being dragged.
 *   - `setIsHovered`: Function to set hover state (`true` or `false`).
 *   - `handlePointerDown`: Function to handle the pointer down event (when dragging starts).
 *   - `handlePointerMove`: Function to handle pointer move event (to update the rotation).
 *   - `handlePointerUp`: Function to handle pointer up event (when dragging ends).
 */
export const useCardSpin = (
  ref,
  rotationSpeed = 0,
  draggable = false,
  hoverToStop = false,
  clickToFlip = false
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const dragStartData = useRef({
    dragStartRotation: 0,
    dragStartClientX: 0,
  });

  useEffect(() => {
    let animationFrameId;

    const animateRotation = () => {
      if ((!isHovered || !hoverToStop) && !dragging && rotationSpeed > 0) {
        setRotation((prevRotation) => prevRotation + rotationSpeed);
        animationFrameId = requestAnimationFrame(animateRotation);
      }
    };

    animateRotation();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, dragging, rotationSpeed, hoverToStop]);


  useEffect(() => {
    if (ref.current) {
      const flipRotation = isFlipped ? 180 : 0;
      ref.current.style.transform = `rotateY(${rotation + flipRotation}deg)`;
    }
  }, [rotation, isFlipped, ref]);

  const handlePointerDown = useCallback(
    (event) => {
      if (!draggable) return;

      event.preventDefault();
      const { clientX } = event;

      dragStartData.current = {
        dragStartRotation: rotation,
        dragStartClientX: clientX,
      };

      setDragging(true);
      ref.current.setPointerCapture(event.pointerId);
    },
    [rotation, ref, draggable]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (dragging && ref.current.hasPointerCapture(event.pointerId)) {
        const { clientX } = event;
        const deltaX = clientX - dragStartData.current.dragStartClientX;
        const newRotation =
          dragStartData.current.dragStartRotation + deltaX * 0.5;
        setRotation(newRotation);
      }
    },
    [dragging, ref]
  );

  const handlePointerUp = useCallback(
    (event) => {
      if (dragging) {
        ref.current.releasePointerCapture(event.pointerId);
        setDragging(false);
      }
    },
    [dragging, ref]
  );

  const handleClick = useCallback(() => {
    if (!dragging) {
      setIsFlipped((prev) => !prev);
    }
  }, [dragging]);

  useEffect(() => {
    const cardElement = ref.current;

    if (cardElement) {
      if (clickToFlip) {
        cardElement.addEventListener("click", handleClick);
      }

      if (draggable) {
        cardElement.addEventListener("pointermove", handlePointerMove);
        cardElement.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        if (clickToFlip) {
          cardElement.removeEventListener("click", handleClick);
        }
        if (draggable) {
          cardElement.removeEventListener("pointermove", handlePointerMove);
          cardElement.removeEventListener("pointerup", handlePointerUp);
        }
      };
    }
  }, [draggable, handlePointerMove, handlePointerUp, handleClick, clickToFlip, ref]);

  return {
    dragging,
    setIsHovered,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
