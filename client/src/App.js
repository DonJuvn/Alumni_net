// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import News from "./pages/News";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add routes for other pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
