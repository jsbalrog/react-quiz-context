import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { QuestionProvider } from "./contexts/QuestionContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
)
