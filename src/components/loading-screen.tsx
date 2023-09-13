import { Loader2 } from "lucide-react"

const LoadingScreen = () => {
  return (
    <div className="mt-[20px] h-[50vh]">
      <div className="h-full w-auto flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin" color="#3C0862" />
      </div>
    </div>
  )
}

export default LoadingScreen
