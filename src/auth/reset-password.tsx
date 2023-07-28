/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { resetPassword } from "../apiCalls"
import { checkRegistrationError, errorToast, successToast } from "../lib/utils"
import { Loader2 } from "lucide-react"

const schema = yup.object({
  code: yup.string().min(2).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .equals([yup.ref("password"), null], "Passwords must match"),
})
type IFormInput = yup.InferType<typeof schema>
export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | any>("")
  const [resetPassError, setResetPassError] = useState<any>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const userEmail = searchParams.get("email")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const payload = {
      email: userEmail,
      password: data?.password,
      code: parseInt(data?.code),
    }
    try {
      setLoading(true)
      const res = await resetPassword(payload)
      if (res?.status === 200 && res?.data?.status === 200) {
        successToast("Password reset successful")
        navigate("/sign-in")
      }
      if (res?.status !== 200 || res?.data?.status !== 200) {
        errorToast(res?.message || res?.data?.message)
        setErrorMessage(res?.message || res?.data?.message)
        setResetPassError(res?.data?.errors)
      }
    } catch (err) {
      setResetPassError(err)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }
  return (
    <div className="bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] pt-[100px]">
      <div className="h-auto w-[38%] max-[730px]:w-[80%] lg:w-1/3 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-[28px] font-normal text-center text-neutralDark">
            Choose a new Password
          </h2>
          <p className="mt-2 text-neutralDark">Almost done resetting your password</p>
          {errorMessage && <p className="mt-2 text-criticalRed">{errorMessage}</p>}
        </div>
        <div className="w-full mt-[24px]">
          <div>
            <label className="text-neutralDark">Code</label>
            <input
              id="code"
              type="text"
              required
              className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              placeholder="Enter code"
              autoComplete="nope"
              {...register("code", { required: true })}
            ></input>
            {errors.code && <span className="text-criticalRed">{errors?.code?.message}</span>}
            {checkRegistrationError("code", resetPassError)?.hasError && (
              <span className="text-criticalRed">
                {checkRegistrationError("password", resetPassError)?.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full mt-[24px]">
          <div className="relative">
            <label className="text-neutralDark">New Password</label>
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
            {checkRegistrationError("password", resetPassError)?.hasError && (
              <span className="text-criticalRed">
                {checkRegistrationError("password", resetPassError)?.message}
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
        <div className="w-full mt-[24px]">
          <div className="relative">
            <label className="text-neutralDark">Confirm Password</label>
            <input
              id="confirmPassword"
              type={isPasswordVisible ? "text" : "password"}
              required
              className="h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 sm:text-sm"
              placeholder="Confirm Password"
              autoComplete="nope"
              {...register("confirmPassword", { required: true })}
            ></input>

            {errors.confirmPassword && (
              <span className="text-criticalRed">passwords must match</span>
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
        <div className="w-full mt-[40px]">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-white bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 /> <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
        <div className="flex w-full items-center justify-between mt-2">
          <Link to="/sign-in" style={{ textDecoration: "underline", cursor: "pointer" }}>
            back to login
          </Link>
          <Link to="/forgot-password" style={{ textDecoration: "underline", cursor: "pointer" }}>
            request new code
          </Link>
        </div>
        <div className="w-full flex justify-start mt-[24px]">
          <a
            href="/sign-in"
            className="flex items-center justify-center text-secondary text-[14px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            back to login
          </a>
        </div>
      </div>
    </div>
  )
}
