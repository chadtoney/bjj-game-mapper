import { useState, useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TECHNIQUE_TEMPLATES } from '../../data/techniqueTemplates';
import type { TechniqueTemplate } from '../../data/techniqueTemplates';
import type { TransitionEdge } from '../../types';

const QuickAddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [search, setSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const edgeCounter = useRef(0);

  const { nodes, edges, addEdge, setSelectedEdge, tags } = useGameStore();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSourceId('');
    setTargetId('');
    setSearch('');
    setExpandedCategory(null);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

  const handleSelectTechnique = (technique: TechniqueTemplate) => {
    if (!sourceId || !targetId) return;

    const defaultTag = tags.find((t) => t.type === technique.defaultTag);
    edgeCounter.current = Math.max(edgeCounter.current + 1, edges.length + 1);
    const edgeId = `eq${sourceId}-${targetId}-${edgeCounter.current}`;

    const newEdge: TransitionEdge = {
      id: edgeId,
      source: sourceId,
      target: targetId,
      data: {
        technique: technique.name,
        tags: defaultTag ? [defaultTag] : [],
        notes: '',
      },
    };

    addEdge(newEdge);
    setSelectedEdge(edgeId);
    handleClose();
  };

  const filteredCategories = TECHNIQUE_TEMPLATES.map((cat) => ({
    ...cat,
    techniques: cat.techniques.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.techniques.length > 0);

  const canSelectTechnique = sourceId && targetId && sourceId !== targetId;

  return (
    <>
      {/* Floating + Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all hover:scale-110 flex items-center justify-center text-2xl font-bold md:left-auto md:translate-x-0 md:bottom-20 md:right-48"
        title="Quick-add technique"
        aria-label="Quick-add technique"
      >
        +
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl animate-slide-up"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Quick-Add Technique</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Node Selection */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Position
                </label>
                <select
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select source position…</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Position
                </label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select target position…</option>
                  {nodes
                    .filter((n) => n.id !== sourceId)
                    .map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.data.label}
                      </option>
                    ))}
                </select>
              </div>
              {sourceId && targetId && sourceId === targetId && (
                <p className="text-xs text-red-500">Source and target must be different positions.</p>
              )}
            </div>

            {/* Search */}
            <div className="px-4 pt-3">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search techniques…"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Technique List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredCategories.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">
                  No techniques match your search.
                </p>
              )}
              {filteredCategories.map((cat) => (
                <div key={cat.category} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === cat.category ? null : cat.category
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      {cat.emoji} {cat.category}
                      <span className="text-xs text-gray-500 ml-1">
                        ({cat.techniques.length})
                      </span>
                    </span>
                    <span className="text-gray-400 text-xs">
                      {expandedCategory === cat.category ? '▲' : '▼'}
                    </span>
                  </button>
                  {(expandedCategory === cat.category || search.length > 0) && (
                    <div className="divide-y divide-gray-100">
                      {cat.techniques.map((technique) => (
                        <button
                          key={technique.name}
                          onClick={() => handleSelectTechnique(technique)}
                          disabled={!canSelectTechnique}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            canSelectTechnique
                              ? 'hover:bg-blue-50 active:bg-blue-100 text-gray-800'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {technique.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            {!canSelectTechnique && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
                <p className="text-xs text-gray-500">
                  Select source and target positions above, then tap a technique to add it.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuickAddButton;
