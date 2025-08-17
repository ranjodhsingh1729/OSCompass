// libraries
import { useState } from "react";

// Files of Mine
import "./App.css";
import Navbar from "./Navbar.jsx";
import Content from "./Content.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
