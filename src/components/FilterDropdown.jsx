import { useState, useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

function FilterDropdown({
  label,
  options,
  selectedValue,
  onSelect,
  buttonId,
  dropdownId,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  useClickOutside([buttonRef, dropdownRef], () => setIsOpen(false))

  const handleSelect = (value) => {
    onSelect(value)
    setIsOpen(false)
  }

  const displayText =
    selectedValue !== null
      ? `${label}: ${selectedValue} min`
      : label

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        className="text-preset-7 px-4 py-2.5 flex items-center justify-center gap-2 bg-white border border-neutral-200 rounded-[10px] text-neutral-900 hover:border-neutral-900 transition-all duration-300 ease-out hover:shadow-md w-full lg:w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        <img src="/assets/images/icon-chevron-down.svg" alt="" aria-hidden="true" />
      </button>
      <div
        ref={dropdownRef}
        id={dropdownId}
        role="listbox"
        aria-labelledby={buttonId}
        className={`${
          isOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
        } absolute bg-white border border-neutral-200 rounded-lg shadow-lg w-60 p-2 mt-2 z-10 transition-all duration-300 ease-out`}
      >
        {options.map((option) => (
          <label key={option.value} role="option">
            <input
              type="radio"
              name={buttonId}
              value={option.value}
              checked={
                option.value === ''
                  ? selectedValue === null
                  : selectedValue === parseInt(option.value)
              }
              onChange={(e) => handleSelect(e.target.value ? parseInt(e.target.value) : null)}
            />{' '}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterDropdown

