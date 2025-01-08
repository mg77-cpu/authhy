import React, { useState } from "react";
import AppRoutes from './components/AppRoutes/AppRoutes';
import Navb from "./components/Nav";
import Footer from "./components/Footer";

//<AppRoutes />

function App() {

  const user = localStorage.getItem("token");

  return (
<div className="min-h-screen gradient-bg-welcome bg-scroll overflow-auto">
   <Navb />
         <AppRoutes />
      <Footer />
</div>
  );
}

export default App;
