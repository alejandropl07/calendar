import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { startChecking } from "../features/auth/thunks";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/" element={<CalendarScreen />} />
          <Route path="/*" element={<CalendarScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
