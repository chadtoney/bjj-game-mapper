import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { PositionNode } from '../../types';
import { useGameStore } from '../../store/useGameStore';

const PositionNodeComponent = ({ id, data, selected }: NodeProps<PositionNode['data']>) => {
  const { isTrainingMode, activeDrillId, drillSequences, drillStepIndex } = useGameStore();

  // Determine drill highlight state
  let drillState: 'current' | 'in-path' | 'dimmed' | null = null;
  if (isTrainingMode && activeDrillId) {
    const drill = drillSequences.find((d) => d.id === activeDrillId);
    if (drill) {
      const indexInDrill = drill.nodeIds.indexOf(id);
      if (indexInDrill === drillStepIndex) {
        drillState = 'current';
      } else if (indexInDrill >= 0) {
        drillState = 'in-path';
      } else {
        drillState = 'dimmed';
      }
    }
  }

  const getBorderClass = () => {
    if (drillState === 'current') return 'border-green-500 ring-2 ring-green-300';
    if (drillState === 'in-path') return 'border-blue-400 ring-1 ring-blue-200';
    if (drillState === 'dimmed') return 'border-gray-200 opacity-30';
    if (selected) return 'border-blue-500 ring-2 ring-blue-300';
    return 'border-gray-300';
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[150px] transition-all ${getBorderClass()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-gray-800 text-sm">{data.label}</div>
        
        {data.description && (
          <div className="text-xs text-gray-600 mt-1">{data.description}</div>
        )}
        
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded text-xs font-medium text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {drillState === 'current' && (
          <div className="text-xs text-green-600 font-medium mt-1">● Current Step</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
};

export default memo(PositionNodeComponent);
