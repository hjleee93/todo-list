import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Products from '../components/Products';

export type Product = {
  id: number;
  handle: string;
  availableForSale: boolean;
  isNew: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: {
    name: string;
    values: string[];
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
  images: string;
  seo: {
    title: string;
    description: string;
  };
  tags: string[];
};



export async function getProducts() {
  const res = await fetch('http://localhost:4001/products', {
    cache: "force-cache",
  });
  const data: Product[] = await res.json();

  return { data };
}

export default async function ProductPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn:() => getProducts() 
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  )
}