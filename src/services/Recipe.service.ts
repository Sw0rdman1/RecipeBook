import axios from "axios";
import { User } from "../models/User.model";
import { Recipe } from "../models/Recipe.model";

const BASE_URL = `https://recipebook-mr-default-rtdb.europe-west1.firebasedatabase.app/recipes`;

// Create a new recipe with authentication
export const createRecipe = async (
  recipeData: any,
  user: User
): Promise<string> => {
  try {
    console.log(user);

    const authToken = user.token; // Replace with your authentication token retrieval logic
    const response = await axios.post(
      `${BASE_URL}.json?auth=${authToken}`,
      recipeData
    );
    return response.data.name;
  } catch (error) {
    throw error;
  }
};

// Read recipes with authentication
export const getAllRecipes = async (user: User | null): Promise<any[]> => {
  try {
    const authToken = user?.token; // Replace with your authentication token retrieval logic
    const response = await axios.get(`${BASE_URL}.json?auth=${authToken}`);
    const data = response.data;

    if (data) {
      const recipes: Recipe[] = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        };
      });

      return recipes;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

// Update a recipe with authentication
export const updateRecipe = async (
  recipeId: string,
  updates: any,
  user: User
): Promise<void> => {
  try {
    const authToken = user.token; // Replace with your authentication token retrieval logic
    await axios.patch(
      `${BASE_URL}/${recipeId}.json?auth=${authToken}`,
      updates
    );
  } catch (error) {
    throw error;
  }
};

// Delete a recipe with authentication
export const deleteRecipe = async (
  recipeId: string,
  user: User
): Promise<void> => {
  try {
    const authToken = user.token; // Replace with your authentication token retrieval logic
    await axios.delete(`${BASE_URL}/${recipeId}.json?auth=${authToken}`);
  } catch (error) {
    throw error;
  }
};
