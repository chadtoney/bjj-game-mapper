export const ONBOARDING_STORAGE_KEY = 'bjj-game-mapper-onboarding-complete';

export function hasCompletedOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}
