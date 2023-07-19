// import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm, SubmitHandler } from "react-hook-form"
import moment from "moment"
import Input from "../ui/Input"
import { Button } from "../ui/button"
import { DatePicker } from "../ui/datePicker"
import CustomButton from "../ui/CustomButton"
// import { Switch } from "../ui/switch"
import { TicketDataType } from "@/src/types"
import { createTicketFn } from "@/src/apiCalls"
import { errorToast, successToast } from "@/src/lib/utils"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const schema = yup.object({
  name: yup.string().required("Ticket name is required"),
  price: yup.string().required("Price is required"),
  quantity: yup.string().required("quantity is required"),
  saleStartDate: yup.string().required("Start date is required"),
  saleEndDate: yup.string().required("End date is required"),
})

type CreateTicketProps = {
  setCreateTicketView: (value: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateTicket = ({ setCreateTicketView }: CreateTicketProps) => {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createTicketError, setCreateTicketError] = useState<any>(null)

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
      const res = await createTicketFn(data)
      if (res.status === 200) {
        successToast("Ticket has been created successfully!")
        setCreateTicketView(false)
      } else {
        setCreateTicketError(res.message)
        errorToast(res?.message)
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
            }}
            className="w-full mt-1"
          />
          {errors.saleStartDate && (
            <span className="text-criticalRed">{errors.saleEndDate?.message}</span>
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
            }}
            className="w-full mt-1"
          />
          {errors.saleEndDate && (
            <span className="text-criticalRed">{errors.saleEndDate?.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale Start Time
          </label>
          <DatePicker className="w-full mt-1" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="name" className="text-neutralDark">
            Sale End Time
          </label>
          <DatePicker className="w-full mt-1" />
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
