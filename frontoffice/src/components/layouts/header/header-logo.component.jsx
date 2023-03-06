import { Anchor, Title } from '@mantine/core';

export const HeaderLogo = () => {
  return (
    <Title size="h3">
      <Anchor variant="text" component="a" color="dark" href="/" sx={{ fontFamily: 'Pacifico' }}>
        Animal House
      </Anchor>
    </Title>
  );
};
