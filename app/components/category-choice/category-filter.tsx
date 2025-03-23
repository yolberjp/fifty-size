import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type Category = {
  id: number;
  name: string;
};

export default function CategoryFilter({
  categories,
  setOpen,
  setSelectedCategory,
}: {
  categories: Category[];
  setOpen: (open: boolean) => void;
  setSelectedCategory: (category: Category | null) => void;
}) {
  return (
    <div className="grid gap-2">
      <h4 className="font-medium leading-none">Category</h4>

      <Command className="h-full">
        <CommandInput placeholder="Filter category..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="overflow-auto">
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.name}
                onSelect={(value) => {
                  setSelectedCategory(
                    categories.find((priority) => priority.name === value) || null,
                  );
                  setOpen(false);
                }}
              >
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
