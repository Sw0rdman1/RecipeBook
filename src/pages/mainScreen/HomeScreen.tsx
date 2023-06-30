import React, { useEffect, useState } from "react";
import {
  Recipe,
  fetchAllRecipes,
  likeOrDislikeRecipe,
} from "../../utillity/Recipe.model";
import RecipeCard from "../../components/RecipeCard";
import { IonContent } from "@ionic/react";
import LoadingScreen from "../../components/LoadingScreen";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await fetchAllRecipes();
      setTimeout(() => {
        setRecipes(fetchedRecipes);
      }, 250);
    };

    fetchRecipes();
  }, []);

  if (!recipes) {
    return <LoadingScreen />;
  }

  return (
    <IonContent>
      <div className="home-screen">
        {recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
            likeOrDislikeRecipe={likeOrDislikeRecipe}
          />
        ))}
      </div>
    </IonContent>
  );
};

export default HomeScreen;
