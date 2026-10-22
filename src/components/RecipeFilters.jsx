import FilterDropdown from './FilterDropdown'
import SearchBar from './SearchBar'
import { PREP_TIME_OPTIONS, COOK_TIME_OPTIONS, CLEAR_OPTION } from '../constants/filterOptions'
import { DIETS, SORTS } from '../utils/recipeLogic'

function RecipeFilters({ filters, onFilterChange, onClear, hasFilters }) {
  const { searchTerm, maxPrep, maxCook, diets, sort } = filters

  const toggleDiet = (id) => {
    const next = diets.includes(id) ? diets.filter((diet) => diet !== id) : [...diets, id]
    onFilterChange({ diets: next })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <FilterDropdown
          label="Max Prep Time"
          options={[...PREP_TIME_OPTIONS, CLEAR_OPTION]}
          selectedValue={maxPrep}
          onSelect={(value) => onFilterChange({ maxPrep: value })}
          buttonId="prepBtn"
          dropdownId="prepDropdown"
        />
        <FilterDropdown
          label="Max Cook Time"
          options={[...COOK_TIME_OPTIONS, CLEAR_OPTION]}
          selectedValue={maxCook}
          onSelect={(value) => onFilterChange({ maxCook: value })}
          buttonId="cookBtn"
          dropdownId="cookDropdown"
        />
        <label className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink">
          <span className="text-ink-muted">Sort</span>
          <select
            aria-label="Sort recipes"
            className="bg-transparent font-semibold text-ink outline-none"
            value={sort}
            onChange={(event) => onFilterChange({ sort: event.target.value })}
          >
            {SORTS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </label>
        <SearchBar
          value={searchTerm}
          onChange={(value) => onFilterChange({ searchTerm: value })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {DIETS.map((diet) => {
          const active = diets.includes(diet.id)
          return (
            <button
              key={diet.id}
              type="button"
              aria-pressed={active}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? 'bg-gradient-to-br from-primary to-mkt-teal text-white shadow-brand'
                  : 'border border-ink/10 bg-white text-mkt-teal hover:border-primary/30'
              }`}
              onClick={() => toggleDiet(diet.id)}
            >
              {diet.label}
            </button>
          )
        })}
        {hasFilters && (
          <button type="button" className="rounded-full px-3 py-1.5 text-xs font-bold text-ink-muted underline" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>
      <p className="text-[11px] font-medium text-ink-muted">
        Diet tags are read from the ingredient list. They are not a lab analysis.
      </p>
    </div>
  )
}

export default RecipeFilters
