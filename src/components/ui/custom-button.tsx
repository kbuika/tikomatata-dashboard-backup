// import clsx from "clsx"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"


const customButtonVariants = cva(
  "flex items-center justify-center bg-mainPrimary text-white p-2 rounded cursor-pointer text-neutralDark hover:ring-none hover:border-neutralPrimary hover:bg-neutralPrimary duration-100 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-mainPrimary text-primary-foreground hover:bg-neutralPrimary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
      isLoading: {
        true: "bg-mainPrimary/75",
        false: "bg-mainPrimary"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const CustomButton = ({ children, className, variant="default", isLoading="false", ...attributes }: any) => {
  return (
    <div
      className={cn(customButtonVariants({ variant, className, isLoading }))}
      {...attributes}
    >
      {isLoading == "true" && <Loader2 className="animate-spin mr-2" />}{children}
    </div>
  )
}

export default CustomButton
