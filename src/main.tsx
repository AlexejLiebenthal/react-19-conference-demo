import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.querySelector("#root")!;

createRoot(rootElement, {
  onCaughtError: (error, errInfo) => {
    console.error(error, errInfo);
  },
  onUncaughtError: (error, errInfo) => {
    console.error(error, errInfo);
  },
  onRecoverableError: (error, errInfo) => {
    console.error(error, errInfo);
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
