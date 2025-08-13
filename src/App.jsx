import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/auth/authSlice";
import { useEffect } from "react";
import RegModal from "./components/Modals/RegModal/RegModal";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginModal from "./components/Modals/LoginModal/LoginModal";
import NotFound from "./components/NotFound/NotFound";
import { setUser } from "./redux/user/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      dispatch(login(JSON.parse(savedUser)));
      dispatch(setUser(JSON.parse(savedUser)));
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/home");
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<RegModal />} />
      <Route path="/login" element={<LoginModal />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
