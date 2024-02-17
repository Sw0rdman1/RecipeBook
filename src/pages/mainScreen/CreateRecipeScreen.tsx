import React, { useContext, useState } from "react";
import {
  IonContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import "./CreateRecipeScreen.css";
import RecipeImageUpload from "../../components/RecipeImageUpload";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";
import { createRecipe } from "../../services/Recipe.service";
import { Recipe } from "../../models/Recipe.model";

const CreateRecipeScreen: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [photoURL, setPhotoURL] = useState<File | undefined>(undefined);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleCreateRecipe = async () => {
    if (!title || !description || !ingredients || !instructions) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      setToastColor("danger");
      return;
    }

    if (!currentUser) {
      return;
    }

    const newRecipe = {
      title,
      description,
      ingredients,
      instructions,
      photoURL,
    };

    createRecipe(newRecipe, currentUser)
      .then((newRecipeId) => {
        console.log(`New recipe created with ID: ${newRecipeId}`);
        // Reset input fields
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");

        // Show success toast
        setToastMessage("Recipe created successfully.");
        setShowToast(true);
        setToastColor("success");
        history.push(`/main/home`);
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);

        // Show error toast
        setToastMessage("An error occurred. Please try again later.");
        setShowToast(true);
        setToastColor("danger"); // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <IonContent>
      <div className="create-recipe-container">
        <h1>Create New Recipe</h1>
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
        <RecipeImageUpload setImageUpload={setPhotoURL} />
        <IonButton expand="full" shape="round" onClick={handleCreateRecipe}>
          Create Recipe
        </IonButton>

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

export default CreateRecipeScreen;
