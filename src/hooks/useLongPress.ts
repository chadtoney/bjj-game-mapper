import { useCallback, useRef } from 'react';

const LONG_PRESS_DURATION = 500; // ms
const MOVE_THRESHOLD = 10; // px – cancel if pointer moves too far

interface LongPressHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerLeave: (e: React.PointerEvent) => void;
}

/**
 * Returns pointer-event handlers that fire `callback` after the user presses
 * and holds for `LONG_PRESS_DURATION` ms without moving more than
 * `MOVE_THRESHOLD` px.
 */
export function useLongPress(
  callback: (e: React.PointerEvent) => void,
): LongPressHandlers {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const savedEvent = useRef<React.PointerEvent | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPos.current = null;
    savedEvent.current = null;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only respond to primary button (left click / single touch)
      if (e.button !== 0) return;

      startPos.current = { x: e.clientX, y: e.clientY };
      savedEvent.current = e;

      timerRef.current = setTimeout(() => {
        if (savedEvent.current) {
          callback(savedEvent.current);
        }
        clear();
      }, LONG_PRESS_DURATION);
    },
    [callback, clear],
  );

  const onPointerUp = useCallback(() => {
    clear();
  }, [clear]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!startPos.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > MOVE_THRESHOLD) {
        clear();
      }
    },
    [clear],
  );

  const onPointerLeave = useCallback(() => {
    clear();
  }, [clear]);

  return { onPointerDown, onPointerUp, onPointerMove, onPointerLeave };
}
