import axios from "axios";
import { Like } from "../models/Like.model";
import { User } from "../models/User.model";
import { BASE_URL } from "../utillity/firebase";

export const likedByUser = async (
  user: User | null,
  recipeId: string
): Promise<boolean> => {
  const authToken = user?.token; // Replace with your authentication token retrieval logic

  try {
    const response = await axios.get<Record<string, Like>>(
      `${BASE_URL}/likes.json?auth=${authToken}`
    );
    const likes = response.data;

    // Check if there is a like with the given user ID and recipe ID
    for (const key in likes) {
      if (likes[key].userID === user?.id && likes[key].recipeID === recipeId) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error;
  }
};

export const toggleLike = async (
  user: User | null,
  recipeID: string
): Promise<void> => {
  try {
    const authToken = user?.token; // Replace with your authentication token retrieval logic

    const likeUrl = `${BASE_URL}/likes.json?auth=${authToken}`;

    // Check if the like already exists
    const response = await axios.get(likeUrl);
    const existingLikes = response.data;

    if (existingLikes) {
      // Check if the like exists for the specified user and recipe
      const likeID = Object.keys(existingLikes).find(
        (likeID) =>
          existingLikes[likeID].userID === user?.id &&
          existingLikes[likeID].recipeID === recipeID
      );

      if (likeID) {
        // If the like exists, delete it
        const deleteUrl = `${BASE_URL}/likes/${likeID}.json?auth=${authToken}`;
        await axios.delete(deleteUrl);
      } else {
        // If the like doesn't exist, create it
        const newLike = {
          userID: user?.id,
          recipeID,
        };

        await axios.post(likeUrl, newLike);
      }
    } else {
      // If there are no existing likes, create a new one
      const newLike = {
        userID: user?.id,
        recipeID,
      };

      await axios.post(likeUrl, newLike);
    }
  } catch (error: any) {
    throw new Error("Failed to toggle like: " + error.message);
  }
};

export async function getNumberOfLikes(
  user: User | null,
  recipeID: string
): Promise<number> {
  try {
    const authToken = user?.token; // Replace with your authentication token retrieval logic

    const getUrl = `${BASE_URL}/likes.json?orderBy="recipeID"&equalTo="${recipeID}"&auth=${authToken}`;
    const response = await axios.get(getUrl);
    const likes = response.data;
    const numberOfLikes = Object.keys(likes).length;

    return numberOfLikes;
  } catch (error) {
    console.error("Error retrieving number of likes:", error);
    throw error;
  }
}
