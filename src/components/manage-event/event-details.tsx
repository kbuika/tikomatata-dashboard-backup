/* eslint-disable @typescript-eslint/no-unused-vars */
import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CustomButton from "../ui/custom-button"
import Input from "../ui/Input"
import { DatePicker } from "../ui/date-picker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Textarea } from "../ui/textarea"
import VerticalEventNavBar from "@/src/layouts/horizontal-event-navbar"
import FileUploadModal from "../file-upload"
import moment from "moment"
import { TimePicker } from "../ui/time-picker"
import { useEffect, useRef, useState } from "react"
import { errorToast, successToast } from "@/src/lib/utils"
import { useNavigate, useParams } from "react-router-dom"
import { deactivateEventFn, updateEventFn } from "@/src/api-calls"
import { EventDataType, EventDataTypeExtended } from "@/src/types"
import { useEventsStore } from "@/src/stores/events-store"
import { AlertTriangle, Delete, Loader2, Trash } from "lucide-react"
import { StopIcon } from "@heroicons/react/solid"
import { DateRangePicker } from "../ui/date-range-picker"

const schema = yup.object({
  name: yup.string().required("Event name is required"),
  ageLimit: yup.number().required("Age limit is required"),
  description: yup.string().required("Description is required"),
  poster: yup.mixed().required(),
  location: yup.string().required("Location is required"),
  mapLink: yup.string().notRequired(),
  environment: yup.string().notRequired(),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
})
// TODO: Clean up and make sure errors are handled properly and conditional rendering is done properly
const EventDetails = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [updateEventError, setUpdateEventError] = useState<any>(null)
  const [deactivateEventError, setDeactivateEventError] = useState<any>(null)
  const [changePosterView, setChangePosterView] = useState(false)
  const selectedEvent = useEventsStore((state) => state.selectedEvent)
  const setSelectedEvent = useEventsStore((state) => state.setSelectedEvent)
  const resetAllEvents = useEventsStore((state) => state.resetAllEvents)
  const navigate = useNavigate()
  const componentRef = useRef(null)
  const params = useParams()

  useEffect(() => {
    if (selectedEvent) {
      console.log(selectedEvent)
      setValue("name", selectedEvent.name)
      setValue("ageLimit", selectedEvent?.ageLimit)
      setValue("description", selectedEvent?.description)
      setValue("location", selectedEvent?.location)
      setValue("mapLink", selectedEvent?.mapLink || "")
      setValue("environment", selectedEvent?.environment || "Outdoor")
      setValue("startDate", selectedEvent?.startDate)
      setValue("endDate", selectedEvent?.endDate)
      setValue("startTime", selectedEvent?.startTime)
      setValue("endTime", selectedEvent?.endTime)
    }
  }, [selectedEvent])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    // resolver: yupResolver(schema),
    defaultValues: selectedEvent,
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true)
    try {
      const res = await updateEventFn(data)
      if (res.status === 200) {
        resetAllEvents()
        setSelectedEvent(res?.data?.data)
        successToast("Event has been updated successfully!")
      } else {
        setUpdateEventError(res.message)
        errorToast(res?.message)
      }
    } catch (err) {
      errorToast(err)
      setUpdateEventError(err)
    } finally {
      setIsLoading(false)
    }
  }

  // const deactivateEvent = async () => {
  //   setIsDeactivating(true)
  //   try {
  //     const res = await deactivateEventFn(params?.id)
  //     if (res.status === 200) {
  //       resetAllEvents()
  //       successToast("Event has been deactivated successfully!")
  //       navigate("/events")
  //     } else {
  //       setDeactivateEventError(res.message)
  //       errorToast(res?.message)
  //     }
  //   } catch (err) {
  //     errorToast(err)
  //     setDeactivateEventError(err)
  //   } finally {
  //     setIsDeactivating(false)
  //   }
  // }
  return (
    <EventPagesWrapper
      right={
        <div className="text-neutralDark">
          <div className="w-full flex flex-row-reverse items-center justify-between">
            <CustomButton className="w-auto ml-4" onClick={handleSubmit(onSubmit)}>
              {isLoading ? (
                <>
                  Updating... <Loader2 className="animate-spin" />
                </>
              ) : (
                "Update"
              )}
            </CustomButton>
            <div>
              {/* <Dialog>
                <DialogTrigger>
                  <CustomButton variant={"secondary"} className="bg-gray-200 text-mainPrimary dark:bg-gray-200 dark:text-mainPrimary">
                    <>
                      <Trash color="black" size={18} className="mr-2" />
                      Deactivate
                    </>
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="flex flex-row items-center">
                      <AlertTriangle color="red" className="mr-2" /> Deactivate Event?
                    </DialogTitle>
                    <DialogDescription className="mt-4">
                      <p className="mt-4 text-base text-left">
                        Are you sure you want to deactivate this event?
                      </p>
                      <p className="mt-2 text-sm text-left">
                        Once you deactivate, ticket sales will be stopped and the event will be
                        removed from the storefront.
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row items-center justify-end">
                    <DialogClose className="mr-4">Cancel</DialogClose>

                    <CustomButton
                      className="w-auto bg-criticalRed hover:bg-criticalRed"
                      onClick={deactivateEvent}
                    >
                      {isDeactivating ? (
                        <>
                          Deactivating... <Loader2 className="animate-spin" />
                        </>
                      ) : (
                        "Deactivate"
                      )}
                    </CustomButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
            </div>
          </div>
        </div>
      }
    >
      <div className="border rounded-md p-4 h-auto mb-8">
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
                defaultValue={selectedEvent?.name}
                {...register("name", { required: true })}
              />
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
                defaultValue={selectedEvent?.ageLimit}
                {...register("ageLimit", { required: false })}
              />
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
                defaultValue={selectedEvent?.description}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <div className="w-full">
              <label htmlFor="name" className="text-neutralDark">
                Event Poster{" "}
                <button
                  className="text-mainPrimary underline underline-offset-2"
                  onClick={() => setChangePosterView(!changePosterView)}
                >
                  change poster
                </button>
              </label>
              {selectedEvent?.posterUrl && !changePosterView ? (
                <div className="w-full h-[20em] bg-neutralWhite">
                  <img
                    src={selectedEvent?.posterUrl}
                    alt="poster"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <>
                  <FileUploadModal
                    fileChange={(files: FileList | any) => {
                      setValue("poster", files)
                    }}
                    defaultImage={selectedEvent?.posterUrl}
                  />
                </>
              )}
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
                defaultValue={selectedEvent?.location}
                {...register("location", { required: true })}
              />
            </div>
            <div className="w-[25%]">
              <label htmlFor="name" className="text-neutralDark">
                Event Environment
              </label>
              <Select {...register("environment", { required: false })} defaultValue={"indoor"}>
                <SelectTrigger ref={componentRef}>
                  <SelectValue
                    placeholder="Indoor/Outdoor"
                    defaultValue={selectedEvent?.environment}
                  />
                </SelectTrigger>
                <SelectContent ref={componentRef}>
                  <SelectGroup ref={componentRef}>
                    <SelectItem value="indoor" ref={componentRef}>
                      Indoor
                    </SelectItem>
                    <SelectItem value="outdoor" ref={componentRef}>
                      Outdoor
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[41%] flex flex-col">
              <label htmlFor="name" className="text-neutralDark">
                Google Maps Link
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
                initialDateFrom={selectedEvent?.startDate}
                initialDateTo={selectedEvent?.endDate}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-1/2 mt-6">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="name" className="text-neutralDark">
                Start Time
              </label>
              <TimePicker
                time={selectedEvent?.startTime || "00:00"}
                setTime={(time) => setValue("startTime", time)}
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="name" className="text-neutralDark">
                End Time
              </label>
              <TimePicker
                time={selectedEvent?.endTime || "00:00"}
                setTime={(time) => setValue("endTime", time)}
              />
            </div>
          </div>
        </div>
      </div>
    </EventPagesWrapper>
  )
}

export default EventDetails
