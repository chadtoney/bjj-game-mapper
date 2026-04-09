import { useCallback, useEffect, useState } from 'react';
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
import AddPositionModal from './AddPositionModal';
import { useLongPress } from '../../hooks/useLongPress';

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

  // --- Long-press to add position ---
  const [pendingPosition, setPendingPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onLongPress = useCallback(
    (e: React.PointerEvent) => {
      // Only trigger on the background pane, not on nodes or edges
      const target = e.target as HTMLElement;
      if (!target.classList.contains('react-flow__pane')) return;

      const reactFlowBounds = target
        .closest('.react-flow')
        ?.getBoundingClientRect();

      if (reactFlowBounds) {
        setPendingPosition({
          x: e.clientX - reactFlowBounds.left - 75,
          y: e.clientY - reactFlowBounds.top - 25,
        });
      }
    },
    [],
  );

  const longPressHandlers = useLongPress(onLongPress);

  const handleModalConfirm = useCallback(
    (label: string) => {
      if (pendingPosition) {
        addNode(pendingPosition, label);
      }
      setPendingPosition(null);
    },
    [addNode, pendingPosition],
  );

  const handleModalCancel = useCallback(() => {
    setPendingPosition(null);
  }, []);

  const existingLabels = nodes.map((n) => n.data.label);

  return (
    <div className="h-full w-full" {...longPressHandlers}>
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
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
            💡 Long-press canvas to add a BJJ position
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Drag from a node&apos;s edge to create a connection
          </div>
        </Panel>
      </ReactFlow>

      {pendingPosition && (
        <AddPositionModal
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          existingLabels={existingLabels}
        />
      )}
    </div>
  );
};

export default MindMap;
