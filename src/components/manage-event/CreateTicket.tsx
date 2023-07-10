// import { useState } from "react"
import Input from "../ui/Input"
import { DatePicker } from "../ui/datePicker"
// import { Switch } from "../ui/switch"

const CreateTicket = () => {
  // const [groupTicket, setGroupTicket] = useState<boolean>(false)
  return (
    <div className="h-auto w-full mt-6 mb-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="w-full">
          <label htmlFor="name" className="text-neutralDark">
            Ticket Name
          </label>
          <Input id="name" name="ticketName" placeholder="Ticket Name" type="text" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="w-[48%]">
          <label htmlFor="quantity" className="text-neutralDark">
            Ticket Quanity
          </label>
          <Input id="name" name="ticketQuantity" placeholder="Ticket Quantity" type="text" />
        </div>
        <div className="w-[48%]">
          <label htmlFor="price" className="text-neutralDark">
            Ticket Price
          </label>
          <Input id="price" name="ticketPrice" placeholder="Ticket Price" type="number" />
        </div>
      </div>
      {/* <div className='flex flex-row items-center justify-between w-full mt-6'>
        <div className='w-[48%] flex flex-col'>
          <label htmlFor='quantity' className='text-neutralDark'>
            Group Ticket
          </label>
          <Switch onChange={() => setGroupTicket(!groupTicket)} />
        </div>
        {groupTicket === true && (
          <div className='w-[48%]'>
            <label htmlFor='price' className='text-neutralDark'>
              Group Size
            </label>
            <Input id='groupSize' name='groupSize' placeholder='Group Size' type='number' />
          </div>
        )}
      </div> */}
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale Start Date
          </label>
          <DatePicker className="w-full" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale End Date
          </label>
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale Start Time
          </label>
          <DatePicker className="w-full" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale End Time
          </label>
          <DatePicker className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default CreateTicket
