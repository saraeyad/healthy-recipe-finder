function SearchBar({ value, onChange, placeholder = 'Search by name or ingredient...' }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2.5 transition focus-within:border-primary/40 focus-within:shadow-card">
      <img src="/assets/images/icon-search.svg" alt="" aria-hidden="true" />
      <input
        type="text"
        id="searchInput"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-muted"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
