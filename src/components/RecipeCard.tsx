import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { Recipe } from "../utillity/Recipe.model";
import "./RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
  likeOrUnlikeRecipe: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  likeOrUnlikeRecipe,
}) => {
  const handleLikeClick = () => {
    likeOrUnlikeRecipe(recipe);
    recipe.likedByUser ? recipe.likes-- : recipe.likes++;
    recipe.likedByUser = !recipe.likedByUser;
  };

  return (
    <IonCard className="recipe-card">
      <IonCardHeader className="card-header">
        <IonCardSubtitle className="recipe-subtitle">- Bosko</IonCardSubtitle>
        <IonCardTitle>
          <div className="title-container">
            {recipe.title}
            <div className="like-container">
              <span>{recipe.likes}</span>
              <IonButton fill="clear" onClick={handleLikeClick}>
                <IonIcon
                  onClick={handleLikeClick}
                  icon={recipe.likedByUser ? heart : heartOutline}
                />
              </IonButton>
            </div>
          </div>
        </IonCardTitle>
      </IonCardHeader>
      <div className="recipe-container">
        <span className="recipe-description">{recipe.description}</span>
      </div>
    </IonCard>
  );
};

export default RecipeCard;
