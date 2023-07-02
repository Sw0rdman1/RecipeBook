import axios from "axios";
import { User } from "../models/User.model";
import { Recipe } from "../models/Recipe.model";
import { getNumberOfLikes, likedByUser } from "./Like.service";
import { BASE_URL } from "../utillity/firebase";

// Create a new recipe with authentication
export const createRecipe = async (
  recipeData: any,
  user: User
): Promise<string> => {
  try {
    console.log(user);

    const newRecipe = {
      ...recipeData,
      creatorID: user.id,
      creatorName: user.displayName,
    };

    const authToken = user.token; // Replace with your authentication token retrieval logic
    const response = await axios.post(
      `${BASE_URL}/recipes.json?auth=${authToken}`,
      newRecipe
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
    const response = await axios.get(
      `${BASE_URL}/recipes.json?auth=${authToken}`
    );
    const data = response.data;

    if (data) {
      const recipePromises: Promise<Recipe>[] = Object.keys(data).map(
        async (key) => {
          const isLiked = await likedByUser(user, key); // Call likedByUser function
          const numberOfLikes = await getNumberOfLikes(user, key);

          return {
            id: key,
            likedByUser: isLiked,
            likes: numberOfLikes,
            ...data[key],
          } as Recipe;
        }
      );

      const recipes = await Promise.all(recipePromises);
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
      `${BASE_URL}/recipes/${recipeId}.json?auth=${authToken}`,
      updates
    );
  } catch (error) {
    throw error;
  }
};

// Delete a recipe with authentication
export const deleteRecipe = async (
  recipeId: string,
  user: User | null
): Promise<void> => {
  console.log(recipeId);

  try {
    const authToken = user?.token; // Replace with your authentication token retrieval logic
    await axios.delete(
      `${BASE_URL}/recipes/${recipeId}.json?auth=${authToken}`
    );
  } catch (error) {
    throw error;
  }
};

export const getRecipeDetails = async (recipeId: string, user: User | null) => {
  try {
    const authToken = user?.token;
    const response = await axios.get(
      `${BASE_URL}/recipes/${recipeId}.json?auth=${authToken}`
    );
    const isLiked = await likedByUser(user, recipeId);
    const numberOfLikes = await getNumberOfLikes(user, recipeId);

    const recipeDetails = response.data;
    return {
      id: recipeId,
      likedByUser: isLiked,
      likes: numberOfLikes,
      ...recipeDetails,
    } as Recipe;
  } catch (error) {
    console.error("Error getting recipe details:", error);
    throw error;
  }
};
