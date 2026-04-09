import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { Tag } from '../../types';

const EdgeEditor = () => {
  const { edges, selectedEdgeId, updateEdge, setSelectedEdge, deleteEdge, tags, nodes } = useGameStore();
  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  const [technique, setTechnique] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Initialize form fields when edge is selected
  useEffect(() => {
    if (selectedEdge) {
      setTechnique(selectedEdge.data?.technique || '');
      setNotes(selectedEdge.data?.notes || '');
      setSelectedTags(selectedEdge.data?.tags?.map((t: Tag) => t.id) || []);
    }
  }, [selectedEdge]);

  const handleSave = () => {
    if (selectedEdgeId && selectedEdge) {
      const edgeTags = tags.filter((t) => selectedTags.includes(t.id));
      updateEdge(selectedEdgeId, {
        technique,
        notes,
        tags: edgeTags,
      });
    }
  };

  const handleDelete = () => {
    if (selectedEdgeId && confirm('Delete this transition?')) {
      deleteEdge(selectedEdgeId);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  if (!selectedEdge) return null;

  const sourceNode = nodes.find((n) => n.id === selectedEdge.source);
  const targetNode = nodes.find((n) => n.id === selectedEdge.target);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Edit Transition</h3>
        <button
          onClick={() => setSelectedEdge(null)}
          className="text-gray-600 hover:text-gray-800 min-h-[44px] min-w-[44px]"
        >
          ✕
        </button>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg text-sm">
        <div className="text-gray-600">From:</div>
        <div className="font-medium text-gray-800">{sourceNode?.data.label || 'Unknown'}</div>
        <div className="text-gray-600 mt-2">To:</div>
        <div className="font-medium text-gray-800">{targetNode?.data.label || 'Unknown'}</div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technique Name
          </label>
          <input
            type="text"
            value={technique}
            onChange={(e) => setTechnique(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Hip Escape, Scissor Sweep"
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
                  className={`px-2 py-1 rounded text-xs font-medium transition-all min-h-[44px] min-w-[44px] ${
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

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            className="px-4 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeEditor;
