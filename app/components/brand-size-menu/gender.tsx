import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Gender() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col w-96 gap-1 h-full  hover:bg-gray-100 rounded-full py-2 pl-6">
          <span className="text-xs text-gray-400">Gender</span>
          <div className="w-full h-full">Man</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 h-52 rounded-3xl mt-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Gender</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Input id="width" defaultValue="Pants" className="col-span-3 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
