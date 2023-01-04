import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { login } from '@/api/auth/login';
import { ME_KEY } from '@/api/auth/me';
import Form from '@/components/shared/Form';
import queryClient from '@/config/query';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const submitHandler = (data, mutate) =>
    mutate(data, {
      onSuccess: () => {
        const returnUrl = searchParams.get('returnUrl');

        if (returnUrl) {
          navigate(returnUrl);
        }

        navigate('/dashboard');

        queryClient.invalidateQueries([ME_KEY]);
      },
    });

  return (
    <>
      <div className="mb-2 flex justify-center">
        <h2 className="text-xl font-bold">Sign into your account</h2>
      </div>

      <Form
        mutationFunction={login}
        submitHandler={submitHandler}
        fieldsToShow={{
          email: true,
          name: false,
          password: true,
          passwordConfirmation: false,
          dateOfBirth: false,
          gender: false,
        }}
      />

      <div className="flex justify-center">
        <span className="text-sm">
          Don't have an account?{' '}
          <Link to="/auth/register" className="underline decoration-sky-500">
            Register
          </Link>
        </span>
      </div>
    </>
  );
}

export default Login;
