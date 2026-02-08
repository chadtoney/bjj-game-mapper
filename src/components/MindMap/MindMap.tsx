import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
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
      const reactFlowBounds = (event.target as HTMLElement)
        .closest('.react-flow')
        ?.getBoundingClientRect();

      if (reactFlowBounds) {
        const position = {
          x: event.clientX - reactFlowBounds.left - 75,
          y: event.clientY - reactFlowBounds.top - 25,
        };
        const label = prompt('Enter position name:');
        if (label) {
          addNode(position, label);
        }
      }
    },
    [addNode]
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
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.selected) return '#3B82F6';
            return '#E5E7EB';
          }}
          className="!bg-gray-50 !border-gray-300"
        />
        <Panel position="top-left" className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium text-gray-700">
            💡 Double-click canvas to add position
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Drag from node edge to create connection
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default MindMap;
