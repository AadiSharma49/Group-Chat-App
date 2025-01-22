import { useRef, useState, useEffect } from 'react';
import './App.css';
import Auth from './Components/Auth';
import Cookies from 'universal-cookie';
import Chat from './Components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const roomInputRef = useRef(null);

  const SignUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
    roomInputRef.current.value = '';
    console.log("User signed out successfully")
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
