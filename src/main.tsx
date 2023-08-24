import React from "react"
import ReactDOM from "react-dom/client"
import App from "@src/App.tsx"
import { Provider } from "react-redux"
import { store } from "@src/store.ts"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
