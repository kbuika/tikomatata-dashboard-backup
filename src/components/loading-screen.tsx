import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen = ({message}: LoadingScreenProps) => {
  return (
    <div className="mt-[20px] h-[50vh]">
      <div className="h-full w-auto flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin" color="#3C0862" />
        {message && <p className="mt-4 text-[#6D7175] text-[1.1em]">{message}</p>}
      </div>
    </div>
  )
}

export default LoadingScreen
