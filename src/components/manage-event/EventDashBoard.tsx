// import CustomButton from "../ui/CustomButton"
import CalendarImage from "../../assets/images/calendar.png"

const EventDashBoard = () => {
  return (
    <>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>event Dashboard</h2>
          {/* <CustomButton className='mt-[1em] w-[5em]'>Save</CustomButton> */}
        </div>
      </div>
      <div className='h-auto w-auto flex flex-col items-center mt-[5em]'>
        <div>
          <img src={CalendarImage} alt='calendar' className='h-[20em] w-[30em]' />
        </div>
        <div className='flex flex-col items-center'>
          <h2 className='text-[25px] font-semibold'>Oops! No Data yet</h2>
          <p className='mt-[1em] text-[#6D7175] text-[1.1em]'>
            This section will be updated as soon as you start selling tickets
          </p>
        </div>
      </div>
    </>
  )
}

export default EventDashBoard
