import clsx from "clsx"

const CustomButton = ({ children, className, ...attributes }: any) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center bg-mainPrimary text-white p-2 rounded text-neutralDark hover:ring-none hover:border-neutralPrimary hover:bg-neutralPrimary duration-100 ease-in-out",
        className,
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default CustomButton
