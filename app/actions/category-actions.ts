import { prisma } from '@/lib/prisma';

export async function fetchCategories(brandId: string) {
  const result = await prisma.sizeChartCategory.findMany({
    where: {
      sizeChart: {
        brandId: brandId,
      },
    },
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    distinct: ['categoryId'],
    orderBy: {
      category: {
        name: 'asc',
      },
    },
  });
  return result.map((category) => category.category);
}
