import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Register from "./pages/register/Register";
import Theme from "./components/theme/Theme";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { IRootState } from "./store/store";
import AboutUs from "./pages/aboutus/AboutUs";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/messages/Messages";

function App() {
  const user = useSelector((state: IRootState) => state.auth.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/messages"
          element={user ? <Messages /> : <Navigate to="/" />}
        />
      </Routes>
      <Theme />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
