import type { PositionNode } from '../types';

// Default BJJ positions to start with
export const DEFAULT_POSITIONS: Omit<PositionNode, 'id'>[] = [
  {
    type: 'default',
    position: { x: 250, y: 50 },
    data: { label: 'Standing', tags: [], description: 'Standing position - start of the match' },
  },
  {
    type: 'default',
    position: { x: 100, y: 200 },
    data: { label: 'Closed Guard', tags: [], description: 'Bottom player has legs wrapped around top player' },
  },
  {
    type: 'default',
    position: { x: 400, y: 200 },
    data: { label: 'Open Guard', tags: [], description: 'Bottom player has open guard position' },
  },
  {
    type: 'default',
    position: { x: 250, y: 350 },
    data: { label: 'Half Guard', tags: [], description: 'One leg trapped between opponent\'s legs' },
  },
  {
    type: 'default',
    position: { x: 100, y: 500 },
    data: { label: 'Side Control (Top)', tags: [], description: 'Top player controlling from the side' },
  },
  {
    type: 'default',
    position: { x: 400, y: 500 },
    data: { label: 'Side Control (Bottom)', tags: [], description: 'Bottom player being controlled from the side' },
  },
  {
    type: 'default',
    position: { x: 100, y: 650 },
    data: { label: 'Mount (Top)', tags: [], description: 'Top player sitting on opponent\'s torso' },
  },
  {
    type: 'default',
    position: { x: 400, y: 650 },
    data: { label: 'Mount (Bottom)', tags: [], description: 'Bottom player being mounted' },
  },
  {
    type: 'default',
    position: { x: 250, y: 800 },
    data: { label: 'Back Control', tags: [], description: 'Controlling opponent\'s back' },
  },
  {
    type: 'default',
    position: { x: 550, y: 350 },
    data: { label: 'Knee on Belly', tags: [], description: 'Top player with knee on opponent\'s belly' },
  },
  {
    type: 'default',
    position: { x: 550, y: 500 },
    data: { label: 'Turtle', tags: [], description: 'Defensive position on hands and knees' },
  },
];
