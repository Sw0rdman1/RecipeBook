import React, { useContext, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { Recipe } from "../utillity/Recipe.model";
import "./RecipeCard.css";
import { useHistory } from "react-router";
import { toggleLike } from "../services/Like.service";
import { AppContext } from "../context/AppContext";

interface RecipeCardProps {
  recipe: Recipe;
  likeOrDislikeRecipe: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  likeOrDislikeRecipe,
}) => {
  const [isLiked, setIsLiked] = useState(recipe.likedByUser);
  const history = useHistory();
  const { currentUser } = useContext(AppContext);

  const handleLikeClick = (
    e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setIsLiked(!isLiked);
    isLiked ? recipe.likes-- : recipe.likes++;

    toggleLike(currentUser, recipe.id);
    recipe.likedByUser = !recipe.likedByUser;
  };

  const handleRecipeClick = () => {
    history.push(`/main/recipe-details/${recipe.id}`);
  };

  return (
    <IonCard className="recipe-card" onClick={handleRecipeClick}>
      <IonCardHeader className="card-header">
        <IonCardSubtitle className="recipe-subtitle">
          - {recipe.creatorName}
        </IonCardSubtitle>
        <IonCardTitle>
          <div className="title-container">
            {recipe.title}
            <div className="like-container">
              <span>{recipe.likes}</span>
              <IonButton fill="clear" onClick={handleLikeClick}>
                <IonIcon icon={isLiked ? heart : heartOutline} />
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
