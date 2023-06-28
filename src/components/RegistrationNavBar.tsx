import React from "react";
import {
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const RegistrationNavbar = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton onClick={handleBackClick}>
          <IonIcon slot="icon-only" icon={arrowBackOutline} />
          Log In
        </IonButton>
      </IonButtons>
      <IonTitle className="ion-text-center">Registration</IonTitle>
    </IonToolbar>
  );
};

export default RegistrationNavbar;
