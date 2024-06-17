import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Instructions from "./components/Instructions";
import "./App.css";
import Scatter from "./components/Scatter";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Instructions />} />
        <Route path="/scatter/:tfid" element={<Landing />}></Route>
      </Routes>
    </>
  );
}

export default App;
