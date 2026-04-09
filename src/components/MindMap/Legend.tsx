import { useGameStore } from '../../store/useGameStore';

const Legend = () => {
  const { tags } = useGameStore();

  return (
    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
      <div className="text-sm font-bold text-gray-800 mb-2">Legend</div>
      <div className="space-y-1.5">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <div
              className="w-5 h-4 rounded border border-gray-400"
              style={{ backgroundColor: tag.color }}
            />
            <span className="text-xs text-gray-700">{tag.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-5 h-4 rounded border border-gray-400 bg-white" />
          <span className="text-xs text-gray-700">Untagged</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
