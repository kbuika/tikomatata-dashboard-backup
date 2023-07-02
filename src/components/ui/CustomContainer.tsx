import clsx from "clsx"

const MainContainer = ({ children, className }: any) => {
  return (
    <div
      className={clsx("pl-[270px] max-[980px]:pl-[70px] pt-[35px] pr-[50px] bg-white", className)}
    >
      {children}
    </div>
  )
}

export default MainContainer
