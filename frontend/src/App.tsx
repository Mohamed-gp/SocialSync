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
import Settings from "./pages/settings/Settings";
import PostPage from "./pages/Post/Post";
import NotFound from "./pages/notFound/NotFound";
import Users from "./pages/users/Users";

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
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/" />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route
          path="/messages"
          element={user ? <Messages /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Theme />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
