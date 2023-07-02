import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import "./CreateRecipeScreen.css";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";
import { getRecipeDetails, updateRecipe } from "../../services/Recipe.service";

interface MatchParams {
  recipeId: string;
}

interface EditRecipeScreenProps extends RouteComponentProps<MatchParams> {}

const EditRecipeScreen: React.FC<EditRecipeScreenProps> = ({ match }) => {
  const { recipeId } = match.params;
  const { currentUser } = useContext(AppContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleCancel = () => {
    history.goBack();
  };

  const handleEditRecipe = () => {
    if (!title || !description || !ingredients || !instructions) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      setToastColor("danger");
      return;
    }

    const updatedRecipe = {
      title,
      description,
      ingredients,
      instructions,
    };

    updateRecipe(recipeId, updatedRecipe, currentUser)
      .then((newRecipeId) => {
        // Show success toast
        setToastMessage("Recipe edited successfully.");
        setShowToast(true);
        setToastColor("success");
        history.goBack();
      })
      .catch((error) => {
        console.error("Error editing recipe:", error);

        // Show error toast
        setToastMessage("An error occurred. Please try again later.");
        setShowToast(true);
        setToastColor("danger"); // Handle error, e.g., display an error message to the user
      });
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDetails = await getRecipeDetails(recipeId, currentUser);
        setTitle(recipeDetails.title);
        setDescription(recipeDetails.description);
        setIngredients(recipeDetails.ingredients);
        setInstructions(recipeDetails.instructions);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <IonContent>
      <div className="create-recipe-container">
        <h1>Edit Recipe</h1>
        <IonInput
          label="Title"
          labelPlacement="stacked"
          placeholder="Name of recipe"
          value={title}
          onIonInput={(e: any) => setTitle(e.target.value)}
        />
        <IonInput
          label="Description"
          labelPlacement="stacked"
          placeholder="Interest other users"
          value={description}
          onIonInput={(e: any) => setDescription(e.target.value)}
        />
        <IonTextarea
          label="Ingredients"
          labelPlacement="stacked"
          placeholder="List of ingredients, split it by ,"
          value={ingredients}
          onIonInput={(e: any) => setIngredients(e.target.value)}
        />
        <IonTextarea
          label="Instructions"
          labelPlacement="stacked"
          placeholder="Tell other your secrets"
          value={instructions}
          onIonInput={(e: any) => setInstructions(e.target.value)}
        />
        <div className="buttons">
          <IonButton
            expand="full"
            className="cancel-button"
            shape="round"
            onClick={handleEditRecipe}
          >
            Edit
          </IonButton>
          <IonButton
            expand="full"
            className="button"
            shape="round"
            color={"danger"}
            onClick={handleCancel}
          >
            Cancel
          </IonButton>
        </div>

        <IonToast
          isOpen={showToast}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </div>
    </IonContent>
  );
};

export default EditRecipeScreen;
