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

export default function BrandChoice({
  name: initialName,
  logoUrl: initialLogoUrl,
}: BrandChoiceProps) {
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<{
    name: string;
    logoUrl: string | null;
  } | null>(initialName ? { name: initialName, logoUrl: initialLogoUrl } : null);

  const displayName = selectedBrand?.name || initialName;
  const displayLogoUrl = selectedBrand?.logoUrl || initialLogoUrl;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col justify-center items-center h-full w-sm gap-1 hover:bg-gray-100 rounded-full">
          <div className="flex w-[120px] min-w-[120px] h-[70px] justify-center items-center">
            {false ? (
              <LoaderCircle className="animate-spin text-gray-400" />
            ) : displayName ? (
              <BrandDisplay name={displayName} imageUrl={displayLogoUrl} />
            ) : (
              <div className="flex items-center gap-1 text-gray-600 text-md font-medium">
                <Bookmark className="w-4 h-4" />
                <span>Brand</span>
              </div>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-xl mt-2">
        <BrandFilter
          onSelect={(brand) => {
            setSelectedBrand(brand);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
