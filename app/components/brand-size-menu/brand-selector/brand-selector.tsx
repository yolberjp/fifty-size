'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { fetchBrand } from './actions';
import Selector from './selector';

interface Brand {
  id: string;
  name: string;
  logoUrl: string | null;
}

const defaultBrand = {
  id: 'zara',
  name: 'Zara',
  logoUrl: '/images/zara.webp',
};

export default function BrandSelector() {
  const [selectedId, setSelectedId] = useState<string>(defaultBrand.id);

  const { data: brand, isLoading } = useQuery<Brand>({
    queryKey: ['brand', selectedId],
    queryFn: () => fetchBrand(selectedId),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col h-full w-sm gap-1 hover:bg-gray-100 rounded-full">
          <div className="flex w-full h-full justify-center items-center">
            {isLoading && <LoaderCircle className="animate-spin text-gray-400" />}

            {brand?.logoUrl ? (
              <figure
                className={`
                transition-opacity duration-300 ease-in-out
                ${isLoading ? 'opacity-0' : 'opacity-100'}
              `}
              >
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={50}
                  height={20}
                  className="transition-all duration-300 ease-in-out"
                />
              </figure>
            ) : (
              brand?.name
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-3xl mt-2">
        <Selector onSelect={(id) => setSelectedId(id)} />
      </PopoverContent>
    </Popover>
  );
}
