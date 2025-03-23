import { prisma } from '@/lib/prisma';

export async function fetchGenders(brandId: string) {
  const result = await prisma.sizeChartCategory.findMany({
    where: {
      sizeChart: {
        brandId: brandId,
      },
    },
    select: {
      subCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    distinct: ['subCategoryId'],
    orderBy: {
      subCategory: {
        type: 'asc',
      },
    },
  });
  return result.map((subCategory) => subCategory.subCategory);
}
