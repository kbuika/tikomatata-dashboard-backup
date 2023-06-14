// import "./App.css"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Example from "./pages/example"
import SideBarLayout from "./layouts/SideBarLayout"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import Settings from "./pages/settings"
import Payments from "./pages/payments"
import Events from "./pages/events"
import CreateEvent from "./pages/events/create"
import ManageEvent from "./pages/events/manage"
import OAuth2RedirectHandler from "./auth/OAuth2RedirectHandler"

// for toast notifications
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
      <Route element={<SideBarLayout />}>
        <Route path='/example' element={<Example />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/events' element={<Events />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/events/manage/:id' element={<ManageEvent />} />
      </Route>
    </Route>,
  ),
)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
