# Project Structure

```
src/
├── assets/              # Static assets (images)
│   └── images/
├── components/          # Reusable UI components
│   ├── Breadcrumb.jsx
│   ├── CTA.jsx
│   ├── ErrorMessage.jsx
│   ├── FilterDropdown.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── LoadingState.jsx
│   ├── Navigation.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeFilters.jsx
│   ├── RecipeGrid.jsx
│   ├── RecipeInfo.jsx
│   ├── RecipeIngredients.jsx
│   └── RecipeInstructions.jsx
├── constants/           # Application constants
│   ├── filterOptions.js
│   └── navigation.js
├── hooks/               # Custom React hooks
│   ├── useClickOutside.js
│   ├── useMenu.js
│   ├── useRecipeFilters.js
│   └── useRecipes.js
├── pages/               # Page components
│   ├── About.jsx
│   ├── Home.jsx
│   ├── RecipeDetail.jsx
│   └── Recipes.jsx
├── services/            # API/data services
│   └── recipeService.js
├── utils/               # Utility functions
│   └── recipeFilters.js
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Component Organization

### Components (`src/components/`)
- **Layout Components**: Header, Footer, Navigation
- **Feature Components**: RecipeCard, RecipeFilters, RecipeGrid
- **UI Components**: FilterDropdown, SearchBar, Breadcrumb
- **State Components**: LoadingState, ErrorMessage
- **Detail Components**: RecipeInfo, RecipeIngredients, RecipeInstructions

### Hooks (`src/hooks/`)
- `useRecipes` - Fetches and manages recipe data
- `useRecipeFilters` - Manages filtering logic
- `useMenu` - Handles mobile menu state
- `useClickOutside` - Detects clicks outside elements

### Services (`src/services/`)
- `recipeService.js` - API calls and data fetching logic

### Utils (`src/utils/`)
- `recipeFilters.js` - Recipe filtering algorithms

### Constants (`src/constants/`)
- `filterOptions.js` - Filter dropdown options
- `navigation.js` - Navigation links and routes

## Benefits of This Structure

1. **Separation of Concerns**: Logic, UI, and data are separated
2. **Reusability**: Components and hooks can be reused across the app
3. **Maintainability**: Easy to find and update specific functionality
4. **Testability**: Isolated functions and components are easier to test
5. **Scalability**: Easy to add new features without cluttering existing code

## Key Principles

- **Single Responsibility**: Each component/hook has one clear purpose
- **DRY (Don't Repeat Yourself)**: Shared logic extracted to hooks/utils
- **Composition**: Small components compose into larger features
- **Consistency**: Similar patterns used throughout the codebase

