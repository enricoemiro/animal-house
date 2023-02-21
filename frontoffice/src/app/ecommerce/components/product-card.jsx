import { Badge, Button, Card, Flex, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';
import { ImageViewer } from '@/components/layouts/image-viewer.component';

import { QuantitySelector } from './quantity-selector';

export const ProductCard = ({ product }) => {
  const {
    meQuery: { data: user },
  } = useAuth();

  return (
    <Card shadow="md" radius="md" withBorder>
      <Card.Section>
        <Link to={`/product/details/${product.id}`}>
          <ImageViewer images={product.images} />
        </Link>
      </Card.Section>
      <Flex direction="column">
        <Group mt="md" mb="md" position="apart">
          <Text weight={500} fw="bold" fz="lg">
            {product.name}
          </Text>
          <Badge color="red" variant="light">
            {'Stock: ' + product.availability}
          </Badge>
        </Group>

        <Flex direction="row" gap="xs" justify="flex-start" align="center" wrap="nowrap" mb="sm">
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
        </Flex>

        {user ? (
          <QuantitySelector product={product} />
        ) : (
          <Text fz="md" color="dimmed">
            Login to buy this product
          </Text>
        )}
      </Flex>
    </Card>
  );
};
