import { memo } from 'react';
import { type EdgeProps, getBezierPath, BaseEdge } from 'reactflow';

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

  const edgeColor = selected ? '#3B82F6' : data?.tags?.[0]?.color || '#6B7280';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: edgeColor,
          strokeWidth: selected ? 3 : 2,
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
            <div className="bg-white px-2 py-1 rounded border border-gray-300 text-xs font-medium text-gray-700 shadow-sm">
              {data.technique}
            </div>
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default memo(TransitionEdge);
