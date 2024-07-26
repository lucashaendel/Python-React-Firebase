// import "./App.css";
// import Home from "./components/Home.tsx";

// function App() {
//   return (
//     <div className="App">
//       <Home />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CarList } from "./components/CarList.tsx";
import { CarDetail } from "./components/CarDetail.tsx";
import { CarForm } from "./components/CarForm.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/add-car" element={<CarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
