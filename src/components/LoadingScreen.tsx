import React from "react";
import "./LoadingScreen.css";
import { IonItem, IonLabel, IonSpinner } from "@ionic/react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <IonSpinner name="crescent" color="primary"></IonSpinner>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
