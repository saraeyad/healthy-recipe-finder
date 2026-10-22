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

  const displayText = selectedValue !== null ? `${label}: ${selectedValue} min` : label

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition lg:w-auto ${
          selectedValue !== null
            ? 'border-primary/30 bg-mkt-mint-bg text-mkt-teal'
            : 'border-ink/10 bg-white text-ink hover:border-primary/30'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        <img src="/assets/images/icon-chevron-down.svg" alt="" aria-hidden="true" className={`transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        ref={dropdownRef}
        id={dropdownId}
        role="listbox"
        aria-labelledby={buttonId}
        className={`${
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        } absolute z-30 mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-float transition duration-200`}
      >
        {options.map((option) => (
          <label key={option.value} role="option" className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-canvas">
            <input
              type="radio"
              name={buttonId}
              value={option.value}
              className="accent-primary"
              checked={
                option.value === ''
                  ? selectedValue === null
                  : selectedValue === parseInt(option.value)
              }
              onChange={(event) => handleSelect(event.target.value ? parseInt(event.target.value) : null)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterDropdown
