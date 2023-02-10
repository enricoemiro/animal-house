import { Anchor, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const HeaderLogo = () => {
  const navigate = useNavigate();

  return (
    <Title size="h3">
      <Anchor
        variant="text"
        component="a"
        color="dark"
        onClick={() => navigate('/')}
        sx={{ fontFamily: 'Pacifico' }}
      >
        Animal House
      </Anchor>
    </Title>
  );
};
