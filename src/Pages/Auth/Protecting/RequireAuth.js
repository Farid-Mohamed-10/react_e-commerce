import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/axios";
import Error403 from "./../Errors/403";

export default function RequireAuth({ allowedRole }) {
  // User
  const [user, setUser] = useState("");

  // Navigate
  const Navigate = useNavigate();

  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate('/login', { replace: true }));
  }, [Navigate]);
  

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}