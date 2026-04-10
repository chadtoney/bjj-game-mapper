import { useState, useMemo } from 'react';
import { BJJ_POSITION_HIERARCHY, getAllPositions, type PositionCategory } from '../../data/bjjPositions';

interface PositionPickerProps {
  onSelect: (position: string) => void;
}

/** Renders a single category row — either a leaf (selectable) or an expandable group. */
function CategoryItem({
  category,
  depth,
  expandedKeys,
  toggleExpand,
  onSelect,
  searchQuery,
}: {
  category: PositionCategory;
  depth: number;
  expandedKeys: Set<string>;
  toggleExpand: (key: string) => void;
  onSelect: (position: string) => void;
  searchQuery: string;
}) {
  const key = `${depth}-${category.name}`;
  const isExpanded = expandedKeys.has(key);
  const hasChildren = category.children && category.children.length > 0;

  // When searching, auto-expand categories with matching children
  const matchingChildren = useMemo(() => {
    if (!searchQuery || !category.children) return category.children ?? [];
    return filterCategories(category.children, searchQuery);
  }, [category.children, searchQuery]);

  // Hide categories with no matching children during search
  if (searchQuery && !hasChildren && category.position) {
    if (!category.position.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return null;
    }
  }
  if (searchQuery && hasChildren && matchingChildren.length === 0) {
    return null;
  }

  const showExpanded = searchQuery ? true : isExpanded;

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => toggleExpand(key)}
          className="w-full flex items-center gap-1 py-1.5 px-2 text-sm text-left rounded hover:bg-gray-100 transition-colors"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span className="text-gray-400 text-xs w-4 shrink-0">
            {showExpanded ? '▼' : '▶'}
          </span>
          <span className="font-medium text-gray-700">{category.name}</span>
        </button>
        {showExpanded && (
          <div>
            {(searchQuery ? matchingChildren : category.children!).map((child) => (
              <CategoryItem
                key={`${depth + 1}-${child.name}`}
                category={child}
                depth={depth + 1}
                expandedKeys={expandedKeys}
                toggleExpand={toggleExpand}
                onSelect={onSelect}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Leaf — selectable position
  return (
    <button
      type="button"
      onClick={() => onSelect(category.position ?? category.name)}
      className="w-full flex items-center gap-1 py-1.5 px-2 text-sm text-left rounded hover:bg-blue-50 hover:text-blue-700 transition-colors"
      style={{ paddingLeft: `${depth * 16 + 24}px` }}
    >
      <span className="text-gray-800">{category.name}</span>
    </button>
  );
}

/** Recursively filter categories based on search query */
function filterCategories(categories: PositionCategory[], query: string): PositionCategory[] {
  const lowerQuery = query.toLowerCase();
  return categories.filter((cat) => {
    if (cat.position && (cat.position.toLowerCase().includes(lowerQuery) || cat.name.toLowerCase().includes(lowerQuery))) {
      return true;
    }
    if (cat.children) {
      return filterCategories(cat.children, query).length > 0;
    }
    return cat.name.toLowerCase().includes(lowerQuery);
  });
}

const QUICK_POSITIONS = [
  'Closed Guard',
  'Mount',
  'Side Control',
  'Back Control',
  'Half Guard',
  'Standing',
];

const PositionPicker = ({ onSelect }: PositionPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const allPositions = useMemo(() => getAllPositions(), []);

  const filteredPositions = useMemo(() => {
    if (!searchQuery) return [];
    const lq = searchQuery.toLowerCase();
    return allPositions.filter((p) => p.toLowerCase().includes(lq));
  }, [searchQuery, allPositions]);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search positions…"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />

      {/* Quick-select */}
      {!searchQuery && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-1">Quick Select</div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_POSITIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => onSelect(pos)}
                className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results (flat list) */}
      {searchQuery && filteredPositions.length > 0 && (
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredPositions.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => onSelect(pos)}
              className="w-full text-left px-3 py-1.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {pos}
            </button>
          ))}
        </div>
      )}
      {searchQuery && filteredPositions.length === 0 && (
        <div className="text-xs text-gray-400 text-center py-2">
          No matching positions
        </div>
      )}

      {/* Hierarchical tree */}
      {!searchQuery && (
        <div className="max-h-56 overflow-y-auto border border-gray-200 rounded-lg py-1">
          {BJJ_POSITION_HIERARCHY.map((cat) => (
            <CategoryItem
              key={`0-${cat.name}`}
              category={cat}
              depth={0}
              expandedKeys={expandedKeys}
              toggleExpand={toggleExpand}
              onSelect={onSelect}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PositionPicker;
