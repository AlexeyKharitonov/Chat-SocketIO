import { createBrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ChatPage from "./Pages/ChatPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

export default appRouter;
