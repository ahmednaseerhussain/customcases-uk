// 'use client'

// import HandleComponent from '@/components/HandleComponent'
// import { AspectRatio } from '@/components/ui/aspect-ratio'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { cn, formatPrice } from '@/lib/utils'
// import NextImage from 'next/image'
// import { Rnd } from 'react-rnd'
// import { RadioGroup } from '@headlessui/react'
// import { useRef, useState } from 'react'
// import {
//   COLORS,
//   FINISHES,
//   MATERIALS,
//   MODELS,
//   CASES,
// } from '@/validators/option-validator'
// import { Label } from '@/components/ui/label'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Button } from '@/components/ui/button'
// import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
// import { BASE_PRICE } from '@/config/products'
// import { useUploadThing } from '@/lib/uploadthing'
// import { useToast } from '@/components/ui/use-toast'
// import { useMutation } from '@tanstack/react-query'
// import { saveConfig as _saveConfig, SaveConfigArgs } from './actions'
// import { useRouter } from 'next/navigation'

// interface DesignConfiguratorProps {
//   configId: string
//   imageUrl: string
  
//   imageDimensions: { width: number; height: number }
// }

// const DesignConfigurator = ({
//   configId,
//   imageUrl,
//   imageDimensions,
// }: DesignConfiguratorProps) => {
//   const { toast } = useToast()
//   const router = useRouter()

//   const { mutate: saveConfig, isPending } = useMutation({
//     mutationKey: ['save-config'],
//     mutationFn: async (args: SaveConfigArgs) => {
//       await Promise.all([saveConfiguration(), _saveConfig(args)])
//     },
//     onError: () => {
//       toast({
//         title: 'Something went wrong',
//         description: 'There was an error on our end. Please try again.',
//         variant: 'destructive',
//       })
//     },
//     onSuccess: () => {
//       router.push(`/configure/preview?id=${configId}`)
//     },
//   })

//   const [options, setOptions] = useState<{
//     color: (typeof COLORS)[number]
//     case: (typeof CASES.options)[number]
//     model: (typeof MODELS.options)[number]
//     material: (typeof MATERIALS.options)[number]
//     finish: (typeof FINISHES.options)[number]
//   }>({
//     color: COLORS[0],
//     case: CASES.options[0],
//     model: MODELS.options[0],
//     material: MATERIALS.options[0],
//     finish: FINISHES.options[0],
//   })

//   const [renderedDimension, setRenderedDimension] = useState({
//     width: imageDimensions.width / 4,
//     height: imageDimensions.height / 4,
//   })

//   const [renderedPosition, setRenderedPosition] = useState({
//     x: 150,
//     y: 205,
//   })

//   const phoneCaseRef = useRef<HTMLDivElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const { startUpload } = useUploadThing('imageUploader')

//   async function saveConfiguration() {
//     try {
//       const {
//         left: caseLeft,
//         top: caseTop,
//         width,
//         height,
//       } = phoneCaseRef.current!.getBoundingClientRect()

//       const { left: containerLeft, top: containerTop } =
//         containerRef.current!.getBoundingClientRect()

//       const leftOffset = caseLeft - containerLeft
//       const topOffset = caseTop - containerTop

//       const actualX = renderedPosition.x - leftOffset
//       const actualY = renderedPosition.y - topOffset

//       const canvas = document.createElement('canvas')
//       canvas.width = width
//       canvas.height = height
//       const ctx = canvas.getContext('2d')

//       const userImage = new Image()
//       userImage.crossOrigin = 'anonymous'
//       userImage.src = imageUrl
//       await new Promise((resolve) => (userImage.onload = resolve))

//       ctx?.drawImage(
//         userImage,
//         actualX,
//         actualY,
//         renderedDimension.width,
//         renderedDimension.height
//       )

//       const base64 = canvas.toDataURL()
//       const base64Data = base64.split(',')[1]

//       const blob = base64ToBlob(base64Data, 'image/png')
//       const file = new File([blob], 'filename.png', { type: 'image/png' })

//       await startUpload([file], { configId })
//     } catch (err) {
//       toast({
//         title: 'Something went wrong',
//         description:
//           'There was a problem saving your config, please try again.',
//         variant: 'destructive',
//       })
//     }
//   }

//   function base64ToBlob(base64: string, mimeType: string) {
//     const byteCharacters = atob(base64)
//     const byteNumbers = new Array(byteCharacters.length)
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i)
//     }
//     const byteArray = new Uint8Array(byteNumbers)
//     return new Blob([byteArray], { type: mimeType })
//   }

//   const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedModel = MODELS.options.find(
//       (model) => model.value === event.target.value
//     )
//     if (selectedModel) {
//       setOptions((prev) => ({
//         ...prev,
//         model: selectedModel,
//         case: CASES.options[0], // Reset case to the first case of the new model
//       }));
//     }
//   }
//   const handleCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCase = CASES[options.model.value].find(
//       (phoneCase) => phoneCase.value === event.target.value
//     )
//     if (selectedCase) {
//       setOptions((prev) => ({ ...prev, case: selectedCase }))
//     }
//   }
//   return (
//     <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
//       <div
//         ref={containerRef}
//         className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
//         <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
//           <AspectRatio
//             ref={phoneCaseRef}
//             ratio={896 / 1831}
//             className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
//             <NextImage
//               fill
//               alt='phone image'
//               src={options.model.image}
//               className='pointer-events-none z-50 select-none'
//             />
//             <NextImage
//               fill
//               alt='phone image'
//               src={options.case.image}
//               className='pointer-events-none z-50 select-none'
//             />
//           </AspectRatio>
//           <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
//           <div
//             className={cn(
//               'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
//               `bg-${options.color.tw}`
//             )}
//           />
//         </div>

