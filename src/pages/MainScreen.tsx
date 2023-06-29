import React, { useState } from "react";
import {
  IonContent,
  IonButton,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonHeader,
} from "@ionic/react";
import { auth } from "../utillity/firebase";
import firebase from "firebase/compat/app";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router";
import SideMenu from "../components/SideMenu";
import NavBar from "../components/MainScreenNavBar";
import HomeScreen from "./HomeScree";
import LikedRecipesScreen from "./LikedRecipesScreen";
import CreateRecipeScreen from "./CreateRecipeScreen";
import ProfileScreen from "./ProfileScreen";
import { IonReactRouter } from "@ionic/react-router";
import { BrowserRouter } from "react-router-dom";
import MainScreenRouting from "../components/MainScreenRouting";

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
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default MainScreen;
