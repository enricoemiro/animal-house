import { Link } from 'react-router-dom';

import { register as registerFn } from '@/api/auth/register';
import Form from '@/components/shared/Form';

function Register() {
  const submitHandler = (data, mutate) => mutate(data);

  return (
    <>
      <div className="mb-2 flex justify-center">
        <h2 className="text-xl font-bold">Create a new account</h2>
      </div>

      <Form
        mutationFunction={registerFn}
        submitHandler={submitHandler}
        fieldsToShow={{
          email: true,
          name: true,
          password: true,
          passwordConfirmation: true,
          dateOfBirth: true,
          gender: true,
        }}
      />

      <div className="flex justify-center">
        <span className="text-sm">
          Do you already have an account?{' '}
          <Link to="/auth/login" className="underline decoration-sky-500">
            Log in
          </Link>
        </span>
      </div>
    </>
  );
}

export default Register;
