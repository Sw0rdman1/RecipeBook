import { IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  Recipe,
  fetchLikedRecipes,
  likeOrDislikeRecipe,
} from "../../utillity/Recipe.model";
import RecipeCard from "../../components/RecipeCard";

const LikedRecipesScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await fetchLikedRecipes();
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);
  return (
    <IonContent>
      <div className="liked-recipes-screen">
        <div className="liked-recipes-header">
          <span>Liked recipes</span>
          <span>
            <b>{recipes.length} total</b>
          </span>
        </div>
        {recipes.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            You didn't like any recipe.
            <br /> Go to Home screen
          </div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              likeOrUnlikeRecipe={likeOrDislikeRecipe}
            />
          ))
        )}
      </div>
    </IonContent>
  );
};

export default LikedRecipesScreen;
