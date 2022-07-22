import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { startChecking } from "../features/auth/thunks";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading...</h5>;
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <PublicRoute isLogged={!!uid}>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isLogged={!!uid}>
                <CalendarScreen />
              </PrivateRoute>
            }
          />
          {/* <Route path="/*" element={<LoginScreen />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
