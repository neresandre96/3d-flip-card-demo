import React, { ReactNode } from "react";
/**
 * Properties of the Card3D component.
 *
 * @interface Card3DProps
 * @property {ReactNode, ReactNode} children - Child elements of the card, must contain exactly two elements: back and front.
 * @property {string} height - The height of the card (can use units like '100px', '50%', etc.).
 * @property {string} width - The width of the card (can use units like '100px', '50%', etc.).
 * @property {number} thickness - The thickness of the card in pixels.
 * @property {number} [rotationSpeed=0] - The rotation speed of the card in degrees per second. Default is 0.
 * @property {boolean} [hoverToStop=false] - Determines if the rotation should stop when hovering over the card. Default is false.
 * @property {"dragToFlip" | "clickToFlip"} mode - The interaction mode for flipping the card.
 * @property {string} leftColor - The color of the left side of the card.
 * @property {string} rightColor - The color of the right side of the card.
 * @property {string} borderColor - The color of the card edges. Default is 'white'.
 */
export interface Card3DProps {
    children: [ReactNode, ReactNode];
    height: string;
    width: string;
    thickness: number;
    rotationSpeed?: number;
    hoverToStop?: boolean;
    mode: "dragToFlip" | "clickToFlip";
    leftColor?: string;
    rightColor?: string;
    borderColor?: string;
}
/**
 * Component that represents an interactive 3D card that can be flipped.
 *
 * @param {Card3DProps} props - The properties of the component.
 * @returns {JSX.Element | null} The JSX element that represents the card or null if the number of children is not equal to 2.
 *
 * @see Card3DProps - The properties of the Card3D component, which define the configuration and behavior of the card.
 */
declare const Card3D: React.FC<Card3DProps>;
export default Card3D;
