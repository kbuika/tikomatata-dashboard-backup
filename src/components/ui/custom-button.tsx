// import clsx from "clsx"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"


const customButtonVariants = cva(
  "flex items-center justify-center bg-mainPrimary text-white p-2 rounded text-neutralDark hover:ring-none hover:border-neutralPrimary hover:bg-neutralPrimary duration-100 ease-in-out",
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
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const CustomButton = ({ children, className, variant="default", ...attributes }: any) => {
  return (
    <button
      className={cn(customButtonVariants({ variant, className }))}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default CustomButton
