import { memo } from 'react';
import { type EdgeProps, getBezierPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';

const TransitionEdge = ({
  id,
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

  const edgeColor = selected ? '#3B82F6' : '#6B7280';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd="url(#arrowhead)"
        style={{
          stroke: edgeColor,
          strokeWidth: selected ? 3 : 2,
        }}
      />
      {data?.technique && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <div className="bg-white px-2 py-1 rounded border border-gray-300 text-xs font-medium text-gray-700 shadow-sm whitespace-nowrap">
              {data.technique}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(TransitionEdge);
