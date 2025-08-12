import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/auth/authSlice";
import { useEffect } from "react";
import RegModal from "./components/Modals/RegModal/RegModal";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginModal from "./components/Modals/LoginModal/LoginModal";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      dispatch(login(JSON.parse(savedUser)));
      navigate("/home");
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
    </Routes>
  );
}
