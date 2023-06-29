import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import "./CreateRecipeScreen.css";
import { createRecipe } from "../../utillity/Recipe.model";
import { getCurrentUserID } from "../../utillity/User.model";

const CreateRecipeScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

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

    const userID = getCurrentUserID();

    if (userID === "User not logged") {
      return;
    }

    try {
      await createRecipe(title, description, ingredients, instructions, userID);

      // Reset input fields
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");

      // Show success toast
      setToastMessage("Recipe created successfully.");
      setShowToast(true);
      setToastColor("success");
    } catch (error) {
      console.error("Error creating recipe:", error);

      // Show error toast
      setToastMessage("An error occurred. Please try again later.");
      setShowToast(true);
      setToastColor("danger");
    }
  };

  return (
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
      <IonButton expand="full" shape="round" onClick={handleCreateRecipe}>
        Create Recipe
      </IonButton>
      <div className="custom-shape-divider-bottom-1687980186">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <IonToast
        isOpen={showToast}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
      />
    </div>
  );
};

export default CreateRecipeScreen;
