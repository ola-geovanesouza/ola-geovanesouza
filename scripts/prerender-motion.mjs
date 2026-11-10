import React, { forwardRef } from "react";

const motionProps = new Set([
  "animate", "drag", "dragConstraints", "dragElastic", "dragMomentum", "exit",
  "initial", "layout", "onAnimationComplete", "onDrag", "onDragEnd", "onDragStart",
  "onHoverEnd", "onHoverStart", "onTap", "onTapCancel", "onTapStart", "transformTemplate",
  "transition", "variants", "viewport", "whileDrag", "whileFocus", "whileHover", "whileInView", "whileTap",
]);
const components = new Map();

export const motion = new Proxy({}, {
  get(_target, tag) {
    if (typeof tag !== "string") return undefined;
    if (!components.has(tag)) {
      components.set(tag, forwardRef(({ children, ...props }, ref) => {
        const htmlProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
        return React.createElement(tag, { ...htmlProps, ref }, children);
      }));
    }
    return components.get(tag);
  },
});

export function MotionConfig({ children }) {
  return children;
}

export function useAnimate() {
  return [{ current: null }, async () => {}];
}
