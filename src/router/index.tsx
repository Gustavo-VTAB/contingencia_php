import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Usuarios from "../pages/Usuarios";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />

        <Route path="/usuarios"
          element={
            <DefaultLayout>
              <Usuarios />
            </DefaultLayout>
          }
        />

        

      </Routes>
    </BrowserRouter>
  );
}
