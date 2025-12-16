function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-orange-500 rounded-full animate-spin" style={{ animationDuration: '0.75s' }}></div>
      </div>
      <p className="text-center text-neutral-600 animate-pulse">{message}</p>
    </div>
  )
}

export default LoadingState

