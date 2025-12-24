import { useState, useRef, useEffect } from "react";

export default function useDraggable(initialPosition) {
  const [position, setPosition] = useState(initialPosition);

  const startPointRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const movedRef = useRef(false); 

  const DRAG_THRESHOLD = 5; // px

  const onMouseDown = (e) => {
    draggingRef.current = true;
    movedRef.current = false;

    startPointRef.current = {
      x: e.clientX,
      y: e.clientY,
    };

    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;

    const dx = Math.abs(e.clientX - startPointRef.current.x);
    const dy = Math.abs(e.clientY - startPointRef.current.y);

    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
      movedRef.current = true;
    }

    if (!movedRef.current) return;

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
    wasDragged: movedRef, // click 차단용
  };
}
