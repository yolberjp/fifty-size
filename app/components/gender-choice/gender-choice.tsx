'use client';

import { VenusAndMars } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import GenderFilter from './gender-filter';

type Gender = {
  id: number;
  name: string;
};

export default function GenderChoice({
  genders,
  onSelect,
}: {
  genders: Gender[];
  onSelect?: (category: Gender | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  useEffect(() => {
    setSelectedGender(null);
  }, [genders]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex flex-col w-[180px] min-w-[180px] gap-1 h-full hover:bg-gray-100 rounded-full py-2 px-6',
            selectedGender ? 'justify-start' : 'justify-center',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-1 transition-all duration-200 ease-in-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-in-out',
              selectedGender
                ? 'text-xs text-gray-400 translate-y-0 [&>svg]:w-3 [&>svg]:h-3'
                : 'text-md text-gray-600 translate-y-4 [&>svg]:w-4 [&>svg]:h-4',
            )}
          >
            <VenusAndMars />
            <span>Gender</span>
          </div>
          <div
            className={cn(
              'transition-all duration-300 ease-in-out capitalize text-nowrap w-full truncate',
              selectedGender ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {selectedGender?.name} &nbsp;
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-80 rounded-xl mt-2">
        <GenderFilter
          genders={genders}
          setOpen={setOpen}
          setSelectedCategory={(category) => {
            setSelectedGender(category);
            onSelect?.(category);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
