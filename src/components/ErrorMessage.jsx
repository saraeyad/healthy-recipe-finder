import { Link } from 'react-router-dom'

function ErrorMessage({ message, showBackButton = false, backButtonText = 'Go back', backButtonPath = '/' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <p className="text-center text-preset-7">{message}</p>
      {showBackButton && (
        <Link to={backButtonPath} className="btn btn-lg">
          {backButtonText}
        </Link>
      )}
    </div>
  )
}

export default ErrorMessage

