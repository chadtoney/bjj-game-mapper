import { useState, useEffect, useRef, useMemo } from 'react';
import { COMMON_BJJ_POSITIONS } from '../../utils/bjjPositions';

interface AddPositionModalProps {
  onConfirm: (label: string) => void;
  onCancel: () => void;
  /** Labels of positions already on the canvas (used to filter suggestions). */
  existingLabels: string[];
}

const AddPositionModal = ({
  onConfirm,
  onCancel,
  existingLabels,
}: AddPositionModalProps) => {
  const [value, setValue] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Positions not yet on the canvas, filtered by current input
  const suggestions = useMemo(() => {
    const existing = new Set(existingLabels.map((l) => l.toLowerCase()));
    const available = COMMON_BJJ_POSITIONS.filter(
      (p) => !existing.has(p.toLowerCase()),
    );
    const query = value.trim().toLowerCase();
    if (!query) return available;
    return available.filter((p) => p.toLowerCase().includes(query));
  }, [value, existingLabels]);

  // Keep highlight index in bounds whenever the list changes
  useEffect(() => {
    setHighlightIndex((prev) =>
      prev >= suggestions.length ? suggestions.length - 1 : prev,
    );
  }, [suggestions.length]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      items[highlightIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

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
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
      return;
    }

    if (e.key === 'Enter' && highlightIndex >= 0 && suggestions[highlightIndex]) {
      e.preventDefault();
      onConfirm(suggestions[highlightIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-[90vw]">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          Add BJJ Position
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter a name or pick from common positions below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setHighlightIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Closed Guard"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            autoComplete="off"
          />

          {/* Suggestion dropdown */}
          {suggestions.length > 0 && (
            <ul
              ref={listRef}
              className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg mb-4 divide-y divide-gray-100"
            >
              {suggestions.map((pos, idx) => (
                <li
                  key={pos}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                    idx === highlightIndex
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onClick={() => onConfirm(pos)}
                >
                  {pos}
                </li>
              ))}
            </ul>
          )}

          {suggestions.length === 0 && value.trim() && (
            <p className="text-xs text-gray-400 mb-4">
              No matching suggestions — press <strong>Add Position</strong> to
              create a custom one.
            </p>
          )}

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
      </div>
    </div>
  );
};

export default AddPositionModal;
