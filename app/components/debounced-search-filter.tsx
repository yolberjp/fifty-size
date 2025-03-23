'use client';

import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

export default function DebouncedInput({
  onInputChange,
  ...props
}: {
  onInputChange: (search: string) => void;
} & React.ComponentProps<typeof Input>) {
  const debounced = useDebouncedCallback(
    (value) => {
      onInputChange(value);
    },
    500,
    { maxWait: 2000 },
  );
  return (
    <Input
      onChange={(e) => {
        debounced(e.target.value);
      }}
      {...props}
    />
  );
}
