'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { getBrand } from './actions';
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
  const [brand, setBrand] = useState<Brand>(defaultBrand);

  useEffect(() => {
    const fetchBrand = async () => {
      const result = await getBrand(selectedId);
      if (result) {
        setBrand(result);
      }
    };

    fetchBrand();
  }, [selectedId]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col h-full w-sm gap-1 hover:bg-gray-100 rounded-full">
          <div className="flex w-full h-full justify-center items-center">
            {brand.logoUrl && (
              <figure>
                <Image src={brand.logoUrl} alt="zara logo" width={50} height={20} />
              </figure>
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
