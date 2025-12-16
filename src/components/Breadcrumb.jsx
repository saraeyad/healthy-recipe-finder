import { Link } from 'react-router-dom'

function Breadcrumb({ items }) {
  return (
    <nav className="text-preset-7 mb-4">
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link to={item.path} className="opacity-60 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span> {item.label}</span>
          )}
          {index < items.length - 1 && ' /'}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb

