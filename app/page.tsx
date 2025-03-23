import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { z } from 'zod';

import { DEFAULT_BRAND_ID } from '@/config/constants';

import { fetchBrand, fetchPopularBrands } from './actions/brand-actions';
import ProductFilterBar from './components/brand-size-menu/product-filter-bar';
import { getQueryClient } from './providers/query-client';

const schema = z.object({
  id: z.string().optional(),
});

export default async function Home({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = schema.parse(await searchParams);
  const queryClient = getQueryClient();

  const brandId = id ?? DEFAULT_BRAND_ID;

  await queryClient.prefetchQuery({
    queryKey: ['brand', brandId],
    queryFn: () => fetchBrand(brandId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['popular-brands'],
    queryFn: () => fetchPopularBrands(),
  });

  return (
    <div>
      <main className="flex flex-col gap-10 items-center mt-[10%] max-w-5xl w-full m-auto">
        <h1 className="text-7xl font-bold p-1 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-800 tracking-tighter">
          Fifty Size
        </h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductFilterBar brandId={brandId} />
        </HydrationBoundary>
      </main>
    </div>
  );
}
