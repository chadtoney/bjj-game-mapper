import { useCallback, useEffect, useState } from 'react';
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
import AddPositionModal from './AddPositionModal';

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
    filterTags,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge,
    addNode,
    loadFromStorage,
  } = useGameStore();

  const { project } = useReactFlow();
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);

  // Load data from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Filter nodes by selected tags (show all if no tags selected)
  const visibleNodes = filterTags.length === 0
    ? nodes
    : nodes.filter((node) =>
        node.data.tags.some((tag) => filterTags.includes(tag.id))
      );

  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  // Hide edges whose source or target node is filtered out
  const visibleEdges = filterTags.length === 0
    ? edges
    : edges.filter(
        (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
      );

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

  const onCanvasDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      // Only trigger on the background pane, not on nodes or edges
      const target = event.target as HTMLElement;
      if (!target.classList.contains('react-flow__pane')) return;

      // Convert screen coordinates to flow coordinates so position is
      // accurate regardless of the current zoom/pan state.
      const flowPosition = project({
        x: event.clientX,
        y: event.clientY,
      });
      setPendingPosition(flowPosition);
    },
    [project]
  );

  const handleModalConfirm = useCallback(
    (label: string) => {
      if (pendingPosition) {
        addNode(pendingPosition, label);
      }
      setPendingPosition(null);
    },
    [addNode, pendingPosition]
  );

  const handleModalCancel = useCallback(() => {
    setPendingPosition(null);
  }, []);

  return (
    <div className="h-full w-full" onDoubleClick={onCanvasDoubleClick}>
      <ReactFlow
        nodes={visibleNodes as Node[]}
        edges={visibleEdges as Edge[]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect as OnConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnDoubleClick={false}
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
            💡 Double-click canvas to add a BJJ position
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Drag from a node's edge to create a connection
          </div>
        </Panel>
        <Panel position="top-right">
          <Legend />
        </Panel>
      </ReactFlow>

      {pendingPosition && (
        <AddPositionModal
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default MindMap;
