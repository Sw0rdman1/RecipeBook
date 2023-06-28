import React, { useState } from "react";
import { IonContent, IonInput, IonButton, IonToast } from "@ionic/react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../utillity/firebase";

const LogInScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/main");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setToastMessage("User does not exist.");
      } else if (error.code === "auth/wrong-password") {
        setToastMessage("Incorrect password.");
      } else {
        setToastMessage("An error occurred. Please try again.");
      }
      setShowToast(true);
    }
  };

  return (
    <IonContent>
      <IonInput
        placeholder="Email"
        value={email}
        onIonChange={(e) => setEmail(e.detail.value!)}
      ></IonInput>
      <IonInput
        type="password"
        placeholder="Password"
        value={password}
        onIonChange={(e) => setPassword(e.detail.value!)}
      ></IonInput>
      <IonButton expand="full" onClick={handleLogin}>
        Log In
      </IonButton>
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonContent>
  );
};

export default LogInScreen;
