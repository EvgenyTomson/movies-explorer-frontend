// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, children }) => {

  console.log('isLogged = ', isLogged);

  // const [openRoute, setOpenRouye] = useState(isLogged);

  // useEffect(() => {
  //   setOpenRouye(isLogged);
  // }, [isLogged])

  return (
    <>
      {
        isLogged
          ? children
          : <Navigate to="/" />
      }
    </>
  )
};

export default ProtectedRoute;
