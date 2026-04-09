import { memo } from 'react';
import { type EdgeProps, getBezierPath, BaseEdge } from 'reactflow';
import { useGameStore } from '../../store/useGameStore';

const TransitionEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { isTrainingMode, activeDrillId, drillSequences, drillStepIndex } = useGameStore();

  // Determine if this edge is part of the active drill path
  let drillEdgeState: 'active-step' | 'in-path' | 'dimmed' | null = null;
  if (isTrainingMode && activeDrillId) {
    const drill = drillSequences.find((d) => d.id === activeDrillId);
    if (drill) {
      let isInPath = false;
      let isActiveStep = false;
      for (let i = 0; i < drill.nodeIds.length - 1; i++) {
        if (drill.nodeIds[i] === source && drill.nodeIds[i + 1] === target) {
          isInPath = true;
          // The edge leading to the current step is the "active step" edge
          if (i + 1 === drillStepIndex) {
            isActiveStep = true;
          }
          break;
        }
      }
      if (isActiveStep) {
        drillEdgeState = 'active-step';
      } else if (isInPath) {
        drillEdgeState = 'in-path';
      } else {
        drillEdgeState = 'dimmed';
      }
    }
  }

  const getEdgeColor = () => {
    if (drillEdgeState === 'active-step') return '#16A34A'; // green-600
    if (drillEdgeState === 'in-path') return '#3B82F6'; // blue-500
    if (drillEdgeState === 'dimmed') return '#D1D5DB'; // gray-300
    if (selected) return '#3B82F6';
    return data?.tags?.[0]?.color || '#6B7280';
  };

  const getStrokeWidth = () => {
    if (drillEdgeState === 'active-step') return 4;
    if (drillEdgeState === 'in-path') return 3;
    if (drillEdgeState === 'dimmed') return 1;
    return selected ? 3 : 2;
  };

  const getOpacity = () => {
    if (drillEdgeState === 'dimmed') return 0.3;
    return 1;
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: getEdgeColor(),
          strokeWidth: getStrokeWidth(),
          opacity: getOpacity(),
          transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s',
        }}
      />
      {data?.technique && (
        <foreignObject
          width={120}
          height={40}
          x={labelX - 60}
          y={labelY - 20}
          className="overflow-visible"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="flex items-center justify-center">
            <div
              className="bg-white px-2 py-1 rounded border border-gray-300 text-xs font-medium text-gray-700 shadow-sm"
              style={{ opacity: getOpacity() }}
            >
              {data.technique}
            </div>
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default memo(TransitionEdge);
