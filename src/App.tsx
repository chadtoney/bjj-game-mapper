import { ReactFlowProvider } from 'reactflow';
import MindMap from './components/MindMap/MindMap';
import Sidebar from './components/Sidebar/Sidebar';
import ExportImport from './components/Controls/ExportImport';
import BugReport from './components/Controls/BugReport';

function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative">
          <MindMap />
          <ExportImport />
          <BugReport />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
