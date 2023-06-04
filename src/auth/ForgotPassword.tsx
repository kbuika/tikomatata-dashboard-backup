import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  email: yup.string().email().required(),
})
type IFormInput = yup.InferType<typeof schema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resetLinkSent, setResetLinkSent] = useState(false)
  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] py-[100px]'>
      <div className='h-auto w-[85%] lg:w-1/3 flex flex-col items-center'>
        {resetLinkSent ? (
          <>
            <div className='flex flex-col items-center'>
              <h2 className='text-[30px] font-normal text-neutralDark'>Check your email</h2>
              <p className='mt-2 text-center text-neutralDark'>
                A reset password link has been sent to [email here]
              </p>
            </div>
            <div className='w-full mt-[40px]'>
              <a
                href='/sign-in'
                className='flex items-center justify-center text-secondary text-[14px]'
              >
                <button className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2'>
                  Back to Login
                </button>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col items-center'>
              <h2 className='text-[30px] font-normal text-neutralDark'>Forgot Password</h2>
              <p className='mt-2 text-center text-neutralDark'>
                Please enter your email to get a reset password code
              </p>
            </div>
            <div className='w-full mt-[30px]'>
              <div>
                <label className='text-neutralDark'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  required
                  className='h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
                  placeholder='Email Address'
                  autoComplete='nope'
                  {...register("email", { required: true })}
                ></input>
                {errors.email && <span className='text-criticalRed'>{errors.email?.message}</span>}
              </div>
            </div>
            <div className='w-full mt-[40px]'>
              <button
                onClick={handleSubmit(onSubmit)}
                className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2'
              >
                Reset Password
              </button>
            </div>
            <div className='w-full flex justify-start mt-[24px]'>
              <a
                href='/sign-in'
                className='flex items-center justify-center text-secondary text-[14px]'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                  />
                </svg>
                back to login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
