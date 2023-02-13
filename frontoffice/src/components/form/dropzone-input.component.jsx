import { CheckIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Flex,
  Group,
  Image,
  List,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import bytes from 'bytes';
import { useMemo, useState } from 'react';

import { ErrorNotification } from '@/components/notifications/error-notification.component';

const ImagePreview = ({ file, onClick }) => {
  const imageUrl = useMemo(() => {
    return URL.createObjectURL(file);
  }, [file]);

  const { hovered, ref } = useHover();

  return (
    <Box ref={ref} key={file.path} sx={{ position: 'relative' }} onClick={onClick}>
      <Image
        src={imageUrl}
        withPlaceholder
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        caption={file.name}
        alt={file.name}
        sx={() => ({
          ...(hovered && {
            opacity: '25%',
            cursor: 'pointer',
          }),
        })}
      />

      {hovered && (
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            transition: 'ease-in-out',
            color: theme.colors.red[8],
            cursor: 'pointer',
          })}
        >
          <XMarkIcon width={64} />
        </Box>
      )}
    </Box>
  );
};

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

  const onDrop = (files) => {
    handleOnDrop(files);
    setFiles(files);
  };

  const onReject = (rejectedFiles) => {
    showNotification(
      ErrorNotification({
        message: (
          <List size="sm">
            {rejectedFiles.map(({ file, errors }) => {
              return (
                <List.Item key={file.path}>
                  <Text fw={700}>{file.name}</Text>
                  <List listStyleType="disc" size="sm">
                    {errors.map(({ code, message }) => {
                      return <List.Item key={code}>{message}</List.Item>;
                    })}
                  </List>
                </List.Item>
              );
            })}
          </List>
        ),
      }),
    );
  };

  return (
    <SimpleGrid cols={1} spacing="xs">
      <Dropzone
        multiple
        onDrop={onDrop}
        onReject={onReject}
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

          <Flex direction="column">
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>

            <Text size="sm" color="dimmed" inline mt={5}>
              You can attach up to {maxFiles} files with a maximum file size limit of{' '}
              {bytes.format(maxSize)} per file.
            </Text>
          </Flex>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Box>
          <Title size="h4" order={2} mb="xs">
            Previews:
          </Title>

          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {files.map((file) => {
              const handleOnClick = () => {
                setFiles((previousFiles) => {
                  const newFiles = [...previousFiles].filter((item) => item !== file);
                  handleOnDrop(newFiles);
                  return newFiles;
                });
              };

              return <ImagePreview key={file.path} file={file} onClick={handleOnClick} />;
            })}
          </SimpleGrid>
        </Box>
      )}
    </SimpleGrid>
  );
};
