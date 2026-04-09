import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';

const DrillPlayer = () => {
  const {
    nodes,
    edges,
    drillSequences,
    activeDrillId,
    drillStepIndex,
    isTrainingMode,
    drillNext,
    drillPrev,
    stopDrill,
    setDrillStep,
  } = useGameStore();

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeDrill = drillSequences.find((d) => d.id === activeDrillId);

  const getNodeLabel = useCallback(
    (nodeId: string) => {
      return nodes.find((n) => n.id === nodeId)?.data.label || 'Unknown';
    },
    [nodes]
  );

  // Get the technique label for the edge between two consecutive nodes
  const getEdgeTechnique = useCallback(
    (fromId: string, toId: string) => {
      const edge = edges.find(
        (e) => e.source === fromId && e.target === toId
      );
      return edge?.data?.technique || null;
    },
    [edges]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isTrainingMode || !activeDrill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        drillNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        drillPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        stopDrill();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrainingMode, activeDrill, drillNext, drillPrev, stopDrill]);

  // Touch/swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 50;

      if (deltaX < -threshold) {
        drillNext();
      } else if (deltaX > threshold) {
        drillPrev();
      }
      touchStartX.current = null;
    },
    [drillNext, drillPrev]
  );

  if (!isTrainingMode || !activeDrill) return null;

  const totalSteps = activeDrill.nodeIds.length;
  const currentNodeId = activeDrill.nodeIds[drillStepIndex];
  const currentLabel = getNodeLabel(currentNodeId);
  const currentNode = nodes.find((n) => n.id === currentNodeId);
  const prevNodeId = drillStepIndex > 0 ? activeDrill.nodeIds[drillStepIndex - 1] : null;
  const nextNodeId = drillStepIndex < totalSteps - 1 ? activeDrill.nodeIds[drillStepIndex + 1] : null;
  const incomingTechnique = prevNodeId ? getEdgeTechnique(prevNodeId, currentNodeId) : null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-blue-700">🥋 {activeDrill.name}</span>
            <span className="text-xs text-gray-500">
              Step {drillStepIndex + 1} of {totalSteps}
            </span>
          </div>
          <button
            onClick={stopDrill}
            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
          >
            ✕ Exit Drill
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 mb-3">
          {activeDrill.nodeIds.map((_, index) => (
            <button
              key={index}
              onClick={() => setDrillStep(index)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                index === drillStepIndex
                  ? 'bg-blue-600'
                  : index < drillStepIndex
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="flex items-center gap-3">
          {/* Prev button */}
          <button
            onClick={drillPrev}
            disabled={drillStepIndex === 0}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous step (← arrow key)"
          >
            ◀
          </button>

          {/* Current position card */}
          <div className="flex-1 text-center">
            {incomingTechnique && (
              <div className="text-xs text-blue-600 font-medium mb-1">
                via {incomingTechnique}
              </div>
            )}
            <div className="text-lg font-bold text-gray-900">{currentLabel}</div>
            {currentNode?.data.description && (
              <div className="text-xs text-gray-500 mt-1">{currentNode.data.description}</div>
            )}
            {nextNodeId && (() => {
              const nextTechnique = getEdgeTechnique(currentNodeId, nextNodeId);
              return (
                <div className="text-xs text-gray-400 mt-1">
                  Next: {getNodeLabel(nextNodeId)}
                  {nextTechnique && (
                    <span className="text-blue-400"> ({nextTechnique})</span>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Next button */}
          <button
            onClick={drillNext}
            disabled={drillStepIndex === totalSteps - 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next step (→ arrow key)"
          >
            ▶
          </button>
        </div>

        {/* Swipe hint (shown on touch devices) */}
        <div className="text-center text-xs text-gray-400 mt-2 sm:hidden">
          Swipe left/right to navigate • Tap progress bar to jump
        </div>
        <div className="text-center text-xs text-gray-400 mt-2 hidden sm:block">
          ← → arrow keys to navigate • Esc to exit • Click progress bar to jump
        </div>
      </div>
    </div>
  );
};

export default DrillPlayer;
