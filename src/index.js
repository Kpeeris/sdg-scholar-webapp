import { createRoot } from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Get the root element from the HTML
const container = document.getElementById("root");
const root = createRoot(container); // Create a root using createRoot

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

