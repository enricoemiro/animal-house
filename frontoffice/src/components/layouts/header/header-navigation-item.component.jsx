import { Anchor } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * @param {Object} props - Props
 * @param {string} props.label - Label
 * @param {string} props.href - Href
 */
export const HeaderNavigationItem = ({ label, href }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Anchor
      variant="text"
      onClick={() => navigate(href)}
      sx={(theme) => ({
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
          borderRadius: 0,
          padding: theme.spacing.md,
        },

        '&, &:hover': isActive && {
          backgroundColor: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).background,
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      })}
    >
      {label}
    </Anchor>
  );
};
