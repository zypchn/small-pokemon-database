import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import PokemonPage from "./pages/PokemonPage.jsx";
import GymPage from "./pages/GymPage.jsx";
import TrainerPage from "./pages/TrainerPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <>
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route exact path={"/"} element={<Navigate to={"/pokemon"}/>}/>
                    <Route exact path={"/login"} element={<LoginPage/>}/>
                    <Route exact path={"/register"} element={<RegisterPage/>}/>
                    <Route exact path={"/pokemon"} element={<PokemonPage/>}/>
                    <Route exact path={"/gym"} element={<GymPage/>}/>
                    <Route exact path={"/trainer"} element={<TrainerPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    </>
  )
}

export default App
