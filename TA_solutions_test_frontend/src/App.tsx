import React from "react";
import Converter from "./pages/CurrencyConverter";

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Currency Converter</h1>
      <Converter />
    </div>
  );
};

export default App;
