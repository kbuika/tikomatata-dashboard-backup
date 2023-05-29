/* eslint-disable quotes */
const Button = ({ children, className }: any) => {
  return (
    <button
      className={`bg-primary p-2 rounded text-neutralWhite hover:ring-1 hover:border-primary hover:bg-neutralWhite hover:text-primary duration-100 ease-in-out ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
