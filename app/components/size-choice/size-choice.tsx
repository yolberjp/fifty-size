'use client';

import { Ruler } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import SizeFilter from './size-filter';

type Size = {
  id: number;
  system: string;
  value: string;
};

export default function SizeChoice({
  sizes,
  onSelect,
}: {
  sizes: Size[];
  onSelect?: (size: Size | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex flex-col w-[120px] min-w-[120px] gap-1 h-full hover:bg-gray-100 rounded-full py-2 px-6',
            selectedSize ? 'justify-start' : 'justify-center',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-1 transition-all duration-200 ease-in-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-in-out',
              selectedSize
                ? 'text-xs text-gray-400 translate-y-0 [&>svg]:w-3 [&>svg]:h-3'
                : 'text-md text-gray-600 translate-y-4 [&>svg]:w-4 [&>svg]:h-4',
            )}
          >
            <Ruler />
            <span>Size</span>
          </div>
          <div
            className={cn(
              'transition-all duration-300 ease-in-out capitalize',
              selectedSize ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {selectedSize?.value} &nbsp;
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-80 rounded-xl mt-2">
        <SizeFilter
          sizes={sizes}
          setOpen={setOpen}
          setSelectedSize={(size) => {
            setSelectedSize(size);
            onSelect?.(size);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
