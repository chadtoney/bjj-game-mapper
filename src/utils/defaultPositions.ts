import type { PositionNode, TransitionEdge } from '../types';
import { DEFAULT_TAGS } from '../types';

const positionTag = DEFAULT_TAGS.find((t) => t.id === 'position')!;
const submissionTag = DEFAULT_TAGS.find((t) => t.id === 'submission')!;
const sweepTag = DEFAULT_TAGS.find((t) => t.id === 'sweep')!;
const passTag = DEFAULT_TAGS.find((t) => t.id === 'pass')!;
const takedownTag = DEFAULT_TAGS.find((t) => t.id === 'takedown')!;
const escapeTag = DEFAULT_TAGS.find((t) => t.id === 'escape')!;

// Default BJJ positions to start with
export const DEFAULT_POSITIONS: Omit<PositionNode, 'id'>[] = [
  // Standup section
  {
    type: 'positionNode',
    position: { x: 0, y: 0 },
    data: { label: 'Standing', tags: [positionTag], description: 'Starting position' },
  },
  {
    type: 'positionNode',
    position: { x: 200, y: -50 },
    data: { label: 'Single Leg', tags: [takedownTag], description: 'Single leg takedown' },
  },
  {
    type: 'positionNode',
    position: { x: 200, y: 50 },
    data: { label: 'Double Leg', tags: [takedownTag], description: 'Double leg takedown' },
  },
  // Guard section
  {
    type: 'positionNode',
    position: { x: 0, y: 200 },
    data: { label: 'Closed Guard', tags: [positionTag], description: 'Bottom player has legs wrapped' },
  },
  {
    type: 'positionNode',
    position: { x: 250, y: 200 },
    data: { label: 'Open Guard', tags: [positionTag], description: 'Open guard position' },
  },
  {
    type: 'positionNode',
    position: { x: 0, y: 350 },
    data: { label: 'Half Guard', tags: [positionTag], description: 'One leg trapped' },
  },
  // Techniques from guard
  {
    type: 'positionNode',
    position: { x: -200, y: 280 },
    data: { label: 'Scissor Sweep', tags: [sweepTag], description: 'Sweep from closed guard' },
  },
  {
    type: 'positionNode',
    position: { x: -200, y: 200 },
    data: { label: 'Triangle', tags: [submissionTag], description: 'Triangle choke from guard' },
  },
  {
    type: 'positionNode',
    position: { x: -200, y: 350 },
    data: { label: 'Armbar', tags: [submissionTag], description: 'Armbar from guard' },
  },
  // Top game section
  {
    type: 'positionNode',
    position: { x: 550, y: 100 },
    data: { label: 'Side Control', tags: [positionTag], description: 'Controlling from the side' },
  },
  {
    type: 'positionNode',
    position: { x: 550, y: 250 },
    data: { label: 'Mount', tags: [positionTag], description: 'Mounted position' },
  },
  {
    type: 'positionNode',
    position: { x: 550, y: 400 },
    data: { label: 'Back Control', tags: [positionTag], description: 'Controlling opponent\'s back' },
  },
  {
    type: 'positionNode',
    position: { x: 550, y: -50 },
    data: { label: 'Knee on Belly', tags: [positionTag], description: 'Knee on opponent\'s belly' },
  },
  // Submissions from top
  {
    type: 'positionNode',
    position: { x: 800, y: 100 },
    data: { label: 'Americana', tags: [submissionTag], description: 'Americana from side control' },
  },
  {
    type: 'positionNode',
    position: { x: 800, y: 250 },
    data: { label: 'Cross Choke', tags: [submissionTag], description: 'Cross choke from mount' },
  },
  {
    type: 'positionNode',
    position: { x: 800, y: 400 },
    data: { label: 'RNC', tags: [submissionTag], description: 'Rear naked choke' },
  },
  // Guard passing
  {
    type: 'positionNode',
    position: { x: 450, y: 200 },
    data: { label: 'Knee Cut Pass', tags: [passTag], description: 'Knee cut guard pass' },
  },
  // Escapes
  {
    type: 'positionNode',
    position: { x: 350, y: 350 },
    data: { label: 'Hip Escape', tags: [escapeTag], description: 'Shrimp escape from side control' },
  },
];

// Default edges connecting positions
export const DEFAULT_EDGES: Omit<TransitionEdge, 'id'>[] = [
  // Standing → Takedowns
  { source: 'default-0', target: 'default-1', data: { technique: '', tags: [], notes: '' } },
  { source: 'default-0', target: 'default-2', data: { technique: '', tags: [], notes: '' } },
  // Takedowns → Guard / Top
  { source: 'default-1', target: 'default-9', data: { technique: '', tags: [], notes: '' } },
  { source: 'default-2', target: 'default-9', data: { technique: '', tags: [], notes: '' } },
  // Standing → Guard (pull guard)
  { source: 'default-0', target: 'default-3', data: { technique: 'Pull Guard', tags: [], notes: '' } },
  // Closed Guard → techniques
  { source: 'default-3', target: 'default-6', data: { technique: '', tags: [], notes: '' } },
  { source: 'default-3', target: 'default-7', data: { technique: '', tags: [], notes: '' } },
  { source: 'default-3', target: 'default-8', data: { technique: '', tags: [], notes: '' } },
  // Open Guard → Guard Pass → Side Control
  { source: 'default-4', target: 'default-16', data: { technique: '', tags: [], notes: '' } },
  { source: 'default-16', target: 'default-9', data: { technique: '', tags: [], notes: '' } },
  // Side Control → Mount
  { source: 'default-9', target: 'default-10', data: { technique: '', tags: [], notes: '' } },
  // Side Control → Knee on Belly
  { source: 'default-9', target: 'default-12', data: { technique: '', tags: [], notes: '' } },
  // Mount → Back Control
  { source: 'default-10', target: 'default-11', data: { technique: '', tags: [], notes: '' } },
  // Side Control → Americana
  { source: 'default-9', target: 'default-13', data: { technique: '', tags: [], notes: '' } },
  // Mount → Cross Choke
  { source: 'default-10', target: 'default-14', data: { technique: '', tags: [], notes: '' } },
  // Back Control → RNC
  { source: 'default-11', target: 'default-15', data: { technique: '', tags: [], notes: '' } },
  // Scissor Sweep → Mount (sweep result)
  { source: 'default-6', target: 'default-10', data: { technique: '', tags: [], notes: '' } },
  // Closed Guard → Half Guard
  { source: 'default-3', target: 'default-5', data: { technique: '', tags: [], notes: '' } },
  // Open Guard → Closed Guard
  { source: 'default-4', target: 'default-3', data: { technique: '', tags: [], notes: '' } },
  // Hip Escape from side control → Half Guard
  { source: 'default-17', target: 'default-5', data: { technique: '', tags: [], notes: '' } },
  // Side Control → Hip Escape
  { source: 'default-9', target: 'default-17', data: { technique: '', tags: [], notes: '' } },
];
