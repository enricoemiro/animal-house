import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Badge, Blockquote, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';
import { ImageViewer } from '@/components/layouts/image-viewer.component';
import { PageHeader } from '@/components/layouts/page-header.component';

import { GET_PRODUCT_BY_ID_KEY, getProductById } from '../api/get-product-by-id';
import { QuantitySelector } from '../components/quantity-selector';

export const ProductDetails = () => {
  const { id } = useParams();
  const { isLoading, data: product } = useQuery([GET_PRODUCT_BY_ID_KEY], () => getProductById(id));
  const {
    meQuery: { data: user },
  } = useAuth();

  return (
    <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {product && (
        <>
          <ImageViewer images={product.images} />
          <Stack justify="flex-start">
            <PageHeader title={product.name} />
            <Text mt="lg" color="dark" fz="xl">
              Product information
            </Text>
            <Group position="apart">
              <Group spacing={9}>
                {user?.vip ? (
                  <>
                    <Text>Price:</Text>
                    <Text td="line-through">{product.price + '€'}</Text>
                    <Text c="red">{product.price - (product.price * 10) / 100 + '€'}</Text>
                  </>
                ) : (
                  <>
                    <Text>Price:</Text>
                    <Text>{product.price + '€'}</Text>
                  </>
                )}
              </Group>
              <Badge color="red" size="lg" variant="outline">
                {'Stock: ' + product.availability}
              </Badge>
            </Group>
            <Text fz="lg" color="dimmed">
              {product.description}
            </Text>
            <Stack justify="flex-end">
              <QuantitySelector product={product} />
              <Blockquote
                icon={<ShieldCheckIcon />}
                styles={(theme) => ({
                  body: { color: theme.colors.orange },
                })}
              >
                Choose Animal House for premium pet care products that you and your furry friend
                will love.
              </Blockquote>
            </Stack>
          </Stack>
        </>
      )}
    </SimpleGrid>
  );
};
