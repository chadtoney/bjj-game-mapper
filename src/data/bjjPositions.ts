// Hierarchical BJJ position data for the position picker

export interface PositionCategory {
  name: string;
  children?: PositionCategory[];
  /** Leaf node position name (when no children) */
  position?: string;
}

export const BJJ_POSITION_HIERARCHY: PositionCategory[] = [
  {
    name: 'Guards',
    children: [
      { name: 'Closed Guard', position: 'Closed Guard' },
      {
        name: 'Open Guards',
        children: [
          { name: 'De La Riva', position: 'De La Riva' },
          { name: 'Reverse De La Riva', position: 'Reverse De La Riva' },
          { name: 'Spider Guard', position: 'Spider Guard' },
          { name: 'Lasso Guard', position: 'Lasso Guard' },
          { name: 'Collar Sleeve', position: 'Collar Sleeve' },
          { name: 'X-Guard', position: 'X-Guard' },
          { name: 'Single Leg X', position: 'Single Leg X' },
        ],
      },
      {
        name: 'Half Guards',
        children: [
          { name: 'Standard Half Guard', position: 'Half Guard' },
          { name: 'Deep Half', position: 'Deep Half' },
          { name: 'Z-Guard (Knee Shield)', position: 'Z-Guard' },
          { name: 'Lockdown', position: 'Lockdown' },
        ],
      },
      { name: 'Butterfly Guard', position: 'Butterfly Guard' },
      { name: 'Rubber Guard', position: 'Rubber Guard' },
      { name: 'Worm Guard', position: 'Worm Guard' },
      { name: '50/50', position: '50/50' },
    ],
  },
  {
    name: 'Top Positions',
    children: [
      { name: 'Mount', position: 'Mount' },
      { name: 'Side Control', position: 'Side Control' },
      { name: 'Knee on Belly', position: 'Knee on Belly' },
      { name: 'North-South', position: 'North-South' },
      { name: 'Back Control', position: 'Back Control' },
    ],
  },
  {
    name: 'Bottom Positions',
    children: [
      { name: 'Mount (Bottom)', position: 'Mount (Bottom)' },
      { name: 'Side Control (Bottom)', position: 'Side Control (Bottom)' },
      { name: 'Turtle (Bottom)', position: 'Turtle (Bottom)' },
      { name: 'Back (Defending)', position: 'Back (Defending)' },
    ],
  },
  {
    name: 'Standing',
    children: [
      { name: 'Neutral', position: 'Standing' },
      {
        name: 'Clinch',
        children: [
          { name: 'Over-Under', position: 'Over-Under Clinch' },
          { name: 'Double Underhooks', position: 'Double Underhooks' },
          { name: 'Single Collar Tie', position: 'Single Collar Tie' },
        ],
      },
      { name: 'Turtle (Top)', position: 'Turtle (Top)' },
    ],
  },
  {
    name: 'Submissions (as positions)',
    children: [
      {
        name: 'Arm Attacks',
        children: [
          { name: 'Armbar', position: 'Armbar' },
          { name: 'Kimura', position: 'Kimura' },
          { name: 'Americana', position: 'Americana' },
          { name: 'Omoplata', position: 'Omoplata' },
        ],
      },
      {
        name: 'Chokes',
        children: [
          { name: 'Rear Naked Choke', position: 'RNC' },
          { name: 'Triangle', position: 'Triangle' },
          { name: 'Guillotine', position: 'Guillotine' },
          { name: 'D\'Arce', position: 'D\'Arce' },
          { name: 'Anaconda', position: 'Anaconda' },
          { name: 'Cross Choke', position: 'Cross Choke' },
          { name: 'Ezekiel Choke', position: 'Ezekiel' },
        ],
      },
      {
        name: 'Leg Attacks',
        children: [
          { name: 'Straight Ankle Lock', position: 'Straight Ankle Lock' },
          { name: 'Heel Hook', position: 'Heel Hook' },
          { name: 'Knee Bar', position: 'Knee Bar' },
          { name: 'Toe Hold', position: 'Toe Hold' },
          { name: 'Calf Slicer', position: 'Calf Slicer' },
        ],
      },
    ],
  },
];

/**
 * Flattens the hierarchy into a list of all selectable positions
 * for use in search/filter.
 */
export function getAllPositions(categories: PositionCategory[] = BJJ_POSITION_HIERARCHY): string[] {
  const positions: string[] = [];
  for (const cat of categories) {
    if (cat.position) {
      positions.push(cat.position);
    }
    if (cat.children) {
      positions.push(...getAllPositions(cat.children));
    }
  }
  return positions;
}
