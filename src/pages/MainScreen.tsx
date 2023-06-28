import React, { useState } from "react";
import { IonContent, IonButton, IonPage } from "@ionic/react";
import { auth } from "../utillity/firebase";
import firebase from "firebase/compat/app";
import { useHistory } from "react-router";
import SideMenu from "../components/SideMenu";
import NavBar from "../components/MainScreenNavBar";

interface MainScreenProps {
  handleUserUpdate: (updatedUser: firebase.User | null) => void;
  user: firebase.User | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ handleUserUpdate, user }) => {
  const history = useHistory();
  const [mainContent, setMainContent] = useState(0);

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
    <IonContent>
      <SideMenu
        handleLogout={handleLogout}
        user={user}
        setMainContent={setMainContent}
      />
      <IonPage id="main-content">
        <h1>Main Screen</h1>
        <NavBar user={user} />
      </IonPage>
    </IonContent>
  );
};

export default MainScreen;
