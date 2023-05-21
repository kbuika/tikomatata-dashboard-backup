import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import GoogleIcon from "../assets/icons/google.png"
import KenyaIcon from "../assets/icons/kenya.png"

const schema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})
type IFormInput = yup.InferType<typeof schema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-auto flex items-start justify-center lg:p-[100px] py-[100px]'>
      <div className='h-auto w-[90%] lg:w-1/3 flex flex-col items-center'>
        <div>
          <h2 className='text-[30px] font-normal text-neutralDark'>Hey, lets get started!</h2>
        </div>
        <div className='w-full mt-[36px]'>
          <div>
            <label className='text-neutralDark'>Full Name</label>
            <input
              id='name'
              type='text'
              required
              className='h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Enter Full Name'
              autoComplete='nope'
              {...register("name", { required: true })}
            ></input>
            {errors.name && <span className='text-criticalRed'>{errors.name?.message}</span>}
          </div>
        </div>
        <div className='w-full mt-[16px]'>
          <div>
            <label className='text-neutralDark'>Phone Number</label>
            <div className='flex items-center'>
              <span className='w-[35%] text-neutralDark lg:w-1/4 bg-white h-[50px] flex items-center justify-center border border-hidden-left border-gray-600'>
                <img src={KenyaIcon} alt='Kenyan Flag' className='mr-2' />
                +254
              </span>
              <input
                id='phone'
                type='text'
                required
                className='w-3/4 h-[50px] bg-white appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
                placeholder='Phone number'
                autoComplete='nope'
                {...register("phone", { required: true })}
              ></input>
              {errors.phone && <span className='text-criticalRed'>{errors.phone?.message}</span>}
            </div>
          </div>
        </div>
        <div className='w-full mt-[16px]'>
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
        <div className='w-full mt-[16px]'>
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
        <div className='w-full flex justify-start mt-[20px]'>
          <div className='relative flex gap-x-3'>
            <div className='flex h-6 items-center'>
              <input
                id='comments'
                name='comments'
                type='checkbox'
                className='h-4 w-4 bg-white rounded border-gray-300 text-indigo-600 focus:ring-indigo-200'
              ></input>
            </div>
            <div className='text-sm leading-6'>
              <label htmlFor='comments' className='font-medium text-gray-900'>
                Agree to terms & conditions
              </label>
            </div>
          </div>
        </div>
        <div className='w-full mt-[20px]'>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            Continue
          </button>
        </div>
        <div className='w-full flex justify-center mt-[16px]'>
          <p className='text-neutralDark'>
            Already have an account?{" "}
            <a href='sign-in' className='text-success'>
              Sign In
            </a>
          </p>
        </div>
        <div className='mt-[20px] mb-[20px] text-neutralDark'>Or</div>
        <div className='w-full flex justify-center'>
          <button className='h-[50px] text-neutralDark w-full border border-neutralDark rounded-sm bg-white flex justify-center items-center focus:border-none focus:outline-none focus:ring-2'>
            <span className='mr-[10px]'>
              <img src={GoogleIcon} height={20} width={20}></img>
            </span>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
