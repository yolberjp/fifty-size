'use server';

import { POPULAR_BRAND_IDS } from '@/config/constants';
import { prisma } from '@/lib/prisma';

export const fetchBrands = async (search?: string) => {
  console.log('search brands', 'hit database');
  const brands = await prisma.brand.findMany({
    where: {
      name: { contains: search, mode: 'insensitive' },
    },
    take: 9,
  });

  return brands;
};

export const fetchPopularBrands = async () => {
  console.log('popular brands', 'hit database');
  const brands = await prisma.brand.findMany({
    where: {
      id: { in: POPULAR_BRAND_IDS },
    },
    take: 9,
  });

  return brands;
};

export async function fetchBrand(id: string) {
  const brand = await prisma.brand.findUnique({
    where: { id },
  });

  if (!brand) {
    throw new Error(`Brand with id ${id} not found`);
  }

  return brand;
}

export async function fetchFullBrand(id: string) {
  const brand = await prisma.brand.findUnique({
    where: { id },
  });

  if (!brand) {
    throw new Error(`Brand with id ${id} not found`);
  }

  return brand;
}
