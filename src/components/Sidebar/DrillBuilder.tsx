import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const DrillBuilder = () => {
  const { nodes, drillSequences, addDrillSequence, deleteDrillSequence, startDrill } = useGameStore();
  const [isBuilding, setIsBuilding] = useState(false);
  const [drillName, setDrillName] = useState('');
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const handleAddNode = (nodeId: string) => {
    setSelectedNodeIds((prev) => [...prev, nodeId]);
  };

  const handleRemoveStep = (index: number) => {
    setSelectedNodeIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (drillName.trim() && selectedNodeIds.length >= 2) {
      addDrillSequence(drillName.trim(), selectedNodeIds);
      setDrillName('');
      setSelectedNodeIds([]);
      setIsBuilding(false);
    }
  };

  const handleCancel = () => {
    setDrillName('');
    setSelectedNodeIds([]);
    setIsBuilding(false);
  };

  const getNodeLabel = (nodeId: string) => {
    return nodes.find((n) => n.id === nodeId)?.data.label || 'Unknown';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">🥋 Training Drills</h3>
        {!isBuilding && (
          <button
            onClick={() => setIsBuilding(true)}
            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            + New Drill
          </button>
        )}
      </div>

      {/* Drill builder form */}
      {isBuilding && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-3">
          <input
            type="text"
            value={drillName}
            onChange={(e) => setDrillName(e.target.value)}
            placeholder="Drill name (e.g., Guard to Mount)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Current sequence */}
          {selectedNodeIds.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600">Sequence:</div>
              {selectedNodeIds.map((nodeId, index) => (
                <div key={`${nodeId}-${index}`} className="flex items-center gap-2">
                  {index > 0 && (
                    <div className="text-xs text-blue-500 ml-2">↓</div>
                  )}
                  <div className="flex items-center gap-1 flex-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-800">{getNodeLabel(nodeId)}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveStep(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Node selector */}
          <div>
            <div className="text-xs font-medium text-gray-600 mb-1">Add position to sequence:</div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleAddNode(node.id)}
                  className="w-full text-left px-2 py-1.5 text-sm bg-white border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  {node.data.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!drillName.trim() || selectedNodeIds.length < 2}
              className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Drill
            </button>
            <button
              onClick={handleCancel}
              className="px-3 bg-gray-200 text-gray-700 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved drills list */}
      <div className="space-y-2">
        {drillSequences.map((drill) => (
          <div
            key={drill.id}
            className="p-3 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="font-medium text-sm text-gray-800">{drill.name}</div>
              <button
                onClick={() => deleteDrillSequence(drill.id)}
                className="text-red-500 hover:text-red-700 text-xs ml-2"
                title="Delete drill"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-gray-600 mb-2">
              {drill.nodeIds.map((id, i) => (
                <span key={`${id}-${i}`}>
                  {i > 0 && ' → '}
                  {getNodeLabel(id)}
                </span>
              ))}
            </div>
            <button
              onClick={() => startDrill(drill.id)}
              className="w-full bg-green-600 text-white py-1.5 rounded text-xs font-medium hover:bg-green-700 transition-colors"
            >
              ▶ Start Drill
            </button>
          </div>
        ))}
        {drillSequences.length === 0 && !isBuilding && (
          <div className="text-center text-gray-500 text-xs py-4">
            No drills yet. Create one to practice specific chains.
          </div>
        )}
      </div>
    </div>
  );
};

export default DrillBuilder;
