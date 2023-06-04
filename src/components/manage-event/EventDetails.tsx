// import CustomButton from "../ui/CustomButton"
import CustomButton from "../ui/CustomButton"
import Input from "../ui/Input"
import { DatePicker } from "../ui/datePicker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const EventDetails = () => {
  return (
    <>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>event details</h2>
          <CustomButton className='mt-[1em] w-[5em]'>Save</CustomButton>
        </div>
      </div>
      <div className='w-full min-h-screen'>
        <div className='flex flex-row items-center justify-between w-full'>
          <div className='w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Event Name
            </label>
            <Input id='name' name='eventName' placeholder='Event Name' type='text' />
          </div>
          <div className='w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Age Limit
            </label>
            <Input id='name' name='ageLimit' placeholder='Age Limit' type='number' />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-4'>
          <div className='w-full'>
            <label htmlFor='name' className='text-neutralDark'>
              Description
            </label>
            <Textarea id='name' name='ageLimit' placeholder='A brief description of the event' />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-4'>
          <div className='w-full'>
            <label htmlFor='name' className='text-neutralDark'>
              Upload Poster
            </label>
            <Input
              id='name'
              name='ageLimit'
              placeholder='A brief description of the event'
              type='file'
              className='h-[80px] border border-dashed flex flex-col items-center justify-center text-center'
            />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-4'>
          <div className='w-[32%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Event Location
            </label>
            <Input id='name' name='eventName' placeholder='Event Location' type='text' />
          </div>
          <div className='w-[32%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Google Maps Link
            </label>
            <Input id='name' name='eventName' placeholder='Pin Location' type='text' />
          </div>
          <div className='w-[32%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Event Environment
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Indoor/Outdoor' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='indoor'>Indoor</SelectItem>
                  <SelectItem value='outdoor'>Outdoor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-6'>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Start Date
            </label>
            <DatePicker className='w-full' />
          </div>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              End Date
            </label>
            <DatePicker className='w-full' />
          </div>
        </div>
        <div className='flex flex-row items-center justify-between w-full mt-6'>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              Start Time
            </label>
            <DatePicker className='w-full' />
          </div>
          <div className='flex flex-col w-[48%]'>
            <label htmlFor='name' className='text-neutralDark'>
              End Time
            </label>
            <DatePicker className='w-full' />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetails
