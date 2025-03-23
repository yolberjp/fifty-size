'use client';

import { Shirt } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import CategoryFilter from './category-filter';

type Category = {
  id: number;
  name: string;
};

export default function CategoryChoice({
  categories,
  onSelect,
}: {
  categories: Category[];
  onSelect?: (category: Category | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    setSelectedCategory(null);
  }, [categories]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex flex-col w-full gap-1 h-full hover:bg-gray-100 rounded-full py-2 px-6',
            selectedCategory ? 'justify-start' : 'justify-center',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-1 transition-all duration-200 ease-in-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-in-out',
              selectedCategory
                ? 'text-xs text-gray-400 translate-y-0 [&>svg]:w-3 [&>svg]:h-3'
                : 'text-md text-gray-600 translate-y-4 [&>svg]:w-4 [&>svg]:h-4',
            )}
          >
            <Shirt />
            <span>Category</span>
          </div>
          <div
            className={cn(
              'transition-all duration-300 ease-in-out',
              selectedCategory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {selectedCategory?.name} &nbsp;
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-80 rounded-xl mt-2">
        <CategoryFilter
          categories={categories}
          setOpen={setOpen}
          setSelectedCategory={(category) => {
            setSelectedCategory(category);
            onSelect?.(category);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
