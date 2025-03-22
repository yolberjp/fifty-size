import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

import { fetchBrands } from './actions';

interface Brand {
  id: string;
  name: string;
  logoUrl: string | null;
}

export default function BrandSelector({ onSelect }: { onSelect?: (value: string) => void }) {
  const [search, setSearch] = useState<string | undefined>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string>();

  const debounced = useDebouncedCallback(
    (value) => {
      setSearch(value);
    },
    500,
    { maxWait: 2000 },
  );

  useEffect(() => {
    console.log('search', search);
    console.log('hit useEffect');
    const getBrands = async () => {
      const result = await fetchBrands(search);
      setBrands(result);
    };

    getBrands();
  }, [search]);

  const handleSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
    onSelect?.(brandId);
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Brand</h4>
        <p className="text-sm text-muted-foreground">Search over 2,500 brands</p>
      </div>
      <div className="gdebounced√rid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Input
            onChange={(e) => {
              debounced(e.target.value);
            }}
            className="col-span-3 h-8"
          />
        </div>
      </div>
      <div>
        <div role="listbox" aria-label="Seleccionar marca" className="grid grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              role="option"
              aria-selected={selectedBrandId === brand.id}
              className={`border rounded-sm p-2 cursor-pointer hover:bg-gray-100 ${
                selectedBrandId === brand.id ? 'bg-gray-100 border-blue-500' : ''
              }`}
              onClick={() => handleSelect(brand.id)}
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="text-xs">{brand.name}</span>
                {/* {brand.logoUrl && (
                  <figure>
                    <Image src={brand.logoUrl} alt="zara logo" width={50} height={20} />
                  </figure>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
