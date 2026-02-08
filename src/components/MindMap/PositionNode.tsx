import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { PositionNode } from '../../types';

const PositionNodeComponent = ({ data, selected }: NodeProps<PositionNode['data']>) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[150px] ${
        selected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'
      }`}
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
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
};

export default memo(PositionNodeComponent);
