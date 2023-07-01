import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Recipe } from "../models/Recipe.model";
import { User } from "../models/User.model";

// Define the type for the app context
interface AppContextType {
  user: User | null;
  recipes: Recipe[];
  updateUser: (user: User | null) => void;
  updateRecipes: (recipes: Recipe[]) => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

// Create the app context
export const AppContext = createContext<AppContextType>({
  user: null,
  recipes: [],
  updateUser: () => {},
  updateRecipes: () => {},
});

// Create the AppProvider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Function to update the user
  const updateUser = (user: User | null) => {
    setUser(user);
  };

  // Function to update the recipes
  const updateRecipes = (recipes: Recipe[]) => {
    setRecipes(recipes);
  };

  // Example useEffect to load initial data
  useEffect(() => {
    // Fetch recipes from API or local storage
    const fetchedRecipes: Recipe[] = [];
    // Set the initial recipes
    setRecipes(fetchedRecipes);
  }, []);

  return (
    <AppContext.Provider value={{ user, recipes, updateUser, updateRecipes }}>
      {children}
    </AppContext.Provider>
  );
};
