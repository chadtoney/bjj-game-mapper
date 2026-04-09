import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import PositionContextHints from './PositionContextHints';

const NodeEditor = () => {
  const { nodes, selectedNodeId, updateNode, setSelectedNode, tags } = useGameStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Initialize form fields when node is selected
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
      setDescription(selectedNode.data.description || '');
      setNotes(selectedNode.data.notes || '');
      setSelectedTags(selectedNode.data.tags.map((t) => t.id));
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNodeId && selectedNode) {
      const nodeTags = tags.filter((t) => selectedTags.includes(t.id));
      updateNode(selectedNodeId, {
        label,
        description,
        notes,
        tags: nodeTags,
      });
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  if (!selectedNode) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Edit Position</h3>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position Name
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Closed Guard"
          />
        </div>

        <PositionContextHints positionName={label} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="Brief description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={isSelected ? { backgroundColor: tag.color } : {}}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Additional notes..."
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NodeEditor;
