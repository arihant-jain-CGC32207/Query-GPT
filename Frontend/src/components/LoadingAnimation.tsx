import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm">Generating query and fetching results...</span>
    </div>
  );
};

export default LoadingAnimation;