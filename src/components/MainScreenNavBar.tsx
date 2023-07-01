import React from "react";
import firebase from "firebase/compat/app";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuToggle,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { User } from "../models/User.model";

interface MainScreenNavBarProps {
  user: User | null;
}

const MainScreenNavBar: React.FC<MainScreenNavBarProps> = ({ user }) => {
  return (
    <IonHeader className="navbar-container">
      <IonToolbar className="navbar-toolbar">
        <IonText slot="start" className="navbar-title">
          RecipeBook 🍳
        </IonText>

        <IonButtons slot="end" className="navbar-profile">
          <span>{user?.displayName}</span>
          <IonMenuToggle>
            <IonButton>
              <IonAvatar
                slot="icon-only"
                style={{ width: "35px", height: "35px" }}
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://ionicframework.com/docs/img/demos/avatar.svg"
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              </IonAvatar>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainScreenNavBar;
