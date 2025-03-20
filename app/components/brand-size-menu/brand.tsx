import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Brand() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col h-full w-sm gap-1 hover:bg-gray-100 rounded-full">
          <div className="flex w-full h-full justify-center items-center">
            <figure>
              <Image src="/images/zara.webp" alt="zara logo" width={50} height={40} />
            </figure>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-52 rounded-3xl mt-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Brand</h4>
            <p className="text-sm text-muted-foreground">Search over 2,500 brands</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Input id="width" defaultValue="Zara" className="col-span-3 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
