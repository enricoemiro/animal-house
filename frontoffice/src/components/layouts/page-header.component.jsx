import { Flex, Text, Title } from '@mantine/core';

/**
 * @param {Object} props - Props
 * @param {string} props.title - Title
 * @param {string} props.subtitle - Subtitle
 */
export const PageHeader = ({ title, subtitle }) => {
  return (
    <Flex direction="column">
      <Title order={1} color="dark">
        {title}
      </Title>

      <Text fz="lg" color="dimmed">
        {subtitle}
      </Text>
    </Flex>
  );
};
