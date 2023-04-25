import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const Layout = () => (
  <div>
    <h2>Jotai | Async Atom Example 01 atomFamily</h2>
    <p>
      Fetching the Star Wars people using Suspense and simple pagination with
      cache strategy by atomFamily. (CAUTION: You should care memory leaks when
      you use atomFamily. See more details{" "}
      <a href="https://jotai.org/docs/utils/atom-family#caveat-memory-leaks">
        here
      </a>
      .)
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
