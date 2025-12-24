import { useState, useRef, useEffect } from "react";

export default function useDraggable(initialPosition) {
  const [position, setPosition] = useState(initialPosition);

  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;

    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const onMouseUp = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return {
    position,
    onMouseDown,
  };
}
