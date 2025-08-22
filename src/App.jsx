import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/auth/authSlice";
import { useEffect } from "react";
import RegModal from "./components/Modals/RegModal/RegModal";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginModal from "./components/Modals/LoginModal/LoginModal";
import NotFound from "./components/NotFound/NotFound";
import { setUser } from "./redux/user/userSlice";
import { setCities } from "./redux/cities/CitiesSlice";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (savedUser) {
      dispatch(login(savedUser));
      dispatch(setUser(savedUser));

      navigate("/home");
    }

    const cities = JSON.parse(
      localStorage.getItem(`cities${savedUser?.username}`) || "{}"
    );

    if (cities) {
      dispatch(setCities(cities));
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
