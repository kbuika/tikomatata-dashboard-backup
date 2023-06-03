import CustomButton from "@/src/components/ui/CustomButton"
import MainContainer from "@/src/components/ui/CustomContainer"

const ManageEvent = () => {
  return (
    <MainContainer className='pl-0'>
      <div className='flex min-h-screen'>
        <div className='bg-mainPrimary w-[10em]'>Sidebar </div>
        <div className='w-full'>
          <div className='text-neutralDark'>
            <div className='w-full flex flex-row items-center justify-between'>
              <h2 className='text-[23px] font-semibold'>event name</h2>
              <CustomButton className='mt-[1em] w-[5em]'>Save</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default ManageEvent
