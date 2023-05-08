
const Input = ({...props}: {id: string, name:string, type:string, placeholder:string}) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      required
      className='h-[50px] appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-900 focus:border-none focus:outline-none focus:ring-2 focus:z-10 sm:text-sm'
      placeholder={props.placeholder}
      autoComplete='nope'
    ></input>
  )
}

export default Input
