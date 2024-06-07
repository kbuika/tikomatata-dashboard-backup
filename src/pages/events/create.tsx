import React, { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomButton from "../../components/ui/custom-button"
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
import { createEventFn } from "@/src/api-calls"
import { EventRequestType } from "@/src/types"
import { Loader2 } from "lucide-react"
import moment from "moment"
import { createSlug, errorToast, successToast } from "@/src/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/src/components/ui/button"
import FileUploadModal from "@/src/components/file-upload"
import { TimePicker } from "@/src/components/ui/time-picker"
import MainAppWrapper from "@/src/layouts/wrappers/main-app-wrapper"
import { useEventsStore } from "@/src/stores/events-store"
import { DateRangePicker } from "@/src/components/ui/date-range-picker"

const schema = yup.object({
  name: yup.string().required("Event name is required"),
  ageLimit: yup.number().notRequired().default(18),
  description: yup.string().required("Description is required"),
  slug: yup.string().required("Slug is required"),
  poster: yup.mixed().required(),
  location: yup
    .string()
    .required("Location is required")
    .min(3, "location should be longer than 3 characters"),
  mapLink: yup.string().notRequired(),
  environment: yup.string().notRequired().default("Indoor"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  startTime: yup.string().default("12:00").required("Start time is required"),
  endTime: yup.string().default("12:00").required("End time is required"),
})

const CreateEvent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createEventError, setCreateEventError] = useState<any>(null)
  const componentRef = useRef(null)
  // stores
  const resetAllEvents = useEventsStore((state) => state.resetAllEvents)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventRequestType>({
    resolver: yupResolver(schema),
    defaultValues: { slug: "", ageLimit: 18 },
  })
  const eventName = watch("name")
  const startDate = watch("startDate")
  const endDate = watch("endDate")

  const onSubmit: SubmitHandler<EventRequestType> = async (data) => {
    setIsLoading(true)
    try {
      const res = await createEventFn(data)
      if (res.status === 200) {
        successToast("Event has been created successfully!")
        resetAllEvents()
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

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("name", event.target.value)
    setValue("slug", createSlug(event.target.value))
  }

  return (
    <MainAppWrapper
      left={
        <div className="">
          <h2 className="text-[17px] font-semibold text-neutralDark">Create Event</h2>
        </div>
      }
      right={
        <div className="">
          <div className="flex flex-flow items-center">
            <Link to="/events">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <CustomButton
              className="w-auto flex ml-4"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Creating...
                </>
              ) : (
                "Create Event"
              )}
            </CustomButton>
          </div>
        </div>
      }
    >
      <div className="w-full min-h-screen py-[4em] px-4 md:px-0">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">General Information*</h2>
          <p className="text-sm mb-6">Please enter the general information about your event</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="font-medium mb-1" htmlFor="name">
                Event Name*
              </label>
              <Input
                id="name"
                placeholder="Event Name"
                type="text"
                required
                value={eventName}
                onChange={handleEventNameChange}
              />
              {errors.name && <span className="text-criticalRed">{errors.name?.message}</span>}
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1" htmlFor="age">
                Age Limit*
              </label>
              <Input
                id="name"
                placeholder="Age Limit"
                type="number"
                defaultValue={18}
                required
                {...register("ageLimit", { required: false })}
              />
              {errors.ageLimit && (
                <span className="text-criticalRed">{errors.ageLimit?.message}</span>
              )}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium mb-1" htmlFor="description">
                Short Description*
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
            <div className="flex flex-col">
              <label className="font-medium mb-1" htmlFor="slug">
                Event Link*
              </label>
              <p className="text-sm mb-2">This will be the link to your event.</p>
              <div className="flex flex-row">
                <span className="h-[50px] flex items-center bg-neutralPrimary/60 text-white px-2 rounded-l-sm">
                  https://tikomatata.com/events/
                </span>
                <Input
                  id="slug"
                  placeholder="Event Slug"
                  type="text"
                  required
                  className="h-[50px] rounded-r-sm rounded-l-none pl-2 w-auto border border-gray-300"
                  {...register("slug", { required: true })}
                />
              </div>
              {errors.slug && <span className="text-criticalRed">{errors.slug?.message}</span>}
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Location and Dates*</h2>
          <p className="text-sm mb-6">Where will your event be and at what time</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col col-span-1">
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
            <div className="flex flex-col col-span-1" ref={componentRef}>
              <label htmlFor="name" className="text-neutralDark">
                Event Environment
              </label>
              <Select {...register("environment", { required: false })}>
                <SelectTrigger ref={componentRef}>
                  <SelectValue placeholder="Indoor/Outdoor" />
                </SelectTrigger>
                <SelectContent ref={componentRef}>
                  <SelectGroup ref={componentRef}>
                    <SelectItem value="Indoor" ref={componentRef}>
                      Indoor
                    </SelectItem>
                    <SelectItem value="Outdoor" ref={componentRef}>
                      Outdoor
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.environment && (
                <span className="text-criticalRed">{errors.environment?.message}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-neutralDark mb-1">
                Event Start and End date
              </label>
              <DateRangePicker
                onUpdate={(values) => {
                  if (!values?.range?.from || !values?.range?.to)
                    alert("Please make sure you select a start date and end date!")
                  const startDate = moment(values?.range?.from).format("YYYY-MM-DD")
                  const endDate = moment(values?.range?.to).format("YYYY-MM-DD")
                  setValue("startDate", startDate)
                  setValue("endDate", endDate)
                }}
                initialDateFrom={startDate}
                initialDateTo={endDate}
              />
              {errors.endDate && (
                <span className="text-criticalRed">{errors.endDate?.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col col-span-1">
                  <label htmlFor="name" className="text-neutralDark">
                    Start Time
                  </label>
                  <TimePicker time="12:00" setTime={(time) => setValue("startTime", time)} />
                  {errors.startTime && (
                    <span className="text-criticalRed">{errors.startTime?.message}</span>
                  )}
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="name" className="text-neutralDark">
                    End Time
                  </label>
                  <TimePicker time="12:00" setTime={(time) => setValue("endTime", time)} />
                  {errors.endTime && (
                    <span className="text-criticalRed">{errors.endTime?.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Poster*</h2>
          <p className="text-sm mb-6">Upload a poster of dimensions this x this</p>
          <div className="w-full">
            <FileUploadModal fileChange={(files: FileList | any) => setValue("poster", files)} />
            {errors.poster && (
              <span className="text-criticalRed">{String(errors.poster?.message)}</span>
            )}
          </div>
        </div>
      </div>
    </MainAppWrapper>
  )
}

export default CreateEvent