//         <Rnd
//           default={{
//             x: 150,
//             y: 205,
//             height: imageDimensions.height / 4,
//             width: imageDimensions.width / 4,
//           }}
//           onResizeStop={(_, __, ref, ___, { x, y }) => {
//             setRenderedDimension({
//               height: parseInt(ref.style.height.slice(0, -2)),
//               width: parseInt(ref.style.width.slice(0, -2)),
//             })

//             setRenderedPosition({ x, y })
//           }}
//           onDragStop={(_, data) => {
//             const { x, y } = data
//             setRenderedPosition({ x, y })
//           }}
//           className='absolute z-20 border-[3px] border-primary'
//           lockAspectRatio
//           resizeHandleComponent={{
//             bottomRight: <HandleComponent />,
//             bottomLeft: <HandleComponent />,
//             topRight: <HandleComponent />,
//             topLeft: <HandleComponent />,
//           }}>
//           <div className='relative w-full h-full'>
//             <NextImage
//               src={imageUrl}
//               fill
//               alt='your image'
//               className='pointer-events-none'
//             />
//           </div>
//         </Rnd>
//       </div>

//       <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
//         <ScrollArea className='relative flex-1 overflow-auto'>
//           <div
//             aria-hidden='true'
//             className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
//           />

//           <div className='px-8 pb-12 pt-8'>
//             <h2 className='tracking-tight font-bold text-3xl'>
//               Customize your case
//             </h2>

//             <div className='w-full h-px bg-zinc-200 my-6' />
//             <Label>Model</Label>
//             <select
//               value={options.model.value}
//               onChange={handleModelChange}
//               className='block w-full py-2 mt-1 mb-6 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm'>
//               {MODELS.options.map((model) => (
//                 <option key={model.value} value={model.value}>
//                   {model.label}
//                 </option>
//               ))}
//             </select>

//             <Label>Case</Label>
//             <select
//               value={options.case.value}
//               onChange={handleCaseChange}
//               className='block w-full py-2 mt-1 mb-6 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm'>
//               {CASES[options.model.value].map((phoneCase) => (
//                 <option key={phoneCase.value} value={phoneCase.value}>
//                   {phoneCase.label}
//                 </option>
//               ))}
//             </select>

//             <div className='w-full h-px bg-zinc-200 my-6' />

//             <RadioGroup
//               value={options.color}
//               onChange={(color) =>
//                 setOptions((prev) => ({ ...prev, color }))
//               }
//               className='space-y-4'>
//               {COLORS.map((color) => (
//                 <RadioGroup.Option key={color.name} value={color}>
//                   {({ checked }) => (
//                     <div
//                       className={cn(
//                         checked ? 'ring-primary' : 'ring-transparent',
//                         'relative block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2'
//                       )}>
//                       <RadioGroup.Label as='span' className='block text-lg'>
//                         {color.name}
//                       </RadioGroup.Label>
//                       <div
//                         className={cn(
//                           color.tw,
//                           'w-10 h-10 rounded-full mt-2'
//                         )}
//                       />
//                       {checked && (
//                         <Check className='absolute top-2 right-2 h-6 w-6 text-primary' />
//                       )}
//                     </div>
//                   )}
//                 </RadioGroup.Option>
//               ))}
//             </RadioGroup>

//             <div className='w-full h-px bg-zinc-200 my-6' />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant='outline'
//                   className='w-full justify-between'>
//                   Finish: {options.finish.name}
//                   <ChevronsUpDown className='ml-2 h-5 w-5 shrink-0 opacity-50' />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 {FINISHES.map((finish) => (
//                   <DropdownMenuItem
//                     key={finish.name}
//                     onClick={() =>
//                       setOptions((prev) => ({ ...prev, finish }))
//                     }>
//                     {finish.name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <div className='w-full h-px bg-zinc-200 my-6' />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant='outline'
//                   className='w-full justify-between'>
//                   Material: {options.material.name}
//                   <ChevronsUpDown className='ml-2 h-5 w-5 shrink-0 opacity-50' />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 {MATERIALS.map((material) => (
//                   <DropdownMenuItem
//                     key={material.name}
//                     onClick={() =>
//                       setOptions((prev) => ({ ...prev, material }))
//                     }>
//                     {material.name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </ScrollArea>

//         <div className='sticky bottom-0 w-full bg-white z-10 p-4 flex items-center'>
//           <div className='flex-1'>
//             <p className='text-lg font-medium'>Total</p>
//             <p className='text-2xl font-bold tracking-tight'>
//               {formatPrice(BASE_PRICE)}
//             </p>
//           </div>
//           <Button
//             onClick={() =>
//               saveConfig({
//                 configId,
//                 color: options.color.value,
//                 finish: options.finish.value,
//                 material: options.material.value,
//                 model: options.model.value,
//               })
//             }
//             disabled={isPending}
//             className='h-12 w-48'>
//             {isPending ? 'Saving...' : 'Save'}
//             <ArrowRight className='ml-2 h-5 w-5' />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DesignConfigurator
