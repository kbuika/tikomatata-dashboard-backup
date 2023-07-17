import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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
import { createEventFn } from "@/src/apiCalls"
import { EventDataType } from "@/src/types"
import { Loader2 } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { errorToast, successToast } from "@/src/lib/utils"
import { useNavigate } from "react-router-dom"

const schema = yup.object({
  name: yup.string().required("Event name is required"),
  ageLimit: yup.number().notRequired(),
  description: yup.string().required("Description is required"),
  poster: yup.mixed().required(),
  location: yup.string().required("Location is required"),
  mapLink: yup.string().notRequired(),
  environment: yup.string().notRequired(),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
})

const CreateEvent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createEventError, setCreateEventError] = useState<any>(null)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventDataType>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<EventDataType> = async (data) => {
    setIsLoading(true)
    try {
      const res = await createEventFn(data)
      if (res.status === 200) {
        successToast("Event has been created successfully!")
        navigate("/events")
      } else {
        setCreateEventError(res.message)
        errorToast(res?.message)
      }
    } catch (err) {
      setCreateEventError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainContainer>
      <div className="text-neutralDark">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[23px] font-semibold">Create Event</h2>
          <CustomButton className="mt-[1em] w-auto flex" onClick={handleSubmit(onSubmit)}>
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
      <div className="w-full min-h-screen">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-[48%]">
            <label htmlFor="name" className="text-neutralDark">
              Event Name
            </label>
            <Input
              id="name"
              placeholder="Event Name"
              type="text"
              required
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-criticalRed">{errors.name?.message}</span>}
          </div>
          <div className="w-[48%]">
            <label htmlFor="ageLimit" className="text-neutralDark">
              Age Limit
            </label>
            <Input
              id="name"
              placeholder="Age Limit"
              type="number"
              required
              {...register("ageLimit", { required: false })}
            />
            {errors.ageLimit && (
              <span className="text-criticalRed">{errors.ageLimit?.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-4">
          <div className="w-full">
            <label htmlFor="name" className="text-neutralDark">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="A brief description of the event"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-criticalRed">{errors.description?.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-4">
          <div className="w-full">
            <label htmlFor="name" className="text-neutralDark">
              Upload Poster
            </label>
            <Input
              id="name"
              placeholder="A brief description of the event"
              type="file"
              className="h-[80px] border border-dashed flex flex-col items-center justify-center text-center"
              {...register("poster", { required: false })}
            />
            {errors.poster && <span className="text-criticalRed">{errors.poster?.message}</span>}
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between w-full mt-4 max-[620px]:flex-col">
          <div className="w-[32%] flex flex-col max-[620px]:w-full">
            <label htmlFor="name" className="text-neutralDark">
              Event Location
            </label>
            <Input
              id="location"
              placeholder="Event Location"
              type="text"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <span className="text-criticalRed">{errors.location?.message}</span>
            )}
          </div>
          <div className="w-[32%] flex flex-col max-[620px]:w-full max-[620px]:mt-2">
            <label htmlFor="name" className="text-neutralDark">
              Google Maps Link
            </label>
            <Input
              id="mapLink"
              placeholder="Pin Location"
              type="text"
              {...register("mapLink", { required: false })}
            />
            {errors.mapLink && <span className="text-criticalRed">{errors.mapLink?.message}</span>}
          </div>
          <div className="w-[32%] flex flex-col max-[620px]:w-full max-[620px]:mt-2">
            <label htmlFor="name" className="text-neutralDark">
              Event Environment
            </label>
            <Select {...register("environment", { required: false })}>
              <SelectTrigger>
                <SelectValue placeholder="Indoor/Outdoor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.environment && (
              <span className="text-criticalRed">{errors.environment?.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between w-full mt-4">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-neutralDark">
              Start Date
            </label>
            <DatePicker
              onChange={(date: Date | undefined) => {
                const startDate = moment(date).format("YYYY-MM-DD")
                setValue("startDate", startDate)
              }}
            />
            {errors.startDate && (
              <span className="text-criticalRed">{errors.startDate?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-neutralDark">
              End Date
            </label>
            <DatePicker
              onChange={(date: Date | undefined) => {
                const endDate = moment(date).format("YYYY-MM-DD")
                setValue("endDate", endDate)
              }}
            />
            {errors.endDate && <span className="text-criticalRed">{errors.endDate?.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              Start Time
            </label>
            {/* <DatePicker name="startDate" /> */}
            {/* {errors.startDate && (
              <span className="text-criticalRed">{errors.startDate?.message}</span>
            )} */}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              End Time
            </label>
            {/* <DatePicker name="endDate" /> */}
            {/* {errors.endDate && <span className="text-criticalRed">{errors.endDate?.message}</span>} */}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default CreateEvent
