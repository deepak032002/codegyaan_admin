import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";
import { Login } from "./components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
import { persistor, store } from "./redux/store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/auth" element={<Login />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
