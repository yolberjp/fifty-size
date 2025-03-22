import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchBrand, fetchBrands } from './components/brand-size-menu/brand-selector/actions';
import BrandSizeMenu from './components/brand-size-menu/brand-size-menu';
import { getQueryClient } from './providers/query-client';

export default function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: () => fetchBrands(),
  });

  queryClient.prefetchQuery({
    queryKey: ['brand', 'zara'],
    queryFn: () => fetchBrand('zara'),
  });

  return (
    <>
      <div className="flex-none fixed -z-1">
        <div
          className="fixed inset-0 w-screen h-screen bg-repeat invert-100"
          style={{ backgroundImage: `url('/rR6HYXBrM.png')`, backgroundSize: 200, opacity: 0.08 }}
        ></div>
      </div>
      <div>
        <main className="flex flex-col gap-10 items-center mt-[10%] max-w-5xl w-full m-auto">
          <h1 className="text-7xl font-bold p-1 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-800 tracking-tighter">
            Fifty Size
          </h1>

          <HydrationBoundary state={dehydrate(queryClient)}>
            <BrandSizeMenu />
          </HydrationBoundary>
        </main>
      </div>
    </>
  );
}
