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

const RecipeDeatilsNavbar: React.FC = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton onClick={handleBackClick}>
          <IonIcon slot="icon-only" icon={arrowBackOutline} />
          Back
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default RecipeDeatilsNavbar;
