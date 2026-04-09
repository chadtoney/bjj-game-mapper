import { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';

const UndoRedo = () => {
  const { undo, redo, canUndo, canRedo } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }
      if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        if (canRedo()) redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white p-2 rounded-lg shadow-lg border border-gray-200">
      <button
        onClick={undo}
        disabled={!canUndo()}
        className="px-3 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        title="Undo (Ctrl+Z)"
      >
        ↩️ Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo()}
        className="px-3 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        title="Redo (Ctrl+Shift+Z)"
      >
        ↪️ Redo
      </button>
    </div>
  );
};

export default UndoRedo;
