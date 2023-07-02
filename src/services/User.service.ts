import firebase from "firebase/compat/app";
import axios from "axios";
import { generateImageNumber } from "../utillity/functions";
import { User } from "../models/User.model";
import { addTokenToLocalStorage } from "../utillity/localStorage";

const apiKey = "AIzaSyDiNSVs2ehjmzQn0b8d_VJlXEZWIUqBRkA";
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const updateProfileURL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
const reauthenticateURL = `https://identitytoolkit.googleapis.com/v1/token?key=${apiKey}`;
const authenticateURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

export interface AuthResponseData {
  kind: string;
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  profilePicture: File | undefined
) => {
  try {
    const requestData = {
      email,
      password,
      displayName: name,
    };

    const signUpResponse: AuthResponseData = (
      await axios.post(signUpURL, requestData)
    ).data;

    let downloadURL = "";

    if (profilePicture) {
      const storageRef = firebase.storage().ref();
      const profilePictureRef = storageRef.child(
        `profilePictures/${generateImageNumber()}`
      );
      await profilePictureRef.put(profilePicture);

      downloadURL = await profilePictureRef.getDownloadURL();

      const updateRequestData = {
        idToken: signUpResponse.idToken,
        photoUrl: downloadURL,
      };

      const updateProfileReponse: AuthResponseData = (
        await axios.post(updateProfileURL, updateRequestData)
      ).data;
    }

    const expirationTime = new Date(
      new Date().getTime() + +signUpResponse.expiresIn * 1000
    );

    addTokenToLocalStorage(signUpResponse.refreshToken);

    const user = new User(
      signUpResponse.localId,
      signUpResponse.email,
      signUpResponse.displayName,
      downloadURL,
      signUpResponse.idToken,
      expirationTime
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const reauthenticate = async (
  refreshToken: string
): Promise<User | null> => {
  try {
    const requestData = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    const response = (await axios.post(reauthenticateURL, requestData)).data;

    const userResponse = await getUserInfo(response.id_token);

    const expirationTime = new Date(
      new Date().getTime() + Number(response.expires_in) * 1000
    );

    const user = new User(
      userResponse.localId,
      userResponse.email,
      userResponse.displayName,
      userResponse.providerUserInfo[0].photoUrl,
      response.id_token,
      expirationTime
    );
    return user;
  } catch (error) {
    console.error("Error reauthenticating:", error);
    return null;
  }
};

export const authenticate = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const requestData = {
      email,
      password,
      returnSecureToken: true,
    };

    const response = (await axios.post(authenticateURL, requestData)).data;

    const userResponse = await getUserInfo(response.idToken);

    const expirationTime = new Date(
      new Date().getTime() + Number(response.expiresIn) * 1000
    );

    addTokenToLocalStorage(response.refreshToken);

    const user = new User(
      response.localId,
      userResponse.email,
      userResponse.displayName,
      userResponse.providerUserInfo[0].photoUrl,
      response.idToken,
      expirationTime
    );
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUserInfo = async (idToken: string) => {
  try {
    const requestData = {
      idToken: idToken,
    };

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      requestData
    );

    const { data } = response;
    const users = data.users;

    if (users && users.length > 0) {
      const user = users[0];
      // Access the user information here
      return user;
    } else {
      // User not found
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
