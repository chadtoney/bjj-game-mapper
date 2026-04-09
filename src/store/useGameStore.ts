import { create } from 'zustand';
import { addEdge as addReactFlowEdge, applyNodeChanges, applyEdgeChanges, type NodeChange, type EdgeChange, type Edge, type Connection } from 'reactflow';
import type { GameMapState, PositionNode, TransitionEdge, DrillSequence } from '../types';
import { DEFAULT_TAGS } from '../types';
import { saveToLocalStorage, loadFromLocalStorage, exportToJSON, importFromJSON } from '../utils/storage';
import { DEFAULT_POSITIONS } from '../utils/defaultPositions';

export const useGameStore = create<GameMapState & {
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}>((set, get) => ({
  nodes: [],
  edges: [],
  tags: DEFAULT_TAGS,
  selectedNodeId: null,
  selectedEdgeId: null,
  filterTags: [],

  // Training mode state
  drillSequences: [],
  activeDrillId: null,
  drillStepIndex: 0,
  isTrainingMode: false,

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
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
    get().saveToStorage();
  },

  deleteNode: (id) => {
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
    set({ edges: [...get().edges, edge] });
    get().saveToStorage();
  },

  updateEdge: (id, data) => {
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
    set({ tags: [...get().tags, tag] });
    get().saveToStorage();
  },

  deleteTag: (id) => {
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

  // Training mode actions
  addDrillSequence: (name, nodeIds) => {
    const newDrill: DrillSequence = {
      id: `drill-${Date.now()}`,
      name,
      nodeIds,
    };
    set({ drillSequences: [...get().drillSequences, newDrill] });
    get().saveToStorage();
  },

  deleteDrillSequence: (id) => {
    const state = get();
    set({
      drillSequences: state.drillSequences.filter((d) => d.id !== id),
      activeDrillId: state.activeDrillId === id ? null : state.activeDrillId,
      drillStepIndex: state.activeDrillId === id ? 0 : state.drillStepIndex,
    });
    get().saveToStorage();
  },

  startDrill: (drillId) => {
    set({ activeDrillId: drillId, drillStepIndex: 0, isTrainingMode: true });
  },

  stopDrill: () => {
    set({ activeDrillId: null, drillStepIndex: 0, isTrainingMode: false });
  },

  drillNext: () => {
    const { activeDrillId, drillStepIndex, drillSequences } = get();
    const drill = drillSequences.find((d) => d.id === activeDrillId);
    if (drill && drillStepIndex < drill.nodeIds.length - 1) {
      set({ drillStepIndex: drillStepIndex + 1 });
    }
  },

  drillPrev: () => {
    const { drillStepIndex } = get();
    if (drillStepIndex > 0) {
      set({ drillStepIndex: drillStepIndex - 1 });
    }
  },

  setDrillStep: (index) => {
    const { activeDrillId, drillSequences } = get();
    const drill = drillSequences.find((d) => d.id === activeDrillId);
    if (drill && index >= 0 && index < drill.nodeIds.length) {
      set({ drillStepIndex: index });
    }
  },

  setTrainingMode: (enabled) => {
    set({ isTrainingMode: enabled });
    if (!enabled) {
      set({ activeDrillId: null, drillStepIndex: 0 });
    }
  },

  // Persistence actions
  exportData: () => {
    const { nodes, edges, tags, drillSequences } = get();
    return exportToJSON({ nodes, edges, tags, drillSequences });
  },

  importData: (data) => {
    try {
      const parsed = importFromJSON(data);
      if (parsed) {
        set({
          nodes: parsed.nodes || [],
          edges: parsed.edges || [],
          tags: parsed.tags || DEFAULT_TAGS,
          drillSequences: parsed.drillSequences || [],
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
        drillSequences: stored.drillSequences || [],
      });
    } else {
      // Initialize with default positions
      const defaultNodes: PositionNode[] = DEFAULT_POSITIONS.map((pos, idx) => ({
        ...pos,
        id: `default-${idx}`,
      }));
      set({ nodes: defaultNodes, edges: [], tags: DEFAULT_TAGS, drillSequences: [] });
      get().saveToStorage();
    }
  },

  saveToStorage: () => {
    const { nodes, edges, tags, drillSequences } = get();
    saveToLocalStorage({ nodes, edges, tags, drillSequences });
  },
}));
