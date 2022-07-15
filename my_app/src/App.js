import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./_routes";

function App() {
  return (
    <Routes>
      {routes?.map((route, idx) => {
        return (
          <Route key={idx} path={`${route.path}`} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
