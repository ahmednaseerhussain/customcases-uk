'use client'

import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition, useRef } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { BASE_PRICE, products } from '@/config/products'

const Page = () => {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  // const productIds = searchParams.get('product');
  const selectedProduct = products.find(product => product.id === Number(productId));
  if (!selectedProduct) {
    console.error('Product not found');
    return null;
  }
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false) // State to manage button state
  const cropperRef = useRef<CropperJS>(null)
  const router = useRouter()

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId || 'default'
      startTransition(() => {
        router.push(`/configure/design?id=${configId}&product=${productId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive"
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImageToCrop(reader.result as string) // Show the image in the cropper
    }
    reader.readAsDataURL(acceptedFiles[0])
    setIsDragOver(false)
  }

  const [isPending, startTransition] = useTransition()

  // Function to crop and upload the image
  const cropAndUploadImage = () => {
    if (cropperRef.current) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL()
      setCroppedImage(croppedDataUrl) // Set the cropped image to be uploaded

      if (croppedDataUrl) {
        const blob = dataURLtoBlob(croppedDataUrl)
        const file = new File([blob], "cropped-image.png", { type: "image/png" })

        if (!isUploading) {
          setIsUploading(true) // Set uploading state to true
          setIsButtonDisabled(true) // Disable the button
          startUpload([file], { configId: undefined }).then(() => {
            setImageToCrop(null)
            setCroppedImage(null)
            setIsUploading(false) // Reset uploading state
            setIsButtonDisabled(false) // Enable the button

            toast({
              title: "Upload complete",
              description: "Your cropped image has been uploaded!",
            })
          }).catch((error) => {
            setIsUploading(false) // Reset uploading state on error
            setIsButtonDisabled(false) // Enable the button
            toast({
              title: "Upload failed",
              description: `Something went wrong: ${error.message}`,
              variant: "destructive",
            })
          })
        }
      }
    }
  }

  // Convert Data URL to Blob for upload
  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1])
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-blue-900/25 bg-blue-900/10': isDragOver,
        }
      )}
    >
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        {imageToCrop ? (
          <div className='h-[50%]'>
            <Cropper
              src={imageToCrop}
              style={{ height: 400, width: '100%' }}
              aspectRatio={selectedProduct.frameX}
              guides={false}
              ref={cropperRef}
              viewMode={0}
              dragMode='move'
              scalable={false}
            />
            <button 
              className='bg-red-900 text-white px-4 py-2 rounded mt-4' 
              onClick={cropAndUploadImage}
              disabled={isButtonDisabled} // Disable button based on state
            >
              {isUploading ? (
                <div className='flex items-center'>
                  <Loader2 className='animate-spin h-4 w-4 mr-2' /> Uploading...
                </div>
              ) : (
                'Crop and Upload'
              )}
            </button>
          </div>
        ) : (
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpeg'],
              'image/jpg': ['.jpg'],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className='h-full w-full flex-1 flex flex-col items-center justify-center'
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
                ) : isUploading || isPending ? (
                  <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
                ) : (
                  <Image className='h-6 w-6 text-zinc-500 mb-2' />
                )}
                <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                  {isUploading ? (
                    <div className='flex flex-col items-center'>
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className='mt-2 w-40 h-2 bg-gray-300'
                      />
                    </div>
                  ) : isPending ? (
                    <div className='flex flex-col items-center'>
                      <p>Redirecting, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className='font-semibold'>Drop file</span> to upload
                    </p>
                  ) : (
                    <p>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>

                {isPending ? null : (
                  <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                )}
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  )
}

export default Page
