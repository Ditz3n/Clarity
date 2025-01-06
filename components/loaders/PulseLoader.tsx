// components/loaders/PulseLoader.tsx | A pulsating loading animation component
const PulseLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-[#212121] transition-colors">
      <div
        className="relative flex items-center justify-between"
        style={{
          '--uib-size': '43px',
          '--uib-speed': '1.3s',
          '--uib-dot-size': 'calc(var(--uib-size) * 0.24)',
          height: 'var(--uib-dot-size)',
          width: 'var(--uib-size)'
        } as React.CSSProperties}
      >
        <style jsx>{`
          .pulse-dot,
          .pulse-container::before,
          .pulse-container::after {
            content: '';
            display: block;
            height: var(--uib-dot-size);
            width: var(--uib-dot-size);
            border-radius: 50%;
            transform: scale(0);
            transition: background-color 0.3s ease;
          }

          .pulse-container::before {
            animation: pulse var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.375)
              infinite;
            background-color: currentColor;
          }

          .pulse-dot {
            animation: pulse var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.25)
              infinite both;
            background-color: currentColor;
          }

          .pulse-container::after {
            animation: pulse var(--uib-speed) ease-in-out calc(var(--uib-speed) * -0.125)
              infinite;
            background-color: currentColor;
          }

          @keyframes pulse {
            0%,
            100% {
              transform: scale(0);
            }
            50% {
              transform: scale(1);
            }
          }
        `}</style>
        <div className="pulse-container text-[#6C63FF] dark:text-[#fb923c] relative flex items-center justify-between w-full h-full">
          <div className="pulse-dot" />
        </div>
      </div>
    </div>
  );
};

export default PulseLoader;