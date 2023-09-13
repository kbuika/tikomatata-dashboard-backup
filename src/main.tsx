import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { SWRConfig } from "swr"


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => new Map }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
