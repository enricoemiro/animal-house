import { Box, Button, Flex, ScrollArea } from '@mantine/core';

export const HorizontalNavigation = ({ items, onCategoryClick }) => {
  return (
    <ScrollArea type="never">
      <Flex justify="flex-start" align="center" direction="row" wrap="nowrap" gap="md">
        {items.map(({ id, name }) => (
          <Button
            type="button"
            key={id}
            color="dark"
            styles={(theme) => ({
              root: { '&:hover': { color: theme.colors.yellow, backgroundColor: theme.white } },
            })}
            variant="subtle"
            onClick={() => onCategoryClick(id)}
          >
            {name}
          </Button>
        ))}
      </Flex>
    </ScrollArea>
  );
};
