import { useRef, useState, useEffect } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const roomInputRef = useRef(null);

  const SignUserOut = async () => {
    try {
      // Clear user data from Firestore if needed
      const userDoc = doc(db, "users", auth.currentUser.uid); // Assuming a 'users' collection
      await deleteDoc(userDoc);

      // Sign the user out
      await signOut(auth);

      // Remove local cookie and reset states
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);

      // Clear input field
      if (roomInputRef.current) {
        roomInputRef.current.value = "";
      }

      console.log("User signed out successfully");
      alert("User signed out successfully");
      
      // Reload the page to ensure a fresh start
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (cookies.get("auth-token")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className={isDarkMode ? "App dark" : "App light"}>
      {/* Render theme toggle button only if not authenticated */}
      {!isAuth && (
        <div>
          <Auth isDarkMode={isDarkMode} setIsAuth={setIsAuth} setRoom={setRoom} />
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      )}

      {/* Show chat or room entry only if authenticated */}
      {isAuth && (
        <div>
          {room ? (
            <Chat room={room} />
          ) : (
            <div className="room">
              <label htmlFor="room">Enter Room Name</label>
              <input ref={roomInputRef} />
              <button onClick={() => setRoom(roomInputRef.current.value)}>
                Join Room
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sign out button visible for authenticated users */}
      {isAuth && (
        <div className="sign-out">
          <button onClick={SignUserOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
