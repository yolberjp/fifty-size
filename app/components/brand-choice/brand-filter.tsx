'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { fetchBrands, fetchPopularBrands } from '../../actions/brand-actions';
import DebouncedInput from '../debounced-search-filter';

interface Brand {
  id: string;
  name: string;
  logoUrl: string | null;
}

export default function BrandFilter({ onSelect }: { onSelect: (brandId: string) => void }) {
  const router = useRouter();
  const [search, setSearch] = useState<string | undefined>();
  const [brandId, setBrandId] = useQueryState('id');

  const { data: filteredBrands = [], isLoading } = useQuery<Brand[]>({
    queryKey: ['brands', search],
    queryFn: () => fetchBrands(search),
    enabled: !!search,
  });

  const { data: popularBrands = [] } = useQuery<Brand[]>({
    queryKey: ['popular-brands'],
    queryFn: fetchPopularBrands,
  });

  const brands = search ? filteredBrands : popularBrands;

  const handleSelect = async (brandId: string) => {
    await setBrandId(brandId);
    onSelect(brandId);
    router.refresh();
  };

  return (
    <section className="grid gap-4">
      <header className="space-y-0">
        <h4 className="font-medium leading-none">Brand</h4>
        <p className="text-sm text-muted-foreground">Search over 2,500 brands</p>
      </header>
      <div className="flex items-center gap-1 border-b px-3">
        <Search className="w-4 h-4 text-muted-foreground" />
        <DebouncedInput
          onInputChange={setSearch}
          placeholder="Filter brand..."
          className="px-0 border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div>
        <div role="listbox" aria-label="Seleccionar marca" className="grid grid-cols-3 gap-4">
          {isLoading &&
            [...Array(9)].map((_, i) => <Skeleton key={i} className="h-[70px] w-full" />)}

          {brands.map((brand) => (
            <div
              key={brand.id}
              role="option"
              aria-selected={brandId === brand.id}
              className={`flex items-center justify-center text-center h-[70px] border rounded-sm p-2 cursor-pointer hover:bg-gray-100 ${
                brandId === brand.id ? 'bg-gray-100 border-blue-500' : ''
              }`}
              onClick={() => handleSelect(brand.id)}
            >
              <span className="text-sm capitalize">{brand.name.toLowerCase()}</span>
              {/* {brand.logoUrl && (
                  <figure>
                    <Image src={brand.logoUrl} alt="zara logo" width={50} height={20} />
                  </figure>
                )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
