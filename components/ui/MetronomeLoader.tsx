import React from 'react';

interface MetronomeLoaderProps {
  size?: number;
  color?: string;
  speed?: number;
}

const MetronomeLoader: React.FC<MetronomeLoaderProps> = ({
  size = 70,
  color = 'black',
  speed = 1.25
}) => {
  const cubeSize = size * 0.2;
  const containerHeight = size * 0.8;
  
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size
      }}
    >
      <style>{`
        @keyframes metronome-${size} {
          0% {
            transform: rotate(-90deg);
          }
          50% {
            transform: rotate(90deg);
          }
          50.001% {
            transform: translateX(${containerHeight}px) rotate(-90deg);
          }
          100% {
            transform: rotate(-90deg);
          }
        }

        @keyframes morph-${size} {
          0% {
            transform: scaleX(0.65) scaleY(1.3);
          }
          15% {
            transform: scaleX(1.5);
          }
          30%, 50.001% {
            transform: scaleX(1);
          }
          55% {
            transform: scaleX(0.8) scaleY(1.2);
            animation-timing-function: ease-in;
          }
          65%, 80% {
            transform: scaleX(1);
          }
          90%, 100% {
            transform: scaleX(0.65) scaleY(1.3);
          }
        }
      `}</style>
      
      <div 
        className="flex items-end justify-center"
        style={{
          width: size,
          height: `calc(100% - ${cubeSize / 2}px)`,
          paddingBottom: cubeSize / 2
        }}
      >
        <div
          className="flex items-center"
          style={{
            width: cubeSize,
            height: containerHeight,
            transformOrigin: 'center bottom',
            animation: `metronome-${size} ${speed}s linear infinite`
          }}
        >
          <div
            style={{
              width: cubeSize,
              height: cubeSize,
              backgroundColor: color,
              borderRadius: '25%',
              animation: `morph-${size} ${speed}s linear infinite`,
              transformOrigin: 'center left',
              transition: 'background-color 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MetronomeLoader;