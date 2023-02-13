import { Anchor, Box, Group, SimpleGrid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { same } from 'original';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LOGIN_KEY, login } from '@/app/auth/api/login.api';
import { ME_KEY } from '@/app/auth/api/me.api';
import { AuthOutlet } from '@/app/auth/auth.outlet';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { EmailInput } from '@/components/form/email-input.component';
import { PasswordInput } from '@/components/form/password-input.component';
import { queryClient } from '@/config/query';
import { useMutationWithNotification } from '@/hooks/use-mutation-with-notification.hook';
import { UserSchema } from '@/schemas/user.schema';

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutationWithNotification({
    mutationKey: [LOGIN_KEY],
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries([ME_KEY]);

      const returnTo = searchParams.has('returnTo') ? searchParams.get('returnTo') : null;

      // Preventing Unvalidated Redirects and Forwards
      // See: https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
      if (returnTo !== null && same(window.location.href, returnTo)) {
        return navigate(returnTo, { replace: true });
      }

      return navigate('/', { replace: true });
    },
  });

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <AuthOutlet mutation={mutation} title="Sign into your account">
      <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid cols={1} spacing={5}>
          <EmailInput {...form.getInputProps('email')} />
          <PasswordInput {...form.getInputProps('password')} />
        </SimpleGrid>

        <Group position="apart" mt={15}>
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => navigate('/auth/register')}
            size="xs"
          >
            Don't have an account? Register
          </Anchor>

          <SubmitButton>Log in</SubmitButton>
        </Group>
      </Box>
    </AuthOutlet>
  );
};
