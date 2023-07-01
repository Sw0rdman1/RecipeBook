import firebase from "firebase/compat/app";
import axios from "axios";
import { generateImageNumber } from "../utillity/functions";
import { User } from "../models/User.model";

const apiKey = "AIzaSyDiNSVs2ehjmzQn0b8d_VJlXEZWIUqBRkA";
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

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
    }

    const expirationTime = new Date(
      new Date().getTime() + +signUpResponse.expiresIn * 1000
    );
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
