'use server';

import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const getBrands = unstable_cache(async (search?: string) => {
  console.log('hit database');
  const brands = await prisma.brand.findMany({
    where: {
      name: { contains: search, mode: 'insensitive' },
    },
    // orderBy: {
    //   popularity: 'asc',
    // },
    take: 9,
  });

  return brands;
});

export async function getBrand(id: string) {
  const brand = await prisma.brand.findUnique({
    where: { id },
  });

  return brand;
}
