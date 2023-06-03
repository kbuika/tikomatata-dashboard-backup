import { useState } from "react"
import CustomButton from "../ui/CustomButton"
import CreateTicket from "./CreateTicket"

const EventTickets = () => {
  const [createTicketView, setCreateTicketView] = useState(false)
  return (
    <>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>event Tickets</h2>
          <div>
            {createTicketView ? (
              <>
                <CustomButton
                  className='mr-2 bg-neutralWhite'
                  onClick={() => setCreateTicketView(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    alert("save event!")
                    setCreateTicketView(false)
                  }}
                >
                  Save
                </CustomButton>
              </>
            ) : (
              <CustomButton className='' onClick={() => setCreateTicketView(true)}>
                Create Ticket
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      {createTicketView ? (
        <CreateTicket />
      ) : (
        <div className='h-auto w-auto flex flex-col items-start mt-[3em]'>
          <div className='flex flex-col items-start'>
            <h2 className='text-[1.2em] font-semibold'>
              Oops! You have not created any tickets for this event
            </h2>
            <p className='mt-[1em] text-[#6D7175] text-[1.1em]'>
              Create event tickets to start selling
            </p>
            <CustomButton className='mt-4' onClick={() => setCreateTicketView(true)}>
              Create Ticket
            </CustomButton>
          </div>
        </div>
      )}
    </>
  )
}

export default EventTickets
