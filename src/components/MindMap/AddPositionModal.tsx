import { useState, useEffect, useRef } from 'react';
import PositionPicker from '../Sidebar/PositionPicker';

interface AddPositionModalProps {
  onConfirm: (label: string) => void;
  onCancel: () => void;
}

const AddPositionModal = ({ onConfirm, onCancel }: AddPositionModalProps) => {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState<'picker' | 'custom'>('picker');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'custom') {
      inputRef.current?.focus();
    }
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onConfirm(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handlePickerSelect = (position: string) => {
    onConfirm(position);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[28rem] max-w-[90vw]">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Add BJJ Position</h2>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 pb-2">
          <button
            type="button"
            onClick={() => setMode('picker')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              mode === 'picker'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse Positions
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              mode === 'custom'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Custom Name
          </button>
        </div>

        {mode === 'picker' ? (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Select a position from the hierarchy or search by name.
            </p>
            <PositionPicker onSelect={handlePickerSelect} />
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Enter a custom position name.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Closed Guard"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Position
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddPositionModal;
