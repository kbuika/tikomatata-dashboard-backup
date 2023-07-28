import clsx from "clsx"
import React from "react"

const MainContainer: React.FC<any> = ({ children, className }: any) => {
  return (
    <div
      className={clsx(
        "pl-[270px] max-[980px]:pl-[70px] pt-[35px] pr-[50px] bg-white min-h-screen",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default MainContainer
