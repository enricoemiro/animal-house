import { Box, Center, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { GET_ALL_CATEGORIES_KEY, getAllCategories } from '../api/get-all-categories';
import { HorizontalNavigation } from '../components/horizontal-navigation';
import { ProductsList } from '../components/products-list';

export const EcommercePage = () => {
  const [category, setCategory] = useState(null);

  const { data: categories } = useQuery({
    queryKey: [GET_ALL_CATEGORIES_KEY],
    queryFn: getAllCategories,
    initialData: null,
    retry: 0,
  });

  const onCategoryClick = (id) => {
    setCategory(categories.find((category) => category.id === id));
  };

  return (
    <>
      <Center>
        {categories && (
          <HorizontalNavigation items={categories} onCategoryClick={onCategoryClick} />
        )}
      </Center>
      <Box>
        <Flex
          gap="md"
          mt="md"
          mb="md"
          justify="center"
          align="center"
          direction="row"
          wrap="nowrap"
        >
          <Image
            src="/images/spotImage.jpeg"
            alt="Discount of fifty percent if you have vip account"
          />
        </Flex>
        <SimpleGrid spacing="md">{category && <ProductsList category={category} />}</SimpleGrid>
      </Box>
    </>
  );
};
