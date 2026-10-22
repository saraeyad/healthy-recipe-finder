function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-mkt-mint-border border-t-primary" />
      <p className="text-center text-sm font-semibold text-ink-muted">{message}</p>
    </div>
  )
}

export default LoadingState
