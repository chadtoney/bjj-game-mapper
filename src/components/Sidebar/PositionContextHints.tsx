import { useState } from 'react';
import { getPositionHints } from '../../utils/positionHints';

interface PositionContextHintsProps {
  positionName: string;
}

const PositionContextHints = ({ positionName }: PositionContextHintsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const result = getPositionHints(positionName);

  if (!result) return null;

  const { hint, matchedPosition } = result;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-blue-800">
          💡 Position Hints
        </span>
        <span className="text-blue-600 text-xs">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          <p className="text-xs text-blue-700 italic">{hint.tip}</p>
          <div>
            <p className="text-xs font-medium text-blue-800 mb-1">
              Common techniques from {matchedPosition}:
            </p>
            <div className="flex flex-wrap gap-1">
              {hint.techniques.map((technique) => (
                <span
                  key={technique}
                  className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionContextHints;
