import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type Size = {
  id: number;
  system: string;
  value: string;
};

export default function SizeFilter({
  sizes,
  setOpen,
  setSelectedSize,
}: {
  sizes: Size[];
  setOpen: (open: boolean) => void;
  setSelectedSize: (size: Size | null) => void;
}) {
  return (
    <div className="grid gap-2">
      <h4 className="font-medium leading-none">Size</h4>

      <Command className="h-full">
        <CommandInput placeholder="Filter size..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            {sizes.map((item) => (
              <CommandItem
                key={item.id}
                value={item.value}
                className="capitalize"
                onSelect={(value) => {
                  setSelectedSize(sizes.find((priority) => priority.value === value) || null);
                  setOpen(false);
                }}
              >
                {item.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
