import { IonContent } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { Recipe, likeOrDislikeRecipe } from "../../utillity/Recipe.model";
import RecipeCard from "../../components/RecipeCard";
import { getAllRecipes } from "../../services/Recipe.service";
import { AppContext } from "../../context/AppContext";

const LikedRecipesScreen: React.FC = () => {
  const { currentUser } = useContext(AppContext);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      getAllRecipes(currentUser)
        .then((recipes) => {
          const likedRecipes = recipes.filter(
            (recipe: Recipe) => recipe.likedByUser
          );
          setLikedRecipes(likedRecipes);
        })
        .catch((error) => {
          console.error("Error retrieving recipes:", error);
        });
    };

    fetchLikedRecipes();
  }, []);

  return (
    <IonContent>
      <div className="liked-recipes-screen">
        <div className="liked-recipes-header">
          <span>Liked recipes</span>
          <span>
            <b>{likedRecipes.length} total</b>
          </span>
        </div>
        {likedRecipes.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            You didn't like any recipe.
            <br /> Go to Home screen
          </div>
        ) : (
          likedRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              likeOrDislikeRecipe={likeOrDislikeRecipe}
            />
          ))
        )}
      </div>
    </IonContent>
  );
};

export default LikedRecipesScreen;
