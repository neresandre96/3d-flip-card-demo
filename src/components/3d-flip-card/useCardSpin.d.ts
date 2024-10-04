import { RefObject } from "react";
export interface UseCardSpinReturn {
    dragging: boolean;
    setIsHovered: (isHovered: boolean) => void;
    handlePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    handlePointerMove: (event: PointerEvent | React.PointerEvent<HTMLDivElement>) => void;
    handlePointerUp: (event: PointerEvent | React.PointerEvent<HTMLDivElement>) => void;
}
/**
 * Hook that manages the rotation logic and interactions of a spinning card.
 *
 * @param {RefObject<HTMLDivElement>} ref - Reference to the card element.
 * @param {number} rotationSpeed - The rotation speed of the card in degrees per second (default is 0).
 * @param {boolean} draggable - Determines if the card can be dragged (default is false).
 * @param {boolean} hoverToStop - Determines if the rotation should stop when hovering over the card (default is false).
 * @param {boolean} clickToFlip - Determines if the card should flip on click (default is false).
 * @returns {UseCardSpinReturn} - An object containing information about the card's state and event handlers.
 */
export declare const useCardSpin: (ref: RefObject<HTMLDivElement>, rotationSpeed?: number, draggable?: boolean, hoverToStop?: boolean, clickToFlip?: boolean) => UseCardSpinReturn;
