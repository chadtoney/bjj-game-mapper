// BJJ position context hints - maps position names to common techniques and suggestions
export interface PositionHint {
  techniques: string[];
  tip: string;
}

// Mapping of normalized position names to their common techniques
const POSITION_HINTS: Record<string, PositionHint> = {
  'closed guard': {
    techniques: ['Scissor Sweep', 'Triangle', 'Armbar', 'Hip Bump Sweep', 'Kimura', 'Guillotine', 'Omoplata', 'Cross Collar Choke'],
    tip: 'Control posture and use your hips to create angles for attacks.',
  },
  'open guard': {
    techniques: ['Spider Guard Sweep', 'De La Riva Hook', 'Lasso Guard', 'Tomahawk Sweep', 'Tripod Sweep', 'Collar Drag', 'Ankle Pick'],
    tip: 'Maintain grips and use your feet to control distance.',
  },
  'half guard': {
    techniques: ['Old School Sweep', 'Lockdown', 'Knee Shield', 'Underhook Escape', 'Dogfight', 'Electric Chair', 'Kimura Trap'],
    tip: 'Fight for the underhook and keep your opponent\'s weight off you.',
  },
  'side control (top)': {
    techniques: ['Americana', 'Kimura', 'North-South Transition', 'Mount Transition', 'Baseball Bat Choke', 'Knee on Belly', 'Paper Cutter Choke'],
    tip: 'Maintain heavy pressure and work toward submissions or advancing position.',
  },
  'side control (bottom)': {
    techniques: ['Hip Escape (Shrimp)', 'Guard Recovery', 'Underhook Escape', 'Bridge and Roll', 'Frame and Reguard', 'Ghost Escape'],
    tip: 'Create frames, protect your neck, and work to recover guard.',
  },
  'mount (top)': {
    techniques: ['Cross Collar Choke', 'Armbar', 'Americana', 'Ezekiel Choke', 'Mounted Triangle', 'Gift Wrap', 'S-Mount Transition'],
    tip: 'Stay heavy, ride the bucks, and work high mount for submissions.',
  },
  'mount (bottom)': {
    techniques: ['Trap and Roll (Upa)', 'Elbow-Knee Escape', 'Bridge to Half Guard', 'Buck and Shrimp', 'Foot Drag Escape'],
    tip: 'Protect your arms, bridge explosively, and work toward half guard.',
  },
  'back control': {
    techniques: ['Rear Naked Choke', 'Bow and Arrow Choke', 'Armbar from Back', 'Collar Choke', 'Body Triangle', 'Short Choke'],
    tip: 'Secure your hooks or body triangle and work collar or neck attacks.',
  },
  'knee on belly': {
    techniques: ['Far Side Armbar', 'Baseball Bat Choke', 'Collar Choke', 'Mount Transition', 'Back Take', 'Near Side Armbar', 'Spinning Armbar'],
    tip: 'Use your knee pressure to force reactions and capitalize on them.',
  },
  'turtle': {
    techniques: ['Clock Choke', 'Crucifix', 'Back Take', 'Front Headlock', 'Snap Down', 'Spiral Ride', 'Sit-Out Escape', 'Granby Roll'],
    tip: 'From top, work to take the back. From bottom, protect your neck and look to sit out.',
  },
  'standing': {
    techniques: ['Single Leg Takedown', 'Double Leg Takedown', 'Arm Drag', 'Collar Drag', 'Guard Pull', 'Snap Down', 'Ankle Pick', 'Foot Sweep'],
    tip: 'Establish grips, control distance, and choose your entry.',
  },
  'de la riva': {
    techniques: ['Berimbolo', 'De La Riva Sweep', 'Baby Bolo', 'Ankle Pick', 'Kiss of the Dragon', 'Back Take'],
    tip: 'Control the far leg and use your hook to off-balance your opponent.',
  },
  'spider guard': {
    techniques: ['Triangle', 'Overhead Sweep', 'Scissor Sweep', 'Armbar', 'Omoplata', 'Lasso Sweep'],
    tip: 'Use your feet in the biceps to control distance and set up sweeps.',
  },
  'butterfly guard': {
    techniques: ['Butterfly Sweep', 'Guillotine', 'Arm Drag to Back', 'X-Guard Entry', 'Elevator Sweep'],
    tip: 'Stay upright, fight for underhooks, and use your hooks to elevate.',
  },
  'x-guard': {
    techniques: ['Technical Stand Up Sweep', 'Ankle Pick', 'Overhead Sweep', 'Single Leg X Entry', 'Back Take'],
    tip: 'Control both legs and use leverage to sweep or stand up.',
  },
  'north-south': {
    techniques: ['North-South Choke', 'Kimura', 'Armbar', 'Side Control Transition', 'Paper Cutter Choke'],
    tip: 'Keep chest-to-chest pressure and isolate an arm or neck.',
  },
  'rubber guard': {
    techniques: ['Omoplata', 'Triangle', 'Gogoplata', 'Mission Control', 'Zombie', 'Dead Orchard'],
    tip: 'Use flexibility to control posture with your legs while attacking.',
  },
  'deep half guard': {
    techniques: ['Waiter Sweep', 'Homer Simpson Sweep', 'Electric Chair', 'Back Take', 'Dogfight Entry'],
    tip: 'Get under your opponent\'s center of gravity and sweep or take the back.',
  },
  'lasso guard': {
    techniques: ['Lasso Sweep', 'Triangle', 'Omoplata', 'Armbar', 'Pendulum Sweep', 'Back Take'],
    tip: 'Wrap the leg deep and use the lasso to control and off-balance.',
  },
  'single leg x': {
    techniques: ['Heel Hook', 'Ankle Lock', 'Sweep to Top', 'X-Guard Transition', 'Inside Heel Hook'],
    tip: 'Control the leg tightly and attack the feet or transition to sweeps.',
  },
};

export interface PositionHintResult {
  hint: PositionHint;
  matchedPosition: string;
}

/**
 * Finds position hints by matching the label against known BJJ positions.
 * Uses case-insensitive partial matching so custom position names still get suggestions.
 * Returns both the hint and the matched position name for accurate display.
 */
export function getPositionHints(label: string): PositionHintResult | null {
  const normalized = label.trim().toLowerCase();

  if (!normalized) return null;

  // Exact match first
  if (POSITION_HINTS[normalized]) {
    return { hint: POSITION_HINTS[normalized], matchedPosition: label.trim() };
  }

  // Partial match - check if any known position name is contained in the label
  for (const [key, hint] of Object.entries(POSITION_HINTS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      // Capitalize first letter of each word for display
      const displayName = key.replace(/\b\w/g, (c) => c.toUpperCase());
      return { hint, matchedPosition: displayName };
    }
  }

  return null;
}
