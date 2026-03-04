function LoadingSpinner({ size = 'md', text = 'Chargement...', fullScreen = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Netflix-style spinner */}
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-4 border-gray-600 border-t-red-600 rounded-full"></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <p className={`text-white font-medium ${textSizes[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;