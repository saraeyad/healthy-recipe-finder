
function SearchBar({ value, onChange, placeholder = 'Search by name or ingredient...' }) {
  return (
    <div className="flex-1 lg:max-w-sm lg:ml-auto flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-[10px] hover:border-neutral-900 transition-all duration-300 ease-out hover:shadow-md focus-within:shadow-md">
      <img src="/assets/images/icon-search.svg" alt="" aria-hidden="true" />
      <input
        type="text"
        id="searchInput"
        placeholder={placeholder}
        className="w-full focus:outline-none text-preset-7"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

