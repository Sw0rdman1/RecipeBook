import { IonApp, setupIonicReact, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from "./pages/LogInScreen";
import MainScreen from "./pages/MainScreen";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import RegistrationScreen from "./pages/RegistrationScreen";
import LoadingScreen from "./components/LoadingScreen";
import { User, setCurrentUser } from "./models/User.model";
import { getTokenFromLocalStorage } from "./utillity/localStorage";
import { reauthenticate } from "./services/User.service";
import LogInScreen from "./pages/LogInScreen";
import { AppContext, AppProvider } from "./context/AppContext";

setupIonicReact();

const App: React.FC = () => {
  const { user, updateUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const handleUserUpdate = (updatedUser: User | null) => {
    updateUser(updatedUser);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      reauthenticate(token)
        .then((authenticatedUser) => {
          if (authenticatedUser) {
            updateUser(authenticatedUser);
            setCurrentUser(authenticatedUser);
          } else {
            updateUser(null);
          }
        })
        .catch((error) => {
          console.error("Error reauthenticating:", error);
          updateUser(null);
        });
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {user ? (
            // User is logged in, show main screen
            <>
              <MainScreen handleUserUpdate={handleUserUpdate} user={user} />
              <Redirect to="/main" />
            </>
          ) : (
            // User is not logged in, show login and registration screens
            <>
              <Route exact path="/login">
                <LogInScreen handleUserUpdate={handleUserUpdate} />
              </Route>
              <Route exact path="/registration">
                <RegistrationScreen handleUserUpdate={handleUserUpdate} />
              </Route>
              <Redirect to="/login" />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
