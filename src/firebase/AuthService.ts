import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
  } from "firebase/auth";
  import { Auth } from "./config"; // Import the Firebase Auth instance from your configuration file
  
  // Function to handle user sign-up
  export const UserSignUp = async (
    email: string, // Email of the user to sign up
    password: string // Password for the user
  ): Promise<UserCredential | void> => {
    try {
      // Attempt to create a new user with the provided email and password
      const signUp: UserCredential = await createUserWithEmailAndPassword(
        Auth, // Firebase Auth instance
        email, // User's email
        password // User's password
      );
      // Log the email of the newly created user for confirmation (optional)
      console.log(signUp?.user?.email);
      return signUp; // Return the UserCredential object on successful sign-up
    } catch (error) {
      // Catch and log any errors that occur during sign-up
      console.error("Error while signing up:", error);
    }
  };
  
  // Function to handle user sign-in
  export const UserSignIn = async (
    email: string, // Email of the user to sign in
    password: string // Password for the user
  ): Promise<UserCredential | void> => {
    try {
      // Attempt to sign in the user with the provided email and password
      const signIn: UserCredential = await signInWithEmailAndPassword(
        Auth, // Firebase Auth instance
        email, // User's email
        password // User's password
      );
      // Return the UserCredential object on successful sign-in
      return signIn;
    } catch (error) {
      // Catch and log any errors that occur during sign-in
      console.error("Error while signing in:", error);
    }
  };
  
  // Function to handle user sign-out
  export const UserSignOut = async (): Promise<void> => {
    try {
      // Attempt to sign out the currently authenticated user
      await signOut(Auth); // Firebase Auth instance
      // Log a success message for confirmation (optional)
      console.log("User signed out successfully");
    } catch (error) {
      // Catch and log any errors that occur during sign-out
      console.error("Error while signing out:", error);
    }
  };
  