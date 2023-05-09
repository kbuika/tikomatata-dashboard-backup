// import "./App.css"
import { createBrowserRouter } from "react-router-dom"
import Example from "./pages/example"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"

const App = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/example",
    element: <Example />,
  },
])

export default App
