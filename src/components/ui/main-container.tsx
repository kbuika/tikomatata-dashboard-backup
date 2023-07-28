import clsx from "clsx"
import React from "react"

const MainContainer: React.FC<any> = ({ children, className }: any) => {
  return (
    <div
      className={clsx(
        "pl-[270px] max-sidebarLayout:pl-0 pt-[35px] pr-[50px] max-sidebarLayout:pr-0 bg-white min-h-screen",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default MainContainer
