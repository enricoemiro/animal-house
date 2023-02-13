import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { useId } from 'react';

import { bufferToBase64 } from '@/utils/image';

export const ImageViewer = ({ images }) => {
  return (
    <Carousel mx="auto" loop withControls={images.length > 1} withIndicators={images.length > 1}>
      {images.map((image) => {
        const id = useId();

        return (
          <Carousel.Slide key={id}>
            <Image
              radius="md"
              src={`data:image/png;base64,` + bufferToBase64(image.content.data)}
              alt=""
            />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};
