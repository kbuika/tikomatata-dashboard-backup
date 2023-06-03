import CustomButton from "../ui/CustomButton"

const EventAdmins = () => {
  return (
    <>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>event Admins</h2>
          <CustomButton className=''>Add Admin</CustomButton>
        </div>
      </div>
      <div className='h-auto w-auto flex flex-col items-start mt-[3em]'>
        <div className='flex flex-col items-start'>
          <h2 className='text-[1.2em] font-semibold'>You seem to be the only admin</h2>
          <p className='mt-[1em] text-[#6D7175] text-[1.1em]'>
            Give other people access to your event dashboard
          </p>
          <CustomButton className='mt-4'>Add Admin</CustomButton>
        </div>
      </div>
    </>
  )
}

export default EventAdmins
