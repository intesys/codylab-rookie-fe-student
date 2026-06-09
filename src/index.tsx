import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { worker } from "./mocks/browser";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

worker
  .start({
    onUnhandledRequest(request) {
      const url = new URL(request.url);

      if (!url.pathname.startsWith("/msw/")) {
        return;
      }

      console.warn(`[MSW] Unhandled mock request: ${request.method} ${url.pathname}`);
    },
  })
  .then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
