import { IonAvatar, IonContent } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";

import RecipeCard from "../../components/RecipeCard";
import { AppContext } from "../../context/AppContext";
import { getAllRecipes } from "../../services/Recipe.service";
import { Recipe } from "../../models/Recipe.model";

const MyProfileScreen: React.FC = () => {
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      getAllRecipes(currentUser)
        .then((recipes) => {
          const recipeList = recipes.filter(
            (recipe: Recipe) => recipe.creatorID === currentUser?.id
          );

          setMyRecipes(recipeList);
        })
        .catch((error) => {
          console.error("Error retrieving recipes:", error);
        });
    };

    fetchLikedRecipes();
  }, []);

  return (
    <IonContent>
      <div className="my-prfoile-section">
        <IonAvatar slot="icon-only" style={{ width: "90px", height: "90px" }}>
          <img
            src={
              currentUser?.photoURL ||
              "https://ionicframework.com/docs/img/demos/avatar.svg"
            }
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
          <h4>My Recipes</h4> {myRecipes.length} total
        </div>
      </div>
      <div className="my-profile-screen">
        {myRecipes.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            You didn't create any recipe.
            <br /> Go to Create New Recipe
          </div>
        ) : (
          myRecipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />;
          })
        )}
      </div>
    </IonContent>
  );
};

export default MyProfileScreen;
