'use client';

import { Bookmark, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import BrandDisplay from './brand-display';
import BrandFilter from './brand-filter';

type BrandChoiceProps = {
  name: string;
  logoUrl: string | null;
};

export default function BrandChoice({ name, logoUrl }: BrandChoiceProps) {
  const [open, setOpen] = useState(false);

  // const { data: brand, isLoading } = useQuery<Brand>({
  //   queryKey: ['brand', brandId],
  //   queryFn: () => fetchBrand(brandId),
  //   retry: false,
  // });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col justify-center items-center h-full w-sm gap-1 hover:bg-gray-100 rounded-full">
          <div className="flex w-[86px] h-[70px] justify-center items-center">
            {false ? (
              <LoaderCircle className="animate-spin text-gray-400" />
            ) : name ? (
              <BrandDisplay name={name} imageUrl={logoUrl} />
            ) : (
              <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                <Bookmark className="w-4 h-4" />
                <span>Brand</span>
              </div>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-xl mt-2">
        <BrandFilter onSelect={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
