import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type Gender = {
  id: number;
  name: string;
};

export default function GenderFilter({
  genders,
  setOpen,
  setSelectedCategory,
}: {
  genders: Gender[];
  setOpen: (open: boolean) => void;
  setSelectedCategory: (category: Gender | null) => void;
}) {
  return (
    <div className="grid gap-2">
      <h4 className="font-medium leading-none">Gender</h4>

      <Command className="h-full">
        <CommandInput placeholder="Filter gender..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            {genders.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                className="capitalize"
                onSelect={(value) => {
                  setSelectedCategory(genders.find((priority) => priority.name === value) || null);
                  setOpen(false);
                }}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
