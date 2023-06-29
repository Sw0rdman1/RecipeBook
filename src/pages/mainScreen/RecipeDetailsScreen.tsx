import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import {
  Recipe,
  getRecipeDetails,
  likeOrDislikeRecipe,
} from "../../utillity/Recipe.model";
import LoadingScreen from "../../components/LoadingScreen";
import { heart, heartOutline } from "ionicons/icons";
import { trash } from "ionicons/icons";
import { getCurrentUser } from "../../utillity/User.model";
import RecipeDeatilsNavbar from "./RecipeDeatilsNavbar";

interface MatchParams {
  recipeId: string;
}

interface RecipeDetailScreenProps extends RouteComponentProps<MatchParams> {}

const RecipeDetailsScreen: React.FC<RecipeDetailScreenProps> = ({ match }) => {
  const { recipeId } = match.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);

  const currentUser = getCurrentUser();

  const handleLogin = () => {};

  const handleLikeClick = () => {
    if (recipe !== null) {
      setIsLiked(!isLiked);

      isLiked ? recipe.likes-- : recipe.likes++;
      likeOrDislikeRecipe(recipe);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        console.log(recipeId);

        const recipeDetails = await getRecipeDetails(recipeId);
        setTimeout(() => {
          setRecipe(recipeDetails);
          console.log(recipeDetails);

          setIsLiked(recipeDetails?.likedByUser);
        }, 250);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) {
    return <LoadingScreen />;
  }

  return (
    <IonContent>
      <RecipeDeatilsNavbar />
      <div className="full-recipe-container">
        <div>
          <h1>{recipe.title}</h1>
          <h3>- {recipe.creatorName}</h3>
          {/* <h3>{recipe?.description}</h3> */}
        </div>
        <ul className="ingredients-list">
          <p>Ingredients: </p>

          {recipe.ingredients.split(",").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <ol className="instructions-list">
          <p>Instructions:</p>
          {recipe.instructions.split(",").map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <div className="buttons">
          <IonButton
            shape="round"
            onClick={handleLikeClick}
            className="like-button"
          >
            <span> {!isLiked ? "Like recipe" : "Dislike recipe"}</span>
          </IonButton>
          {currentUser?.displayName === recipe.creatorName ? (
            <IonButton
              shape="round"
              onClick={handleLogin}
              className="delete-button"
              color={"danger"}
            >
              Delete <IonIcon icon={trash} />
            </IonButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    </IonContent>
  );
};

export default RecipeDetailsScreen;
