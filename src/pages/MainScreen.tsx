import React from "react";
import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, useHistory } from "react-router";
import SideMenu from "../components/SideMenu";
import NavBar from "../components/MainScreenNavBar";
import HomeScreen from "./mainScreen/HomeScreen";
import LikedRecipesScreen from "./mainScreen/LikedRecipesScreen";
import CreateRecipeScreen from "./mainScreen/CreateRecipeScreen";
import ProfileScreen from "./mainScreen/MyProfileScreen";
import "./MainScreen.css";
import RecipeDetailsScreen from "./mainScreen/RecipeDetailsScreen";
import { User } from "../models/User.model";
import { deleteTokenFromLocalStorage } from "../utillity/localStorage";
import EditRecipeScreen from "./mainScreen/EditRecipeScreen";

interface MainScreenProps {
  handleUserUpdate: (updatedUser: User | null) => void;
  user: User | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ handleUserUpdate, user }) => {
  const history = useHistory();

  const handleLogout = () => {
    try {
      handleUserUpdate(null);
      deleteTokenFromLocalStorage();
      history.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <IonPage>
      <NavBar user={user} />
      <SideMenu handleLogout={handleLogout} user={user} />
      <IonContent>
        <IonRouterOutlet id="main-content">
          <Route
            exact
            path="/main"
            render={() => <Redirect to="/main/home" />}
          />
          <Route exact path="/main/home" component={HomeScreen} />
          <Route
            exact
            path="/main/liked-recipes"
            component={LikedRecipesScreen}
          />
          <Route
            exact
            path="/main/create-recipe"
            component={CreateRecipeScreen}
          />
          <Route exact path="/main/profile" component={ProfileScreen} />
          <Route
            path="/main/recipe-details/:recipeId"
            component={RecipeDetailsScreen}
          />
          <Route
            path="/main/edit-recipe/:recipeId"
            component={EditRecipeScreen}
          />
          <Redirect from="/main" to="/main/home" exact />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default MainScreen;
