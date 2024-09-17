'use client'

import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatPrice } from '@/lib/utils'
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react'
import {
  CASES,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/option-validator'
import { useOptionsValidator } from '@/validators/option-validator'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { BASE_PRICE, products } from '@/config/products'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions'
import { useRouter, useSearchParams } from 'next/navigation'
// import { CaseColor, CaseDesign } from '@prisma/client'
import { string } from 'zod'

interface CaseOption {
  label: string;
  image: string;
}



interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  text1: string
  text2: string

  imageDimensions: { width: number; height: number }
}
type PhoneModel = keyof typeof CASES
const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,

}: DesignConfiguratorProps) => {

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)])
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {

      router.push(`/configure/preview?id=${configId}&product=${productId}`)
    },
  })
  const { toast } = useToast()
  const router = useRouter()
  const { COLORS } = useOptionsValidator()
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const selectedProduct = products.find(product => product.id === Number(productId));
  if (!selectedProduct) {
    console.error('Product not found');
    return null;
  }
  

  
  const [isFrameAdded, setIsFrameAdded] = useState(selectedProduct?.isFrame || false);
  const [isTextAdded, setIsTextAdded] = useState(selectedProduct?.isText || false);
  const [isRndAdded, setIsRndAdded] = useState(selectedProduct?.isRnd || false);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const [options, setOptions] = useState<{
    caseImg: (typeof CASES[PhoneModel])[number];
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
    case: CaseOption;
    
    
  }>({
    color: COLORS[0], // Default color
    caseImg: CASES[MODELS.options[0].value as PhoneModel][1],
    case: CASES[MODELS.options[0].value as PhoneModel][0],
    model: MODELS.options[1],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
       
    

  });

  useEffect(() => {
    if (productId !== null) {
      const index = parseInt(productId, 10);
      const validColor = COLORS[0]; // Default to first color if index is invalid
      const model = MODELS.options[1]; // Default model
      const material = MATERIALS.options[0]; // Default material
      const finish = FINISHES.options[0]; // Default finish
      const caseImg = CASES[model.value as PhoneModel][0];

      setOptions({
        color: validColor,
        caseImg,
        case: caseImg,
        model,
        material,
        finish,
        
      });
    }
  }, [productId]);
  console.log(productId)


  const [cases, setCases] = useState(CASES[MODELS.options[0].value as PhoneModel])

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 8,
    height: imageDimensions.height / 8,
  })

  const [renderedPosition, setRenderedPosition] = useState({
    x: 120,
    y: 208,
  })

  const phoneCaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing('imageUploader')

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect()



      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop

      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      )

      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]

      const blob = base64ToBlob(base64Data, 'image/png')
      const file = new File([blob], 'filename.png', { type: 'image/png' })

      await startUpload([file], { configId })
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description:
          'There was a problem saving your config, please try again.',
        variant: 'destructive',
      })
    }
  }




  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }
  const handleModelChange = (model: { readonly label: "iPhone X"; readonly value: "iphonex"; readonly image: "/iphonex.png"; readonly design: "solid" } | { readonly label: "iPhone 11"; readonly value: "iphone11"; readonly image: "/case_1_iphone11.png" } | { readonly label: "iPhone 11 Pro"; readonly value: "iphone11pro"; readonly image: "/case_1_iphone11_pro.png" } | { readonly label: "iPhone 11 Pro Max"; readonly value: "iphone11promax"; readonly image: "/case_1_iphone11_pro.png" } | { readonly label: "iPhone 12"; readonly value: "iphone12"; readonly image: "/phone-2.png" } | { readonly label: "iPhone 13"; readonly value: "iphone13"; readonly image: "/iphone13.png" } | { readonly label: "iPhone 14"; readonly value: "iphone14"; readonly image: "/iphone14.png" } | { readonly label: "iPhone 15"; readonly value: "iphone15"; readonly image: "/iphone15.png" }) => {
    setOptions((prev) => ({
      ...prev,
      model,
      caseImg: CASES[model.value as PhoneModel][0], // Set first case of the selected model
    }))
    setCases(CASES[model.value as PhoneModel]) // Update cases based on selected model
  }
 
  

  const handleFrameSelection = (selection: boolean) => {
    setIsFrameAdded(selection);
  };

  const savedImg = useRef(null);

  const saveDivAsImage = async () => {
    if (savedImg.current) {
      const canvas = await html2canvas(savedImg.current);
      const dataURL = canvas.toDataURL('image/png');
      localStorage.setItem('divImage', dataURL);
    }
  }; 
  // const updatedColors = COLORS.map(color => ({
  //   ...color,
  //   image: selectedProduct[`colorOptions${color.image}`] || color.image,
  // }));
  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
      <div

        ref={containerRef}
        className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        <div ref={savedImg} className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className='pointer-events-none relative z-[49] aspect-[896/1831] w-full'>

            <NextImage
              fill
              alt='phone image'
              src={options.caseImg.image}
              className='pointer-events-none z-[49] select-none'
            />
            <div className={`w-full h-full overflow-hidden relative`}>
              <NextImage
                src={imageUrl}
                width={selectedProduct.setImageWidth}  // Adjust based on frame presence
                height={selectedProduct.setImageHeight} // Adjust based on frame presence
                alt='your image'
                
                className={` pointer-events-none absolute  object-cover inset-10  opacity-93 ${selectedProduct.rounded} ${selectedProduct.top} ${selectedProduct.left}`}
              />
              <NextImage
              src={selectedProduct.assetimage}
              height={selectedProduct.assetimageHeight}
              width={selectedProduct.assetimageWidth}
              
              alt=''
              className ={`pointer-events-none object-cover absolute inset-0 ${selectedProduct.assetimagePosition} z-[50]`}
            />
            </div>
          </AspectRatio>
          <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div
            className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
            )}
          >

            <NextImage
              src={options.color.image}
              fill
              alt='your image'
              className='pointer-events-none rounded-[35px]'
            />

            {isTextAdded && (
              <div>
                <input
                  type="text"
                  placeholder={selectedProduct.placeholderText1}
                  value={inputValue}
                  className={` 
                    ${selectedProduct.fontname} 
                    absolute 
                    break-words 
                    mx-auto w-[120px] 
                    inset-x-0 z-50 
                    ${selectedProduct.text1Position} 
                    font-bold 
                    mx-auto  
                    tracking-tighter 
                    border-none
                    bg-transparent 
                    whitespace-normal 
                    ${selectedProduct.text1Color} 
                    outline-none
                    `}
                  style={{ fontSize: selectedProduct.font1Size, zIndex: 50 }}


                />
                <input
                  type="text"
                  placeholder={selectedProduct.placeholderText2}
                  value={inputValue2}
                  className={`${selectedProduct.fontname2} absolute inset-x-0 z-50 ${selectedProduct.text2Position} ${selectedProduct.text2PositionLeft} mx-auto w-2/3 tracking-tighter border-none text-center bg-transparent ${selectedProduct.text2Color} outline-none`}
                  style={{ fontSize: selectedProduct.font2Size, zIndex: 50 }}


                />
              </div>
            )}
            

          </div>

        </div>
        {isRndAdded && (
          <Rnd
        
          default={{
            x: 0,
            y: 0,
            height: imageDimensions.height/6,
            width: imageDimensions.width/6,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className='absolute z-20 border-[1px] aspect-[896/1831]'
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div ref={savedImg} className={`relative w-full h-full overflow-hidden ${selectedProduct.rounded} aspect-[896/1831] `}>
            
              <NextImage
                src={imageUrl}
                width={imageDimensions.width}  // Adjust based on frame presence
                height={imageDimensions.height} // Adjust based on frame presence
                alt='your image'
                className={` pointer-events-none absolute inset-0 object-cover `}
              />
              {isFrameAdded && (
                <div
                  className="pointer-events-none h-full absolute inset-0 border-solid border-t-[6px] border-l-[6px] border-r-[6px] border-b-[45px] border-[#fcf7e8] shadow-[10px_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-visible"
                  style={{ boxShadow: '20px 20px 50px rgba(0, 0, 0, 1)', zIndex: 1000 }}
                >
                  <input
                    type="text"
                    placeholder="Enter text here"
                    value={inputValue}
                    className={`${selectedProduct.fontname} absolute inset-x-0 -bottom-8 mx-auto w-2/3 border-none text-center bg-transparent text-black outline-none`}
                    style={{ fontSize: '28px', zIndex: 50, }}


                  />
                  <input
                    type="text"
                    placeholder="Enter text here"
                    value={inputValue2}
                    className={`${selectedProduct.fontname2} absolute inset-x-0 -bottom-10 left-10 mx-auto w-2/3 border-none text-right bg-transparent text-black outline-none`}
                    style={{ fontSize: '10px', zIndex: 50, }}
                  />
                </div>

              )}
            
          </div>
        </Rnd>
        )}
        


      </div>

      <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
        <ScrollArea className='relative flex-1 overflow-auto'>
          <div
            aria-hidden='true'
            className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
          />

          <div className='px-8 pb-12 pt-8'>
            <h2 className='tracking-tight font-bold text-3xl'>
              Customize your case
            </h2>
            <button onClick={saveDivAsImage}>Save as Image</button>
            <div className='w-full h-px bg-zinc-200 my-6' />

            <div className='relative mt-4 h-full flex flex-col justify-between'>
              <div className='flex flex-col gap-6'>
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }))
                  }}>
                  <Label>Design: {options.color.label}</Label>
                  <div className='mt-3 flex items-center space-x-3'>
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }>
                        <span
                          style={{
                            backgroundImage: `url(${color.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          className='h-8 w-8 rounded-full border border-black border-opacity-10'
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                {isFrameAdded && (
                  <div>
                  <Label>Add Frame</Label>
                  <RadioGroup value={isFrameAdded} onChange={handleFrameSelection}>
                    <div className="mt-3 flex items-center space-x-3">
                      <RadioGroup.Option value={true} className={({ active, checked }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5', { 'ring-2 ring-offset-2 ring-primary': active || checked })}>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center border border-black border-opacity-10">Yes</span>
                      </RadioGroup.Option>
                      <RadioGroup.Option value={false} className={({ active, checked }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5', { 'ring-2 ring-offset-2 ring-primary': active || checked })}>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center border border-black border-opacity-10">No</span>
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>
                  </div>
                )}
                  
                  {isFrameAdded && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter text here"
                        className="w-40 border border-gray-400 text-center  bg-white text-black outline-none p-2 rounded-md"
                        style={{ fontSize: '14px' }}
                        minLength={6}
                        maxLength={12}
                      />
                      <input
                        type="text"
                        value={inputValue2}
                        onChange={(a) => setInputValue2(a.target.value)}
                        placeholder="Enter Date here"
                        className="w-40 border border-gray-400 text-center bg-white text-black outline-none p-2 mt-2 rounded-md"
                        style={{ fontSize: '14px' }}

                      />


                    </div>

                  )} 
                  {isTextAdded && (
                    <div className='mt-2'>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter text here"
                        className="w-40 border border-gray-400 text-center  bg-white text-black outline-none p-2 rounded-md"
                        style={{ fontSize: '14px' }}
                        minLength={6}
                        maxLength={20}
                        // onSubmit={inputValue}
                      />
                      <input
                        type="text"
                        value={inputValue2}
                        onChange={(a) => setInputValue2(a.target.value)}
                        placeholder="Enter text here"
                        className="w-40 border border-gray-400 text-center  bg-white text-black outline-none p-2 mt-2 rounded-md"
                        style={{ fontSize: '14px' }}
                        minLength={6}
                        maxLength={12}
                        // onSubmit={inputValue2}
                      />
                    </div>
                  )}

                </div>


                <div className='relative flex flex-col gap-3 w-full'>
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-full justify-between'>
                        {options.model.label}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                            {
                              'bg-zinc-100':
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => handleModelChange(model)}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              model.label === options.model.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className='relative flex flex-col gap-3 w-full'>
                  <Label>Case</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-full justify-between'>
                        {options.caseImg.label}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {cases.map((caseOption) => (
                        <DropdownMenuItem
                          key={caseOption.label}
                          className={cn(
                            'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                            {
                              'bg-zinc-100': caseOption.label === options.caseImg.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, caseImg: caseOption }))
                          }}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              caseOption.label === options.caseImg.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {caseOption.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>


                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }))
                      }}>
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className='mt-3 space-y-4'>
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                                {
                                  'border-primary': active || checked,
                                }
                              )
                            }>
                            <span className='flex items-center'>
                              <span className='flex flex-col text-sm'>
                                <RadioGroup.Label
                                  className='font-medium text-gray-900'
                                  as='span'>
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <RadioGroup.Description
                                    as='span'
                                    className='text-gray-500'>
                                    <span className='block sm:inline'>
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>

                            <RadioGroup.Description
                              as='span'
                              className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                              <span className='font-medium text-gray-900'>
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>

        </ScrollArea>


        <div className='w-full px-8 h-16 bg-white'>
          <div className='h-px w-full bg-zinc-200' />
          <div className='w-full h-full flex justify-end items-center'>
            <div className='w-full flex gap-6 items-center'>
              <p className='font-medium whitespace-nowrap'>
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                  100
                )}
              </p>

              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.image ,
                    caseImg: options.caseImg.image ,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                    text1: inputValue, 
                    text2: inputValue2,
                  })
                }
                size='sm'
                className='w-full'>
                Continue
                <ArrowRight className='h-4 w-4 ml-1.5 inline' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator