import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .equals([yup.ref("password"), null], "Passwords must match"),
})
type IFormInput = yup.InferType<typeof schema>
export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] py-[100px]'>
      <div className='h-100 w-[85%] lg:w-1/3 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <h2 className='text-[28px] font-normal text-center text-neutralDark'>
            Choose a new Password
          </h2>
          <p className='mt-2 text-neutralDark'>Almost done resetting your password</p>
        </div>
        <div className='w-full mt-[24px]'>
          <div>
            <label className='text-neutralDark'>New password</label>
            <input
              id='password'
              type='password'
              required
              className='h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Enter new password'
              autoComplete='nope'
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <span className='text-criticalRed'>{errors.password?.message}</span>
            )}
          </div>
        </div>
        <div className='w-full mt-[24px]'>
          <div>
            <label className='text-neutralDark'>Confirm new password</label>
            <input
              id='confirmPassword'
              type='password'
              required
              className='h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Confirm new password'
              autoComplete='nope'
              {...register("confirmPassword", { required: true })}
            ></input>
            {errors.confirmPassword && (
              <span className='text-criticalRed'>passwords must match</span>
            )}
          </div>
        </div>
        <div className='w-full mt-[40px]'>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2'
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
      </div>
    </div>
  )
}
