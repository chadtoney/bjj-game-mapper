import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { PositionNode } from '../../types';

const PositionNodeComponent = ({ data, selected }: NodeProps<PositionNode['data']>) => {
  // Use the first tag's color as node background, or white if no tags
  const primaryTag = data.tags?.[0];
  const bgColor = primaryTag ? primaryTag.color : '#FFFFFF';

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 shadow-md min-w-[120px] text-center ${
        selected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-400'
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} id="left-target" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right-source" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Right} id="right-target" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Left} id="left-source" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Top} id="top-source" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="!bg-gray-500 !w-2 !h-2" />

      <div className="flex flex-col gap-0.5">
        <div className="font-semibold text-gray-800 text-sm leading-tight">{data.label}</div>
      </div>
    </div>
  );
};

export default memo(PositionNodeComponent);
