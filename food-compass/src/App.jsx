import React, { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import {
  Search, Moon, Sun, Menu, X, Heart, Star, Clock, Users, ChefHat,
  Flame, Leaf, Zap, Home as HomeIcon, Compass, User, ChevronRight,
  ChevronLeft, SlidersHorizontal, Check, ArrowLeft, Share2, Info,
} from "lucide-react";

import "./App.css";

import southIndianImg from "./meadia/soutnindian.png";
import northIndianImg from "./meadia/northindian.png";
import andraImg from "./meadia/andhra.png";
import punjabiImg from "./meadia/punjabi.png";
import gujaratiImg from "./meadia/gujarati.png";
import bengaliImg from "./meadia/bengali.png";
import heroImgLight from "./meadia/hero_light.png";
import heroImgDark from "./meadia/hero_dark.png";
import logoImg from "./meadia/logo.png";
import ornCornerTL from "./meadia/ornaments/Corner flourish tl.png";
import ornCornerTR from "./meadia/ornaments/corner-flourish-tr.png";
import ornVineDivider from "./meadia/ornaments/framed-vine-divider.png";
import ornMedallion from "./meadia/ornaments/medallion.png";
import ornSwaveDivider from "./meadia/ornaments/swave-divider.png";
import ornScurlDivider from "./meadia/ornaments/scurl-compact.png";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const RECIPES = [
  {
    id: 1, name: "Paneer Tikka Masala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxrRBKTj7mXpRLPrpLAfgl4TpGTfGePKwzALdkiyPEA&s=10", cuisine: "North Indian", category: "Dinner",
    description: "Soft paneer cubes grilled to perfection and simmered in a rich, creamy tomato gravy.",
    ingredients: [
      { qty: "200g", item: "Paneer, cubed" }, { qty: "1", item: "Onion, finely chopped" },
      { qty: "2", item: "Tomatoes, pureed" }, { qty: "1 tsp", item: "Ginger garlic paste" },
      { qty: "1 tsp", item: "Red chilli powder" }, { qty: "1 tsp", item: "Garam masala" },
      { qty: "1 tsp", item: "Turmeric powder" }, { qty: "2 tbsp", item: "Oil" },
      { qty: "2 tbsp", item: "Fresh cream" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate the paneer", time: 20, detail: "Mix paneer cubes with yogurt, ginger garlic paste, red chilli powder, garam masala, salt and lemon juice. Rest for 15–20 minutes." },
      { title: "Grill the paneer", time: 10, detail: "Grill or pan-fry the marinated paneer until lightly charred on the edges." },
      { title: "Prepare the gravy base", time: 5, detail: "Heat oil in a pan. Add onions and sauté until golden." },
      { title: "Add tomato puree", time: 6, detail: "Add tomato puree and cook until oil separates from the masala." },
      { title: "Simmer with spices", time: 8, detail: "Add turmeric, garam masala and a splash of water. Simmer until the gravy thickens." },
      { title: "Combine & finish", time: 3, detail: "Add grilled paneer and cream. Simmer for 2 minutes and garnish with coriander." },
    ],
    prepTime: 15, cookTime: 20, servings: 2, difficulty: "Easy", rating: 4.8, reviews: 256,
    dietary: ["Vegetarian", "High Protein"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 10, budgetLevel: "Medium",
    equipment: ["Pan", "Knife"],
  },
  {
    id: 2, name: "Masala Dosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLNJ3hXTkgQIJW5HFlQOkZ6RD8mQVvnNgNmG-gmuwfg&s=10", cuisine: "South Indian", category: "Breakfast",
    description: "Crisp fermented rice crepe filled with a spiced potato masala, served with chutney and sambar.",
    ingredients: [
      { qty: "2 cups", item: "Dosa batter" }, { qty: "3", item: "Potatoes, boiled" },
      { qty: "1", item: "Onion, sliced" }, { qty: "1 tsp", item: "Mustard seeds" },
      { qty: "1 sprig", item: "Curry leaves" }, { qty: "1 tsp", item: "Turmeric powder" },
      { qty: "2 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the potato masala", time: 10, detail: "Temper mustard seeds and curry leaves in oil, add onions, turmeric and mashed potatoes. Mix well." },
      { title: "Heat the tawa", time: 2, detail: "Heat a flat griddle and spread a ladle of batter into a thin circle." },
      { title: "Cook the dosa", time: 3, detail: "Drizzle oil around the edges and cook until golden and crisp." },
      { title: "Fill & fold", time: 2, detail: "Place the potato masala in the center and fold the dosa." },
      { title: "Serve", time: 1, detail: "Serve hot with coconut chutney and sambar." },
    ],
    prepTime: 10, cookTime: 15, servings: 2, difficulty: "Easy", rating: 4.7, reviews: 189,
    dietary: ["Vegetarian"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 8, budgetLevel: "Low",
    equipment: ["Tawa", "Ladle"],
  },
  {
    id: 3, name: "Chole Bhature", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBh0KfStOKWntoUP8wV_QQMFb-TFpdtkEIlYjz15TamQ&s=10", cuisine: "North Indian", category: "Lunch",
    description: "Fluffy fried bread served alongside a spicy, tangy chickpea curry.",
    ingredients: [
      { qty: "2 cups", item: "Chickpeas, boiled" }, { qty: "2 cups", item: "Maida (flour)" },
      { qty: "2", item: "Onions, chopped" }, { qty: "2", item: "Tomatoes, pureed" },
      { qty: "1 tbsp", item: "Chole masala" }, { qty: "1/2 cup", item: "Yogurt" },
      { qty: "3 tbsp", item: "Oil, for frying" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the bhature dough", time: 15, detail: "Mix maida, yogurt, salt and a little oil into a soft dough. Rest for 2 hours." },
      { title: "Cook the chole", time: 20, detail: "Sauté onions and tomatoes with chole masala, add boiled chickpeas and simmer." },
      { title: "Roll the bhature", time: 5, detail: "Divide dough into balls and roll into ovals." },
      { title: "Fry the bhature", time: 5, detail: "Deep fry until puffed and golden brown." },
      { title: "Serve", time: 1, detail: "Serve hot chole with bhature, onions and pickle." },
    ],
    prepTime: 20, cookTime: 40, servings: 4, difficulty: "Medium", rating: 4.6, reviews: 142,
    dietary: ["Vegetarian"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Medium", equipment: ["Kadai", "Pan"],
  },
  {
    id: 4, name: "Pav Bhaji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YNz-rTdvak816IvHT13D0E-BmT3i1NQukc1V99tASA&s=10", cuisine: "Street Food", category: "Dinner",
    description: "A buttery mashed-vegetable curry served with toasted pav buns.",
    ingredients: [
      { qty: "2", item: "Potatoes" }, { qty: "1 cup", item: "Mixed vegetables" },
      { qty: "2", item: "Tomatoes" }, { qty: "1", item: "Onion" },
      { qty: "2 tbsp", item: "Pav bhaji masala" }, { qty: "4 tbsp", item: "Butter" },
      { qty: "6", item: "Pav buns" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Boil the vegetables", time: 15, detail: "Boil potatoes and mixed vegetables until soft, then mash roughly." },
      { title: "Make the base", time: 8, detail: "Sauté onions and tomatoes in butter until soft." },
      { title: "Cook the bhaji", time: 10, detail: "Add mashed vegetables and pav bhaji masala. Mash and simmer together." },
      { title: "Toast the pav", time: 3, detail: "Toast pav buns in butter on a hot griddle." },
      { title: "Serve", time: 1, detail: "Serve bhaji topped with butter, chopped onion and lemon, alongside toasted pav." },
    ],
    prepTime: 15, cookTime: 30, servings: 3, difficulty: "Easy", rating: 4.7, reviews: 201,
    dietary: ["Vegetarian"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Family Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 5, name: "Dal Makhani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPfOZ88Ve23u80ZilkWglduJRcIuY2p1TzTejoDZKbNg&s=10", cuisine: "North Indian", category: "Dinner",
    description: "Slow-simmered black lentils in a velvety, buttery tomato gravy.",
    ingredients: [
      { qty: "1 cup", item: "Whole black lentils (urad)" }, { qty: "1/4 cup", item: "Kidney beans" },
      { qty: "2", item: "Tomatoes, pureed" }, { qty: "3 tbsp", item: "Butter" },
      { qty: "1/4 cup", item: "Cream" }, { qty: "1 tsp", item: "Cumin seeds" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Soak & boil lentils", time: 45, detail: "Soak lentils and kidney beans overnight, then pressure cook until soft." },
      { title: "Make the tempering", time: 5, detail: "Heat butter, add cumin seeds and tomato puree, cook until thick." },
      { title: "Simmer the dal", time: 30, detail: "Add boiled lentils to the tempering and simmer on low heat, stirring occasionally." },
      { title: "Finish with cream", time: 3, detail: "Stir in cream and a knob of butter before serving." },
    ],
    prepTime: 10, cookTime: 45, servings: 4, difficulty: "Medium", rating: 4.7, reviews: 176,
    dietary: ["Vegetarian", "High Protein"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 6, budgetLevel: "Medium", equipment: ["Pressure Cooker", "Pan"],
  },
  {
    id: 6, name: "Egg Fried Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwkaHbwXTSqBcBlGfs3VWlZ_wOnEmtVhPMjL5kE1T3hA&s=10", cuisine: "Indo-Chinese", category: "Dinner",
    description: "Quick wok-tossed rice with scrambled eggs, spring onion and soy sauce.",
    ingredients: [
      { qty: "2 cups", item: "Cooked rice, cold" }, { qty: "2", item: "Eggs" },
      { qty: "2", item: "Spring onions, chopped" }, { qty: "1 tbsp", item: "Soy sauce" },
      { qty: "1 tsp", item: "Oil" }, { qty: "", item: "Salt & pepper to taste" },
    ],
    instructions: [
      { title: "Scramble the eggs", time: 3, detail: "Heat oil in a pan or wok and scramble the eggs. Set aside." },
      { title: "Toss the rice", time: 5, detail: "In the same pan, add rice and soy sauce. Toss on high heat for 3–4 minutes." },
      { title: "Combine & serve", time: 2, detail: "Add scrambled eggs and spring onions, toss well and serve hot." },
    ],
    prepTime: 5, cookTime: 10, servings: 1, difficulty: "Easy", rating: 4.6, reviews: 312,
    dietary: ["Eggetarian", "High Protein"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly"], ingredientCount: 6,
    budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 7, name: "Maggi Masala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pkj5Zms_1WzVfuXFBbUmbhp5gNE1USuYhTYhQfKeHA&s=10", cuisine: "Indo-Chinese", category: "Snacks",
    description: "The classic instant-noodle fix, doctored up with vegetables and a runny egg if you like.",
    ingredients: [
      { qty: "2 packs", item: "Maggi noodles + masala" }, { qty: "1", item: "Tomato, chopped" },
      { qty: "1", item: "Onion, chopped" }, { qty: "1.5 cups", item: "Water" }, { qty: "1 tsp", item: "Oil" },
    ],
    instructions: [
      { title: "Sauté the veggies", time: 3, detail: "Heat oil, sauté onion and tomato for a minute." },
      { title: "Boil & add noodles", time: 5, detail: "Add water, bring to a boil, then add noodles and masala." },
      { title: "Cook & serve", time: 2, detail: "Cook for 2 minutes, stirring occasionally, and serve hot." },
    ],
    prepTime: 2, cookTime: 8, servings: 1, difficulty: "Easy", rating: 4.5, reviews: 420,
    dietary: ["Vegetarian"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly"], ingredientCount: 5,
    budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 8, name: "Paneer Bhurji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjM2QD8SBYpOC7np46wCLFhJNRobeulYHVAl-Wz_EpQ&s=10", cuisine: "North Indian", category: "Dinner",
    description: "Crumbled paneer scrambled with onions, tomatoes and simple spices — ready in minutes.",
    ingredients: [
      { qty: "200g", item: "Paneer, crumbled" }, { qty: "1", item: "Onion, chopped" },
      { qty: "1", item: "Tomato, chopped" }, { qty: "1 tsp", item: "Turmeric powder" },
      { qty: "1 tsp", item: "Red chilli powder" }, { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Sauté onions", time: 4, detail: "Heat oil and sauté chopped onions until soft." },
      { title: "Add tomato & spices", time: 4, detail: "Add tomatoes, turmeric and chilli powder. Cook until soft." },
      { title: "Add paneer", time: 4, detail: "Add crumbled paneer and salt. Toss gently for 3–4 minutes." },
      { title: "Serve", time: 1, detail: "Garnish with coriander and serve with roti or bread." },
    ],
    prepTime: 8, cookTime: 12, servings: 2, difficulty: "Easy", rating: 4.7, reviews: 233,
    dietary: ["Vegetarian", "High Protein"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 7, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 9, name: "Tomato Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGNPwvJeQm5JZTLIfvvJsFPJ19DyAiaHb5Od4gmAW_8g&s=10", cuisine: "South Indian", category: "Lunch",
    description: "Tangy one-pot rice cooked with tomatoes and South Indian tempering.",
    ingredients: [
      { qty: "1 cup", item: "Rice, cooked" }, { qty: "2", item: "Tomatoes, chopped" },
      { qty: "1 tsp", item: "Mustard seeds" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "1 tsp", item: "Sambar powder" }, { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Temper the spices", time: 3, detail: "Heat oil, add mustard seeds and curry leaves." },
      { title: "Cook the tomatoes", time: 6, detail: "Add tomatoes and sambar powder, cook until mushy." },
      { title: "Mix with rice", time: 3, detail: "Add cooked rice and salt, mix gently until combined." },
    ],
    prepTime: 5, cookTime: 12, servings: 2, difficulty: "Easy", rating: 4.5, reviews: 98,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Student Friendly"], ingredientCount: 6, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 10, name: "Vegetable Upma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4_Lr0F173lMlDABXFdwDzBYtum23GkkD9b-oliNKnA&s=10", cuisine: "South Indian", category: "Breakfast",
    description: "Savory semolina porridge with vegetables and a mustard-curry-leaf tempering.",
    ingredients: [
      { qty: "1 cup", item: "Semolina (rava)" }, { qty: "1/2 cup", item: "Mixed vegetables, diced" },
      { qty: "1 tsp", item: "Mustard seeds" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "2 cups", item: "Water" }, { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Roast the semolina", time: 4, detail: "Dry roast semolina until fragrant, set aside." },
      { title: "Temper & sauté", time: 5, detail: "Heat oil, temper mustard seeds and curry leaves, sauté vegetables." },
      { title: "Cook the upma", time: 6, detail: "Add water and salt, bring to a boil, then stir in roasted semolina until it thickens." },
    ],
    prepTime: 5, cookTime: 15, servings: 2, difficulty: "Easy", rating: 4.4, reviews: 87,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 7, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 11, name: "Poha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONVb6T2VqbGzhKQGYo_PMdNA1f_uZvC8PPpMAPA0QOA&s=10", cuisine: "North Indian", category: "Breakfast",
    description: "Flattened rice tossed with peanuts, onions and a light mustard tempering.",
    ingredients: [
      { qty: "2 cups", item: "Poha (flattened rice)" }, { qty: "1", item: "Onion, chopped" },
      { qty: "2 tbsp", item: "Peanuts" }, { qty: "1 tsp", item: "Mustard seeds" },
      { qty: "1 tsp", item: "Turmeric powder" }, { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Rinse the poha", time: 2, detail: "Rinse poha in a colander until soft, drain well." },
      { title: "Temper & sauté", time: 5, detail: "Heat oil, add mustard seeds, peanuts and onions, sauté until golden." },
      { title: "Combine", time: 4, detail: "Add turmeric and poha, toss gently until warmed through." },
    ],
    prepTime: 5, cookTime: 10, servings: 2, difficulty: "Easy", rating: 4.6, reviews: 156,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly"], ingredientCount: 7,
    budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 12, name: "One-Pot Egg Biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWnpLy_sSzCHNlcSTmoMMdn5N_VTHx1bHrQq3aEOb6pg&s=10", cuisine: "South Indian", category: "Dinner",
    description: "A simplified one-pot biryani layered with boiled eggs and fragrant spiced rice.",
    ingredients: [
      { qty: "1 cup", item: "Basmati rice" }, { qty: "3", item: "Eggs, boiled" },
      { qty: "1", item: "Onion, sliced" }, { qty: "2 tbsp", item: "Biryani masala" },
      { qty: "1/2 cup", item: "Yogurt" }, { qty: "2 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Fry the onions", time: 8, detail: "Fry sliced onions until deep golden and crisp. Set aside." },
      { title: "Build the masala", time: 6, detail: "Sauté yogurt and biryani masala together until fragrant." },
      { title: "Layer & cook", time: 20, detail: "Layer rice, boiled eggs and masala in a pot, add water and cook covered on low heat until rice is done." },
      { title: "Rest & serve", time: 5, detail: "Let it rest for 5 minutes, then fluff and top with fried onions." },
    ],
    prepTime: 10, cookTime: 30, servings: 2, difficulty: "Medium", rating: 4.6, reviews: 121,
    dietary: ["Eggetarian", "High Protein"], spiceLevel: "Spicy",
    lifestyle: ["Bachelor Friendly"], ingredientCount: 7, budgetLevel: "Low", equipment: ["Pot"],
  },
  {
    id: 13, name: "Bread Omelette Sandwich", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmv3vttNHirOEGa60zulyFjoVix997jzDwU8HgysE2Gg&s=10", cuisine: "North Indian", category: "Breakfast",
    description: "A spiced omelette sandwiched between toasted bread — the ultimate 10-minute meal.",
    ingredients: [
      { qty: "2", item: "Bread slices" }, { qty: "2", item: "Eggs" },
      { qty: "1", item: "Onion, finely chopped" }, { qty: "1", item: "Green chilli, chopped" },
      { qty: "1 tsp", item: "Butter" }, { qty: "", item: "Salt & pepper to taste" },
    ],
    instructions: [
      { title: "Whisk the eggs", time: 2, detail: "Whisk eggs with onion, chilli, salt and pepper." },
      { title: "Cook the omelette", time: 4, detail: "Pour onto a hot buttered pan and cook until just set." },
      { title: "Toast & assemble", time: 3, detail: "Toast bread slices in butter, sandwich the omelette between them." },
    ],
    prepTime: 3, cookTime: 7, servings: 1, difficulty: "Easy", rating: 4.5, reviews: 178,
    dietary: ["Eggetarian"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly"], ingredientCount: 6,
    budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 14, name: "Curd Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNW3Cc320lDqAP9JqantUgLKV0ZJEaEIFo2TkB_RhWOw&s=10", cuisine: "South Indian", category: "Lunch",
    description: "Cooling, comforting rice mixed with yogurt and a simple tempering — no cooking skill needed.",
    ingredients: [
      { qty: "1 cup", item: "Rice, cooked" }, { qty: "1 cup", item: "Curd (yogurt)" },
      { qty: "1 tsp", item: "Mustard seeds" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Mash the rice", time: 2, detail: "Mash the cooked rice lightly with a spoon." },
      { title: "Mix in curd", time: 2, detail: "Stir in curd and salt until well combined." },
      { title: "Temper & finish", time: 3, detail: "Heat oil, temper mustard seeds and curry leaves, pour over the rice." },
    ],
    prepTime: 3, cookTime: 5, servings: 1, difficulty: "Easy", rating: 4.4, reviews: 66,
    dietary: ["Vegetarian"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly"], ingredientCount: 6,
    budgetLevel: "Low", equipment: ["Bowl"],
  },
  {
    id: 15, name: "Butter Chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXzTHek2u6ZAp1o-KJNl1afTD4LUpjmbT2IS8CNhYvEA&s=10", cuisine: "North Indian", category: "Dinner",
    description: "Tender chicken simmered in a rich, buttery tomato-cashew gravy — a restaurant favourite made at home.",
    ingredients: [
      { qty: "500g", item: "Chicken, boneless" }, { qty: "1 cup", item: "Yogurt" },
      { qty: "2 tbsp", item: "Ginger garlic paste" }, { qty: "2", item: "Tomatoes, pureed" },
      { qty: "3 tbsp", item: "Butter" }, { qty: "2 tbsp", item: "Cashew paste" },
      { qty: "1 tsp", item: "Garam masala" }, { qty: "1 tsp", item: "Kasuri methi" },
      { qty: "3 tbsp", item: "Fresh cream" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate the chicken", time: 30, detail: "Mix chicken with yogurt, ginger garlic paste, red chilli powder and salt. Rest for at least 30 minutes." },
      { title: "Grill the chicken", time: 15, detail: "Grill or pan-sear the marinated chicken until charred and cooked through." },
      { title: "Make the gravy base", time: 10, detail: "Heat butter, add tomato puree and cashew paste, cook until the oil separates." },
      { title: "Simmer with spices", time: 10, detail: "Add garam masala, kasuri methi and a splash of water. Simmer until thick." },
      { title: "Combine & finish", time: 5, detail: "Add the grilled chicken and cream. Simmer for 5 minutes and serve hot." },
    ],
    prepTime: 30, cookTime: 40, servings: 4, difficulty: "Medium", rating: 4.9, reviews: 421,
    dietary: ["Non-Vegetarian", "High Protein"], spiceLevel: "Medium",
    lifestyle: ["Family Friendly"], ingredientCount: 10, budgetLevel: "Medium",
    equipment: ["Pan", "Grill"],
  },
  {
    id: 16, name: "Chicken Biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDAhKGyLBDr_mEbBH8rbt68iRiIRLXMXYF4BCPnE20g&s=10", cuisine: "South Indian", category: "Dinner",
    description: "Fragrant basmati rice layered with spiced, marinated chicken and slow-cooked to perfection.",
    ingredients: [
      { qty: "500g", item: "Chicken, curry cut" }, { qty: "3 cups", item: "Basmati rice" },
      { qty: "1 cup", item: "Yogurt" }, { qty: "2", item: "Onions, sliced & fried" },
      { qty: "2 tbsp", item: "Biryani masala" }, { qty: "1/2 cup", item: "Mint & coriander leaves" },
      { qty: "1/4 cup", item: "Ghee" }, { qty: "", item: "Saffron soaked in milk" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate the chicken", time: 45, detail: "Mix chicken with yogurt, biryani masala, ginger garlic paste and half the fried onions. Rest for 45 minutes." },
      { title: "Par-cook the rice", time: 10, detail: "Boil the basmati rice with whole spices until 70% cooked, then drain." },
      { title: "Layer the biryani", time: 10, detail: "Layer marinated chicken and rice in a heavy pot, topping with mint, coriander, fried onions and saffron milk." },
      { title: "Dum cook", time: 35, detail: "Cover tightly and cook on low heat (dum) until the chicken is done and rice is fluffy." },
      { title: "Rest & serve", time: 5, detail: "Let it rest for 5 minutes, then gently fluff and serve with raita." },
    ],
    prepTime: 45, cookTime: 60, servings: 4, difficulty: "Hard", rating: 4.9, reviews: 512,
    dietary: ["Non-Vegetarian", "High Protein"], spiceLevel: "Medium",
    lifestyle: ["Family Friendly"], ingredientCount: 9, budgetLevel: "Medium",
    equipment: ["Heavy Pot", "Pan"],
  },
  {
    id: 17, name: "Fish Curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbY1i5JZyULNOkNSc2dVcAzFgHj0M3EE3h3rxDCzyM9A&s=10", cuisine: "South Indian", category: "Lunch",
    description: "Tangy, coconut-based fish curry simmered with tamarind and curry leaves — a coastal classic.",
    ingredients: [
      { qty: "500g", item: "Fish, cleaned & cut" }, { qty: "1 cup", item: "Coconut, grated" },
      { qty: "1", item: "Onion, chopped" }, { qty: "2", item: "Tomatoes, chopped" },
      { qty: "1 tbsp", item: "Tamarind paste" }, { qty: "1 tsp", item: "Turmeric powder" },
      { qty: "1 tsp", item: "Red chilli powder" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "2 tbsp", item: "Coconut oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the coconut paste", time: 5, detail: "Grind coconut with a little water into a smooth paste." },
      { title: "Prepare the base", time: 8, detail: "Heat coconut oil, temper curry leaves, sauté onions and tomatoes until soft." },
      { title: "Add spices & tamarind", time: 5, detail: "Add turmeric, red chilli powder and tamarind paste, cook for a couple of minutes." },
      { title: "Simmer the fish", time: 12, detail: "Add coconut paste, water and fish pieces. Simmer gently until the fish is cooked through." },
      { title: "Serve", time: 1, detail: "Serve hot with steamed rice." },
    ],
    prepTime: 15, cookTime: 25, servings: 3, difficulty: "Medium", rating: 4.7, reviews: 198,
    dietary: ["Non-Vegetarian", "High Protein", "Gluten Free"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 9, budgetLevel: "Medium",
    equipment: ["Pan", "Blender"],
  },
  {
    id: 18, name: "Mutton Rogan Josh", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtZMNlPvdMZQuzS92GGP8F5nMSqoXI-JwWrGtln-eIGw&s=10", cuisine: "North Indian", category: "Dinner",
    description: "Slow-braised mutton in a deep red, aromatic Kashmiri gravy — rich, warming and full of flavour.",
    ingredients: [
      { qty: "600g", item: "Mutton, curry cut" }, { qty: "1 cup", item: "Yogurt" },
      { qty: "2", item: "Onions, sliced" }, { qty: "2 tbsp", item: "Kashmiri red chilli powder" },
      { qty: "1 tsp", item: "Fennel powder" }, { qty: "1 tsp", item: "Ginger powder" },
      { qty: "4 tbsp", item: "Mustard oil" }, { qty: "", item: "Whole spices (bay leaf, cloves, cardamom)" },
      { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Brown the mutton", time: 15, detail: "Heat mustard oil and sear the mutton pieces until browned on all sides. Set aside." },
      { title: "Cook the onions", time: 10, detail: "In the same pot, sauté onions with whole spices until deep golden." },
      { title: "Add yogurt & spices", time: 8, detail: "Lower heat, add yogurt gradually with Kashmiri chilli, fennel and ginger powder, stirring continuously." },
      { title: "Slow cook the mutton", time: 60, detail: "Return the mutton to the pot, add water and simmer on low heat until tender." },
      { title: "Finish & serve", time: 2, detail: "Adjust salt, simmer until the oil separates, and serve hot with rice or naan." },
    ],
    prepTime: 20, cookTime: 90, servings: 4, difficulty: "Hard", rating: 4.8, reviews: 167,
    dietary: ["Non-Vegetarian", "High Protein", "Gluten Free"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 9, budgetLevel: "High",
    equipment: ["Heavy Pot"],
  },
  {
    id: 19, name: "Chicken 65", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLCMBqpPbGixWKafeh4aLsKpnUUGImPgc4YpeLwtTog&s=10", cuisine: "South Indian", category: "Snacks",
    description: "Spicy, deep-fried chicken bites tossed in curry leaves and green chillies — a South Indian favourite.",
    ingredients: [
      { qty: "400g", item: "Chicken, boneless, cubed" }, { qty: "2 tbsp", item: "Curd (yogurt)" },
      { qty: "1 tbsp", item: "Ginger garlic paste" }, { qty: "2 tbsp", item: "Corn flour" },
      { qty: "1 tbsp", item: "Rice flour" }, { qty: "1 tsp", item: "Red chilli powder" },
      { qty: "1 sprig", item: "Curry leaves" }, { qty: "2", item: "Green chillies, slit" },
      { qty: "", item: "Oil, for frying" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate the chicken", time: 20, detail: "Mix chicken with curd, ginger garlic paste, red chilli powder, corn flour, rice flour and salt. Rest for 20 minutes." },
      { title: "Fry the chicken", time: 10, detail: "Deep fry the marinated chicken pieces until golden and crisp. Drain and set aside." },
      { title: "Temper & toss", time: 5, detail: "Heat a little oil, sauté curry leaves and green chillies, then toss in the fried chicken." },
      { title: "Serve", time: 1, detail: "Serve hot as a starter or snack." },
    ],
    prepTime: 20, cookTime: 20, servings: 3, difficulty: "Medium", rating: 4.7, reviews: 289,
    dietary: ["Non-Vegetarian", "High Protein"], spiceLevel: "Spicy",
    lifestyle: ["Bachelor Friendly"], ingredientCount: 9, budgetLevel: "Medium",
    equipment: ["Pan", "Kadai"],
  },
  {
    id: 20, name: "Chicken Fried Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcY9Yu1K1xdU8Yw3WJUgVpfpcH26yCYCoe839PqU7Qvg&s=10", cuisine: "Indo-Chinese", category: "Dinner",
    description: "Quick wok-tossed rice with tender chicken, vegetables and soy sauce — a weeknight favourite.",
    ingredients: [
      { qty: "2 cups", item: "Cooked rice, cold" }, { qty: "200g", item: "Chicken, boneless, diced" },
      { qty: "1", item: "Carrot, diced" }, { qty: "1/2 cup", item: "Beans, chopped" },
      { qty: "2", item: "Spring onions, chopped" }, { qty: "2 tbsp", item: "Soy sauce" },
      { qty: "1 tbsp", item: "Oil" }, { qty: "", item: "Salt & pepper to taste" },
    ],
    instructions: [
      { title: "Cook the chicken", time: 8, detail: "Heat oil in a wok, cook the diced chicken until done. Set aside." },
      { title: "Stir-fry the veggies", time: 4, detail: "In the same wok, stir-fry carrot and beans on high heat for a couple of minutes." },
      { title: "Toss the rice", time: 5, detail: "Add rice and soy sauce, toss well on high heat for 3–4 minutes." },
      { title: "Combine & serve", time: 2, detail: "Add back the cooked chicken and spring onions, toss well and serve hot." },
    ],
    prepTime: 10, cookTime: 20, servings: 2, difficulty: "Easy", rating: 4.6, reviews: 234,
    dietary: ["Non-Vegetarian", "High Protein"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Student Friendly"], ingredientCount: 8,
    budgetLevel: "Low", equipment: ["Wok"],
  },
  {
    id: 21, name: "Sarson Da Saag", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sarson_ka_Saag_aur_Makki_ki_roti.jpg", cuisine: "Punjabi", category: "Dinner",
    description: "Slow-cooked mustard greens simmered with spinach and spices, finished with ghee and served with warm makki roti.",
    ingredients: [
      { qty: "500g", item: "Mustard greens (sarson), chopped" }, { qty: "200g", item: "Spinach, chopped" },
      { qty: "1", item: "Onion, chopped" }, { qty: "2", item: "Tomatoes, chopped" },
      { qty: "1 tbsp", item: "Ginger garlic paste" }, { qty: "2 tbsp", item: "Makki (cornmeal) flour" },
      { qty: "3 tbsp", item: "Ghee" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Boil the greens", time: 20, detail: "Boil mustard greens and spinach with a little water until soft." },
      { title: "Blend to a paste", time: 5, detail: "Mash or blend the boiled greens into a coarse, rustic paste." },
      { title: "Make the tempering", time: 8, detail: "Heat ghee, sauté onions, ginger garlic paste and tomatoes until soft." },
      { title: "Simmer together", time: 15, detail: "Add the greens paste and cornmeal flour, simmer on low heat, stirring occasionally." },
      { title: "Finish & serve", time: 2, detail: "Top with a knob of ghee and serve hot with makki roti." },
    ],
    prepTime: 20, cookTime: 35, servings: 4, difficulty: "Medium", rating: 4.7, reviews: 143,
    dietary: ["Vegetarian", "Gluten Free"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Medium", equipment: ["Pan", "Blender"],
  },
  {
    id: 22, name: "Punjabi Kadhi Pakora", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kadhi_Pakoda.JPG", cuisine: "Punjabi", category: "Lunch",
    description: "Tangy yogurt-gram flour curry studded with crisp onion fritters — a Punjabi comfort-food classic.",
    ingredients: [
      { qty: "1 cup", item: "Yogurt, whisked" }, { qty: "3 tbsp", item: "Gram flour (besan)" },
      { qty: "1", item: "Onion, sliced" }, { qty: "2 tbsp", item: "Gram flour, for pakora" },
      { qty: "1 tsp", item: "Cumin seeds" }, { qty: "1 tsp", item: "Turmeric powder" },
      { qty: "", item: "Oil, for frying" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the pakora batter", time: 5, detail: "Mix sliced onions with gram flour, salt and a splash of water into a thick batter." },
      { title: "Fry the pakoras", time: 8, detail: "Deep fry spoonfuls of batter until golden and crisp. Drain and set aside." },
      { title: "Whisk the kadhi base", time: 3, detail: "Whisk yogurt with gram flour, turmeric and water until smooth." },
      { title: "Simmer the kadhi", time: 20, detail: "Heat oil, temper cumin seeds, add the yogurt mixture and simmer on low heat, stirring often." },
      { title: "Add pakoras & serve", time: 2, detail: "Drop in the fried pakoras just before serving, simmer for 2 minutes and serve hot with rice." },
    ],
    prepTime: 15, cookTime: 30, servings: 3, difficulty: "Medium", rating: 4.6, reviews: 118,
    dietary: ["Vegetarian"], spiceLevel: "Medium",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Kadai", "Pan"],
  },
  {
    id: 23, name: "Khaman Dhokla", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Khaman_dhokla.jpg", cuisine: "Gujarati", category: "Snacks",
    description: "Steamed, spongy gram-flour cakes with a tangy-sweet tempering of mustard seeds and curry leaves.",
    ingredients: [
      { qty: "1 cup", item: "Gram flour (besan)" }, { qty: "1 tsp", item: "Ginger green chilli paste" },
      { qty: "1 tsp", item: "Fruit salt (ENO) or baking soda" }, { qty: "1 tbsp", item: "Sugar" },
      { qty: "1 tbsp", item: "Lemon juice" }, { qty: "1 tsp", item: "Mustard seeds" },
      { qty: "1 sprig", item: "Curry leaves" }, { qty: "2 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the batter", time: 5, detail: "Whisk gram flour, ginger green chilli paste, sugar, salt and water into a smooth, thick batter." },
      { title: "Steam the dhokla", time: 15, detail: "Add fruit salt, pour into a greased tin and steam until a toothpick comes out clean." },
      { title: "Make the tempering", time: 3, detail: "Heat oil, temper mustard seeds and curry leaves, then stir in lemon juice and a little water." },
      { title: "Soak & serve", time: 2, detail: "Pour the tempering over the steamed dhokla, cut into squares and serve with green chutney." },
    ],
    prepTime: 10, cookTime: 20, servings: 4, difficulty: "Easy", rating: 4.6, reviews: 176,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 9, budgetLevel: "Low", equipment: ["Steamer", "Pan"],
  },
  {
    id: 24, name: "Undhiyu", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Undhiyu.jpg", cuisine: "Gujarati", category: "Dinner",
    description: "A hearty winter medley of seasonal vegetables and fenugreek dumplings, slow-cooked in a fragrant Gujarati spice blend.",
    ingredients: [
      { qty: "1 cup", item: "Purple yam, cubed" }, { qty: "1 cup", item: "Sweet potato, cubed" },
      { qty: "1 cup", item: "Green beans (papdi)" }, { qty: "1 cup", item: "Baby eggplant, halved" },
      { qty: "1 cup", item: "Fenugreek dumplings (muthiya)" }, { qty: "2 tbsp", item: "Undhiyu masala" },
      { qty: "3 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Prep the vegetables", time: 15, detail: "Wash and cut all the vegetables into bite-sized pieces." },
      { title: "Make the muthiya", time: 15, detail: "Shape fenugreek-leaf dough into small dumplings and shallow fry until golden." },
      { title: "Cook the vegetables", time: 25, detail: "Heat oil, add undhiyu masala and the vegetables, cover and cook on low heat until tender." },
      { title: "Add muthiya & finish", time: 5, detail: "Fold in the fried muthiya, simmer for a few minutes and serve hot." },
    ],
    prepTime: 25, cookTime: 45, servings: 4, difficulty: "Hard", rating: 4.7, reviews: 92,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Medium",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Medium", equipment: ["Heavy Pot"],
  },
  {
    id: 25, name: "Macher Jhol", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Macher_Jhol.JPG", cuisine: "Bengali", category: "Lunch",
    description: "A light, turmeric-forward Bengali fish curry simmered with potatoes in a thin, comforting gravy.",
    ingredients: [
      { qty: "500g", item: "Rohu fish, cut into pieces" }, { qty: "2", item: "Potatoes, cut into wedges" },
      { qty: "1", item: "Tomato, chopped" }, { qty: "1 tsp", item: "Nigella seeds (kalonji)" },
      { qty: "1 tsp", item: "Turmeric powder" }, { qty: "1 tsp", item: "Cumin powder" },
      { qty: "3 tbsp", item: "Mustard oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate & fry the fish", time: 10, detail: "Rub the fish with turmeric and salt, then shallow fry lightly in mustard oil. Set aside." },
      { title: "Fry the potatoes", time: 5, detail: "In the same oil, fry the potato wedges until lightly golden." },
      { title: "Make the base", time: 5, detail: "Temper nigella seeds, add tomato, turmeric and cumin, cook until soft." },
      { title: "Simmer the curry", time: 12, detail: "Add water and the fried potatoes, simmer until tender, then slide in the fish." },
      { title: "Finish & serve", time: 3, detail: "Simmer for a couple more minutes and serve hot with steamed rice." },
    ],
    prepTime: 15, cookTime: 25, servings: 3, difficulty: "Medium", rating: 4.7, reviews: 134,
    dietary: ["Non-Vegetarian", "Gluten Free"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Medium", equipment: ["Pan"],
  },
  {
    id: 26, name: "Cholar Dal", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cholar_daal_-_Kolkata_-_West_Bengal.jpg", cuisine: "Bengali", category: "Dinner",
    description: "A gently sweet Bengali split-chickpea dal, tempered with bay leaf, cinnamon and coconut slivers.",
    ingredients: [
      { qty: "1 cup", item: "Split chickpeas (chana dal)" }, { qty: "2 tbsp", item: "Coconut, sliced" },
      { qty: "1", item: "Bay leaf" }, { qty: "1", item: "Cinnamon stick" },
      { qty: "2", item: "Green cardamom" }, { qty: "1 tbsp", item: "Sugar" },
      { qty: "2 tbsp", item: "Ghee" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Boil the dal", time: 25, detail: "Pressure cook the split chickpeas with turmeric and salt until soft but holding shape." },
      { title: "Fry the coconut", time: 3, detail: "Heat ghee and lightly fry the coconut slivers until golden. Set aside." },
      { title: "Temper the whole spices", time: 3, detail: "In the same ghee, temper bay leaf, cinnamon and cardamom until fragrant." },
      { title: "Simmer & sweeten", time: 10, detail: "Add the boiled dal, sugar and a little water, simmer until it thickens slightly." },
      { title: "Finish & serve", time: 2, detail: "Top with the fried coconut and serve with luchi or rice." },
    ],
    prepTime: 10, cookTime: 40, servings: 4, difficulty: "Easy", rating: 4.6, reviews: 87,
    dietary: ["Vegetarian", "High Protein"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Pressure Cooker", "Pan"],
  },
  {
    id: 27, name: "Gongura Mutton", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0piSl__LdCbc1LlkP1a2CXFV9omxGzzL5OI2jjjshTg&s=10", cuisine: "Andhra", category: "Dinner",
    description: "A tangy Andhra specialty of slow-cooked mutton folded into a sharp sorrel-leaf (gongura) paste.",
    ingredients: [
      { qty: "500g", item: "Mutton, curry cut" }, { qty: "2 cups", item: "Gongura (sorrel) leaves" },
      { qty: "2", item: "Onions, sliced" }, { qty: "1 tbsp", item: "Ginger garlic paste" },
      { qty: "1 tbsp", item: "Red chilli powder" }, { qty: "1 tsp", item: "Turmeric powder" },
      { qty: "3 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Cook the gongura", time: 10, detail: "Cook the sorrel leaves down with a little water until soft, then mash into a coarse paste." },
      { title: "Pressure cook the mutton", time: 30, detail: "Pressure cook the mutton with ginger garlic paste, turmeric and salt until tender." },
      { title: "Make the masala", time: 10, detail: "Heat oil, fry onions until deep golden, add red chilli powder and cook briefly." },
      { title: "Combine & simmer", time: 15, detail: "Add the cooked mutton and gongura paste, simmer together until the oil separates." },
      { title: "Serve", time: 1, detail: "Serve hot with steamed rice or bagara rice." },
    ],
    prepTime: 20, cookTime: 65, servings: 4, difficulty: "Hard", rating: 4.8, reviews: 109,
    dietary: ["Non-Vegetarian", "High Protein", "Gluten Free"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "High", equipment: ["Pressure Cooker", "Pan"],
  },
  {
    id: 28, name: "Pesarattu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaWN2BDtv9MirnIorvcwtyTMpOKb7FaNukuTeHmcOOvg&s=10", cuisine: "Andhra", category: "Breakfast",
    description: "A protein-rich Andhra crepe made from whole green gram batter, crisp at the edges and served with ginger chutney.",
    ingredients: [
      { qty: "1 cup", item: "Green gram (moong dal), soaked overnight" }, { qty: "1", item: "Green chilli" },
      { qty: "1 inch", item: "Ginger" }, { qty: "1", item: "Onion, finely chopped" },
      { qty: "1 tsp", item: "Cumin seeds" }, { qty: "2 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Grind the batter", time: 5, detail: "Grind the soaked green gram with ginger, green chilli and cumin into a smooth batter." },
      { title: "Heat the tawa", time: 2, detail: "Heat a flat griddle and spread a ladle of batter into a thin circle." },
      { title: "Cook the pesarattu", time: 4, detail: "Sprinkle chopped onions on top, drizzle oil around the edges and cook until crisp." },
      { title: "Fold & serve", time: 1, detail: "Fold and serve hot with ginger or coconut chutney." },
    ],
    prepTime: 10, cookTime: 15, servings: 2, difficulty: "Easy", rating: 4.6, reviews: 128,
    dietary: ["Vegetarian", "Vegan", "High Protein"], spiceLevel: "Mild",
    lifestyle: ["Bachelor Friendly", "Beginner Friendly"], ingredientCount: 7, budgetLevel: "Low", equipment: ["Tawa", "Blender"],
  },
  {
    id: 31, name: "Andhra Chicken Curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqb67U75hRnSzSRE3WB1ilrjw1joL2xbqWsGyj76wPWw&s=10", cuisine: "Andhra", category: "Dinner",
    description: "A fiery Andhra-style chicken curry (Kodi Kura) simmered in a deep red onion-tomato masala loaded with red chillies.",
    ingredients: [
      { qty: "600g", item: "Chicken, curry cut" }, { qty: "2", item: "Onions, finely chopped" },
      { qty: "2", item: "Tomatoes, chopped" }, { qty: "1 tbsp", item: "Ginger garlic paste" },
      { qty: "2 tbsp", item: "Andhra red chilli powder" }, { qty: "1 tsp", item: "Coriander powder" },
      { qty: "1 sprig", item: "Curry leaves" }, { qty: "3 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Sauté the base", time: 8, detail: "Heat oil, temper curry leaves, then sauté onions until deep golden brown." },
      { title: "Add spices", time: 5, detail: "Add ginger garlic paste, red chilli powder and coriander powder, cook until fragrant." },
      { title: "Cook the tomatoes", time: 6, detail: "Add tomatoes and cook until soft and the oil separates." },
      { title: "Simmer the chicken", time: 25, detail: "Add chicken and salt, cover and simmer on low heat until fully cooked and the gravy thickens." },
      { title: "Serve", time: 1, detail: "Serve hot with steamed rice or bagara rice." },
    ],
    prepTime: 15, cookTime: 40, servings: 4, difficulty: "Medium", rating: 4.8, reviews: 214,
    dietary: ["Non-Vegetarian", "High Protein", "Gluten Free"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 9, budgetLevel: "Medium", equipment: ["Pan"],
  },
  {
    id: 32, name: "Pulihora", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHapFtIFNi7nIIDGpVFZHAFFsA2gkSdvP5EwOBYc-YQ&s=10", cuisine: "Andhra", category: "Lunch",
    description: "Tangy Andhra tamarind rice tempered with peanuts, curry leaves and mustard seeds — a temple-food classic.",
    ingredients: [
      { qty: "2 cups", item: "Rice, cooked & cooled" }, { qty: "3 tbsp", item: "Tamarind paste" },
      { qty: "3 tbsp", item: "Peanuts" }, { qty: "1 tbsp", item: "Chana dal" },
      { qty: "1 tsp", item: "Mustard seeds" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "2", item: "Dried red chillies" }, { qty: "3 tbsp", item: "Sesame oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the tamarind base", time: 6, detail: "Simmer tamarind paste with turmeric and salt until it thickens slightly." },
      { title: "Temper the spices", time: 5, detail: "Heat sesame oil, fry peanuts and chana dal until golden, then add mustard seeds, curry leaves and dried red chillies." },
      { title: "Combine with tamarind", time: 3, detail: "Pour the tamarind base into the tempering and cook for 2 minutes." },
      { title: "Mix with rice", time: 3, detail: "Fold the tamarind mixture through the cooked rice until evenly coated." },
    ],
    prepTime: 10, cookTime: 15, servings: 3, difficulty: "Easy", rating: 4.6, reviews: 143,
    dietary: ["Vegetarian", "Vegan", "Gluten Free"], spiceLevel: "Medium",
    lifestyle: ["Bachelor Friendly", "Student Friendly", "Family Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 33, name: "Gutti Vankaya Kura", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mAcBkh5KoPyl8dYFjv6v_QLk3aqYIl8zARGnkpgWyQ&s=10", cuisine: "Andhra", category: "Lunch",
    description: "Baby eggplants slit and stuffed with a roasted peanut-sesame masala, simmered in a spiced tamarind gravy.",
    ingredients: [
      { qty: "8", item: "Baby brinjals (eggplants)" }, { qty: "3 tbsp", item: "Peanuts" },
      { qty: "2 tbsp", item: "Sesame seeds" }, { qty: "1 tbsp", item: "Coriander seeds" },
      { qty: "1 tbsp", item: "Tamarind paste" }, { qty: "1 tsp", item: "Red chilli powder" },
      { qty: "1", item: "Onion, chopped" }, { qty: "3 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Make the stuffing", time: 8, detail: "Dry roast peanuts, sesame and coriander seeds, then grind with tamarind and chilli powder into a thick paste." },
      { title: "Stuff the brinjals", time: 8, detail: "Slit the brinjals into quarters and stuff generously with the masala paste." },
      { title: "Sauté the onions", time: 6, detail: "Heat oil, sauté onions until soft, then add the stuffed brinjals." },
      { title: "Simmer to finish", time: 15, detail: "Add remaining masala paste and a splash of water, cover and simmer until the brinjals are tender." },
      { title: "Serve", time: 1, detail: "Serve hot with rice or roti." },
    ],
    prepTime: 20, cookTime: 30, servings: 3, difficulty: "Medium", rating: 4.6, reviews: 97,
    dietary: ["Vegetarian", "Vegan", "Gluten Free"], spiceLevel: "Medium",
    lifestyle: ["Family Friendly"], ingredientCount: 9, budgetLevel: "Low", equipment: ["Pan"],
  },
  {
    id: 34, name: "Royyala Iguru", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPIK8YW9QrQARDZUBwJTbkUROCrdg_k2K11behEZspRQ&s=10", cuisine: "Andhra", category: "Dinner",
    description: "A thick, dry-roasted Andhra prawn curry cooked down with onions and red chillies until deeply flavourful.",
    ingredients: [
      { qty: "400g", item: "Prawns, cleaned & deveined" }, { qty: "2", item: "Onions, finely chopped" },
      { qty: "1", item: "Tomato, chopped" }, { qty: "1 tbsp", item: "Ginger garlic paste" },
      { qty: "1.5 tbsp", item: "Red chilli powder" }, { qty: "1 sprig", item: "Curry leaves" },
      { qty: "3 tbsp", item: "Oil" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Marinate the prawns", time: 10, detail: "Toss the prawns with turmeric, a little chilli powder and salt. Set aside." },
      { title: "Cook the masala", time: 10, detail: "Heat oil, temper curry leaves, sauté onions until golden, then add ginger garlic paste and tomato." },
      { title: "Add spices", time: 4, detail: "Add red chilli powder and cook until the oil separates from the masala." },
      { title: "Cook the prawns", time: 8, detail: "Add the marinated prawns and cook uncovered on medium heat until the curry thickens and clings to the prawns." },
      { title: "Serve", time: 1, detail: "Serve hot with steamed rice." },
    ],
    prepTime: 15, cookTime: 25, servings: 3, difficulty: "Medium", rating: 4.7, reviews: 88,
    dietary: ["Non-Vegetarian", "High Protein", "Gluten Free"], spiceLevel: "Spicy",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Medium", equipment: ["Pan"],
  },
  {
    id: 35, name: "Mirchi Bajji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ICwtOJjXqtwCsVMWhpeQT47xZ7yuMNHKfOZ_zTsl4w&s=10", cuisine: "Andhra", category: "Snacks",
    description: "Large mild green chillies stuffed with a tangy tamarind-cumin filling, dipped in gram flour batter and deep fried.",
    ingredients: [
      { qty: "6", item: "Bajji chillies (large, mild)" }, { qty: "1 cup", item: "Gram flour (besan)" },
      { qty: "1 tbsp", item: "Rice flour" }, { qty: "1 tsp", item: "Cumin seeds" },
      { qty: "1 tbsp", item: "Tamarind paste" }, { qty: "1 tsp", item: "Red chilli powder" },
      { qty: "", item: "Oil, for frying" }, { qty: "", item: "Salt to taste" },
    ],
    instructions: [
      { title: "Prepare the chillies", time: 5, detail: "Slit the chillies lengthwise and remove most of the seeds." },
      { title: "Make the filling", time: 5, detail: "Mix tamarind paste, roasted cumin, chilli powder and salt into a thick paste, then stuff into the chillies." },
      { title: "Make the batter", time: 3, detail: "Whisk gram flour, rice flour, salt and water into a smooth, thick batter." },
      { title: "Fry the bajjis", time: 10, detail: "Dip the stuffed chillies in batter and deep fry until golden and crisp." },
      { title: "Serve", time: 1, detail: "Serve hot with tamarind or coconut chutney." },
    ],
    prepTime: 15, cookTime: 15, servings: 3, difficulty: "Easy", rating: 4.5, reviews: 76,
    dietary: ["Vegetarian", "Vegan"], spiceLevel: "Spicy",
    lifestyle: ["Bachelor Friendly", "Student Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Kadai"],
  },
  {
    id: 36, name: "Bobbatlu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_r1p_ls8WRmxhfGdGhIyJCf9SF-7uR3JAVBp3UWjAvw&s=10", cuisine: "Andhra", category: "Dessert",
    description: "A festive Andhra sweet flatbread stuffed with a jaggery-chana dal filling and cooked on a griddle with ghee.",
    ingredients: [
      { qty: "1.5 cups", item: "All-purpose flour" }, { qty: "1 cup", item: "Chana dal, cooked" },
      { qty: "1 cup", item: "Jaggery, grated" }, { qty: "1/2 tsp", item: "Cardamom powder" },
      { qty: "3 tbsp", item: "Ghee" }, { qty: "", item: "Oil, for kneading" },
    ],
    instructions: [
      { title: "Make the dough", time: 10, detail: "Knead the flour with oil and water into a very soft, pliable dough. Rest for at least 1 hour." },
      { title: "Make the filling", time: 12, detail: "Cook the chana dal with jaggery on low heat until it dries into a thick, moldable mixture. Stir in cardamom powder." },
      { title: "Stuff & roll", time: 15, detail: "Flatten a ball of dough, stuff with filling, seal and gently roll out into a thin round." },
      { title: "Cook on the griddle", time: 4, detail: "Cook on a hot griddle with ghee on both sides until golden brown spots appear." },
      { title: "Serve", time: 1, detail: "Serve warm with a dollop of ghee, or with milk." },
    ],
    prepTime: 75, cookTime: 20, servings: 6, difficulty: "Hard", rating: 4.8, reviews: 64,
    dietary: ["Vegetarian"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 6, budgetLevel: "Medium", equipment: ["Tawa"],
  },
  {
    id: 29, name: "Gulab Jamun", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gulab_jamun_1.jpg", cuisine: "North Indian", category: "Dessert",
    description: "Soft milk-solid dumplings deep-fried to a rich golden brown and soaked in fragrant cardamom-rose sugar syrup.",
    ingredients: [
      { qty: "1 cup", item: "Milk powder" }, { qty: "3 tbsp", item: "All-purpose flour" },
      { qty: "1/4 tsp", item: "Baking soda" }, { qty: "2 tbsp", item: "Ghee" },
      { qty: "2 tbsp", item: "Milk, as needed" }, { qty: "1.5 cups", item: "Sugar" },
      { qty: "4", item: "Cardamom pods" }, { qty: "", item: "Oil, for frying" },
    ],
    instructions: [
      { title: "Make the dough", time: 8, detail: "Mix milk powder, flour, baking soda and ghee, then bind into a soft dough with a little milk." },
      { title: "Shape the balls", time: 5, detail: "Roll the dough into smooth, crack-free balls." },
      { title: "Make the syrup", time: 8, detail: "Boil sugar with water and cardamom pods until a thin, one-string syrup forms." },
      { title: "Fry the jamuns", time: 10, detail: "Deep fry the balls on low heat, stirring gently, until evenly golden brown." },
      { title: "Soak & serve", time: 20, detail: "Drop the fried jamuns into the warm syrup and let them soak for at least 20 minutes before serving." },
    ],
    prepTime: 15, cookTime: 25, servings: 4, difficulty: "Medium", rating: 4.9, reviews: 356,
    dietary: ["Vegetarian"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 8, budgetLevel: "Low", equipment: ["Pan", "Kadai"],
  },
  {
    id: 30, name: "Rice Kheer", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kheer.jpg", cuisine: "North Indian", category: "Dessert",
    description: "Creamy rice pudding simmered slowly in sweetened milk with cardamom, saffron and toasted nuts.",
    ingredients: [
      { qty: "1/4 cup", item: "Rice, washed" }, { qty: "1 litre", item: "Full-fat milk" },
      { qty: "1/3 cup", item: "Sugar" }, { qty: "4", item: "Cardamom pods, crushed" },
      { qty: "", item: "A few saffron strands" }, { qty: "2 tbsp", item: "Almonds & pistachios, chopped" },
    ],
    instructions: [
      { title: "Cook the rice in milk", time: 25, detail: "Simmer rice in milk on low heat, stirring often, until soft and the milk thickens." },
      { title: "Add sweetness & spice", time: 8, detail: "Stir in sugar, cardamom and saffron, and simmer until creamy." },
      { title: "Garnish & serve", time: 2, detail: "Top with chopped almonds and pistachios, and serve warm or chilled." },
    ],
    prepTime: 5, cookTime: 35, servings: 4, difficulty: "Easy", rating: 4.8, reviews: 267,
    dietary: ["Vegetarian"], spiceLevel: "Mild",
    lifestyle: ["Family Friendly"], ingredientCount: 6, budgetLevel: "Low", equipment: ["Pan"],
  },
];

function normalizeIngredientName(raw) {
  let s = raw.split(",")[0].trim();
  s = s.replace(/\(.*?\)/g, "").trim();
  s = s.replace(/\s*to taste$/i, "").trim();
  s = s.replace(/\s*for frying$/i, "").trim();
  return s;
}

function pluralKey(s) {
  const lower = s.toLowerCase();
  if (lower.endsWith("ies")) return lower.slice(0, -3) + "y";
  if (lower.endsWith("es")) return lower.slice(0, -2);
  if (lower.endsWith("s") && !lower.endsWith("ss")) return lower.slice(0, -1);
  return lower;
}

function getAllIngredientNames(recipes) {
  const map = new Map();
  recipes.forEach((r) => {
    r.ingredients.forEach((ing) => {
      const name = normalizeIngredientName(ing.item);
      if (!name) return;
      const key = pluralKey(name);
      if (!map.has(key)) map.set(key, name);
    });
  });
  return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
}

const ALL_INGREDIENTS = getAllIngredientNames(RECIPES);

const CUISINES = [
  { name: "South Indian", count: "8+ recipes", image: southIndianImg },
  { name: "North Indian", count: "10+ recipes", image: northIndianImg },
  { name: "Andhra", count: "8+ recipes", image: andraImg },
  { name: "Punjabi", count: "2+ recipes", image: punjabiImg },
  { name: "Gujarati", count: "2+ recipes", image: gujaratiImg },
  { name: "Bengali", count: "2+ recipes", image: bengaliImg },
];

const QUICK_CHIPS = [
  { key: "all", label: "All", icon: Compass },
  { key: "spicy", label: "Spicy", icon: Flame },
  { key: "healthy", label: "Healthy", icon: Leaf },
  { key: "quick", label: "Under 15 Min", icon: Zap },
  { key: "bachelor", label: "Bachelor Friendly", icon: HomeIcon },
  { key: "veg", label: "Vegetarian", icon: Leaf },
  { key: "nonveg", label: "Non-Vegetarian", icon: Flame },
  { key: "protein", label: "High Protein", icon: ChefHat },
];

/* ------------------------------------------------------------------ */
/*  THEME                                                              */
/* ------------------------------------------------------------------ */

const THEME = {
  // Illuminated Manuscript — parchment & ink, read by daylight
  light: {
    bg: "#F2EAD9", bg2: "#E8DDC4", card: "#FAF6EC", text: "#241C14", textSoft: "#6E5D46",
    border: "rgba(122,92,20,0.3)", accent: "#8B0000", accentSoft: "#A9821F", green: "#3F7F52", red: "#A32020",
    navBg: "rgba(250,246,236,0.86)",
  },
  // Midnight Grimoire — obsidian, blood crimson, antique gold
  dark: {
    bg: "#0A0A0A", bg2: "#121212", card: "#1A1A1A", text: "#F5F2EB", textSoft: "#B8B2A6",
    border: "rgba(201,162,39,0.25)", accent: "#8B0000", accentSoft: "#C9A227", green: "#4C9A6A", red: "#B22222",
    navBg: "rgba(10,10,10,0.86)",
  },
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */

function bachelorScore(r) {
  let s = 0;
  if (r.difficulty === "Easy") s += 2;
  if (r.prepTime + r.cookTime <= 30) s += 2;
  if (r.ingredientCount <= 8) s += 2;
  if (r.servings <= 2) s += 1;
  if (r.budgetLevel === "Low") s += 2;
  if (r.equipment.length <= 2) s += 1;
  return s;
}

function matchesChip(r, chip) {
  switch (chip) {
    case "spicy": return r.spiceLevel === "Spicy" || r.spiceLevel === "Extra Spicy";
    case "healthy": return r.dietary.includes("High Protein") || r.dietary.includes("Low Carb");
    case "quick": return r.prepTime + r.cookTime <= 15;
    case "bachelor": return r.lifestyle.includes("Bachelor Friendly");
    case "veg": return r.dietary.includes("Vegetarian") || r.dietary.includes("Vegan");
    case "nonveg": return r.dietary.includes("Non-Vegetarian");
    case "protein": return r.dietary.includes("High Protein");
    default: return true;
  }
}

function getSearchSuggestions(recipes, query, max = 6) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return recipes
    .map((r) => {
      const name = r.name.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score = 5;
      else if (name.includes(q)) score = 4;
      else if (r.cuisine.toLowerCase().includes(q)) score = 3;
      else if (r.category.toLowerCase().includes(q)) score = 2;
      else if (r.ingredients.some((ing) => ing.item.toLowerCase().includes(q))) score = 1;
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.r);
}

function smartSearchTerms(q) {
  const lower = q.toLowerCase();
  const boosts = { bachelor: false, easy: false, dinner: false, breakfast: false, lunch: false, cheap: false, quick: false };
  if (lower.includes("bachelor")) boosts.bachelor = true;
  if (lower.includes("easy") || lower.includes("simple")) boosts.easy = true;
  if (lower.includes("dinner")) boosts.dinner = true;
  if (lower.includes("breakfast")) boosts.breakfast = true;
  if (lower.includes("lunch")) boosts.lunch = true;
  if (lower.includes("cheap") || lower.includes("affordable") || lower.includes("budget")) boosts.cheap = true;
  if (lower.includes("quick") || lower.includes("fast")) boosts.quick = true;
  return boosts;
}

/* ------------------------------------------------------------------ */
/*  ATOMS                                                               */
/* ------------------------------------------------------------------ */

function Logo({ size = 80, t }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImg} alt="Food Compass Logo" width={size} height={size} className="object-contain" />
    </div>
  );
}

/* Four hand-illuminated manuscript corner flourishes (remixed from a 16th-c. */
/* calligraphy model book), recolored via CSS mask so they follow the theme. */
function CornerOrnaments({ size = 44 }) {
  const common = { WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "contain", maskSize: "contain" };
  return (
    <>
      <span
        className="ft-ornament ft-corner-tl"
        style={{ ...common, width: size, height: size, WebkitMaskImage: `url(${ornCornerTL})`, maskImage: `url(${ornCornerTL})` }}
      />
      <span
        className="ft-ornament ft-corner-tr"
        style={{ ...common, width: size, height: size, WebkitMaskImage: `url(${ornCornerTR})`, maskImage: `url(${ornCornerTR})` }}
      />
      <span
        className="ft-ornament ft-corner-bl"
        style={{ ...common, width: size, height: size, WebkitMaskImage: `url(${ornCornerTL})`, maskImage: `url(${ornCornerTL})` }}
      />
      <span
        className="ft-ornament ft-corner-br"
        style={{ ...common, width: size, height: size, WebkitMaskImage: `url(${ornCornerTR})`, maskImage: `url(${ornCornerTR})` }}
      />
    </>
  );
}

/* A remixed manuscript ornament used as a divider — recolored via CSS mask. */
function DividerArt({ variant = "swave", width = 220, height = 22, className = "" }) {
  const src = variant === "vine" ? ornVineDivider : variant === "scurl" ? ornScurlDivider : ornSwaveDivider;
  return (
    <span
      className={`ft-ornament ft-divider-art ${className}`}
      style={{
        width, height,
        WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskSize: "contain", maskSize: "contain",
        WebkitMaskPosition: "center", maskPosition: "center",
      }}
    />
  );
}

function Badge({ children, tone = "neutral" }) {
  const toneClass = {
    neutral: "ft-badge-neutral",
    green: "ft-badge-green",
    accent: "ft-badge-accent",
    red: "ft-badge-red",
  }[tone];
  return (
    <span
      className={`text-[11px] font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${toneClass}`}
    >
      {children}
    </span>
  );
}

function IconButton({ icon: Icon, onClick, active, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${active ? "ft-iconbtn-active" : "ft-iconbtn-inactive"}`}
    >
      <Icon size={20} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  RECIPE IMAGE (with shimmer loading state)                          */
/* ------------------------------------------------------------------ */

function RecipeImage({ src, alt = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Shimmer placeholder — visible until the image has loaded, and stays
          visible indefinitely if no src has been set yet */}
      <div
        className={`absolute inset-0 recipe-shimmer ft-fade ${loaded ? "is-hidden" : ""}`}
      />
      {src && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={`absolute inset-0 w-full h-full object-cover ft-fade ${loaded ? "is-visible" : ""}`}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SEARCH SUGGESTIONS (autocomplete dropdown)                         */
/* ------------------------------------------------------------------ */

function SearchSuggestions({ t, recipes, query, onSelect }) {
  const suggestions = useMemo(() => getSearchSuggestions(recipes, query), [recipes, query]);
  if (!suggestions.length) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full mt-2 rounded-2xl border overflow-hidden z-50 ft-dropdown"
    >
      {suggestions.map((r) => (
        <button
          key={r.id}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onSelect(r.id); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ft-dropdown-item"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 ft-icon-chip-bg">
            <RecipeImage src={r.image} alt={r.name} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate ft-text">{r.name}</div>
            <div className="text-xs truncate ft-text-soft">{r.cuisine} · {r.category}</div>
          </div>
          <Search size={13} color={t.textSoft} className="shrink-0" />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  INGREDIENT SUGGESTIONS (autocomplete dropdown)                     */
/* ------------------------------------------------------------------ */

function getIngredientSuggestions(draft, existing, max = 6) {
  const q = draft.trim().toLowerCase();
  if (!q) return [];
  const already = new Set(existing.map((i) => i.toLowerCase()));
  return ALL_INGREDIENTS
    .filter((name) => !already.has(name.toLowerCase()))
    .map((name) => {
      const lower = name.toLowerCase();
      let score = 0;
      if (lower.startsWith(q)) score = 2;
      else if (lower.includes(q)) score = 1;
      return { name, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, max)
    .map((x) => x.name);
}

function IngredientSuggestions({ t, draft, existing, onSelect }) {
  const suggestions = useMemo(() => getIngredientSuggestions(draft, existing), [draft, existing]);
  if (!suggestions.length) return null;

  return (
    <div
      className="absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl border overflow-hidden z-50 ft-dropdown"
    >
      {suggestions.map((name) => (
        <button
          key={name}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onSelect(name); }}
          className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ft-text ft-dropdown-item"
        >
          <Search size={12} color={t.textSoft} className="shrink-0" />
          {name}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RECIPE CARD (with flip)                                            */
/* ------------------------------------------------------------------ */

function RecipeCard({ r, t, isFav, onToggleFav, onOpen, compact, index = 0 }) {
  const [flipped, setFlipped] = useState(false);
  const totalTime = r.prepTime + r.cookTime;

  return (
    <div
      className={`relative w-full shrink-0 card-in card-hover-lift ft-card-flip-outer ${compact ? "ft-card-compact" : "ft-card-full"}`}
      style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
      onMouseEnter={() => window.innerWidth >= 768 && setFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ft-card-flip-inner ${flipped ? "is-flipped" : ""}`}
        onClick={() => { if (window.innerWidth < 768) setFlipped((f) => !f); }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border cursor-pointer flex flex-col transition-shadow duration-300 hover:shadow-lg ft-card-face"
        >
          <div className="relative h-32 ft-gradient-card-front">
            <CornerOrnaments size={22} />
            <RecipeImage src={r.image} alt={r.name} />
            <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none ft-photo-fade" />
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFav(r.id); }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur z-10 transition-transform active:scale-90 ft-fav-btn-bg"
            >
              <Heart size={16} fill={isFav ? t.red : "none"} color={isFav ? t.red : t.textSoft} />
            </button>
          </div>
          <div className="p-3 flex-1 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs ft-text-soft">
              <Star size={12} fill={t.accent} color={t.accent} /> {r.rating}
              <Clock size={12} className="ml-1" /> {totalTime} min
              <span>· {r.difficulty}</span>
            </div>
            <div className="font-display font-semibold text-sm leading-snug ft-text">{r.name}</div>
            <div className="flex flex-wrap gap-1 mt-auto">
              {r.dietary.slice(0, 1).map((d) => <Badge key={d} tone={d === "Non-Vegetarian" ? "red" : "green"} t={t}>{d}</Badge>)}
              {r.lifestyle.includes("Bachelor Friendly") && <Badge tone="accent" t={t}>Bachelor Friendly</Badge>}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border p-3 flex flex-col cursor-pointer ft-card-face-back"
        >
          <div className="font-display font-semibold text-sm mb-1 ft-text">{r.name}</div>
          <p className="text-xs leading-snug mb-2 ft-text-soft">{r.description}</p>
          <div className="text-[11px] font-semibold mb-1 ft-text">Ingredients preview</div>
          <ul className="text-[11px] space-y-0.5 mb-2 flex-1 overflow-hidden ft-text-soft">
            {r.ingredients.slice(0, 4).map((ing, i) => <li key={i}>• {ing.qty} {ing.item}</li>)}
          </ul>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(r.id); }}
            className="w-full py-2 rounded-lg text-xs font-semibold text-white transition-transform active:scale-95 ft-btn-accent-shadow"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR + MOBILE MENU                                               */
/* ------------------------------------------------------------------ */

function Navbar({ t, dark, setDark, page, setPage, menuOpen, setMenuOpen, query, setQuery, onOpenFilters, recipes, openRecipe }) {
  const navItems = [
    { key: "home", label: "Home" },
    { key: "explore", label: "Explore" },
    { key: "favorites", label: "Favorites" },
    { key: "about", label: "About" },
  ];
  const [searchFocused, setSearchFocused] = useState(false);
  const navRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const el = navRefs.current[page];
      if (el) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
      } else {
        setIndicator((s) => ({ ...s, opacity: 0 }));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [page]);

  return (
    <div
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ft-navbar"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} color={t.text} />
        </button>
        <button onClick={() => setPage("home")} className="shrink-0">
          <Logo t={t} />
        </button>

        <nav className="hidden md:flex items-center gap-1 ml-2 relative">
          <span
            className="nav-indicator absolute top-0 left-0 h-full rounded-full pointer-events-none ft-nav-indicator"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
              opacity: indicator.opacity,
            }}
          />
          {navItems.map((n) => (
            <button
              key={n.key}
              ref={(el) => (navRefs.current[n.key] = el)}
              onClick={() => setPage(n.key)}
              className={`relative z-10 text-sm font-semibold px-3.5 py-2 rounded-full transition-colors duration-300 ${page === n.key ? "ft-nav-link-active" : "ft-nav-link"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 hidden md:flex justify-end">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" color={t.textSoft} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setPage("explore")}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search recipes..."
              className={`w-full pl-9 pr-3 py-2 rounded-full text-sm outline-none border transition-shadow ft-search-input ${searchFocused ? "is-focused" : ""}`}
            />
            {searchFocused && recipes && (
              <SearchSuggestions
                t={t} recipes={recipes} query={query}
                onSelect={(id) => { openRecipe(id); setQuery(""); }}
              />
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <ThemeToggle dark={dark} setDark={setDark} t={t} />
        </div>

        <button className="md:hidden" onClick={() => setPage("explore")} aria-label="Search">
          <Search size={20} color={t.text} />
        </button>
      </div>
    </div>
  );
}

function ThemeToggle({ dark, setDark, t }) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="relative w-16 h-9 rounded-full flex items-center px-1 transition-colors duration-300 ft-toggle-track"
      aria-label="Toggle theme"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 shadow ft-toggle-knob"
      >
        {dark ? <Moon size={14} color={t.accent} /> : <Sun size={14} color={t.accent} />}
      </div>
    </button>
  );
}

function MobileMenu({ open, onClose, t, dark, setDark, setPage, setActiveChip }) {
  const items = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "explore", label: "Explore Recipes", icon: Search },
    { key: "favorites", label: "Favorites", icon: Heart },
    { key: "bachelor", label: "Bachelor Mode", icon: ChefHat, tag: "New" },
    { key: "about", label: "About", icon: Info },
  ];
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ft-menu-overlay ${open ? "is-open" : ""}`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute left-0 top-0 bottom-0 w-72 max-w-[85%] flex flex-col transition-transform duration-300 ft-menu-panel ${open ? "is-open" : ""}`}
      >
        <div className="flex items-center justify-between p-4 border-b ft-border">
          <Logo size={70} t={t} />
          <button onClick={onClose}><X size={20} color={t.text} /></button>
        </div>
        <div className="flex-1 py-2">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => {
                if (it.key === "bachelor") {
                  setActiveChip("bachelor");
                  setPage("explore");
                } else {
                  setPage(it.key);
                }
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium ft-text"
            >
              <it.icon size={18} color={t.accent} />
              {it.label}
              {it.tag && <Badge tone="accent" t={t}>{it.tag}</Badge>}
            </button>
          ))}
        </div>
        <div className="p-4 border-t flex items-center justify-between ft-border">
          <span className="text-sm font-medium flex items-center gap-2 ft-text">
            <Moon size={16} color={t.accent} /> Dark Mode
          </span>
          <ThemeToggle dark={dark} setDark={setDark} t={t} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FILTER DRAWER                                                       */
/* ------------------------------------------------------------------ */

const FILTER_GROUPS = {
  Dietary: ["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian", "High Protein", "Gluten Free"],
  Lifestyle: ["Bachelor Friendly", "Student Friendly", "Beginner Friendly", "Family Friendly"],
  "Meal Type": ["Breakfast", "Lunch", "Dinner", "Snacks", "Dessert"],
  "Cooking Time": ["Under 15 min", "15–30 min", "30–60 min", "60+ min"],
  Difficulty: ["Easy", "Medium", "Hard"],};

function FilterDrawer({ open, onClose, t, filters, toggleFilter, clearFilters, mobile }) {
  const count = Object.values(filters).flat().length;
  if (!mobile) {
    return (
      <div className="hidden lg:block w-64 shrink-0">
        <div className="rounded-2xl border p-4 sticky top-20 ft-card-border">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-sm ft-text">Filters</div>
            <button onClick={clearFilters} className="text-xs font-medium ft-accent">Clear All</button>
          </div>
          <FilterGroups t={t} filters={filters} toggleFilter={toggleFilter} />
        </div>
      </div>
    );
  }
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ft-drawer-overlay ${open ? "is-open" : ""}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ft-drawer-backdrop ${open ? "is-open" : ""}`} onClick={onClose} />
      <div
        className={`absolute left-0 right-0 bottom-0 rounded-t-3xl max-h-[85vh] flex flex-col transition-transform duration-300 ft-drawer-panel ${open ? "is-open" : ""}`}
      >
        <div className="flex items-center justify-between p-4 border-b shrink-0 ft-border">
          <div className="font-semibold ft-text">Filters</div>
          <button onClick={clearFilters} className="text-sm font-medium ft-accent">Clear All</button>
        </div>
        <div className="overflow-y-auto p-4 flex-1">
          <FilterGroups t={t} filters={filters} toggleFilter={toggleFilter} />
        </div>
        <div className="p-4 border-t shrink-0 ft-border">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-white ft-bg-green"
          >
            Apply Filters {count > 0 ? `(${count})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterGroups({ t, filters, toggleFilter }) {
  return (
    <div className="space-y-5">
      {Object.entries(FILTER_GROUPS).map(([group, opts]) => (
        <div key={group}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2 ft-text-soft">{group}</div>
          <div className="flex flex-wrap gap-2">
            {opts.map((opt) => {
              const active = filters[group]?.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleFilter(group, opt)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1 ${active ? "ft-chip-active" : "ft-chip-inactive"}`}
                >
                  {active && <Check size={12} />}
                  {opt === "Bachelor Friendly" && "⭐ "}{opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO + QUICK CHIPS                                                  */
/* ------------------------------------------------------------------ */

function Hero({ t, dark, query, setQuery, ingredients, addIngredient, removeIngredient, setPage, recipes, openRecipe }) {
  const [draft, setDraft] = useState("");
  const heroImg = dark ? heroImgDark : heroImgLight;
  const [searchFocused, setSearchFocused] = useState(false);
  const [ingredientFocused, setIngredientFocused] = useState(false);
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div
          className="inline-flex items-center gap-1.5 text-xs font-semibold mb-4 px-3 py-1.5 rounded-full ft-flame-badge"
        >
          <Flame size={13} /> Find. Cook. Enjoy.
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4 ft-text">
          What are you<br />
          <span className="ft-accent">craving</span> today?
        </h1>
        <DividerArt variant="swave" width={200} height={18} className="mb-3" />
        <p className="text-[15px] mb-5 max-w-md ft-text-soft">
          Discover delicious recipes based on what you already have in your kitchen.
        </p>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color={t.textSoft} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setPage("explore")}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search recipes, ingredients or dishes..."
            className={`w-full pl-11 pr-4 py-3.5 rounded-full text-sm outline-none border transition-shadow ft-hero-search ${searchFocused ? "is-focused" : ""}`}
          />
          {searchFocused && recipes && (
            <SearchSuggestions
              t={t} recipes={recipes} query={query}
              onSelect={(id) => { openRecipe(id); setQuery(""); }}
            />
          )}
        </div>
        <div className="text-xs font-semibold mb-2 ft-text-soft">What's in your kitchen?</div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ingredients.map((ing) => (
            <span key={ing} className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium ft-ingredient-chip">
              {ing}
              <X size={12} className="cursor-pointer" onClick={() => removeIngredient(ing)} />
            </span>
          ))}
          <div className="relative">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { addIngredient(draft.trim()); setDraft(""); } }}
              onFocus={() => setIngredientFocused(true)}
              onBlur={() => setIngredientFocused(false)}
              placeholder="+ Add more"
              className="text-xs px-3 py-1.5 rounded-full outline-none border bg-transparent w-24 ft-border-text"
            />
            {ingredientFocused && (
              <IngredientSuggestions
                t={t} draft={draft} existing={ingredients}
                onSelect={(name) => { addIngredient(name); setDraft(""); }}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setPage("explore")}
          className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform active:scale-95 ft-btn-accent-cta"
        >
          Find Recipes
        </button>
      </div>
      <div className="hidden md:block relative h-[26rem] lg:h-[30rem]">
        <div
          className="absolute -inset-4 rounded-[2.5rem] opacity-70 ft-hero-blob"
        />
        <div
          className="relative z-10 flex items-center justify-center rounded-[2rem] h-full overflow-hidden ft-hero-frame ft-card-shadow-lg"
        >
          <span
            className="ft-medallion-watermark z-0"
            style={{
              top: "15%", left: "15%", right: "15%", bottom: "15%",
              WebkitMaskImage: `url(${ornMedallion})`, maskImage: `url(${ornMedallion})`,
            }}
          />
          <img src={heroImg} alt="Cooking illustration" className="relative z-10 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function QuickChips({ t, active, setActive }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-2">
      <div className="flex gap-2 overflow-x-auto pb-2 ft-no-scrollbar">
        {QUICK_CHIPS.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all active:scale-95 ft-quickchip ${active === c.key ? "is-active" : ""}`}
          >
            <c.icon size={13} /> {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HOME PAGE SECTIONS                                                  */
/* ------------------------------------------------------------------ */

function CardRow({ title, recipes, t, favorites, toggleFav, openRecipe, onViewAll }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-lg ft-text ft-heading-ornate">{title}</h2>
        {onViewAll && <button onClick={onViewAll} className="text-xs font-semibold flex items-center gap-1 ft-accent">View all <ChevronRight size={14} /></button>}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 ft-no-scrollbar">
        {recipes.map((r, i) => (
          <div key={r.id} className="w-44 md:w-52 shrink-0">
            <RecipeCard r={r} t={t} isFav={favorites.has(r.id)} onToggleFav={toggleFav} onOpen={openRecipe} compact index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BachelorSection({ t, recipes, favorites, toggleFav, openRecipe, setPage }) {
  const bach = recipes.filter((r) => r.lifestyle.includes("Bachelor Friendly")).sort((a, b) => bachelorScore(b) - bachelorScore(a)).slice(0, 5);
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="rounded-3xl p-5 md:p-6 relative overflow-hidden ft-bachelor-panel">
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none ft-bachelor-blob"
        />
        <div className="flex items-center gap-2 mb-1 relative">
          <HomeIcon size={18} color={t.green} />
          <h2 className="font-display font-bold text-lg ft-text ft-heading-ornate">Living Solo? <span className="ft-green">We've Got You.</span></h2>
        </div>
        <p className="text-sm mb-4 ft-text-soft">
          Quick, affordable recipes made for busy students, bachelors and professionals.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-xs">
          {[["Quick", "Under 30 mins"], ["Affordable", "Budget friendly"], ["Easy", "Simple steps"], ["Minimal", "Few ingredients"]].map(([k, v]) => (
            <div key={k}>
              <div className="font-semibold ft-green">{k}</div>
              <div className="ft-text-soft">{v}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPage("explore")}
          className="mb-5 px-5 py-2.5 rounded-full font-semibold text-xs text-white flex items-center gap-1.5 active:scale-95 transition-transform ft-btn-green-cta"
        >
          Explore Bachelor Recipes <ChevronRight size={14} />
        </button>
        <div className="flex gap-4 overflow-x-auto pb-1 ft-no-scrollbar">
          {bach.map((r, i) => (
            <div key={r.id} className="w-44 shrink-0">
              <RecipeCard r={r} t={t} isFav={favorites.has(r.id)} onToggleFav={toggleFav} onOpen={openRecipe} compact index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CuisineSection({ t, setPage, setCuisineFilter }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
      <h2 className="font-display font-bold text-lg mb-3 ft-text ft-heading-ornate">Explore by Cuisine</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {CUISINES.map((c) => (
          <button
            key={c.name}
            onClick={() => { setCuisineFilter(c.name); setPage("explore"); }}
            className="rounded-2xl border p-3 text-center transition-all active:scale-95 hover:shadow-md ft-card-border-shadow-sm"
          >
            <div className="relative w-10 h-10 mx-auto mb-1 rounded-full overflow-hidden">
              <RecipeImage src={c.image} alt={c.name} />
            </div>
            <div className="text-xs font-semibold ft-text">{c.name}</div>
            <div className="text-[10px] ft-text-soft">{c.count}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function WhySection({ t }) {
  const items = [
    { icon: Search, title: "Smart Search", desc: "Find recipes using ingredients you have." },
    { icon: SlidersHorizontal, title: "Personalized Filters", desc: "Diet, time, difficulty & lifestyle based." },
    { icon: ChefHat, title: "Bachelor Friendly", desc: "Specially curated for students & bachelors." },
    { icon: Heart, title: "Save Favorites", desc: "Save recipes you love and cook anytime." },
    { icon: Moon, title: "Dark & Light Mode", desc: "Comfortable cooking day or night." },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h2 className="font-display font-bold text-lg mb-4 ft-text ft-heading-ornate">Why Food Compass?</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <div className="w-11 h-11 mx-auto rounded-full flex items-center justify-center mb-2 ft-why-icon-bg">
              <it.icon size={18} color={t.accent} />
            </div>
            <div className="text-xs font-semibold mb-0.5 ft-text">{it.title}</div>
            <div className="text-[11px] ft-text-soft">{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="mt-8 border-t ft-footer">
      <div className="flex justify-center pt-5">
        <DividerArt variant="vine" width={280} height={32} />
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-4 gap-6">
        <div>
          <Logo t={t} />
          <p className="text-xs mt-2 ft-text-soft">
            Your personal compass for discovering and cooking amazing recipes.
          </p>
        </div>
        <div>
          <div className="text-xs font-display font-bold mb-2 ft-text">Quick Links</div>
          <div className="text-xs space-y-1.5 ft-text-soft">
            <div>Home</div><div>Explore Recipes</div><div>Favorites</div><div>About Us</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold mb-2 ft-text">Popular Cuisines</div>
          <div className="text-xs space-y-1.5 ft-text-soft">
            <div>South Indian</div><div>North Indian</div><div>Punjabi</div><div>Gujarati</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold mb-2 ft-text">Help</div>
          <div className="text-xs space-y-1.5 ft-text-soft">
            <div>FAQ</div><div>Cooking Tips</div><div>Privacy Policy</div>
          </div>
        </div>
      </div>
      <div className="text-center text-[11px] py-4 border-t ft-footer-bottom">
        © 2026 Food Compass. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPLORE PAGE                                                        */
/* ------------------------------------------------------------------ */

function ExplorePage({ t, recipes, favorites, toggleFav, openRecipe, query, setQuery, filters, toggleFilter, clearFilters, activeChip, setActiveChip, ingredients = [], removeIngredient, clearIngredients }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const activeFilterCount = Object.values(filters).flat().length;

  // "Clear filters" / "Clear All" should also drop the active Quick Chip —
  // otherwise recipes stay silently filtered by chip after clicking clear.
  const clearAll = () => { clearFilters(); setActiveChip("all"); };

  const matchedIngredientCount = (r) => {
    if (!ingredients.length) return 0;
    const wanted = ingredients.map((i) => i.toLowerCase().trim()).filter(Boolean);
    return r.ingredients.filter((ing) => {
      const item = ing.item.toLowerCase();
      return wanted.some((w) => item.includes(w) || w.includes(item));
    }).length;
  };

  const filtered = useMemo(() => {
    let list = [...recipes];
    if (activeChip !== "all") list = list.filter((r) => matchesChip(r, activeChip));
    const flat = Object.entries(filters).flatMap(([g, vals]) => vals.map((v) => [g, v]));
    flat.forEach(([g, v]) => {
      if (g === "Cooking Time") {
        list = list.filter((r) => {
          const tot = r.prepTime + r.cookTime;
          if (v === "Under 15 min") return tot < 15;
          if (v === "15–30 min") return tot >= 15 && tot <= 30;
          if (v === "30–60 min") return tot > 30 && tot <= 60;
          return tot > 60;
        });
      } else if (g === "Difficulty") list = list.filter((r) => r.difficulty === v);
      else if (g === "Spice Level") list = list.filter((r) => r.spiceLevel === v);
      else if (g === "Meal Type") list = list.filter((r) => r.category === v);
      else if (g === "__cuisine") list = list.filter((r) => r.cuisine === v);
      else list = list.filter((r) => r.dietary.includes(v) || r.lifestyle.includes(v));
    });

    if (ingredients.length) {
      list = list.filter((r) => matchedIngredientCount(r) > 0);
    }

    if (query.trim()) {
      const boosts = smartSearchTerms(query);
      const q = query.toLowerCase();
      list = list.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.item.toLowerCase().includes(q)) ||
        (boosts.bachelor && r.lifestyle.includes("Bachelor Friendly")) ||
        (boosts.dinner && r.category === "Dinner") ||
        (boosts.breakfast && r.category === "Breakfast") ||
        (boosts.lunch && r.category === "Lunch")
      );
      list.sort((a, b) => {
        let sa = 0, sb = 0;
        if (boosts.bachelor) { sa += a.lifestyle.includes("Bachelor Friendly") ? 3 : 0; sb += b.lifestyle.includes("Bachelor Friendly") ? 3 : 0; }
        if (boosts.easy) { sa += a.difficulty === "Easy" ? 2 : 0; sb += b.difficulty === "Easy" ? 2 : 0; }
        if (boosts.cheap) { sa += a.budgetLevel === "Low" ? 2 : 0; sb += b.budgetLevel === "Low" ? 2 : 0; }
        if (boosts.quick) { sa += (a.prepTime + a.cookTime) <= 20 ? 2 : 0; sb += (b.prepTime + b.cookTime) <= 20 ? 2 : 0; }
        return sb - sa;
      });
    }

    if (filters.Lifestyle?.includes("Bachelor Friendly")) {
      list.sort((a, b) => bachelorScore(b) - bachelorScore(a));
    }

    if (ingredients.length) {
      list.sort((a, b) => matchedIngredientCount(b) - matchedIngredientCount(a));
    }

    return list;
  }, [recipes, filters, query, activeChip, ingredients]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
      <div className="flex items-center gap-2 mb-4 stagger-in ft-delay-20">
        <h1 className="font-display text-xl font-bold flex-1 ft-text">Explore Recipes</h1>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-3 p-3 rounded-2xl stagger-in ft-kitchen-bar ft-delay-60">
          <span className="text-xs font-semibold ft-accent">From your kitchen:</span>
          {ingredients.map((ing) => (
            <span key={ing} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 ft-chip-card">
              {ing}
              {removeIngredient && <X size={11} className="cursor-pointer" onClick={() => removeIngredient(ing)} />}
            </span>
          ))}
          {clearIngredients && (
            <button onClick={clearIngredients} className="text-xs font-semibold ml-auto ft-accent">
              Clear
            </button>
          )}
        </div>
      )}

      <div className="relative mb-3 stagger-in ft-delay-100">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" color={t.textSoft} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search recipes..."
          className={`w-full pl-11 pr-12 py-3 rounded-full text-sm outline-none border transition-shadow ft-hero-search ${searchFocused ? "is-focused" : ""}`}
        />
        <button
          className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center ft-icon-chip-bg-strong"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontal size={15} color={t.accent} />
        </button>
        {searchFocused && (
          <SearchSuggestions
            t={t} recipes={recipes} query={query}
            onSelect={(id) => { openRecipe(id); setQuery(""); }}
          />
        )}
      </div>

      <div className="stagger-in ft-delay-140">
        <QuickChips t={t} active={activeChip} setActive={setActiveChip} />
      </div>

      <div className="flex items-center justify-between mb-3 mt-1 stagger-in ft-delay-180">
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-transform active:scale-95 ft-filter-btn-active"
        >
          <SlidersHorizontal size={13} /> Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
        </button>
        <div key={filtered.length} className="text-xs count-fade ft-text-soft">{filtered.length} recipes found</div>
      </div>

      <div className="flex gap-6">
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} t={t} filters={filters} toggleFilter={toggleFilter} clearFilters={clearAll} mobile={false} />
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} t={t} filters={filters} toggleFilter={toggleFilter} clearFilters={clearAll} mobile={true} />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-16 fade-in">
              <div className="text-5xl mb-3 empty-bounce">🧭</div>
              <div className="font-semibold mb-1 ft-text">No recipes found</div>
              <p className="text-sm ft-text-soft">Try adjusting your search or filters to discover more dishes.</p>
              <button onClick={() => { clearAll(); clearIngredients && clearIngredients(); }} className="mt-4 text-xs font-semibold px-4 py-2 rounded-full text-white transition-transform active:scale-95 ft-bg-accent">Clear filters</button>
            </div>
          ) : (
            <div key={activeChip + query + JSON.stringify(filters) + ingredients.join(",")} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r, i) => (
                <RecipeCard key={r.id} r={r} t={t} isFav={favorites.has(r.id)} onToggleFav={toggleFav} onOpen={openRecipe} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAVORITES PAGE                                                      */
/* ------------------------------------------------------------------ */

function FavoritesPage({ t, recipes, favorites, toggleFav, openRecipe }) {
  const favRecipes = recipes.filter((r) => favorites.has(r.id));
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-5">
      <div className="flex items-center gap-2 mb-1">
        <Heart size={20} fill={t.red} color={t.red} />
        <h1 className="font-display text-xl font-bold ft-text">My Favorites</h1>
      </div>
      <p className="text-sm mb-4 ft-text-soft">{favRecipes.length} saved recipes</p>
      {favRecipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-3">💛</div>
          <div className="font-semibold mb-1 ft-text">No favorites yet</div>
          <p className="text-sm ft-text-soft">Tap the heart on any recipe to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favRecipes.map((r, i) => (
            <RecipeCard key={r.id} r={r} t={t} isFav onToggleFav={toggleFav} onOpen={openRecipe} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RECIPE DETAILS + COOKING MODE                                      */
/* ------------------------------------------------------------------ */

function RecipeDetails({ r, t, isFav, onToggleFav, onBack, onStartCooking }) {
  const [tab, setTab] = useState("ingredients");
  const [servings, setServings] = useState(r.servings);
  const [checked, setChecked] = useState({});
  const ratio = servings / r.servings;
  const tabRefs = useRef({});
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[tab];
    if (el) setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [tab]);

  return (
    <div className="max-w-3xl mx-auto pb-28 detail-transition">
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 backdrop-blur border-b ft-recipe-header">
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center ft-bg-card">
          <ArrowLeft size={17} color={t.text} />
        </button>
        <span className="text-sm font-semibold ft-text">Recipe Details</span>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full flex items-center justify-center ft-bg-card"><Share2 size={15} color={t.text} /></button>
          <button onClick={() => onToggleFav(r.id)} className="w-9 h-9 rounded-full flex items-center justify-center ft-bg-card">
            <Heart size={15} fill={isFav ? t.red : "none"} color={isFav ? t.red : t.textSoft} />
          </button>
        </div>
      </div>

      <div className="px-4">
        <div className="relative h-56 rounded-2xl overflow-hidden mt-3 ft-gradient-recipe-header">
          <CornerOrnaments size={36} />
          <RecipeImage src={r.image} alt={r.name} />
        </div>

        <h1 className="font-display text-2xl font-bold mt-4 ft-text">{r.name}</h1>
        <div className="flex items-center gap-3 text-sm mt-1 ft-text-soft">
          <span className="flex items-center gap-1"><Star size={14} fill={t.accent} color={t.accent} /> {r.rating} ({r.reviews} reviews)</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {r.prepTime + r.cookTime} min</span>
          <span>{r.difficulty}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {r.dietary.map((d) => <Badge key={d} tone={d === "Non-Vegetarian" ? "red" : "green"} t={t}>{d}</Badge>)}
          {r.lifestyle.includes("Bachelor Friendly") && <Badge tone="accent" t={t}>⭐ Bachelor Friendly</Badge>}
        </div>
        <p className="text-sm mt-3 leading-relaxed ft-text-soft ft-dropcap">{r.description}</p>

        <div className="grid grid-cols-3 gap-3 mt-5 p-4 rounded-2xl ft-card-solid">
          <div className="text-center">
            <Clock size={16} className="mx-auto mb-1" color={t.accent} />
            <div className="text-xs font-semibold ft-text">{r.prepTime} min</div>
            <div className="text-[10px] ft-text-soft">Prep</div>
          </div>
          <div className="text-center">
            <ChefHat size={16} className="mx-auto mb-1" color={t.accent} />
            <div className="text-xs font-semibold ft-text">{r.cookTime} min</div>
            <div className="text-[10px] ft-text-soft">Cook</div>
          </div>
          <div className="text-center">
            <Users size={16} className="mx-auto mb-1" color={t.accent} />
            <div className="text-xs font-semibold ft-text">{servings}</div>
            <div className="text-[10px] ft-text-soft">Servings</div>
          </div>
        </div>

        <div className="flex gap-4 mt-6 border-b relative ft-border">
          {["ingredients", "steps", "nutrition", "tips"].map((tb) => (
            <button
              key={tb}
              ref={(el) => (tabRefs.current[tb] = el)}
              onClick={() => setTab(tb)}
              className={`pb-2 text-sm font-semibold capitalize transition-colors duration-300 ${tab === tb ? "ft-tab-active" : "ft-tab-inactive"}`}
            >
              {tb}
            </button>
          ))}
          <span
            className="tab-indicator absolute bottom-0 h-0.5 rounded-full ft-bg-accent"
            style={{ width: tabIndicator.width, transform: `translateX(${tabIndicator.left}px)` }}
          />
        </div>

        <div key={tab} className="py-4 fade-in">
          {tab === "ingredients" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-sm ft-text">Ingredients ({r.ingredients.length})</div>
                <div className="flex items-center gap-2 text-xs ft-text-soft">
                  <button onClick={() => setServings((s) => Math.max(1, s - 1))} className="w-6 h-6 rounded-full border flex items-center justify-center ft-border">-</button>
                  {servings} servings
                  <button onClick={() => setServings((s) => s + 1)} className="w-6 h-6 rounded-full border flex items-center justify-center ft-border">+</button>
                </div>
              </div>
              <div className="space-y-2">
                {r.ingredients.map((ing, i) => (
                  <label key={i} className="flex items-center gap-3 text-sm py-1 ft-text">
                    <input type="checkbox" checked={!!checked[i]} onChange={() => setChecked((c) => ({ ...c, [i]: !c[i] }))} className="w-4 h-4 ft-checkbox" />
                    <span className={checked[i] ? "ft-checked-item" : ""}>
                      {ing.qty && <b>{scaleQty(ing.qty, ratio)} </b>}{ing.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {tab === "steps" && (
            <div className="space-y-4">
              {r.instructions.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ft-step-num">{i + 1}</div>
                  <div>
                    <div className="font-semibold text-sm ft-text">{s.title}</div>
                    <p className="text-xs mt-0.5 ft-text-soft">{s.detail}</p>
                    <div className="text-[11px] mt-1 flex items-center gap-1 ft-accent"><Clock size={11} /> {s.time} min</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "nutrition" && (
            <div className="grid grid-cols-2 gap-3">
              {[["Calories", "320 kcal"], ["Protein", "18 g"], ["Carbs", "28 g"], ["Fat", "14 g"]].map(([k, v]) => (
                <div key={k} className="rounded-xl p-3 ft-card-solid">
                  <div className="text-xs ft-text-soft">{k}</div>
                  <div className="font-semibold ft-text">{v}</div>
                </div>
              ))}
              <p className="col-span-2 text-[11px] ft-text-soft">Estimated values per serving.</p>
            </div>
          )}
          {tab === "tips" && (
            <ul className="text-sm space-y-2 ft-text-soft ft-gothic-list">
              <li>Prep all ingredients before you start cooking for a smoother process.</li>
              <li>Adjust spice levels to your taste — start mild and add more.</li>
              <li>Store leftovers in an airtight container for up to 2 days.</li>
            </ul>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 border-t bar-slide-in ft-detail-bottombar">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button onClick={() => onToggleFav(r.id)} className="flex-1 py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-transform active:scale-95 ft-border-text">
            <Heart size={16} fill={isFav ? t.red : "none"} color={isFav ? t.red : t.text} className={isFav ? "heart-pop" : ""} /> {isFav ? "Saved" : "Save Recipe"}
          </button>
          <button onClick={onStartCooking} className="flex-1 py-3 rounded-xl font-semibold text-sm text-white active:scale-95 transition-transform ft-btn-accent-shadow2">
            Start Cooking
          </button>
        </div>
      </div>
    </div>
  );
}

function scaleQty(qty, ratio) {
  const m = qty.match(/^([\d./]+)\s*(.*)$/);
  if (!m) return qty;
  let num = m[1];
  let val;
  if (num.includes("/")) {
    const [a, b] = num.split("/").map(Number);
    val = a / b;
  } else val = parseFloat(num);
  if (isNaN(val)) return qty;
  const scaled = Math.round(val * ratio * 100) / 100;
  return `${scaled}${m[2] ? " " + m[2] : ""}`;
}

function CookingMode({ r, t, onExit, onComplete }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const total = r.instructions.length;
  const current = r.instructions[step];

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center detail-transition">
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ft-congrats-icon-bg">
          <Check size={36} color={t.green} />
        </div>
        <h2 className="font-display text-xl font-bold mb-1 ft-text">Congratulations!</h2>
        <p className="text-sm mb-1 ft-text-soft">You have completed</p>
        <p className="font-semibold mb-3 ft-text">{r.name}</p>
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill={t.accent} color={t.accent} />)}
        </div>
        <button onClick={onComplete} className="w-full py-3 rounded-xl font-semibold text-sm mb-2 border ft-border-text">Save Recipe</button>
        <button onClick={onExit} className="w-full py-3 rounded-xl font-semibold text-sm text-white ft-bg-accent">Cook Another Recipe</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pb-8 detail-transition">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onExit} className="w-9 h-9 rounded-full flex items-center justify-center ft-bg-card"><ArrowLeft size={17} color={t.text} /></button>
        <span className="text-sm font-semibold ft-text">Cooking Mode</span>
        <span className="text-xs font-semibold ft-accent">{step + 1} / {total}</span>
      </div>
      <div key={step} className="px-4 fade-in">
        <div className="relative h-48 rounded-2xl overflow-hidden mb-4 ft-gradient-recipe-header">
          <CornerOrnaments size={32} />
          <RecipeImage src={r.image} alt={r.name} />
        </div>
        <div className="text-xs font-bold mb-1 ft-accent">{String(step + 1).padStart(2, "0")}</div>
        <h2 className="font-display text-lg font-bold mb-2 ft-text">{current.title}</h2>
        <p className="text-sm leading-relaxed mb-3 ft-text-soft">{current.detail}</p>
        <div className="text-xs font-medium flex items-center gap-1 mb-5 ft-accent">
          <Clock size={13} /> {current.time} minutes
        </div>
        <div className="flex items-center gap-1.5 mb-6 justify-center">
          {r.instructions.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ft-dot ${i === step ? "is-current" : ""} ${i <= step ? "is-filled" : ""}`} />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex-1 py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-1 disabled:opacity-40 ft-border-text"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            onClick={() => (step === total - 1 ? setDone(true) : setStep((s) => s + 1))}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-1 ft-bg-accent"
          >
            {step === total - 1 ? "Finish" : "Next"} {step < total - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BOTTOM NAV (mobile)                                                 */
/* ------------------------------------------------------------------ */

function BottomNav({ t, page, setPage }) {
  const items = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "explore", label: "Explore", icon: Search },
    { key: "favorites", label: "Favorites", icon: Heart },
    { key: "about", label: "Profile", icon: User },
  ];
  const activeIndex = Math.max(0, items.findIndex((it) => it.key === page));
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-md ft-bottomnav"
    >
      <span
        className="nav-indicator absolute top-0 h-0.5 rounded-full ft-bg-accent"
        style={{
          width: `${100 / items.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      <div className="flex">
        {items.map((it) => {
          const active = page === it.key;
          return (
            <button key={it.key} onClick={() => setPage(it.key)} className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1">
              <span
                className={`w-9 h-6 rounded-full flex items-center justify-center transition-all duration-300 ft-bottomnav-item ${active ? "is-active" : ""}`}
              >
                <it.icon size={18} color={active ? t.accent : t.textSoft} fill={it.key === "favorites" && active ? t.accent : "none"} />
              </span>
              <span className={`text-[10px] font-semibold transition-colors duration-300 ${active ? "ft-accent" : "ft-text-soft"}`}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT PAGE                                                          */
/* ------------------------------------------------------------------ */

function AboutPage({ t }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <div className="text-5xl mb-4">🧭</div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2 ft-text">Your personal compass for deciding what to cook.</h1>
      <p className="text-sm leading-relaxed ft-text-soft">
        Food Compass helps home cooks, students, working professionals, families and bachelors find
        something delicious in seconds — based on the ingredients they have, the time they've got,
        and the kind of cook they are. No account needed, no clutter — just search, filter, and cook.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                  */
/* ------------------------------------------------------------------ */

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialFavorites() {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = window.localStorage.getItem("favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [dark, setDark] = useState(getInitialTheme);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [favorites, setFavorites] = useState(getInitialFavorites);
  const [activeChip, setActiveChip] = useState("all");
  const [filters, setFilters] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [cookingId, setCookingId] = useState(null);

  const t = dark ? THEME.dark : THEME.light;

  useEffect(() => {
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFav = (id) => setFavorites((f) => {
    const n = new Set(f);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  // Used when finishing Cooking Mode: should always ADD to favorites,
  // never remove an already-favorited recipe.
  const addFavorite = (id) => setFavorites((f) => (f.has(id) ? f : new Set(f).add(id)));

  const toggleFilter = (group, opt) => setFilters((f) => {
    const cur = f[group] || [];
    const next = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
    return { ...f, [group]: next };
  });
  const clearFilters = () => setFilters({});

  const addIngredient = (v) => setIngredients((arr) => (arr.includes(v) ? arr : [...arr, v]));
  const removeIngredient = (v) => setIngredients((arr) => arr.filter((x) => x !== v));
  const clearIngredients = () => setIngredients([]);

  const setCuisineFilter = (name) => setFilters((f) => ({ ...f, __cuisine: [name] }));

  const openRecipe = (id) => { setSelectedId(id); window.scrollTo?.(0, 0); };
  const selectedRecipe = RECIPES.find((r) => r.id === selectedId);
  const cookingRecipe = RECIPES.find((r) => r.id === cookingId);

  const viewKey = cookingRecipe
    ? `cooking-${cookingRecipe.id}`
    : selectedRecipe
    ? `recipe-${selectedRecipe.id}`
    : `page-${page}`;

  let body;
  if (cookingRecipe) {
    body = (
      <CookingMode
        r={cookingRecipe} t={t}
        onExit={() => { setCookingId(null); setSelectedId(cookingRecipe.id); }}
        onComplete={() => { addFavorite(cookingRecipe.id); setCookingId(null); setSelectedId(null); setPage("home"); }}
      />
    );
  } else if (selectedRecipe) {
    body = (
      <RecipeDetails
        r={selectedRecipe} t={t} isFav={favorites.has(selectedRecipe.id)} onToggleFav={toggleFav}
        onBack={() => setSelectedId(null)} onStartCooking={() => setCookingId(selectedRecipe.id)}
      />
    );
  } else if (page === "explore") {
    body = (
      <ExplorePage
        t={t} recipes={RECIPES} favorites={favorites} toggleFav={toggleFav} openRecipe={openRecipe}
        query={query} setQuery={setQuery} filters={filters} toggleFilter={toggleFilter} clearFilters={clearFilters}
        activeChip={activeChip} setActiveChip={setActiveChip}
        ingredients={ingredients} removeIngredient={removeIngredient} clearIngredients={clearIngredients}
      />
    );
  } else if (page === "favorites") {
    body = <FavoritesPage t={t} recipes={RECIPES} favorites={favorites} toggleFav={toggleFav} openRecipe={openRecipe} />;
  } else if (page === "about") {
    body = <AboutPage t={t} />;
  } else {
    body = (
      <>
        <Hero t={t} dark={dark} query={query} setQuery={setQuery} ingredients={ingredients} addIngredient={addIngredient} removeIngredient={removeIngredient} setPage={setPage} recipes={RECIPES} openRecipe={openRecipe} />
        <QuickChips t={t} active={activeChip} setActive={(k) => { setActiveChip(k); setPage("explore"); }} />
        <CardRow title="Popular Indian Recipes" recipes={RECIPES.slice(0, 5)} t={t} favorites={favorites} toggleFav={toggleFav} openRecipe={openRecipe} onViewAll={() => setPage("explore")} />
        <BachelorSection t={t} recipes={RECIPES} favorites={favorites} toggleFav={toggleFav} openRecipe={openRecipe} setPage={setPage} />
        <CuisineSection t={t} setPage={setPage} setCuisineFilter={setCuisineFilter} />
        <CardRow title="Trending Recipes" recipes={[...RECIPES].sort((a, b) => b.rating - a.rating).slice(0, 5)} t={t} favorites={favorites} toggleFav={toggleFav} openRecipe={openRecipe} />
        <WhySection t={t} />
      </>
    );
  }

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      className="min-h-screen w-full transition-colors duration-300 ft-app-root"
    >
      {!cookingRecipe && !selectedRecipe && (
        <Navbar
          t={t} dark={dark} setDark={setDark} page={page} setPage={(p) => { setPage(p); setSelectedId(null); }}
          menuOpen={menuOpen} setMenuOpen={setMenuOpen} query={query} setQuery={setQuery}
          recipes={RECIPES} openRecipe={openRecipe}
        />
      )}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} t={t} dark={dark} setDark={setDark} setPage={(p) => { setPage(p); setSelectedId(null); }} setActiveChip={setActiveChip} />

      <div
        key={viewKey}
        className={(!cookingRecipe && !selectedRecipe ? "pb-20 md:pb-0" : "pb-8") + " page-transition"}
      >
        {body}
      </div>

      {!cookingRecipe && !selectedRecipe && page !== "about" && <Footer t={t} />}
      {!cookingRecipe && !selectedRecipe && <BottomNav t={t} page={page} setPage={(p) => { setPage(p); setSelectedId(null); }} />}
    </div>
  );
}