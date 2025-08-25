interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  subtext?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading', 
  subtext,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const subtextSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  }

  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Main loading animation */}
      <div className="relative">
        {/* Pulsing center dot */}
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse mx-auto`}></div>
        
        {/* Expanding rings */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-blue-500/30 rounded-full animate-ping mx-auto`}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-indigo-500/20 rounded-full animate-ping mx-auto`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-purple-500/10 rounded-full animate-ping mx-auto`} style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Loading text with fade-in animation */}
      <div className="space-y-2">
        <div className={`text-slate-400 ${textSizes[size]} font-medium animate-pulse`}>{text}</div>
        {subtext && (
          <div className={`text-slate-500 ${subtextSizes[size]}`}>{subtext}</div>
        )}
      </div>
    </div>
  )
}
