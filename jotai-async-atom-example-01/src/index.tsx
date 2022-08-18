import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const Layout = () => (
  <div>
    <h2>Jotai | Async Atom Example 01</h2>
    <p>
      Fetching the Star Wars people using Suspense and simple pagination without
      cache strategy.
    </p>
    <App />
  </div>
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
