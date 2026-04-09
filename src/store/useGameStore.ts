import { create } from 'zustand';
import { addEdge as addReactFlowEdge, applyNodeChanges, applyEdgeChanges, type NodeChange, type EdgeChange, type Edge, type Connection } from 'reactflow';
import type { GameMapState, PositionNode, TransitionEdge, UndoSnapshot } from '../types';
import { DEFAULT_TAGS } from '../types';
import { saveToLocalStorage, loadFromLocalStorage, exportToJSON, importFromJSON } from '../utils/storage';
import { DEFAULT_POSITIONS } from '../utils/defaultPositions';

const MAX_UNDO_STACK = 10;

const takeSnapshot = (state: { nodes: PositionNode[]; edges: TransitionEdge[]; tags: typeof DEFAULT_TAGS }): UndoSnapshot => ({
  nodes: structuredClone(state.nodes),
  edges: structuredClone(state.edges),
  tags: structuredClone(state.tags),
});

export const useGameStore = create<GameMapState & {
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  pushUndo: () => void;
}>((set, get) => ({
  nodes: [],
  edges: [],
  tags: DEFAULT_TAGS,
  selectedNodeId: null,
  selectedEdgeId: null,
  filterTags: [],
  undoStack: [],
  redoStack: [],

  // Push current state onto undo stack (internal helper)
  pushUndo: () => {
    const { nodes, edges, tags, undoStack } = get();
    const snapshot = takeSnapshot({ nodes, edges, tags });
    const newStack = [...undoStack, snapshot].slice(-MAX_UNDO_STACK);
    set({ undoStack: newStack, redoStack: [] });
  },

  // React Flow handlers
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as PositionNode[],
    });
    get().saveToStorage();
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges as Edge[]) as TransitionEdge[],
    });
    get().saveToStorage();
  },

  onConnect: (connection: Connection) => {
    get().pushUndo();
    const newEdge: TransitionEdge = {
      ...connection,
      id: `e${connection.source}-${connection.target}-${Date.now()}`,
      source: connection.source || '',
      target: connection.target || '',
      data: {
        technique: '',
        tags: [],
        notes: '',
      },
    };
    set({
      edges: addReactFlowEdge(newEdge as Edge, get().edges as Edge[]) as TransitionEdge[],
    });
    get().saveToStorage();
  },

  // Node actions
  addNode: (position, label) => {
    get().pushUndo();
    const newNode: PositionNode = {
      id: `node-${Date.now()}`,
      type: 'positionNode',
      position,
      data: {
        label,
        tags: [],
        description: '',
        notes: '',
      },
    };
    set({ nodes: [...get().nodes, newNode] });
    get().saveToStorage();
  },

  updateNode: (id, data) => {
    get().pushUndo();
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
    get().saveToStorage();
  },

  deleteNode: (id) => {
    get().pushUndo();
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
    get().saveToStorage();
  },

  setNodes: (nodes) => {
    set({ nodes });
    get().saveToStorage();
  },

  // Edge actions
  addEdge: (edge) => {
    get().pushUndo();
    set({ edges: [...get().edges, edge] });
    get().saveToStorage();
  },

  updateEdge: (id, data) => {
    get().pushUndo();
    set({
      edges: get().edges.map((edge) =>
        edge.id === id 
          ? { ...edge, data: { technique: data?.technique ?? edge.data?.technique ?? '', tags: data?.tags || edge.data?.tags || [], notes: data?.notes ?? edge.data?.notes ?? '' } } 
          : edge
      ),
    });
    get().saveToStorage();
  },

  deleteEdge: (id) => {
    get().pushUndo();
    set({
      edges: get().edges.filter((edge) => edge.id !== id),
      selectedEdgeId: get().selectedEdgeId === id ? null : get().selectedEdgeId,
    });
    get().saveToStorage();
  },

  setEdges: (edges) => {
    set({ edges });
    get().saveToStorage();
  },

  // Tag actions
  addTag: (tag) => {
    get().pushUndo();
    set({ tags: [...get().tags, tag] });
    get().saveToStorage();
  },

  deleteTag: (id) => {
    get().pushUndo();
    set({
      tags: get().tags.filter((tag) => tag.id !== id),
    });
    get().saveToStorage();
  },

  // Selection actions
  setSelectedNode: (id) => {
    set({ selectedNodeId: id, selectedEdgeId: null });
  },

  setSelectedEdge: (id) => {
    set({ selectedEdgeId: id, selectedNodeId: null });
  },

  // Filter actions
  setFilterTags: (tags) => {
    set({ filterTags: tags });
  },

  // Undo/redo actions
  undo: () => {
    const { undoStack, nodes, edges, tags } = get();
    if (undoStack.length === 0) return;
    const currentSnapshot = takeSnapshot({ nodes, edges, tags });
    const newUndoStack = [...undoStack];
    const previous = newUndoStack.pop()!;
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      tags: previous.tags,
      undoStack: newUndoStack,
      redoStack: [...get().redoStack, currentSnapshot].slice(-MAX_UNDO_STACK),
      selectedNodeId: null,
      selectedEdgeId: null,
    });
    get().saveToStorage();
  },

  redo: () => {
    const { redoStack, nodes, edges, tags } = get();
    if (redoStack.length === 0) return;
    const currentSnapshot = takeSnapshot({ nodes, edges, tags });
    const newRedoStack = [...redoStack];
    const next = newRedoStack.pop()!;
    set({
      nodes: next.nodes,
      edges: next.edges,
      tags: next.tags,
      redoStack: newRedoStack,
      undoStack: [...get().undoStack, currentSnapshot].slice(-MAX_UNDO_STACK),
      selectedNodeId: null,
      selectedEdgeId: null,
    });
    get().saveToStorage();
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,

  // Persistence actions
  exportData: () => {
    const { nodes, edges, tags } = get();
    return exportToJSON({ nodes, edges, tags });
  },

  importData: (data) => {
    get().pushUndo();
    try {
      const parsed = importFromJSON(data);
      if (parsed) {
        set({
          nodes: parsed.nodes || [],
          edges: parsed.edges || [],
          tags: parsed.tags || DEFAULT_TAGS,
        });
        get().saveToStorage();
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
  },

  loadFromStorage: () => {
    const stored = loadFromLocalStorage();
    if (stored) {
      set({
        nodes: stored.nodes || [],
        edges: stored.edges || [],
        tags: stored.tags || DEFAULT_TAGS,
      });
    } else {
      // Initialize with default positions
      const defaultNodes: PositionNode[] = DEFAULT_POSITIONS.map((pos, idx) => ({
        ...pos,
        id: `default-${idx}`,
      }));
      set({ nodes: defaultNodes, edges: [], tags: DEFAULT_TAGS });
      get().saveToStorage();
    }
  },

  saveToStorage: () => {
    const { nodes, edges, tags } = get();
    saveToLocalStorage({ nodes, edges, tags });
  },
}));
