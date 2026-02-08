import { useGameStore } from '../../store/useGameStore';

const PositionList = () => {
  const { nodes, selectedNodeId, setSelectedNode, deleteNode } = useGameStore();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this position?')) {
      deleteNode(id);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 mb-3">Positions ({nodes.length})</h3>
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
                        className="px-1.5 py-0.5 rounded text-xs font-medium text-white"
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
            No positions yet. Double-click the canvas to add one.
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionList;
