// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950



import { PRODUCT_PRICES, products } from '@/config/products'
import { useSearchParams } from 'next/navigation';
export const useOptionsValidator = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  // Find the selected product from the products array
  const selectedProduct = products.find(product => product.id === Number(productId));

  if (!selectedProduct) {
    console.error('Product not found');
    return { COLORS: [], /* other options */ };
  }

  // Map the COLORS array to include the appropriate image from the selected product
  const COLORS = [
    { label: 'Black', value: 'black', tw: 'zinc-900', image: selectedProduct.colorOptions1 || '/black.png' },
    { label: 'Blue', value: 'blue', tw: 'blue-950', image: selectedProduct.colorOptions2 || '/black.png' },
    { label: 'Rose', value: 'rose', tw: 'rose-950', image: selectedProduct.colorOptions3 || '/rose.png' },
    { label: 'Green', value: 'green', tw: 'green-950', image: selectedProduct.colorOptions4 || '/black.png' },
  ] ;

  // Other options (CASES, MODELS, etc.) can be defined similarly...

  return {
    COLORS,
    // return other options as well...
  };
};
export const CASES = {
  
    iphonex: [
      { 
        label: 'Glitter',
         value: 'glitter_x', 
         image: '/glitter_x.png' 
      },
      { 
        label: 'Solid', 
        value: 'solid_x', 
        image: '/solid_x.png' 
      },
    ],
    iphone11: [      
      { 
        label: 'Solid', 
        value: 'solid_11', 
        image: '/solid_11.png' 
      },
      { 
        label: 'Glitter', 
        value: 'glitter_11', 
        image: '/glitter_11.png' 
      },
    ],
    iphone11pro: [
      
      { 
        label: 'Solid', 
        value: 'solid_11_pro', 
        image: '/solid_11_pro.png' 
      },
      { 
        label: 'Glitter', 
        value: 'glitter_11_pro', 
        image: '/glitter_11_pro.png' 
      },
    ],
    iphone11promax: [
      
      { 
        label: 'Solid',
         value: 'solid_11_pro_max', 
         image: '/solid_11_pro_max.png' 
        },
      { 
        label: 'Glitter', 
        value: 'glitter_11_pro_max', 
        image: '/glitter_11_pro_max.png' 
      },  
      { 
        label: 'White', 
        value: 'white_11_pro_max', 
        image: '/white_11_pro_max.png' },
      { 
        label: 'Multi', 
        value: 'multi_11_pro_max', 
        image: '/multi_11_pro_max.png' },
    ],
    iphone12: [
      { label: 'Case 12-1', value: 'case_12_1', image: '/case_12_1.png' },
      { label: 'Case 12-2', value: 'case_12_2', image: '/case_12_2.png' },
    ],
    iphone13: [
      { label: 'Case 13-1', value: 'case_13_1', image: '/case_13_1.png' },
      { label: 'Case 13-2', value: 'case_13_2', image: '/case_13_2.png' },
    ],
    iphone14: [
      { label: 'Case 14-1', value: 'case_14_1', image: '/case_14_1.png' },
      { label: 'Case 14-2', value: 'case_14_2', image: '/case_14_2.png' },
    ],
    iphone15: [
      { label: 'Case 15-1', value: 'case_15_1', image: '/case_15_1.png' },
      { label: 'Case 15-2', value: 'case_15_2', image: '/case_15_2.png' },
    ],
  
  
} as const




// export const COLORS = [
//   { 
//     label: 'Black', 
//     value: 'black', 
//     tw: 'zinc-900', 
//     image:  '/black.png', 
    
//   },
//   {
//     label: 'Blue',
//     value: 'blue',
//     tw: 'blue-950',
//     image: '/black.png',
    
//   },
//   { 
//     label: 'Rose', 
//     value: 'rose', 
//     tw: 'rose-950', 
//     image: '/rose.png',
    
//   },
//   {
//     label: 'Green',
//     value: 'blue',
//     tw: 'green-950',
//     image: '/black.png',
    
//   },
// ] as const

export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphonex',
      image: '/iphonex.png',
      design: 'solid'
      
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
      image: '/case_1_iphone11.png'
    },
    {
      label: 'iPhone 11 Pro',
      value: 'iphone11pro',
      image: '/case_1_iphone11_pro.png'
    },
    {
      label: 'iPhone 11 Pro Max',
      value: 'iphone11promax',
      image: '/case_1_iphone11_pro.png'
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
      image: '/phone-2.png'
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
      image: '/iphone13.png'
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
      image: '/iphone14.png'
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
      image: '/iphone15.png'
    },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: 'Soft Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant coating',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Smooth Finish',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: 'Textured Finish',
      value: 'textured',
      description: 'Soft grippy texture',
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const
