import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import GoogleIcon from "../assets/icons/google.png"
import { GOOGLE_AUTH_URL } from "../constants"

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

type IFormInput = yup.InferType<typeof schema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] pt-[100px]'>
      <div className='h-100 w-[85%] lg:w-1/3 flex flex-col items-center'>
        <div>
          <h2 className='text-[30px] font-normal text-neutralDark'>Hey, Welcome Back</h2>
        </div>
        <div className='w-full mt-[36px] text-neutralDark'>
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
        <div className='w-full mt-[24px]'>
          <div>
            <label className='text-neutralDark'>Password</label>
            <input
              id='password'
              type='password'
              required
              className='h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Enter Password'
              autoComplete='nope'
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <span className='text-criticalRed'>{errors.password?.message}</span>
            )}
          </div>
        </div>
        <div className='w-full flex justify-end mt-[20px]'>
          <a className='text-sm text-secondary' href='/forgot-password'>
            Forgot password?
          </a>
        </div>
        <div className='w-full mt-[20px]'>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-mainPrimary focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            Continue
          </button>
        </div>
        <div className='w-full flex justify-center mt-[24px]'>
          <p className='text-neutralDark'>
            Don&rsquo;t have an account?{" "}
            <a href='/register' className='text-secondary'>
              Sign Up
            </a>
          </p>
        </div>
        <div className='mt-[20px] mb-[20px] text-neutralDark'>Or</div>
        <div className='w-full flex justify-center'>
          <a href={GOOGLE_AUTH_URL} className='w-full'>
            <button className='h-[50px] w-full text-neutralDark border border-neutralDark rounded-sm bg-white flex justify-center items-center focus:border-none focus:outline-none focus:ring-2'>
              <span className='mr-[10px]'>
                <img src={GoogleIcon} height={20} width={20}></img>
              </span>
              Continue with Google
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
