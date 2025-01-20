import { auth, provider } from '../firebase-config.jsx';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Auth = ({ isDarkMode, setIsAuth }) => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Create a cookie to store the authentication token
      cookies.set("auth-token", result.user.refreshToken);
      console.log("User signed in successfully");
      setIsAuth(true); // Set the authentication state to true after successful sign-in
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className={isDarkMode ? "Auth dark" : "Auth light"}>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>

      {/* Remove the theme toggle button here */}
    </div>
  );
};

export default Auth;
