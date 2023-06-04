import { useState } from "react"
import MainContainer from "../../components/ui/CustomContainer"
import CustomButton from "../../components/ui/CustomButton"
import CalendarImage from "../../assets/images/calendar.png"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const Events = () => {
  const [events] = useState([
    { name: "Event Name" },
    { name: "Event Name" },
    { name: "Event Name" },
  ])

  return (
    <MainContainer>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Manage your events | Tikomatata</title>
        <link rel='canonical' href='https://tikomatata.com/events' />
      </Helmet>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>My Events</h2>
          <Link to={"/create-event"}>
            <CustomButton className='mt-[1em]'>Create Event</CustomButton>
          </Link>
        </div>
        {events.length > 0 ? (
          <div className='mt-[20px] h-[90vh]'>
            <div className='flex flex-col w-full space-y-4'>
              <Link to='/events/manage/1'>
                <div className='bg-mainPrimary h-[4em] p-2'>Event Name </div>
              </Link>
              <Link to='/events/manage/1'>
                <div className='bg-mainPrimary h-[4em] p-2'>Event Name </div>
              </Link>
              <Link to='/events/manage/1'>
                <div className='bg-mainPrimary h-[4em] p-2'>Event Name </div>
              </Link>
              <Link to='/events/manage/1'>
                <div className='bg-mainPrimary h-[4em] p-2'>Event Name </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className='mt-[20px] h-[90vh]'>
            <div className='h-auto w-auto flex flex-col items-center'>
              <div>
                <img src={CalendarImage} alt='calendar' className='h-[25em] w-[35em]' />
              </div>
              <div className='flex flex-col items-center'>
                <h2 className='text-[25px] font-semibold'>Oops! No event yet</h2>
                <p className='mt-[1em] text-[#6D7175] text-[1.1em]'>
                  Lets get you started by creating an event
                </p>
                <Link to={"/create-event"}>
                  <CustomButton className='mt-[1em]'>Create Event</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainContainer>
  )
}

export default Events
