import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import PositionList from './PositionList';
import TagFilter from './TagFilter';
import NodeEditor from './NodeEditor';
import EdgeEditor from './EdgeEditor';
import DrillBuilder from './DrillBuilder';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedNodeId, selectedEdgeId } = useGameStore();

  if (isCollapsed) {
    return (
      <div className="bg-white border-r border-gray-200 w-12 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-gray-600 hover:text-gray-800 transform rotate-180"
          title="Expand sidebar"
        >
          ◀
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-r border-gray-200 w-80 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">BJJ Game Mapper</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-600 hover:text-gray-800"
          title="Collapse sidebar"
        >
          ◀
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Show editor if something is selected */}
        {selectedNodeId && <NodeEditor />}
        {selectedEdgeId && <EdgeEditor />}

        {/* Show main controls if nothing is selected */}
        {!selectedNodeId && !selectedEdgeId && (
          <>
            <TagFilter />
            <div className="border-t border-gray-200 pt-4">
              <DrillBuilder />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <PositionList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
