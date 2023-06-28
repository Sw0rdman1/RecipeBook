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

interface SideMenuProps {
  handleLogout: () => void;
  user: firebase.User | null;
  setMainContent: (number: number) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({
  handleLogout,
  user,
  setMainContent,
}) => {
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
              <IonItem onClick={() => setMainContent(0)}>
                <IonLabel>Home Screen</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem onClick={() => setMainContent(1)}>
                <IonLabel>Create New Recipe</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem onClick={() => setMainContent(2)}>
                <IonLabel>Your Profile</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle>
              <IonItem onClick={() => setMainContent(3)}>
                <IonLabel>Saved Recipes</IonLabel>
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
