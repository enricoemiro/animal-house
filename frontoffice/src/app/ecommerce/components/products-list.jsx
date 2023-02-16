import { SimpleGrid, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { PageHeader } from '@/components/layouts/page-header.component';

import {
  GET_PRODUCTS_BY_CATEGORY_KEY,
  getProductsByCategory,
} from '../api/get-products-by-category';
import { ProductCard } from './product-card';

export const ProductsList = ({ category }) => {
  const { data: products } = useQuery({
    queryKey: [GET_PRODUCTS_BY_CATEGORY_KEY, category.id],
    queryFn: () => getProductsByCategory(category.id),
    initialData: [],
    retry: 0,
  });

  const renderProducts = useMemo(() => {
    if (products.length === 0) {
      return (
        <Text color="dimmed">
          Sorry, there are no products available for the selected category at the moment. Please try
          again later or choose a different category.
        </Text>
      );
    }

    return (
      <SimpleGrid
        breakpoints={[
          { minWidth: 'xl', cols: 4, spacing: 'md' },
          { minWidth: 'sm', cols: 3, spacing: 'md' },
          { minWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    );
  }, [products]);

  return (
    <>
      <Title order={2}>Products for {category.name}</Title>
      {renderProducts}
    </>
  );
};
