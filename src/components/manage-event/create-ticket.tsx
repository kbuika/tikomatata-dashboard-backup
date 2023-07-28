// import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, SubmitHandler } from "react-hook-form"
import moment from "moment"
import Input from "../ui/Input"
import { Button } from "../ui/button"
import { DatePicker } from "../ui/date-picker"
import CustomButton from "../ui/custom-button"
// import { Switch } from "../ui/switch"
import { TicketDataType } from "@/src/types"
import { createTicketFn } from "@/src/apiCalls"
import { checkRegistrationError, errorToast, successToast } from "@/src/lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"
import { TimePicker } from "../ui/time-picker"

const schema = yup.object({
  name: yup.string().required("Ticket name is required"),
  price: yup.string().required("Price is required"),
  quantity: yup.string().required("quantity is required"),
  saleStartDate: yup.string().required("Start date is required"),
  saleEndDate: yup.string().required("End date is required"),
  saleStartTime: yup.string().default("12:00").required("Start time is required"),
  saleEndTime: yup.string().default("12:00").required("End time is required"),
})

type CreateTicketProps = {
  setCreateTicketView: (value: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateTicket: React.FC<CreateTicketProps> = ({ setCreateTicketView }) => {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createTicketError, setCreateTicketError] = useState<any>([])
  const params = useParams()

  // const [groupTicket, setGroupTicket] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TicketDataType>({ resolver: yupResolver(schema) })

  const submit: SubmitHandler<TicketDataType> = async (data) => {
    setIsLoading(true)
    try {
      data = { ...data, eventId: parseInt(params?.id || "") }
      const res = await createTicketFn(data)
      if (res?.data?.status === 200) {
        successToast("Ticket has been created successfully!")
        setCreateTicketView(false)
      } else {
        errorToast(res?.data?.message)
        if (res?.response?.data?.data?.errors) {
          setCreateTicketError(res?.response?.data?.data?.errors)
        }
      }
    } catch (err) {
      setCreateTicketError(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-auto w-full mt-2 mb-6">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="w-full">
          <label htmlFor="name" className="text-neutralDark">
            Ticket Name
          </label>
          <Input
            id="name"
            placeholder="Ticket Name"
            type="text"
            {...register("name", { required: true })}
            className="mt-1"
          />
          {errors.name && <span className="text-criticalRed">{errors.name?.message}</span>}
          {checkRegistrationError("name", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("name", createTicketError)?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="w-[48%]">
          <label htmlFor="quantity" className="text-neutralDark">
            Ticket Quanity
          </label>
          <Input
            id="quantity"
            placeholder="Ticket Quantity"
            type="number"
            {...register("quantity", { required: true })}
            className="mt-1"
          />
          {errors.quantity && <span className="text-criticalRed">{errors.quantity?.message}</span>}
          {checkRegistrationError("quantity", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("quantity", createTicketError)?.message}
            </span>
          )}
        </div>
        <div className="w-[48%]">
          <label htmlFor="price" className="text-neutralDark">
            Ticket Price
          </label>
          <Input
            id="price"
            placeholder="Ticket Price"
            type="number"
            {...register("price", { required: true })}
            className="mt-1"
          />
          {errors.price && <span className="text-criticalRed">{errors.price?.message}</span>}
          {checkRegistrationError("price", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("price", createTicketError)?.message}
            </span>
          )}
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
          <DatePicker
            onChange={(date: Date | undefined) => {
              const startDate = moment(date).format("YYYY-MM-DD")
              setValue("saleStartDate", startDate)
              setCreateTicketError([])
            }}
            className="w-full mt-1"
          />
          {errors.saleStartDate && (
            <span className="text-criticalRed">{errors.saleEndDate?.message}</span>
          )}
          {checkRegistrationError("saleStartDate", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("saleStartDate", createTicketError)?.message}
            </span>
          )}
          {checkRegistrationError("saleStartDate, saleEndDate", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("saleStartDate, saleEndDate", createTicketError)?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale End Date
          </label>
          <DatePicker
            onChange={(date: Date | undefined) => {
              const endDate = moment(date).format("YYYY-MM-DD")
              setValue("saleEndDate", endDate)
              setCreateTicketError([])
            }}
            className="w-full mt-1"
          />
          {errors.saleEndDate && (
            <span className="text-criticalRed">{errors.saleEndDate?.message}</span>
          )}
          {checkRegistrationError("saleEndDate", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("saleEndDate", createTicketError)?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-[50%] mt-6">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale Start Time
          </label>
          <TimePicker time="12:00" setTime={(time) => setValue("saleStartTime", time)} />
          {errors.saleStartTime && (
            <span className="text-criticalRed">{errors.saleStartTime?.message}</span>
          )}
          {checkRegistrationError("saleStartTime", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("saleStartTime", createTicketError)?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale End Time
          </label>
          <TimePicker time="12:00" setTime={(time) => setValue("saleEndTime", time)} />
          {errors.saleEndTime && (
            <span className="text-criticalRed">{errors.saleEndTime?.message}</span>
          )}
          {checkRegistrationError("saleEndTime", createTicketError)?.hasError && (
            <span className="text-criticalRed">
              {checkRegistrationError("saleEndTime", createTicketError)?.message}
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-end">
        <Button onClick={() => setCreateTicketView(false)} variant="ghost" className="mr-4">
          Cancel
        </Button>
        <CustomButton onClick={handleSubmit(submit)} className="w-28">
          {isLoading ? (
            <>
              Creating... <Loader2 className="animate-spin" />
            </>
          ) : (
            "Save"
          )}
        </CustomButton>
      </div>
    </div>
  )
}

export default CreateTicket
