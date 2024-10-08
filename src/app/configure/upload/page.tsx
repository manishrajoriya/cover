"use client"
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'

import Dropzone, {FileRejection} from "react-dropzone"

const page = () => {
  const {toast}  = useToast()
    const [isdragOver, setIsDragOver] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const router = useRouter()

    const {startUpload, isUploading} = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            })
        },
        onUploadProgress: (progress) => {
            setUploadProgress(progress)
        }
    })

    const onDropRejected = (rejectedFile: FileRejection[]) => {
      const [file] = rejectedFile
      setIsDragOver(false)
      toast({
        
        title: `File ${file.file.name} is not supported`,
        description: "Please upload a PNG, JPG, or JPEG image file",
        variant: "destructive"
      
      })
    }
    const onDropAccepted = (acceptedFiles: File[]) => {
      startUpload(acceptedFiles, {configId: undefined})
      setIsDragOver(false)
    }

    
    const [isPending, startTransition] = useTransition()



  return (
    <div className={cn("relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",{
        "ring-blue-900/25 bg-blue-900/10":isdragOver
    })}>
        <div className='relative flex flex-col items-center justify-center w-full'>
          <Dropzone onDropAccepted={onDropAccepted} onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg", ".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          >
            {
              ({ getRootProps, getInputProps}) => (
                <div className='flex flex-col items-center justify-center h-full w-full flex-1'{...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                  isdragOver ? <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2'/> 
                  : isUploading || isPending ? <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2'/> : <Image className='h-6 w-6 text-zinc-500 mb-2' />
                }
                <div>
                  {
                    isUploading ? (
                    <div className=' flex flex-col items-center'>
                      <p>Uploading...</p>
                      <Progress className=' mt-2 w-40 h-2 bg-gray-300'/>
                    </div>
                  ) : isPending ? (
                  <div className=' flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                  ) : isdragOver ? (
                  <p>
                    <span className=' font-semibold'>Drop file</span>{" "}
                    to upload
                  </p>
                ) : (
                  <p>
                    <span className=' font-semibold'>Click to upload</span>{" "}
                    or drag and drop your file here
                  </p>
              )
                  }
                </div>
                {
                  isPending ? null : <p className='text-xs text-zinc-500'>PNG, JPEG </p>
                }
                </div>)
            }
          </Dropzone>
        </div>
        
    </div>
  )
}

export default page