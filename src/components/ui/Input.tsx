import clsx from "clsx"

const Input = ({ className, ...props }: any) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      required
      className={clsx(
        "h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm",
        className,
      )}
      placeholder={props.placeholder}
      autoComplete='nope'
    ></input>
  )
}

export default Input
