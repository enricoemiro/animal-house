import { Box, Container, Image, Paper, Title } from '@mantine/core';

/**
 * @param {Object} props - Props
 * @param {string} props.title - Title
 * @param {React.ReactNode} props.children - Children
 */
export const AuthOutlet = ({ title, children }) => {
  return (
    <Box
      component="div"
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.yellow[7],
        padding: theme.spacing.xl,
      })}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box
            sx={(theme) => ({
              maxWidth: '50%',

              [theme.fn.smallerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            <Image radius={0} src="/images/auth-bg.jpg" alt="" />
          </Box>

          <Paper
            radius={0}
            p="xl"
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '50%',

              [theme.fn.smallerThan('sm')]: {
                width: '100%',
              },
            })}
          >
            <Title
              size="h2"
              order={1}
              align="center"
              mb="md"
              sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              })}
            >
              {title}
            </Title>

            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
