import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import PositionList from './PositionList';
import TagFilter from './TagFilter';
import NodeEditor from './NodeEditor';
import EdgeEditor from './EdgeEditor';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { selectedNodeId, selectedEdgeId } = useGameStore();
  const isMobile = useIsMobile();
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Close drawer when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isMobile || !isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, isDrawerOpen]);

  // Swipe-to-close handler for the drawer
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    // Swipe left to close (threshold of 80px)
    if (deltaX < -80) {
      setIsDrawerOpen(false);
    }
    touchStartX.current = null;
  }, []);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">BJJ Game Mapper</h2>
        <button
          onClick={() => (isMobile ? setIsDrawerOpen(false) : setIsCollapsed(true))}
          className="text-gray-600 hover:text-gray-800"
          title={isMobile ? 'Close drawer' : 'Collapse sidebar'}
          aria-label={isMobile ? 'Close drawer' : 'Collapse sidebar'}
        >
          {isMobile ? '✕' : '◀'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {selectedNodeId && <NodeEditor />}
        {selectedEdgeId && <EdgeEditor />}
        {!selectedNodeId && !selectedEdgeId && (
          <>
            <TagFilter />
            <div className="border-t border-gray-200 pt-4">
              <PositionList />
            </div>
          </>
        )}
      </div>
    </>
  );

  /* ───── Mobile: slide-out drawer ───── */
  if (isMobile) {
    return (
      <>
        {/* Overlay backdrop */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Sidebar navigation"
        >
          {sidebarContent}
        </div>

        {/* Floating action button (FAB) */}
        {!isDrawerOpen && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="fixed bottom-6 left-4 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 active:bg-blue-800 transition-colors"
            title="Open sidebar"
            aria-label="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </>
    );
  }

  /* ───── Desktop: classic sidebar ───── */
  if (isCollapsed) {
    return (
      <div className="bg-white border-r border-gray-200 w-12 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-gray-600 hover:text-gray-800 transform rotate-180"
          title="Expand sidebar"
        >
          ◀
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-r border-gray-200 w-80 flex flex-col h-full overflow-hidden">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
