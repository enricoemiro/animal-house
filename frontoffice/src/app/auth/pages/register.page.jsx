import { Anchor, Box, Group, SimpleGrid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { REGISTER_KEY, register } from '@/app/auth/api/register.api';
import { AuthOutlet } from '@/app/auth/auth.outlet';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { ErrorRenderer } from '@/components/error-renderer.component';
import { DateOfBirthInput } from '@/components/form/date-of-birth-input.component';
import { EmailInput } from '@/components/form/email-input.component';
import { GenderInput } from '@/components/form/gender-input.component';
import { NameInput } from '@/components/form/name-input.component';
import { PasswordConfirmationInput } from '@/components/form/password-confirmation-input.component';
import { PasswordInput } from '@/components/form/password-input.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { UserSchema } from '@/schemas/user.schema';

const RegisterSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
  gender: true,
  dateOfBirth: true,
})
  .merge(z.object({ passwordConfirmation: z.string() }))
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'The passwords do not match.',
    path: ['passwordConfirmation'],
  });

const REGISTER_NOTIFICATION_ID = 'registerNotificationId';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    validate: zodResolver(RegisterSchema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      gender: null,
      dateOfBirth: null,
    },
  });

  const mutation = useMutation({
    mutationKey: [REGISTER_KEY],
    mutationFn: register,
    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: REGISTER_NOTIFICATION_ID,
        }),
      );
    },
    onSuccess: (data) => {
      updateNotification(
        SuccessNotification({
          id: REGISTER_NOTIFICATION_ID,
          message: data,
        }),
      );

      form.reset();
    },
    onError: (error) => {
      updateNotification(
        ErrorNotification({
          id: REGISTER_NOTIFICATION_ID,
          message: <ErrorRenderer error={error} />,
        }),
      );
    },
  });

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <AuthOutlet mutation={mutation} title="Sign Up">
      <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid cols={1} spacing="xs">
          <NameInput {...form.getInputProps('name')} />
          <EmailInput {...form.getInputProps('email')} />
          <PasswordInput {...form.getInputProps('password')} />
          <PasswordConfirmationInput {...form.getInputProps('passwordConfirmation')} />

          <SimpleGrid cols={2} spacing="xs">
            <DateOfBirthInput {...form.getInputProps('dateOfBirth')} />
            <GenderInput {...form.getInputProps('gender')} />
          </SimpleGrid>
        </SimpleGrid>

        <Group position="apart" mt="sm">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => navigate('/auth/login')}
            size="xs"
          >
            Already have an account? Login
          </Anchor>

          <SubmitButton>Register</SubmitButton>
        </Group>
      </Box>
    </AuthOutlet>
  );
};
