import { useSearchParams } from 'next/navigation';
import { products } from '@/config/products';

export const useSelectedProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const selectedProduct = products.find(product => product.id === Number(productId));

  if (!selectedProduct) {
    console.error('Product not found');
    // Handle the case when the product is not found
    // You can throw an error, return null, or handle it as needed
    return null;
  }

  return selectedProduct;
};
