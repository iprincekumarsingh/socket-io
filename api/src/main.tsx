import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { SocketProvider } from "./context/SocketContext";
import RandomCall from "./randomCall/RandomCall.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <RandomCall />  
  </SocketProvider>
);
