import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Dashboard from "../pages/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Usuarios from "../pages/Usuarios";
import Perfis from "../pages/Perfis";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/dashboard"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />

        {/* <Route path="/usuarios"
          element={
            <DefaultLayout>
              <Usuarios />
            </DefaultLayout>
          }
        /> */}

        <Route path="/Perfils"
          element={
            <DefaultLayout>
              <Perfis />
            </DefaultLayout>
          }
        />

        

      </Routes>
    </BrowserRouter>
  );
}
