// import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Protected from "./components/protected-element"
import useToken from "./hooks/use-token"
import ForgotPassword from "./auth/forgot-password"
import OAuth2RedirectHandler from "./auth/oauth-redirect-handler"
import ResetPassword from "./auth/reset-password"
import SignIn from "./auth/sign-in"
import SignUp from "./auth/sign-up"
import Events from "./pages/events"
import CreateEvent from "./pages/events/create"
import ManageEvent from "./pages/events/manage"
import Payments from "./pages/payments"
import Settings from "./pages/settings"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Auth from "./auth/auth"

const App = () => {
  const { token, setToken } = useToken()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth setToken={setToken}/>} />
          <Route path="/sign-in" element={<SignIn setToken={setToken} />} />
          <Route path="/register" element={<SignUp setToken={setToken} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler setToken={setToken} />} />
          <Route
            path="/settings"
            element={
              <Protected isSignedIn={!!token}>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="/payments"
            element={
              <Protected isSignedIn={!!token}>
                <Payments />
              </Protected>
            }
          />
          <Route
            path="/events"
            element={
              <Protected isSignedIn={!!token}>
                <Events />
              </Protected>
            }
          />
          <Route
            path="/create-event"
            element={
              <Protected isSignedIn={!!token}>
                <CreateEvent />
              </Protected>
            }
          />
          <Route
            path="/events/manage/:id"
            element={
              <Protected isSignedIn={!!token}>
                <ManageEvent />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
