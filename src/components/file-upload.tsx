import { FolderOpen, Trash2 } from "lucide-react"
import React, { useState } from "react"

interface FileUploadProps {
  fileChange: (file: FileList | any) => void
  defaultImage?: string
}
// TODO: Add a default image for the file upload
const FileUploadModal: React.FC<FileUploadProps> = ({ fileChange }) => {
  const [files, setFiles] = useState<any[]>([])
  const [message, setMessage] = useState<string>("")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("")
    setFiles([])
    const fileList = e.target.files

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        const fileType = file.type
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"]

        if (validImageTypes.includes(fileType)) {
          setFiles((prevFiles) => [...prevFiles, file])
          fileChange(fileList)
        } else {
          setMessage("Only images are accepted")
        }
      }
    }
  }
  const removeImage = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name))
  }

  return (
    <>
      <div className=" w-full rounded-md">
        <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
          {message}
        </span>
        <div className="h-32 w-full overflow-hidden relative border-2 items-center rounded-md cursor-pointer border-gray-300 border-dotted">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full opacity-0 z-10 absolute cursor-pointer"
            multiple={false}
            name="files[]"
          />
          <div className="h-full w-full absolute z-1 flex justify-center items-center top-0">
            <div className="flex flex-col items-center">
              <i className="text-[30px] text-gray-400 text-center">
                <FolderOpen />
              </i>
              <span className="text-[1em] mt-2 text-gray-600">Drop your poster here or <span className="text-mainPrimary">click to browse</span></span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, key) => {
            return (
              <div key={key} className="w-full h-16 flex items-center rounded p-3 bg-white">
                <div className="flex flex-row items-center gap-2">
                  <div className="h-12 w-12 ">
                    <img className="w-full h-full rounded" src={URL.createObjectURL(file)} />
                  </div>
                  <span className="truncate w-44">{file.name}</span>
                </div>
                <div
                  onClick={() => {
                    removeImage(file.name)
                  }}
                  className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm ml-8"
                >
                  <i className="text-white text-[14px]">
                    <Trash2 size={17} />
                  </i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FileUploadModal
