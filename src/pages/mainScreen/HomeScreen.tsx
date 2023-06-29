import React, { useEffect, useState } from "react";
import {
  Recipe,
  fetchAllRecipes,
  likeOrDislikeRecipe,
} from "../../utillity/Recipe.model";
import RecipeCard from "../../components/RecipeCard";
import { IonContent } from "@ionic/react";

const HomeScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await fetchAllRecipes();
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

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
