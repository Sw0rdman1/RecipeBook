import React, { useState } from "react";
import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { auth } from "../utillity/firebase";
import firebase from "firebase/compat/app";
import { Redirect, Route, useHistory, useRouteMatch } from "react-router";
import SideMenu from "../components/SideMenu";
import NavBar from "../components/MainScreenNavBar";
import HomeScreen from "./mainScreen/HomeScree";
import LikedRecipesScreen from "./mainScreen/LikedRecipesScreen";
import CreateRecipeScreen from "./mainScreen/CreateRecipeScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";

interface MainScreenProps {
  handleUserUpdate: (updatedUser: firebase.User | null) => void;
  user: firebase.User | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ handleUserUpdate, user }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleUserUpdate(null);
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
          <Redirect from="/main" to="/main/home" exact />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default MainScreen;
