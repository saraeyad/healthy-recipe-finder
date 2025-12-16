import FilterDropdown from './FilterDropdown'
import SearchBar from './SearchBar'
import { PREP_TIME_OPTIONS, COOK_TIME_OPTIONS, CLEAR_OPTION } from '../constants/filterOptions'

function RecipeFilters({ filters, onFilterChange }) {
  const { searchTerm, maxPrep, maxCook } = filters

  return (
    <div className="mb-6 flex flex-col md:flex-row items-stretch justify-center gap-3">
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

      <SearchBar
        value={searchTerm}
        onChange={(value) => onFilterChange({ searchTerm: value })}
      />
    </div>
  )
}

export default RecipeFilters

