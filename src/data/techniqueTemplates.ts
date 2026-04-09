import type { TagType } from '../types';

export interface TechniqueTemplate {
  name: string;
  defaultTag: TagType;
}

export interface TechniqueCategory {
  category: string;
  emoji: string;
  techniques: TechniqueTemplate[];
}

export const TECHNIQUE_TEMPLATES: TechniqueCategory[] = [
  {
    category: 'Submissions',
    emoji: '🔴',
    techniques: [
      { name: 'Arm Triangle', defaultTag: 'submission' },
      { name: 'Kimura', defaultTag: 'submission' },
      { name: 'Americana', defaultTag: 'submission' },
      { name: 'Armbar', defaultTag: 'submission' },
      { name: 'Triangle Choke', defaultTag: 'submission' },
      { name: 'Rear Naked Choke', defaultTag: 'submission' },
      { name: 'Guillotine', defaultTag: 'submission' },
      { name: 'D\'Arce Choke', defaultTag: 'submission' },
      { name: 'Anaconda Choke', defaultTag: 'submission' },
      { name: 'Ezekiel Choke', defaultTag: 'submission' },
      { name: 'Omoplata', defaultTag: 'submission' },
      { name: 'Heel Hook', defaultTag: 'submission' },
      { name: 'Knee Bar', defaultTag: 'submission' },
      { name: 'Toe Hold', defaultTag: 'submission' },
      { name: 'Straight Ankle Lock', defaultTag: 'submission' },
      { name: 'Bow and Arrow Choke', defaultTag: 'submission' },
      { name: 'Cross Collar Choke', defaultTag: 'submission' },
      { name: 'Baseball Bat Choke', defaultTag: 'submission' },
      { name: 'North-South Choke', defaultTag: 'submission' },
      { name: 'Calf Slicer', defaultTag: 'submission' },
    ],
  },
  {
    category: 'Sweeps',
    emoji: '🔵',
    techniques: [
      { name: 'Scissor Sweep', defaultTag: 'sweep' },
      { name: 'Hip Bump Sweep', defaultTag: 'sweep' },
      { name: 'Flower Sweep', defaultTag: 'sweep' },
      { name: 'Butterfly Sweep', defaultTag: 'sweep' },
      { name: 'Pendulum Sweep', defaultTag: 'sweep' },
      { name: 'Berimbolo', defaultTag: 'sweep' },
      { name: 'Tripod Sweep', defaultTag: 'sweep' },
      { name: 'Sickle Sweep', defaultTag: 'sweep' },
      { name: 'Half Guard Sweep', defaultTag: 'sweep' },
      { name: 'X-Guard Sweep', defaultTag: 'sweep' },
      { name: 'Deep Half Sweep', defaultTag: 'sweep' },
      { name: 'Hook Sweep', defaultTag: 'sweep' },
      { name: 'Waiter Sweep', defaultTag: 'sweep' },
      { name: 'Old School Sweep', defaultTag: 'sweep' },
    ],
  },
  {
    category: 'Guard Passes',
    emoji: '🟢',
    techniques: [
      { name: 'Knee Slice Pass', defaultTag: 'pass' },
      { name: 'Torreando Pass', defaultTag: 'pass' },
      { name: 'Over-Under Pass', defaultTag: 'pass' },
      { name: 'Leg Drag Pass', defaultTag: 'pass' },
      { name: 'Stack Pass', defaultTag: 'pass' },
      { name: 'Body Lock Pass', defaultTag: 'pass' },
      { name: 'Double Under Pass', defaultTag: 'pass' },
      { name: 'Smash Pass', defaultTag: 'pass' },
      { name: 'X-Pass', defaultTag: 'pass' },
      { name: 'Long Step Pass', defaultTag: 'pass' },
    ],
  },
  {
    category: 'Escapes',
    emoji: '🟡',
    techniques: [
      { name: 'Hip Escape (Shrimp)', defaultTag: 'escape' },
      { name: 'Bridge and Roll', defaultTag: 'escape' },
      { name: 'Elbow Escape', defaultTag: 'escape' },
      { name: 'Trap and Roll', defaultTag: 'escape' },
      { name: 'Frame and Escape', defaultTag: 'escape' },
      { name: 'Granby Roll', defaultTag: 'escape' },
      { name: 'Sit Out', defaultTag: 'escape' },
      { name: 'Back Escape', defaultTag: 'escape' },
      { name: 'Leg Pummel', defaultTag: 'escape' },
      { name: 'Wrestling Up', defaultTag: 'escape' },
    ],
  },
  {
    category: 'Transitions',
    emoji: '🟣',
    techniques: [
      { name: 'Guard Pull', defaultTag: 'transition' },
      { name: 'Knee Slide', defaultTag: 'transition' },
      { name: 'Mount Transition', defaultTag: 'transition' },
      { name: 'Back Take', defaultTag: 'transition' },
      { name: 'Leg Weave', defaultTag: 'transition' },
      { name: 'Knee on Belly', defaultTag: 'transition' },
      { name: 'North-South Transition', defaultTag: 'transition' },
      { name: 'Arm Drag', defaultTag: 'transition' },
      { name: 'Reguard', defaultTag: 'transition' },
      { name: 'Inversion', defaultTag: 'transition' },
    ],
  },
  {
    category: 'Takedowns',
    emoji: '⬇️',
    techniques: [
      { name: 'Double Leg Takedown', defaultTag: 'transition' },
      { name: 'Single Leg Takedown', defaultTag: 'transition' },
      { name: 'Osoto Gari', defaultTag: 'transition' },
      { name: 'Seoi Nage', defaultTag: 'transition' },
      { name: 'Ankle Pick', defaultTag: 'transition' },
      { name: 'Snap Down', defaultTag: 'transition' },
      { name: 'Body Lock Takedown', defaultTag: 'transition' },
      { name: 'Uchi Mata', defaultTag: 'transition' },
    ],
  },
];
