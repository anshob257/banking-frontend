import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, getCurrentUser } from "../services/authService";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true); // while checking session

  useEffect(() => {
    // on app load, try restore session from cookie
    async function loadUser() {
      try {
        const res = await getCurrentUser();
        if (res?.user) {
          setUser(res.user);

          // small non-blocking toast
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Session restored",
            showConfirmButton: false,
            timer: 1800,
            background: "#0f172a",
            color: "#ffffff"
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        // no session — silently ignore (no modal spam)
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    }

    loadUser();
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // while restoring session, avoid rendering app UI that expects user
  if (loadingAuth) return null; // or return a spinner component

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
