import { useCallback, useEffect, useRef, useState } from 'react';

const GITHUB_REPO = 'chadtoney/bjj-game-mapper';

const BugReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setPopupBlocked(false);
    setPendingUrl('');
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setSteps('');
    setPopupBlocked(false);
    setPendingUrl('');
    triggerButtonRef.current?.focus();
  }, []);

  // Trap focus inside the modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  // Move focus into modal when it opens
  useEffect(() => {
    if (isOpen) {
      firstFieldRef.current?.focus();
    }
  }, [isOpen]);

  const buildIssueUrl = () => {
    const body = [
      '## Description',
      description,
      '',
      '## Steps to Reproduce',
      steps || '_No steps provided_',
      '',
      '## Environment',
      `- App URL: ${window.location.href}`,
      `- Browser: ${navigator.userAgent}`,
    ].join('\n');

    const url = new URL(`https://github.com/${GITHUB_REPO}/issues/new`);
    url.searchParams.set('title', title);
    url.searchParams.set('body', body);
    url.searchParams.set('labels', 'bug');
    return url.toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issueUrl = buildIssueUrl();
    const newWindow = window.open(issueUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      // Popup was blocked — surface the direct link to the user
      setPopupBlocked(true);
      setPendingUrl(issueUrl);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <button
        ref={triggerButtonRef}
        onClick={openModal}
        aria-label="Report a bug"
        className="fixed bottom-4 left-4 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm shadow-lg border border-orange-700"
        title="Report a bug"
      >
        🐛 Report Bug
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bug-report-title"
          onKeyDown={handleKeyDown}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 id="bug-report-title" className="text-lg font-bold text-gray-800 mb-4">
              🐛 Report a Bug
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Your report will open a pre-filled GitHub issue. You&apos;ll need a GitHub account to
              submit it.
            </p>

            {popupBlocked && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                Popup was blocked.{' '}
                <a
                  href={pendingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  Click here to open the GitHub issue
                </a>{' '}
                manually.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="bug-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="bug-title"
                  ref={firstFieldRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="Short description of the bug"
                />
              </div>

              <div>
                <label
                  htmlFor="bug-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="bug-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="What went wrong? What did you expect to happen?"
                />
              </div>

              <div>
                <label htmlFor="bug-steps" className="block text-sm font-medium text-gray-700 mb-1">
                  Steps to Reproduce
                </label>
                <textarea
                  id="bug-steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="1. Click on...&#10;2. Then...&#10;3. See error"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
                >
                  Open GitHub Issue
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BugReport;
