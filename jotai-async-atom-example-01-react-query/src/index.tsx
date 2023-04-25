import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const Layout = () => (
  <div>
    <h2>Jotai | Async Atom Example 01 with TanStack Query (React Query)</h2>
    <p>
      Fetching the Star Wars people using Suspense and simple pagination with
      cache strategy by TanStack Query integration.
    </p>
    <p>
      Please see more details,{" "}
      <a href="https://tanstack.com/query/v4/docs/guides/caching">
        https://tanstack.com/query/v4/docs/guides/caching
      </a>
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
