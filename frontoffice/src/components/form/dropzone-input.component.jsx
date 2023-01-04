import { CheckIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Box, Group, Image, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import bytes from 'bytes';
import { useState } from 'react';

/**
 * @param {import('@mantine/dropzone').DropzoneProps} props - Props
 */
export const DropzoneInput = ({
  handleOnDrop,
  maxFiles = 3,
  maxSize = bytes('5MB'),
  accept = IMAGE_MIME_TYPE,
  ...others
}) => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{
          onLoad: () => URL.revokeObjectURL(imageUrl),
        }}
      />
    );
  });

  return (
    <SimpleGrid cols={1} spacing="xs">
      <Dropzone
        multiple
        onDrop={(files) => {
          handleOnDrop(files);
          setFiles(files);
        }}
        maxFiles={maxFiles}
        maxSize={maxSize}
        accept={accept}
        {...others}
      >
        <Group position="center" spacing="md" sx={{ minHeight: 100, pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <CheckIcon
              width={50}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>

          <Dropzone.Reject>
            <XMarkIcon width={50} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Reject>

          <Dropzone.Idle>
            <PhotoIcon width={50} color={theme.colors.gray[8]} />
          </Dropzone.Idle>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>

            <Text size="sm" color="dimmed" inline mt={5}>
              You can attach up to {maxFiles} files with a maximum file size limit of{' '}
              {bytes.format(maxSize)} per file.
            </Text>
          </Box>
        </Group>
      </Dropzone>

      {previews.length > 0 && (
        <Box>
          <Title size="h4" order={2} mb="xs">
            Previews:
          </Title>

          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {previews}
          </SimpleGrid>
        </Box>
      )}
    </SimpleGrid>
  );
};
