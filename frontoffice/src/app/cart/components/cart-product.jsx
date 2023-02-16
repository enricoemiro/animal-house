import { Badge, Button, Flex, Group, Image, Stack, Text } from '@mantine/core';

import { ImageViewer } from '@/components/layouts/image-viewer.component';

export const CartProduct = ({ product, onProductRemove, id }) => {
  return (
    <Flex gap="xs" justify="flex-start" direction="row" wrap="nowrap">
      <div style={{ width: 150 }}>
        <ImageViewer images={product.images} />
      </div>

      <Stack>
        <Text fz="lg" fw="bold">
          {product.name}
        </Text>
        <Flex gap="sm" justify="flex-start" align="center" direction="row" wrap="nowrap">
          <Text fz="lg">Price:</Text>
          <Text td="line-through">{product.price + '€'}</Text>
          <Text c="red">{(product.price * 10) / 100 + '€'}</Text>
        </Flex>
        <Group position="apart">
          <Badge color="orange" size="lg" radius="md" variant="outline">
            Qt: {product.buyedQuantity}
          </Badge>
          <Button color="red" radius="md" onClick={() => onProductRemove(id)}>
            Remove
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
};
