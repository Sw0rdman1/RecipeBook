import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
}

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  profilePicture: File | undefined
) => {
  try {
    // Step 1: Create a new user with email and password
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = userCredential.user;

    // Step 2: Save additional user data to Firestore
    const userDocRef = firebase.firestore().collection("users").doc(user?.uid);
    await userDocRef.set({
      name,
      email,
    });

    if (profilePicture) {
      const storageRef = firebase.storage().ref();
      const profilePictureRef = storageRef.child(
        `profilePictures/${user?.uid}`
      );
      await profilePictureRef.put(profilePicture);

      // Get the download URL of the uploaded image
      const downloadURL = await profilePictureRef.getDownloadURL();

      // Update the user document with the profile picture URL
      await userDocRef.update({
        profilePicture: downloadURL,
      });
      await userCredential.user?.updateProfile({
        photoURL: downloadURL,
      });
    }

    await userCredential.user?.updateProfile({
      displayName: name,
    });

    // Step 3: Upload profile picture if provided

    return user;
  } catch (error) {
    throw error;
  }
};
