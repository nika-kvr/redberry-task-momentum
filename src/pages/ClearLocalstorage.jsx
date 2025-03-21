import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ClearLocalStorage = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("filterDeps");
    localStorage.removeItem("filterEmp");
    localStorage.removeItem("filterPrios");
  }, [location.pathname]);

  return null;
};

export default ClearLocalStorage;
