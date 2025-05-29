import { auth, provider } from '../firebase-config.jsx';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

const cookies = new Cookies();

const Auth = ({ isDarkMode, setIsAuth, setRoom }) => {
  // Check if the user is already authenticated
  useEffect(() => {
    if (cookies.get("auth-token")) {
      setIsAuth(true);
    }
  }, [setIsAuth]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Create a cookie to store the authentication token
      cookies.set("auth-token", result.user.refreshToken);
      console.log("User signed in successfully");

      // Now that the user is authenticated, allow them to enter the room
      setIsAuth(true); // Update the auth status to true

      // Allow the user to create or join a new room after successful login
      setRoom(null); // This ensures the room input is available after login
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className={isDarkMode ? "Auth dark" : "Auth light"}>
      <p>Sign In With Google To Continue</p>

      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={signInWithGoogle}>Sign In With Google
      </button>
      
    </div>
  );
};

export default Auth;
