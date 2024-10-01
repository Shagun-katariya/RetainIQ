import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableRow = ({ id, index, moveRow, children, containerRef }) => {
  const ref = useRef(null); // Reference for the draggable row
  const scrollAnimationRef = useRef(null); // Reference to track the scrolling animation

  const [, drop] = useDrop({
    accept: "row",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return; // Prevent self-drop
      }

      // Start smooth scrolling
      const container = containerRef.current;
      if (container) {
        if (dragIndex > hoverIndex) {
          // Scroll up
          smoothScroll(container, -100);
        } else if (dragIndex < hoverIndex) {
          // Scroll down
          smoothScroll(container, 100);
        }
      }

      moveRow(dragIndex, hoverIndex); // Move the row in the state
      item.index = hoverIndex; // Update the index of the dragged item
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // Connect the drag and drop functionality to the row

  // Function to handle smooth scrolling
  const smoothScroll = (container, scrollAmount) => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current); // Cancel any ongoing animation
    }

    const startScrollTop = container.scrollTop;
    const targetScrollTop = startScrollTop + scrollAmount;

    const duration = 300; // Duration of the scroll in milliseconds
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Normalize progress between 0 and 1

      // Ease in-out effect
      const easing = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      container.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easing(progress);

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animateScroll); // Start the animation
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className="row"
    >
      {children} {/* Render children components here */}
    </div>
  );
};

export default DraggableRow;
