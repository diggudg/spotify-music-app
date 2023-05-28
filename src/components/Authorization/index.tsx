import { useEffect } from "react";
import useAuthorization from "../../hooks/useAuthorization";
import { Login } from "../Login/login";
import { Header } from "../Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../Home";
import { Favorites } from "../Favorites";

export const Authorization = () => {
  const { checkAuthenticated } = useAuthorization();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuthenticated) {
      console.log("checkAuthenticated");
      navigate("/login");
    }
  }, [checkAuthenticated, navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
};
