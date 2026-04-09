import type { Node, Edge } from 'reactflow';

// Tag types for categorizing positions and transitions
export type TagType = 'sweep' | 'submission' | 'pass' | 'escape' | 'transition' | 'custom';

// Tag interface
export interface Tag {
  id: string;
  name: string;
  type: TagType;
  color: string;
}

// BJJ Position data that extends React Flow Node
export interface PositionNode extends Node {
  data: {
    label: string;
    description?: string;
    tags: Tag[];
    notes?: string;
  };
}

// Transition between positions that extends React Flow Edge
export type TransitionEdge = Edge & {
  id: string;
  source: string;
  target: string;
  data?: {
    technique?: string;
    tags: Tag[];
    notes?: string;
  };
};

// Snapshot for undo/redo stack
export interface UndoSnapshot {
  nodes: PositionNode[];
  edges: TransitionEdge[];
  tags: Tag[];
}

// Store state interface
export interface GameMapState {
  nodes: PositionNode[];
  edges: TransitionEdge[];
  tags: Tag[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  filterTags: string[];
  
  // Undo/redo state
  undoStack: UndoSnapshot[];
  redoStack: UndoSnapshot[];
  
  // Node actions
  addNode: (position: { x: number; y: number }, label: string) => void;
  updateNode: (id: string, data: Partial<PositionNode['data']>) => void;
  deleteNode: (id: string) => void;
  setNodes: (nodes: PositionNode[]) => void;
  
  // Edge actions
  addEdge: (edge: TransitionEdge) => void;
  updateEdge: (id: string, data: Partial<TransitionEdge['data']>) => void;
  deleteEdge: (id: string) => void;
  setEdges: (edges: TransitionEdge[]) => void;
  
  // Tag actions
  addTag: (tag: Tag) => void;
  deleteTag: (id: string) => void;
  
  // Selection actions
  setSelectedNode: (id: string | null) => void;
  setSelectedEdge: (id: string | null) => void;
  
  // Filter actions
  setFilterTags: (tags: string[]) => void;
  
  // Undo/redo actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Persistence actions
  exportData: () => string;
  importData: (data: string) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

// Default tag definitions
export const DEFAULT_TAGS: Tag[] = [
  { id: 'sweep', name: 'Sweep', type: 'sweep', color: '#3B82F6' },
  { id: 'submission', name: 'Submission', type: 'submission', color: '#EF4444' },
  { id: 'pass', name: 'Pass', type: 'pass', color: '#10B981' },
  { id: 'escape', name: 'Escape', type: 'escape', color: '#F59E0B' },
  { id: 'transition', name: 'Transition', type: 'transition', color: '#8B5CF6' },
];
