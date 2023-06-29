import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const createRecipe = async (
  title: string,
  description: string,
  ingredients: string,
  instructions: string,
  userId: string
) => {
  try {
    const db = firebase.firestore();

    // Generate an auto-incremented ID
    const recipeRef = db.collection("recipes").doc();
    const recipeId = recipeRef.id;

    // Get the current timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Create the recipe object with the provided data
    const recipe = {
      id: recipeId,
      title,
      description,
      ingredients,
      instructions,
      userId,
      createdAt: timestamp,
    };

    // Add the recipe to the "recipes" collection
    await recipeRef.set(recipe);

    console.log("Recipe created successfully:", recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};
