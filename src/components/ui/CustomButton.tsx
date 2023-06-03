import clsx from "clsx"

const CustomButton = ({ children, className, ...attributes }: any) => {
  return (
    <button
      className={clsx(
        "bg-mainPrimary p-2 rounded text-neutralDark hover:ring-1 hover:border-mainPrimary hover:bg-white hover:text-mainPrimary duration-100 ease-in-out",
        className,
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default CustomButton
