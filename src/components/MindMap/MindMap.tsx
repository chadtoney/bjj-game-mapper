import { useCallback, useEffect, useRef, useState } from 'react';
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
import ContextMenu, { type ContextMenuItem } from './ContextMenu';

const nodeTypes: NodeTypes = {
  positionNode: PositionNode,
};

const edgeTypes: EdgeTypes = {
  default: TransitionEdge,
};

const LONG_PRESS_MS = 500;
const MOVE_THRESHOLD = 10;

type MenuTarget =
  | { kind: 'node'; id: string }
  | { kind: 'edge'; id: string };

const MindMap = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setSelectedEdge,
    deleteNode,
    duplicateNode,
    deleteEdge,
    reverseEdge,
    addNode,
    loadFromStorage,
  } = useGameStore();

  // Load data from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // ---- Context menu state ----
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [menuTarget, setMenuTarget] = useState<MenuTarget | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStart = useRef<{ x: number; y: number } | null>(null);
  // Track the target so the pointerup handler knows what was long-pressed
  const pressTarget = useRef<MenuTarget | null>(null);

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    pressStart.current = null;
    pressTarget.current = null;
  }, []);

  const closeMenu = useCallback(() => {
    setMenuPos(null);
    setMenuTarget(null);
  }, []);

  // Cancel long-press if user moves too far; clear on pointer-up
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!pressStart.current) return;
      const dx = e.clientX - pressStart.current.x;
      const dy = e.clientY - pressStart.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > MOVE_THRESHOLD) {
        clearLongPress();
      }
    };
    const handlePointerUp = () => clearLongPress();
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [clearLongPress]);

  // Attach pointerdown listeners to react-flow nodes/edges for long-press
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Walk up from the target to find a node or edge element
      let el = e.target as HTMLElement | null;
      let nodeId: string | null = null;
      let edgeId: string | null = null;

      while (el && el !== container) {
        if (el.getAttribute('data-testid')?.startsWith('rf__node-')) {
          nodeId = el.getAttribute('data-testid')!.replace('rf__node-', '');
          break;
        }
        // React Flow nodes have data-id attribute
        if (el.classList.contains('react-flow__node')) {
          nodeId = el.getAttribute('data-id');
          break;
        }
        // Edge click targets are inside .react-flow__edge
        if (el.classList.contains('react-flow__edge')) {
          edgeId = el.getAttribute('data-testid')?.replace('rf__edge-', '') || el.getAttribute('data-id') || null;
          break;
        }
        el = el.parentElement;
      }

      if (!nodeId && !edgeId) return;

      const target: MenuTarget = nodeId
        ? { kind: 'node', id: nodeId }
        : { kind: 'edge', id: edgeId! };

      pressStart.current = { x: e.clientX, y: e.clientY };
      pressTarget.current = target;
      longPressTimer.current = setTimeout(() => {
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuTarget(target);
        longPressTimer.current = null;
      }, LONG_PRESS_MS);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    return () => container.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  // ---- ReactFlow event handlers ----
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode],
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setSelectedEdge(edge.id);
    },
    [setSelectedEdge],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
    closeMenu();
  }, [setSelectedNode, setSelectedEdge, closeMenu]);

  // Right-click / context menu on nodes and edges
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setMenuPos({ x: event.clientX, y: event.clientY });
      setMenuTarget({ kind: 'node', id: node.id });
    },
    [],
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setMenuPos({ x: event.clientX, y: event.clientY });
      setMenuTarget({ kind: 'edge', id: edge.id });
    },
    [],
  );

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
    [addNode],
  );

  // ---- Build menu items based on target ----
  const menuItems: ContextMenuItem[] = (() => {
    if (!menuTarget) return [];

    if (menuTarget.kind === 'node') {
      const id = menuTarget.id;
      return [
        {
          label: 'Edit',
          icon: '✏️',
          onClick: () => setSelectedNode(id),
        },
        {
          label: 'Delete',
          icon: '🗑️',
          onClick: () => deleteNode(id),
        },
        {
          label: 'Duplicate',
          icon: '📋',
          onClick: () => duplicateNode(id),
        },
        {
          label: 'Connect',
          icon: '🔗',
          onClick: () => {
            // Select the node so the user can drag a handle to connect
            setSelectedNode(id);
          },
        },
      ];
    }

    // Edge menu
    const id = menuTarget.id;
    return [
      {
        label: 'Edit',
        icon: '✏️',
        onClick: () => setSelectedEdge(id),
      },
      {
        label: 'Delete',
        icon: '🗑️',
        onClick: () => deleteEdge(id),
      },
      {
        label: 'Reverse',
        icon: '🔄',
        onClick: () => reverseEdge(id),
      },
    ];
  })();

  return (
    <div ref={containerRef} className="h-full w-full">
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
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
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
            Long-press or right-click a node/edge for actions
          </div>
        </Panel>
      </ReactFlow>

      {menuPos && menuTarget && (
        <ContextMenu
          x={menuPos.x}
          y={menuPos.y}
          items={menuItems}
          onClose={closeMenu}
        />
      )}
    </div>
  );
};

export default MindMap;
