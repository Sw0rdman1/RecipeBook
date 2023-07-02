import React, { useContext, useEffect, useState } from "react";
import { likeOrDislikeRecipe } from "../../utillity/Recipe.model";
import RecipeCard from "../../components/RecipeCard";
import { IonContent } from "@ionic/react";
import LoadingScreen from "../../components/LoadingScreen";
import { getAllRecipes } from "../../services/Recipe.service";
import { AppContext } from "../../context/AppContext";

const HomeScreen: React.FC = () => {
  const { currentUser, recipes, updateRecipes } = useContext(AppContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      getAllRecipes(currentUser)
        .then((recipes) => {
          setTimeout(() => {
            updateRecipes(recipes);
          }, 250);
        })
        .catch((error) => {
          console.error("Error retrieving recipes:", error);
        });
    };

    fetchRecipes();
  }, []);

  if (recipes.length === 0) {
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
