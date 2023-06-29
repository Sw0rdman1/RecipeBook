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
  const [isLiked, setIsLiked] = useState(recipe.likedByUser);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    isLiked ? recipe.likes-- : recipe.likes++;

    likeOrUnlikeRecipe(recipe);
  };

  return (
    <IonCard className="recipe-card">
      <IonCardHeader className="card-header">
        <IonCardSubtitle className="recipe-subtitle">- Boza</IonCardSubtitle>
        <IonCardTitle>
          <div className="title-container">
            {recipe.title}
            <div className="like-container">
              <span>{recipe.likes}</span>
              <IonButton fill="clear" onClick={handleLikeClick}>
                <IonIcon
                  onClick={handleLikeClick}
                  icon={isLiked ? heart : heartOutline}
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
