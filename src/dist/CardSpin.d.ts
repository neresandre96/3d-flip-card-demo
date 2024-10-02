import React, { ReactNode } from "react";
/**
 * Properties of the CardSpin component.
 *
 * @interface CardSpinProps
 * @property {string} className - The CSS class to be applied to the card.
 * @property {ReactNode} children - The child elements that will be rendered inside the card.
 * @property {string} height - The height of the card (can use units like '100px', '50%', etc.).
 * @property {string} width - The width of the card (can use units like '100px', '50%', etc.).
 * @property {number} [rotationSpeed=0] - The rotation speed of the card in degrees per second.
 * @property {boolean} [draggable=false] - Determines if the card can be dragged.
 * @property {boolean} [hoverToStop=false] - Determines if the rotation should stop when hovering over the card.
 * @property {boolean} [clickToFlip=false] - Determines if the card should flip on click.
 */
export interface CardSpinProps {
    className: string;
    children: ReactNode;
    height: string;
    width: string;
    rotationSpeed?: number;
    draggable?: boolean;
    hoverToStop?: boolean;
    clickToFlip?: boolean;
}
/**
 * Component that represents a spinning card that can be dragged or clicked to flip.
 *
 * @param {CardSpinProps} props - The properties of the component.
 * @returns {JSX.Element} The JSX element that represents the spinning card.
 */
declare const CardSpin: React.FC<CardSpinProps>;
export default CardSpin;
