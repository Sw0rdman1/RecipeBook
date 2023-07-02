import React, { useContext, useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router";

import LoadingScreen from "../../components/LoadingScreen";
import { trash } from "ionicons/icons";
import RecipeDeatilsNavbar from "./RecipeDeatilsNavbar";
import { deleteRecipe, getRecipeDetails } from "../../services/Recipe.service";
import { AppContext } from "../../context/AppContext";
import { Recipe } from "../../models/Recipe.model";
import { toggleLike } from "../../services/Like.service";

interface MatchParams {
  recipeId: string;
}

interface RecipeDetailScreenProps extends RouteComponentProps<MatchParams> {}

const RecipeDetailsScreen: React.FC<RecipeDetailScreenProps> = ({ match }) => {
  const { recipeId } = match.params;
  const history = useHistory();
  const { currentUser } = useContext(AppContext);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const showToastNotification = (message: string, color: string) => {
    setShowToast(true);
    setToastMessage(message);
    setToastColor(color);
  };

  const handleDeleteRecipe = async () => {
    console.log(recipe);

    try {
      if (!recipe) return;
      await deleteRecipe(recipe.id, currentUser);
      showToastNotification("Recipe deleted successfully", "success");
      history.push(`/main/home`);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      showToastNotification("Failed to delete recipe", "danger");
    }
  };
  const handleLikeClick = () => {
    if (recipe !== null) {
      setIsLiked(!isLiked);

      isLiked ? recipe.likes-- : recipe.likes++;
      toggleLike(currentUser, recipe.id);
      recipe.likedByUser = !recipe.likedByUser;
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDetails = await getRecipeDetails(recipeId, currentUser);
        setTimeout(() => {
          setRecipe(recipeDetails);
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
          {recipe.photoURL ? (
            <div
              style={{
                width: "250px",
                height: "170px",
                marginTop: "20px",
              }}
            >
              <img
                src={recipe.photoURL}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ) : (
            <></>
          )}
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
            fill={isLiked ? "solid" : "outline"}
          >
            <span> {!isLiked ? "Like recipe" : "Dislike recipe"}</span>
          </IonButton>
          {currentUser?.displayName === recipe.creatorName ? (
            <IonButton
              shape="round"
              onClick={showDeleteConfirmation}
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
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
      />
      <IonAlert
        isOpen={showConfirmation}
        header="Delete Recipe"
        message="Are you sure you want to delete this recipe?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => setShowConfirmation(false),
          },
          {
            text: "Yes",
            handler: () => handleDeleteRecipe(),
          },
        ]}
      />
    </IonContent>
  );
};

export default RecipeDetailsScreen;
