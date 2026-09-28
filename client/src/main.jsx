import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./app/routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import InitAuth from "./app/InitAuth";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <InitAuth />
    <AppRoutes />
  </Provider>,
);
