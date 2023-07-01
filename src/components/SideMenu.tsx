import React from "react";
import {
  IonMenu,
  IonContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import firebase from "firebase/compat/app";
import "./SideMenu.css";
import { User } from "../models/User.model";

interface SideMenuProps {
  handleLogout: () => void;
  user: User | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ handleLogout, user }) => {
  return (
    <IonMenu type="overlay" contentId="main-content" side="end">
      <IonContent>
        <div className="side-menu-container">
          <IonAvatar
            className="sidebar-avatar"
            slot="icon-only"
            style={{ width: "120px", height: "120px" }}
          >
            <img
              src={user?.photoURL || ""}
              alt="User Avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </IonAvatar>
          <h2>{user?.displayName}</h2>
          <h3>{user?.email}</h3>
          <IonList className="sidebar-list">
            <IonMenuToggle>
              <IonItem routerLink="/main/home">
                <IonLabel>Home Screen</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem routerLink="/main/create-recipe">
                <IonLabel>Create New Recipe</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem routerLink="/main/liked-recipes">
                <IonLabel>Liked Recipes</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem routerLink="/main/profile">
                <IonLabel>Your Profile</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem onClick={handleLogout}>
                <IonLabel color="danger">Log Out</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </div>

        {/* <IonMenuToggle>
          <IonButton>Click to close the menu</IonButton>
        </IonMenuToggle> */}
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
