import { useGameStore } from '../../store/useGameStore';

const TagFilter = () => {
  const { tags, filterTags, setFilterTags } = useGameStore();

  const toggleTag = (tagId: string) => {
    if (filterTags.includes(tagId)) {
      setFilterTags(filterTags.filter((id) => id !== tagId));
    } else {
      setFilterTags([...filterTags, tagId]);
    }
  };

  const clearFilters = () => {
    setFilterTags([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Filter by Tags</h3>
        {filterTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 min-h-[44px] min-w-[44px]"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = filterTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'text-gray-800 ring-2 ring-offset-2 border border-gray-300'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={
                isActive
                  ? { backgroundColor: tag.color }
                  : {}
              }
            >
              {tag.name}
            </button>
          );
        })}
      </div>
      {filterTags.length > 0 && (
        <div className="text-xs text-gray-600 mt-2">
          Filtering by {filterTags.length} tag(s)
        </div>
      )}
    </div>
  );
};

export default TagFilter;
