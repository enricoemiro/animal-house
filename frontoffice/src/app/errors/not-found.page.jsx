import { Box, Button, Group, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={(theme) => ({
          textAlign: 'center',
          fontWeight: 900,
          fontSize: 220,
          lineHeight: 1,
          marginBottom: theme.spacing.xl * 1.5,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

          [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
          },
        })}
      >
        404
      </Box>

      <Title
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          textAlign: 'center',
          fontWeight: 900,
          fontSize: 38,

          [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
          },
        })}
      >
        You have found a secret place.
      </Title>

      <Text
        color="dimmed"
        size="lg"
        align="center"
        sx={(theme) => ({
          maxWidth: 500,
          margin: 'auto',
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.xl * 1.5,
        })}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>

      <Group position="center">
        <Button
          size="md"
          onClick={() =>
            navigate('/', {
              replace: true,
            })
          }
        >
          Take me back to home page
        </Button>
      </Group>
    </>
  );
};
