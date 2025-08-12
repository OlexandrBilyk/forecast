import { Routes, Route } from "react-router-dom";
import RegModal from "./components/Modals/RegModal/RegModal";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginModal from "./components/Modals/LoginModal/LoginModal";

export default function App() {
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
