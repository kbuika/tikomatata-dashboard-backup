import { Link } from "react-router-dom"
import MainContainer from "../../components/ui/CustomContainer"
import CustomButton from "../../components/ui/CustomButton"
import Input from "../../components/ui/Input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { DatePicker } from "../../components/ui/datePicker"

const CreateEvent = () => {
  return (
    <MainContainer>
      <div className='text-neutralDark'>
        <div className='w-full flex flex-row items-center justify-between'>
          <h2 className='text-[23px] font-semibold'>Event Details</h2>
          <Link to={"/create-event"}>
            <CustomButton className='mt-[1em] w-[5em]'>Save</CustomButton>
          </Link>
        </div>
      </div>
      <div className='w-full min-h-screen	'>
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
        <div className='flex flex-row items-center justify-between w-full mt-4'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-neutralDark'>
              Start Date
            </label>
            <DatePicker />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-neutralDark'>
              End Date
            </label>
            <DatePicker />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-neutralDark'>
              Start Date
            </label>
            <DatePicker />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-neutralDark'>
              Start Date
            </label>
            <DatePicker />
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default CreateEvent
