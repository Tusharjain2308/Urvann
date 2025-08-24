import React from "react";
import { Helmet } from "react-helmet";
import "./index.css";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="font-sans">
      <Helmet>
        <title>Urvann - Your Botanical Paradise</title>
        <meta
          name="description"
          content="Discover and shop the finest collection of plants at Urvann"
        />
      </Helmet>
      <HomePage/>
    </div>
  );
};

export default App;
