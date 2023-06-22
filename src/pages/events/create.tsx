import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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

const schema = yup.object({
  name: yup.string().required("Event name is required"),
  ageLimit: yup.number().required("Age limit is required"),
  description: yup.string().required("Description is required"),
  poster: yup.object().required("File is required"),
  location: yup.string().required("Location is required"),
  mapsLink: yup.string().notRequired(),
  environment: yup.string().required("Environment is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
})
type ICreateEventInput = yup.InferType<typeof schema>

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEventInput>({ resolver: yupResolver(schema) })
  const onSubmit: SubmitHandler<ICreateEventInput> = (data) => console.log(data)
  return (
    <MainContainer>
      <div className="text-neutralDark">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-[23px] font-semibold">Event Details</h2>
          <Link to={"/create-event"}>
            <CustomButton className="mt-[1em] w-[5em]" onClick={handleSubmit(onSubmit)}>
              Save
            </CustomButton>
          </Link>
        </div>
      </div>
      <div className="w-full min-h-screen	">
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
            <Input
              id="name"
              placeholder="A brief description of the event"
              type="file"
              className="h-[80px] border border-dashed flex flex-col items-center justify-center text-center"
              {...register("poster", { required: true })}
            />
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
              {...register("mapsLink", { required: false })}
            />
            {errors.mapsLink && (
              <span className="text-criticalRed">{errors.mapsLink?.message}</span>
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
        <div className="flex flex-row items-center justify-between w-full mt-4">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-neutralDark">
              Start Date
            </label>
            <DatePicker name="startDate" />
            {errors.startDate && (
              <span className="text-criticalRed">{errors.startDate?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-neutralDark">
              End Date
            </label>
            <DatePicker name="endDate" />
            {errors.endDate && <span className="text-criticalRed">{errors.endDate?.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              Start Date
            </label>
            <DatePicker name="startDate" />
            {errors.startDate && (
              <span className="text-criticalRed">{errors.startDate?.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-neutralDark">
              End Date
            </label>
            <DatePicker name="endDate" />
            {errors.endDate && <span className="text-criticalRed">{errors.endDate?.message}</span>}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default CreateEvent
