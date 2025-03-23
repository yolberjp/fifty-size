'use client';

import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

export default function DebouncedInput({ onChange }: { onChange: (search: string) => void }) {
  const debounced = useDebouncedCallback(
    (value) => {
      onChange(value);
    },
    500,
    { maxWait: 2000 },
  );
  return (
    <Input
      onChange={(e) => {
        debounced(e.target.value);
      }}
      className="col-span-3 h-8"
    />
  );
}
