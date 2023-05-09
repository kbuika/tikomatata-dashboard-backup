import GoogleIcon from "../assets/icons/google.png"

export default function SignIn() {
  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-screen w-screen flex items-start justify-center lg:p-[100px] pt-[100px]'>
      <div className='h-100 w-[85%] lg:w-1/3 flex flex-col items-center'>
        <div>
          <h2 className='text-[30px] font-normal'>Hey, Welcome Back</h2>
        </div>
        <div className='w-full mt-[36px]'>
          <div>
            <label>Email Address</label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Email Address'
              autoComplete='nope'
            ></input>
          </div>
        </div>
        <div className='w-full mt-[24px]'>
          <div>
            <label>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Enter Password'
              autoComplete='nope'
            ></input>
          </div>
        </div>
        <div className='w-full flex justify-end mt-[20px]'>
          <a className='text-sm' href='/forgot-password'>
            Forgot password?
          </a>
        </div>
        <div className='w-full mt-[20px]'>
          <button className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2'>
            Continue
          </button>
        </div>
        <div className='w-full flex justify-center mt-[24px]'>
          <p>
            Don&rsquo;t have an account? <a href='/register'>Sign Up</a>
          </p>
        </div>
        <div className='mt-[20px] mb-[20px]'>Or</div>
        <div className='w-full flex justify-center'>
          <button className='h-[50px] w-full border border-neutralDark rounded-sm bg-white flex justify-center items-center focus:border-none focus:outline-none focus:ring-2'>
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
