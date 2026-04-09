import { useEffect, useRef } from 'react';

export interface ContextMenuItem {
  label: string;
  icon: string;
  onClick: () => void;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const RADIUS = 70; // distance from center to each item
const DOT_SIZE = 12; // px – size of the center dot

const ContextMenu = ({ x, y, items, onClose }: ContextMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

  const angleStep = (2 * Math.PI) / items.length;
  // Start at the top (-π/2)
  const startAngle = -Math.PI / 2;

  return (
    <div
      ref={ref}
      className="context-menu-overlay"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}
    >
      {/* Center dot */}
      <div
        className="absolute w-3 h-3 rounded-full bg-blue-400 opacity-60"
        style={{ left: x - DOT_SIZE / 2, top: y - DOT_SIZE / 2 }}
      />

      {items.map((item, i) => {
        const angle = startAngle + i * angleStep;
        const ix = x + RADIUS * Math.cos(angle);
        const iy = y + RADIUS * Math.sin(angle);
        return (
          <button
            key={item.label}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className="context-menu-item absolute flex flex-col items-center justify-center w-16 h-16 -ml-8 -mt-8 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-400 transition-all text-xs font-medium text-gray-700 hover:text-blue-600"
            style={{
              left: ix,
              top: iy,
              animationDelay: `${i * 40}ms`,
            }}
            title={item.label}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="mt-0.5 leading-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
