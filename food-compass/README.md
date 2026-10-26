# Food Compass 🧭

**Find your way to something delicious.**

A recipe discovery web app built with React, Vite and Tailwind CSS — designed for home cooks,
students, bachelors, working professionals and families who want to quickly decide what to cook
based on ingredients, diet, lifestyle, time and cooking ability.

## Features

- Ingredient / dish smart search with intent boosting (e.g. "easy bachelor dinner", "cheap paneer recipe")
- Full filter drawer — Dietary, Lifestyle, Meal Type, Cuisine, Cooking Time, Difficulty, Spice Level
- ⭐ Bachelor Friendly filter with an internal scoring model that prioritizes quick, cheap, easy, low-ingredient recipes
- Quick filter chips, horizontally scrollable on mobile
- Flip recipe cards (hover to flip on desktop, tap on mobile)
- Full recipe details page with servings-aware ingredient scaling, step-by-step instructions, nutrition and tips tabs
- Step-by-step **Cooking Mode** with progress dots, timers per step, and a completion screen
- Favorites, persisted to `localStorage`
- Light & dark themes (dedicated, non-inverted dark palette), persisted to `localStorage`, with system preference fallback
- Fully responsive: desktop navbar + sidebar filters, mobile hamburger menu, bottom sheet filter drawer, bottom navigation bar

## Getting started

Run these commands from the `food-compass` directory (the directory containing `package.json`):

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/`.

## Project structure

```
food-compass/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx       # Entire application (components, data, theming)
    └── index.css     # Tailwind directives + global styles
```

## Notes

- Recipe photography is represented with emoji + gradient placeholders — swap the `emoji` field
  (or extend the data model with an `image` URL field) in `src/App.jsx`'s `RECIPES` array to use
  real photos.
- Icons are from [lucide-react](https://lucide.dev/).
