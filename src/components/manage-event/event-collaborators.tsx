import EventPagesWrapper from "@/src/layouts/wrappers/event-pages-wrapper"
import CustomButton from "../ui/custom-button"
import Input from "../ui/Input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select"

const EventCollaborators = () => {
  const comingSoon = true
  return (
    <EventPagesWrapper
      right={
        <div className="text-neutralDark">
          <div className="w-full flex flex-row items-center justify-between">
            {/* <Dialog>
            <DialogTrigger asChild>
              <CustomButton className="">Add Collaborator</CustomButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a Collaborator</DialogTitle>
                <DialogDescription>
                  Make sure the email is valid. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input id="name" placeholder="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@email.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 w-[100%]">
                  <label htmlFor="role" className="text-right">
                    Role
                  </label>
                  <Select name="role">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role for user" />
                    </SelectTrigger>
                    <SelectContent className="col-span-3">
                      <SelectGroup>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <CustomButton type="submit">Invite Collaborator</CustomButton>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          </div>
        </div>
      }
    >
      <div className="border rounded-md p-4">
        <div className="h-auto w-auto flex flex-col items-start">
          {comingSoon ? (
            <div className="flex flex-col items-start justify-center">
              <p>Coming Soon</p>
              <p className="text-sm mt-4">
                This will allow you to invite other people to your event dashboard
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <h2 className="text-[1.2em] font-semibold">You seem to be the only one here</h2>
              <p className="mt-[1em] text-[#6D7175] text-[1.1em]">
                Give other people access to your event dashboard
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <CustomButton className="mt-4">Add Collaborator</CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a Collaborator</DialogTitle>
                    <DialogDescription>
                      Make sure the email is valid. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input id="name" placeholder="John Doe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 w-[100%]">
                      <label htmlFor="role" className="text-right">
                        Role
                      </label>
                      <Select name="role">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role for user" />
                        </SelectTrigger>
                        <SelectContent className="col-span-3">
                          <SelectGroup>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <CustomButton type="submit">Invite Collaborator</CustomButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </EventPagesWrapper>
  )
}

export default EventCollaborators
