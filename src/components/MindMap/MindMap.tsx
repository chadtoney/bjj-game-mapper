import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
  type NodeTypes,
  type EdgeTypes,
  type Node,
  type Edge,
  type OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useGameStore } from '../../store/useGameStore';
import PositionNode from './PositionNode';
import TransitionEdge from './TransitionEdge';
import Legend from './Legend';

const nodeTypes: NodeTypes = {
  positionNode: PositionNode,
};

const edgeTypes: EdgeTypes = {
  default: TransitionEdge,
};

const MindMap = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge,
    addNode,
    loadFromStorage,
  } = useGameStore();

  const reactFlowInstance = useReactFlow();

  // Load data from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setSelectedEdge(edge.id);
    },
    [setSelectedEdge]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [setSelectedNode, setSelectedEdge]);

  const onPaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const label = prompt('Enter position name:');
      if (label) {
        addNode(position, label);
      }
    },
    [addNode, reactFlowInstance]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect as OnConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        onDoubleClick={onPaneDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        {/* SVG arrow marker definition */}
        <svg>
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#6B7280" />
            </marker>
          </defs>
        </svg>
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.selected) return '#3B82F6';
            const data = node.data as { tags?: { color: string }[] };
            if (data?.tags?.[0]?.color) return data.tags[0].color;
            return '#E5E7EB';
          }}
          className="!bg-gray-50 !border-gray-300"
        />
        <Panel position="top-left" className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium text-gray-700">
            💡 Double-click canvas to add position
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Drag from node handle to create connection
          </div>
        </Panel>
        <Panel position="top-right">
          <Legend />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default MindMap;
