import { PrimaryLink } from './ui/Buttons'

function ErrorMessage({ message, showBackButton = false, backButtonText = 'Go back', backButtonPath = '/' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-4 py-16 text-center">
      <p className="text-lg font-bold text-ink">{message}</p>
      {showBackButton && <PrimaryLink to={backButtonPath}>{backButtonText}</PrimaryLink>}
    </div>
  )
}

export default ErrorMessage
