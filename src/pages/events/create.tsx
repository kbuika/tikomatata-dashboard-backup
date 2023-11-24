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
import { EventDataType } from "@/src/types"
import { Loader2 } from "lucide-react"
import moment from "moment"
import { errorToast, successToast } from "@/src/lib/utils"
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
    watch
  } = useForm<EventDataType>({ resolver: yupResolver(schema) })
  const startDate = watch("startDate")
  const endDate = watch("endDate")

  const onSubmit: SubmitHandler<EventDataType> = async (data) => {
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
            <CustomButton className="w-auto flex w-24 ml-4" onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Creating...
                </>
              ) : (
                "Save"
              )}
            </CustomButton>
          </div>
        </div>
      }
    >
      <div className="w-full min-h-screen py-[4em] px-4 md:px-0">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-full">
            <label htmlFor="name" className="text-neutralDark">
              Event Name
            </label>
            <Input
              id="name"
              placeholder="Event Name"
              type="text"
              required
              {...register("name", { required: true })}
              className="mt-1"
            />
            {errors.name && <span className="text-criticalRed">{errors.name?.message}</span>}
          </div>
          {/* <div className="w-[48%]">
            <label htmlFor="ageLimit" className="text-neutralDark">
              Age Limit
            </label>
            <Input
              id="name"
              placeholder="Age Limit"
              type="number"
              required
              {...register("ageLimit", { required: false })}
              className="mt-1"
            />
            {errors.ageLimit && (
              <span className="text-criticalRed">{errors.ageLimit?.message}</span>
            )}
          </div> */}
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
              className="mt-1"
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
            <FileUploadModal fileChange={(files: FileList | any) => setValue("poster", files)} />
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
              className="mt-1"
            />
            {errors.location && (
              <span className="text-criticalRed">{errors.location?.message}</span>
            )}
          </div>
          <div
            className="w-[32%] flex flex-col max-[620px]:w-full max-[620px]:mt-2"
            ref={componentRef}
          >
            <label htmlFor="name" className="text-neutralDark">
              Event Environment
            </label>
            <Select {...register("environment", { required: false })}>
              <SelectTrigger ref={componentRef} className="mt-1">
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
          <div className="w-[32%] flex flex-col max-[620px]:w-full">
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
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between w-[50%] mt-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              Start Time
            </label>
            <TimePicker time="12:00" setTime={(time) => setValue("startTime", time)} />
            {errors.startTime && (
              <span className="text-criticalRed">{errors.startTime?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              End Time
            </label>
            <TimePicker time="12:00" setTime={(time) => setValue("endTime", time)} />
            {errors.endTime && <span className="text-criticalRed">{errors.endTime?.message}</span>}
          </div>
        </div>
      </div>
    </MainAppWrapper>
  )
}

export default CreateEvent
