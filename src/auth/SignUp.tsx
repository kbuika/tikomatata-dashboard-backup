import GoogleIcon from "../assets/icons/google.png"
import KenyaIcon from "../assets/icons/kenya.png"

export default function SignUp() {
  return (
    <div className='bg-gradient-to-r from-criticalBg to-successBg h-auto w-screen flex items-start justify-center lg:p-[100px] py-[100px]'>
      <div className='h-auto w-[85%] lg:w-1/3 flex flex-col items-center'>
        <div>
          <h2 className='text-[30px] font-normal'>Hey Organiser, lets get started!</h2>
        </div>
        <div className='w-full mt-[36px]'>
          <div>
            <label>Full Name</label>
            <input
              id='name'
              name='name'
              type='text'
              required
              className='h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
              placeholder='Enter Full Name'
              autoComplete='nope'
            ></input>
          </div>
        </div>
        <div className='w-full mt-[24px]'>
          <div>
            <label>Phone Number</label>
            <div className='flex items-center'>
              <span className='w-1/4 bg-white h-[50px] flex items-center justify-center border border-gray-600'>
                <img src={KenyaIcon} alt='Kenyan Flag' className='mr-2' />
                +254
              </span>
              <input
                id='phone'
                name='phone'
                type='text'
                required
                className='w-3/4 h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
                placeholder='Phone number'
                autoComplete='nope'
              ></input>
            </div>
          </div>
        </div>
        <div className='w-full mt-[24px]'>
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
        <div className='w-full flex justify-start mt-[20px]'>
          <div className='relative flex gap-x-3'>
            <div className='flex h-6 items-center'>
              <input
                id='comments'
                name='comments'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-200'
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
          <button className='h-[50px] group relative w-full flex justify-center items-center py-2 px-4 border border-gray-600 text-sm font-medium rounded-sm text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2'>
            Continue
          </button>
        </div>
        <div className='w-full flex justify-center mt-[24px]'>
          <p>
            Already have an account? <a href='sign-in'>Sign In</a>
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
