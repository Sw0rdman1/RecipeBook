import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeScreen from "../pages/HomeScree";
import LikedRecipesScreen from "../pages/LikedRecipesScreen";
import CreateRecipeScreen from "../pages/CreateRecipeScreen";
import ProfileScreen from "../pages/ProfileScreen";

const MainScreenRouting: React.FC = () => {
  return (
    <>
      <Route path="/main/home" component={HomeScreen} exact />
      <Route path="/main/liked-recipes" component={LikedRecipesScreen} exact />
      <Route path="/main/create-recipe" component={CreateRecipeScreen} exact />
      <Route path="/main/profile" component={ProfileScreen} exact />
      <Redirect from="/main" to="/main/home" exact />
    </>
  );
};

export default MainScreenRouting;
