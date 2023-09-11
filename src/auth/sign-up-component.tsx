import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import KenyaIcon from "../assets/icons/kenya.png"
import { GOOGLE_AUTH_URL } from "../constants"
import { registerUser } from "../api-calls"
import { checkRegistrationError, errorToast, formatPhoneNumber, successToast } from "../lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "../components/ui/separator"

interface ISignUpProps {
  setToken: (userToken: string) => void
  setIsSignIn: (isSignIn: boolean) => void
  isSignIn: boolean
}

const schema = yup.object({
  fullName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!.,"'-*()])(?=.*[^\s]).*$/,
      "Password must have at least one uppercase letter, one lowercase letter, a digit and a special character",
    )
    .required(),
})
type IFormInput = yup.InferType<typeof schema>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SignUpComponent({ setToken, setIsSignIn, isSignIn }: ISignUpProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [regError, setRegError] = useState<any>(null)
  const [, setErrorMessage] = useState<string>("")
  const [isGoogleLogin, setIsGoogleLogin] = useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true)
      setRegError(null)
      const userData = {
        ...data,
        phone: formatPhoneNumber(data.phone),
      }
      const res = await registerUser(userData)
      if (res?.status === 200) {
        successToast("Registration Successful")
        navigate("/events")
      }
      if (res?.status === 400) {
        errorToast(res?.message)
        setErrorMessage(res?.message)
        setRegError(res?.data?.errors)
      }
    } catch (err) {
      setRegError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setIsGoogleLogin(true)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <div className="w-full">
      <div className="h-auto w-full flex flex-col items-center">
        <div className="w-full flex justify-center mt-[36px]">
          <Link to={GOOGLE_AUTH_URL} className="w-full">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full h-[45px] bg-white border border-gray-300 rounded-sm shadow px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                //   xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  {" "}
                  <g id="Color-" transform="translate(-401.000000, -860.000000)">
                    {" "}
                    <g id="Google" transform="translate(401.000000, 860.000000)">
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span>
                {isGoogleLogin ? (
                  <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h4 w-4 animate-spin" /> <span className="max-[768px]:hidden">Setting you up</span>
                </span>
                ) : (
                  "Continue with Google"
                )}
              </span>
            </button>
          </Link>
        </div>
        <div className="mt-[15px] mb-[15px] text-neutralDark flex flex-row items-center justify-center w-full">
        <Separator className="w-[45%] text-neutralDark mr-2 bg-black"/>or <Separator className="w-[45%] ml-2 bg-black"/>
        </div>

        <div className="w-full ">
          <div>
            <label className="text-neutralDark">Full Name</label>
            <input
              id="name"
              type="text"
              required
              className="h-[45px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              placeholder="Enter Full Name"
              autoComplete="nope"
              {...register("fullName", { required: true })}
            ></input>
            {errors.fullName && (
              <span className="text-criticalRed">{errors.fullName?.message}</span>
            )}
            {checkRegistrationError("fullName", regError)?.hasError && (
              <span className="text-criticalRed">
                {checkRegistrationError("fullName", regError)?.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full mt-[16px]">
          <div>
            <label className="text-neutralDark">Phone Number</label>
            <div className="flex items-center">
              <span className="w-[35%] text-neutralDark lg:w-1/4 bg-white h-[45px] flex items-center justify-center rounded-sm border rounded-r-none border-gray-600">
                <img src={KenyaIcon} alt="Kenyan Flag" className="mr-2 max-[768px]:hidden" />
                +254
              </span>
              <input
                id="phone"
                type="text"
                required
                className="w-3/4 h-[45px] bg-white appearance-none rounded-sm rounded-l-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                placeholder="Phone number"
                autoComplete="nope"
                {...register("phone", { required: true })}
              ></input>
            </div>
          </div>
          {errors.phone && <span className="text-criticalRed">{errors.phone?.message}</span>}
          {checkRegistrationError("phone", regError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("phone", regError)?.message}
            </span>
          )}
        </div>
        <div className="w-full mt-[16px]">
          <div>
            <label className="text-neutralDark">Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="h-[45px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              placeholder="Email Address"
              autoComplete="nope"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <span className="text-criticalRed">{errors.email?.message}</span>}
            {checkRegistrationError("email", regError)?.hasError && (
              <span className="text-criticalRed">
                {checkRegistrationError("email", regError)?.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full mt-[16px]">
          <div className="relative">
            <label className="text-neutralDark">Password</label>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              required
              className="h-[45px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 sm:text-sm"
              placeholder="Enter Password"
              autoComplete="nope"
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <span className="text-criticalRed">{errors.password?.message}</span>
            )}
            {checkRegistrationError("password", regError)?.hasError && (
              <span className="text-criticalRed">
                {checkRegistrationError("password", regError)?.message}
              </span>
            )}
            <button
              className="absolute inset-y-0 right-0 flex px-4 top-5 items-center text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* <div className="w-full flex justify-start mt-[20px]">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 bg-white rounded border-gray-300 text-indigo-600 focus:ring-indigo-200"
              ></input>
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="terms" className="font-medium text-gray-900">
                Agree to terms & conditions
              </label>
            </div>
          </div>
        </div> */}
        <div className="w-full mt-[20px]">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="h-[45px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-white bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h4 w-4 animate-spin" /> Setting you up
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
        <div className="w-full flex justify-center mt-[16px]">
          <p className="text-neutralDark">
            Already have an account?{" "}
            <a onClick={() => setIsSignIn(!isSignIn)} className="text-mainSecondary cursor-pointer">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
