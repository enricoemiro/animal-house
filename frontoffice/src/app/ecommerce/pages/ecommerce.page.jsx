import { Anchor, Box, Card, Center, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useAuth } from '@/app/auth/use-auth.hook';
import spot from '@/assets/spot.jpeg';
import vip from '@/assets/vip.jpeg';

import { GET_ALL_CATEGORIES_KEY, getAllCategories } from '../api/get-all-categories';
import { HorizontalNavigation } from '../components/horizontal-navigation';
import { ProductsList } from '../components/products-list';

export const EcommercePage = () => {
  const [category, setCategory] = useState(null);
  const {
    meQuery: { data: user },
  } = useAuth();

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
          <Image src={spot} alt="Summer discount of fifty percent if you have vip account" />
        </Flex>
        <SimpleGrid spacing="md">{category && <ProductsList category={category} />}</SimpleGrid>

        {!user?.vip && (
          <Flex mt="lg" direction="row" justify="center" align="center">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <SimpleGrid spacing="md" cols={2}>
                <Card.Section>
                  <Image src={vip} alt="vip account image" />
                </Card.Section>
                <Flex direction="row" justify="center" align="center">
                  <Title ml={8} order={4}>
                    Switch to the{' '}
                    <Anchor color="orange" href="/profile">
                      VIP
                    </Anchor>{' '}
                    account to get the best discounts.
                  </Title>
                </Flex>
              </SimpleGrid>
            </Card>
          </Flex>
        )}
      </Box>
    </>
  );
};
