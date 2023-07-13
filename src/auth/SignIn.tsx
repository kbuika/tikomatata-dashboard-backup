import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import GoogleIcon from "../assets/icons/google.png"
import { GOOGLE_AUTH_URL } from "../constants"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { errorToast, successToast } from "../lib/utils"
import { loginUser } from "../apiCalls"

interface ISignInProps {
  setToken: (userToken: string) => void
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

type IFormInput = yup.InferType<typeof schema>

export default function SignIn({ setToken }: ISignInProps) {
  const [isGoogleLogin, setIsGoogleLogin] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [regError, setRegError] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true)
      const userData = {
        ...data,
      }
      const res = await loginUser(userData)
      if (res?.status === 200 && res?.data?.status === 200) {
        successToast("Registration Successful")
        setToken(res?.data?.token)
        navigate("/events")
      }
      if (res?.status !== 200 || res?.data?.status !== 200) {
        errorToast(res?.message || res?.data?.message)
        setErrorMessage(res?.message || res?.data?.message)
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
    <div className="bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] pt-[100px]">
      <div className="h-auto w-[38%] max-[730px]:w-[80%] lg:w-1/3 flex flex-col items-center">
        <div>
          <h2 className="text-[30px] font-normal text-neutralDark">Hey, Welcome Back</h2>
        </div>
        <div className="flex items-center justify-center mt-4">
          {errorMessage && <p className="text-criticalRed">{errorMessage}</p>}
        </div>
        <div className="w-full mt-[36px] text-neutralDark">
          <div>
            <label className="text-neutralDark">Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              placeholder="Email Address"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <span className="text-criticalRed">{errors.email?.message}</span>}
          </div>
        </div>
        <div className="w-full mt-[24px]">
          <div className="relative">
            <label className="text-neutralDark">Password</label>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              required
              className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 sm:text-sm"
              placeholder="Enter Password"
              autoComplete="nope"
              {...register("password", { required: true })}
            ></input>

            {errors.password && (
              <span className="text-criticalRed">{errors.password?.message}</span>
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
        <div className="w-full flex justify-end mt-[20px]">
          <a className="text-sm text-mainSecondary" href="/forgot-password">
            Forgot password?
          </a>
        </div>
        <div className="w-full mt-[20px]">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-white bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2"
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
        <div className="w-full flex justify-center mt-[24px]">
          <p className="text-neutralDark">
            Don&rsquo;t have an account?{" "}
            <a href="/register" className="text-mainSecondary">
              Sign Up
            </a>
          </p>
        </div>
        <div className="mt-[20px] mb-[20px] text-neutralDark">Or</div>
        <div className="w-full flex justify-center">
          <Link to={GOOGLE_AUTH_URL} className="w-full">
            <button
              onClick={handleGoogleLogin}
              className="h-[50px] w-full text-mainSecondary border border-neutralDark rounded-sm bg-white flex justify-center items-center focus:border-none focus:outline-none focus:ring-2"
            >
              <span className="mr-[10px]">
                <img src={GoogleIcon} height={20} width={20}></img>
              </span>
              {isGoogleLogin ? (
                <>
                  <Loader2 className="mr-2 h4 w-4 animate-spin" /> Setting you up
                </>
              ) : (
                "Continue with Google"
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
