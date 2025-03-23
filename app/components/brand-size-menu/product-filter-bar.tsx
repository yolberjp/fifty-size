import { Separator } from '@/components/ui/separator';

import BrandChoice from '../brand-choice/brand-choice';
import CategorySelector from '../category-selector/category-selector';
import GenderSelector from '../gender-selector/gender-selector';
import SizeSelector from '../size-selector/size-selector';

const defaultBrand = {
  id: 'zara',
};

export default async function ProductFilterBar({ brandId }: { brandId: string }) {
  return (
    <div className="w-full p-5 flex items-center justify-center rounded-xl">
      <div className="relative w-2xl rounded-full h-20 cursor-pointer shadow-2xl">
        <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-red-500 to-purple-500">
          <div className="flex gap-1 h-full w-full items-center bg-white rounded-full">
            <BrandChoice brandId={brandId ?? defaultBrand.id} />

            <Separator orientation="vertical" className="!h-10" />

            <CategorySelector />

            <Separator orientation="vertical" className="!h-10" />

            <GenderSelector />

            <Separator orientation="vertical" className="!h-10" />

            <SizeSelector />
          </div>
        </span>
      </div>
    </div>
  );
}
