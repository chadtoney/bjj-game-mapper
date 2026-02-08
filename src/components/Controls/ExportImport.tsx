import { useGameStore } from '../../store/useGameStore';
import { downloadJSON } from '../../utils/storage';

const ExportImport = () => {
  const { nodes, edges, tags, importData } = useGameStore();

  const handleExport = () => {
    downloadJSON({ nodes, edges, tags });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = event.target?.result as string;
            importData(jsonData);
            alert('Data imported successfully!');
          } catch {
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      importData(JSON.stringify({ nodes: [], edges: [], tags }));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
        title="Export game map to JSON file"
      >
        📥 Export
      </button>
      <button
        onClick={handleImport}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
        title="Import game map from JSON file"
      >
        📤 Import
      </button>
      <button
        onClick={handleClear}
        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
        title="Clear all positions and transitions"
      >
        🗑️ Clear All
      </button>
    </div>
  );
};

export default ExportImport;
