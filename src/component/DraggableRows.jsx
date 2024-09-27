import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableRow = ({ id, index, moveRow, children, containerRef }) => {
  const ref = React.useRef(null);
  const scrollingRef = React.useRef(null); // Ref to manage the scroll

  const [, drop] = useDrop({
    accept: "row",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Avoid moving to the same position
      if (dragIndex === hoverIndex) {
        return;
      }

      // Calculate the hover bounding rect
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Scroll logic
      const container = containerRef.current;
      const scrollThreshold = 50; // Distance from top or bottom edge to start scrolling
      const scrollSpeed = 50; // Speed of scrolling

      if (hoverClientY < scrollThreshold) {
        // Scroll up
        if (container && container.scrollTop > 0) {
          if (!scrollingRef.current) {
            scrollingRef.current = requestAnimationFrame(() => {
              container.scrollTop += scrollSpeed; // Scroll up by scrollSpeed pixels
              scrollingRef.current = null; // Reset the ref
            });
          }
        }
      } else if (hoverClientY > hoverBoundingRect.height - scrollThreshold) {
        // Scroll down
        if (container && container.scrollTop < container.scrollHeight - container.clientHeight) {
          if (!scrollingRef.current) {
            scrollingRef.current = requestAnimationFrame(() => {
              container.scrollTop -= scrollSpeed; // Scroll down by scrollSpeed pixels
              scrollingRef.current = null; // Reset the ref
            });
          }
        }
      }

      // Move the row
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
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

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      className="row"
    >
      {children}
    </div>
  );
};

export default DraggableRow;
