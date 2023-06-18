// import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Protected from "./components/Protected"
import useToken from "./hooks/useToken"
import ForgotPassword from "./auth/ForgotPassword"
import OAuth2RedirectHandler from "./auth/OAuth2RedirectHandler"
import ResetPassword from "./auth/ResetPassword"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import SideBarLayout from "./layouts/SideBarLayout"
import Events from "./pages/events"
import CreateEvent from "./pages/events/create"
import ManageEvent from "./pages/events/manage"
import Example from "./pages/example"
import Payments from "./pages/payments"
import Settings from "./pages/settings"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const { token, setToken } = useToken()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn setToken={setToken} />} />
          <Route path='/sign-in' element={<SignIn setToken={setToken} />} />
          <Route path='/register' element={<SignUp setToken={setToken} />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler setToken={setToken} />} />
          <Route element={<SideBarLayout />}>
            <Route path='/example' element={<Example />} />
            <Route
              path='/settings'
              element={
                <Protected isSignedIn={!!token}>
                  <Settings />
                </Protected>
              }
            />
            <Route
              path='/payments'
              element={
                <Protected isSignedIn={!!token}>
                  <Payments />
                </Protected>
              }
            />
            <Route
              path='/events'
              element={
                <Protected isSignedIn={!!token}>
                  <Events />
                </Protected>
              }
            />
            <Route
              path='/create-event'
              element={
                <Protected isSignedIn={!!token}>
                  <CreateEvent />
                </Protected>
              }
            />
            <Route
              path='/events/manage/:id'
              element={
                <Protected isSignedIn={!!token}>
                  <ManageEvent />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
