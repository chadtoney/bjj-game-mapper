import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import AddPositionModal from '../MindMap/AddPositionModal';

const PositionList = () => {
  const { nodes, selectedNodeId, setSelectedNode, deleteNode, addNode } = useGameStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this position?')) {
      deleteNode(id);
    }
  };

  const handleAddConfirm = (label: string) => {
    // Place new nodes in a staggered grid so they don't overlap
    const offset = nodes.length * 30;
    addNode({ x: 100 + offset, y: 100 + offset }, label);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Positions ({nodes.length})</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          title="Add a new BJJ position"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedNodeId === node.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
            onClick={() => setSelectedNode(node.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-800 truncate">
                  {node.data.label}
                </div>
                {node.data.description && (
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {node.data.description}
                  </div>
                )}
                {node.data.tags && node.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {node.data.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-1.5 py-0.5 rounded text-xs font-medium text-gray-800 border border-gray-300"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                    {node.data.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-xs text-gray-600">
                        +{node.data.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => handleDelete(node.id, e)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm"
                title="Delete position"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {nodes.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-8">
            No positions yet. Click <strong>+ Add</strong> or double-click the canvas.
          </div>
        )}
      </div>

      {showAddModal && (
        <AddPositionModal
          onConfirm={handleAddConfirm}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default PositionList;
