// import "./App.css"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Example from "./pages/example"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import SideBar from "./layouts/SideBar"
import Settings from "./pages/settings"
import Payments from "./pages/payments"
import Events from "./pages/events"
import CreateEvent from "./pages/events/create"
import ManageEvent from "./pages/events/manage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/' element={<SideBar />}>
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
  return <RouterProvider router={router} />
}

export default App
