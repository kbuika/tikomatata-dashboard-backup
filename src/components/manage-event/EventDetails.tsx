/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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
import VerticalEventNavBar from "@/src/layouts/VerticalEventNavBar"
import FileUploadModal from "../FileUpload"
import moment from "moment"
import { TimePicker } from "../ui/timePicker"
import { useEffect, useState } from "react"
import { errorToast, successToast } from "@/src/lib/utils"
import { useNavigate, useParams } from "react-router-dom"
import { updateEventFn } from "@/src/apiCalls"
import { EventDataType } from "@/src/types"

const schema = yup.object({
  name: yup.string().required("Event name is required"),
  ageLimit: yup.number().required("Age limit is required"),
  description: yup.string().required("Description is required"),
  poster: yup.object().required("File is required"),
  location: yup.string().required("Location is required"),
  mapsLink: yup.string().notRequired(),
  environment: yup.string().required("Environment is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
})

const EventDetails = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // const params = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventDataType>({ resolver: yupResolver(schema) })

  useEffect(() => {
    // fetchEvents(params.id)
  }, [])

  // const fetchEvents = async (eventId: string | undefined) => {
  // setIsLoading(true)
  // try {
  //   const res = await getEventDetails(eventId)
  //   if (res.status === 200) {
  //     // setEventTickets(res.data)
  //   } else {
  //     // setTicketsError(res.message)
  //     errorToast("Could not fetch this event's tickets. Try again later.")
  //   }
  // } catch (error) {
  //   errorToast("Could not fetch this event's tickets. Try again later.")
  // } finally {
  //   setIsLoading(false)
  // }
  // }
  const onSubmit: SubmitHandler<EventDataType> = async (data) => {
    // setIsLoading(true)
    try {
      const res = await updateEventFn(data)
      if (res.status === 200) {
        successToast("Event has been update successfully!")
        navigate("/events")
      } else {
        // setCreateEventError(res.message)
        errorToast(res?.message)
      }
    } catch (err) {
      // setCreateEventError(err)
    } finally {
      // setIsLoading(false)
    }
  }
  return (
    <>
      <div className="text-neutralDark mt-2">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[18px] font-semibold">event details</h2>
          <CustomButton className=" w-[5em]" onClick={handleSubmit(onSubmit)}>
            Update
          </CustomButton>
        </div>
      </div>
      <VerticalEventNavBar />
      <div className="border rounded-md mt-[3em] p-4 h-auto mb-8">
        <div className="w-full h-auto">
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
                {...register("ageLimit", { required: true })}
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
                id="name"
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
              <FileUploadModal fileChange={(files: FileList | any) => setValue("poster", files)} />
              {errors.poster && <span className="text-criticalRed">{errors.poster?.message}</span>}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <div className="w-[32%]">
              <label htmlFor="name" className="text-neutralDark">
                Event Location
              </label>
              <Input
                id="name"
                placeholder="Event Location"
                type="text"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-criticalRed">{errors.location?.message}</span>
              )}
            </div>
            <div className="w-[32%]">
              <label htmlFor="name" className="text-neutralDark">
                Google Maps Link
              </label>
              <Input
                id="name"
                placeholder="Pin Location"
                type="text"
                {...register("mapLink", { required: false })}
              />
              {errors.mapLink && (
                <span className="text-criticalRed">{errors.mapLink?.message}</span>
              )}
            </div>
            <div className="w-[32%]">
              <label htmlFor="name" className="text-neutralDark">
                Event Environment
              </label>
              <Select name="environment">
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
          <div className="flex flex-row items-center justify-between w-full mt-6">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="startDate" className="text-neutralDark">
                Start Date
              </label>
              <DatePicker
                onChange={(date: Date | undefined) => {
                  const startDate = moment(date).format("YYYY-MM-DD")
                  setValue("startDate", startDate)
                }}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="endDate" className="text-neutralDark">
                End Date
              </label>
              <DatePicker
                onChange={(date: Date | undefined) => {
                  const endDate = moment(date).format("YYYY-MM-DD")
                  setValue("startDate", endDate)
                }}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-1/2 mt-6">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="name" className="text-neutralDark">
                Start Time
              </label>
              <TimePicker time="00:00" setTime={(time) => setValue("startTime", time)} />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="name" className="text-neutralDark">
                End Time
              </label>
              <TimePicker time="00:00" setTime={(time) => setValue("endTime", time)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetails
