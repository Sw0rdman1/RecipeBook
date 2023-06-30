import { IonAvatar, IonContent } from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  Recipe,
  fetchMyRecipes,
  likeOrDislikeRecipe,
} from "../../utillity/Recipe.model";
import { getCurrentUser } from "../../utillity/User.model";
import RecipeCard from "../../components/RecipeCard";
import LoadingScreen from "../../components/LoadingScreen";

const MyProfileScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await fetchMyRecipes();
      setTimeout(() => {
        setRecipes(fetchedRecipes);
      }, 250);
    };

    fetchRecipes();
  });

  if (!recipes) {
    return <LoadingScreen />;
  }

  return (
    <IonContent>
      <div className="my-prfoile-section">
        <IonAvatar slot="icon-only" style={{ width: "90px", height: "90px" }}>
          <img
            src={currentUser?.photoURL || ""}
            alt="User Avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </IonAvatar>
        <div className="my-profile-text">
          <h2>{currentUser?.displayName}</h2>
          <h3>{currentUser?.email}</h3>
        </div>
      </div>
      <div className="my-recipe-section">
        <div className="my-recipe-header">
          <h4>My Recipes</h4> {recipes.length} total
        </div>
      </div>
      <div className="my-profile-screen">
        {recipes.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            You didn't like any recipe.
            <br /> Go to Home screen
          </div>
        ) : (
          recipes.map((recipe) => {
            return (
              <RecipeCard
                recipe={recipe}
                likeOrDislikeRecipe={likeOrDislikeRecipe}
                key={recipe.id}
              />
            );
          })
        )}
      </div>
    </IonContent>
  );
};

export default MyProfileScreen;
