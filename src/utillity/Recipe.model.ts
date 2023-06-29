import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firestore } from "../utillity/firebase";
import { auth } from "../utillity/firebase";
import { Like } from "./Like.model";

export const createRecipe = async (
  title: string,
  description: string,
  ingredients: string,
  instructions: string,
  user: firebase.User
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
      creatorID: user.uid,
      creatorName: user.displayName,
      createdAt: timestamp,
    };

    // Add the recipe to the "recipes" collection
    await recipeRef.set(recipe);

    console.log("Recipe created successfully:", recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  likes: number;
  likedByUser: boolean;
  creatorID: string;
  creatorName: string;
}

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const recipesRef = firestore.collection("recipes");
    const snapshot = await recipesRef.get();
    const fetchedRecipes: Recipe[] = [];

    for (const doc of snapshot.docs) {
      const recipeData = doc.data() as Recipe; // Cast document data to Recipe type
      const likesSnapshot = await firestore
        .collection("likes")
        .where("recipeID", "==", doc.id)
        .get();
      const likes = likesSnapshot.docs.length;
      const currentUser = auth.currentUser;
      const likedByUser = currentUser
        ? likesSnapshot.docs.some(
            (likeDoc) => likeDoc.data().userID === currentUser.uid
          )
        : false;

      const recipeWithLikes: Recipe = {
        ...recipeData,
        id: doc.id,
        likes,
        likedByUser,
      };

      fetchedRecipes.push(recipeWithLikes);
    }

    return fetchedRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const likeRecipe = async (recipeID: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is not logged in.");
    }

    const like: Like = {
      userID: currentUser.uid,
      recipeID,
    };

    await firestore.collection("likes").add(like);
  } catch (error) {
    console.error("Error liking recipe:", error);
    throw error;
  }
};

const dislikeRecipe = async (recipeID: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is not logged in.");
    }

    const likesSnapshot = await firestore
      .collection("likes")
      .where("recipeID", "==", recipeID)
      .where("userID", "==", currentUser.uid)
      .get();

    const likeDocs = likesSnapshot.docs;

    if (likeDocs.length === 0) {
      throw new Error("User has not liked the recipe.");
    }

    const likeDoc = likeDocs[0];
    await firestore.collection("likes").doc(likeDoc.id).delete();
  } catch (error) {
    console.error("Error unliking recipe:", error);
    throw error;
  }
};

export const likeOrDislikeRecipe = (recipe: Recipe) => {
  if (recipe.likedByUser) {
    dislikeRecipe(recipe.id);
  } else {
    likeRecipe(recipe.id);
  }
};

export const fetchLikedRecipes = async (): Promise<Recipe[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is not logged in.");
    }

    const querySnapshot = await firestore
      .collection("likes")
      .where("userID", "==", currentUser.uid)
      .get();

    const likedRecipeIDs = querySnapshot.docs.map((doc) => doc.data().recipeID);

    const recipePromises = likedRecipeIDs.map(async (recipeID) => {
      const recipeSnapshot = await firestore
        .collection("recipes")
        .doc(recipeID)
        .get();
      const likesSnapshot = await firestore
        .collection("likes")
        .where("recipeID", "==", recipeID)
        .get();
      const likesCount = likesSnapshot.size;
      const likedByUser = likesSnapshot.docs.some(
        (doc) => doc.data().userID === currentUser.uid
      );
      const recipeData = recipeSnapshot.data() as Recipe;
      console.log(recipeData);

      return {
        ...recipeData,
        likes: likesCount,
        likedByUser: likedByUser,
      };
    });

    const likedRecipes = await Promise.all(recipePromises);

    return likedRecipes;
  } catch (error) {
    console.error("Error fetching liked recipes:", error);
    throw error;
  }
};

export const fetchMyRecipes = async (): Promise<Recipe[]> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is not logged in.");
    }

    const querySnapshot = await firestore
      .collection("recipes")
      .where("creatorID", "==", currentUser.uid)
      .get();

    const recipePromises = querySnapshot.docs.map(async (doc) => {
      const recipeData = doc.data() as Recipe;
      const likesSnapshot = await firestore
        .collection("likes")
        .where("recipeID", "==", doc.id)
        .get();
      const likesCount = likesSnapshot.size;
      const likedByUser = likesSnapshot.docs.some(
        (doc) => doc.data().creatorID === currentUser.uid
      );
      return {
        ...recipeData,
        likes: likesCount,
        likedByUser: likedByUser,
      };
    });

    const myRecipes = await Promise.all(recipePromises);

    return myRecipes;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};
