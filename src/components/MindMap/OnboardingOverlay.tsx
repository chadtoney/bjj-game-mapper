import { useState, useCallback, useEffect } from 'react';
import { ONBOARDING_STORAGE_KEY } from '../../utils/onboarding';

const steps = [
  {
    icon: '👆',
    title: 'Tap + hold to add a position',
    description: 'Long-press anywhere on the canvas to create a new BJJ position.',
  },
  {
    icon: '↔️',
    title: 'Drag between positions to add a technique',
    description: 'Connect two positions by dragging from one node handle to another.',
  },
  {
    icon: '📝',
    title: 'Tap a position to add notes',
    description: 'Select any position to edit its details, tags, and notes.',
  },
];

const OnboardingOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  const handleNext = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      onComplete();
    }
  }, [step, onComplete]);

  const handleSkip = useCallback(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleSkip]);

  const current = steps[step];

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-testid="onboarding-overlay"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        <div className="text-4xl mb-4">{current.icon}</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{current.title}</h2>
        <p className="text-sm text-gray-600 mb-6">{current.description}</p>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === step ? 'bg-blue-500' : i < step ? 'bg-blue-300' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            {step < steps.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingOverlay;
