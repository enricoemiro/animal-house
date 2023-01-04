import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Label, Select, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import ErrorRenderer from '@/components/shared/ErrorRenderer';
import useAuth from '@/hooks/useAuth';

function Form({ mutationFunction, submitHandler, fieldsToShow }) {
  const { user } = useAuth();
  const { email, name, password, passwordConfirmation, dateOfBirth, gender } = fieldsToShow;

  const { register, handleSubmit } = useForm();
  const { isLoading, isError, isSuccess, error, data, mutate } = useMutation(mutationFunction);
  const onSubmit = handleSubmit((data) => submitHandler(data, mutate));

  return (
    <form className="flex flex-col gap-y-2.5" onSubmit={onSubmit}>
      {isLoading && (
        <Alert color="info" role="alert" icon={InformationCircleIcon}>
          Loading...
        </Alert>
      )}

      {isSuccess && (
        <Alert color="success" role="alert" icon={InformationCircleIcon}>
          {data.message}
        </Alert>
      )}

      {isError && (
        <Alert color="failure" role="alert" icon={InformationCircleIcon}>
          {<ErrorRenderer error={error?.response?.data || error?.message} />}
        </Alert>
      )}

      {name && (
        <div className="flex flex-col flex-1 gap-y-1">
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            placeholder="Enter name"
            autoComplete="on"
            aria-required="true"
            defaultValue={user?.name}
            {...register('name', { required: true })}
          />
        </div>
      )}

      {email && (
        <div className="flex flex-col flex-1 gap-y-1">
          <Label htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            aria-required="true"
            defaultValue={user?.email}
            {...register('email', { required: true })}
          />
        </div>
      )}

      <div className="flex flex-1 gap-x-3">
        {password && (
          <div className="flex flex-col flex-1 gap-y-1">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter password"
              aria-required="true"
              {...register('password', { required: true })}
            />
          </div>
        )}

        {passwordConfirmation && (
          <div className="flex flex-col flex-1 gap-y-1">
            <Label htmlFor="passwordConfirmation" value="Confirm password" />
            <TextInput
              id="passwordConfirmation"
              type="password"
              placeholder="Confirm password"
              aria-required="true"
              {...register('passwordConfirmation', { required: true })}
            />
          </div>
        )}
      </div>

      <div className="flex gap-x-3">
        {dateOfBirth && (
          <div className="flex flex-col flex-1 gap-y-1">
            <Label htmlFor="dateOfBirth" value="Date of birth" />
            <TextInput
              id="dateOfBirth"
              type="date"
              aria-required="true"
              defaultValue={user?.dateOfBirth}
              {...register('dateOfBirth', { required: true })}
            />
          </div>
        )}

        {gender && (
          <div className="flex flex-col flex-1 gap-y-1">
            <Label htmlFor="gender" value="Gender" />
            <Select
              id="gender"
              aria-required="true"
              defaultValue={user?.gender}
              {...register('gender', { required: true })}
            >
              <option value="">-- Select an option --</option>

              {['MALE', 'FEMALE', 'OTHER'].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      <Button type="submit" color="dark">
        Submit
      </Button>
    </form>
  );
}

Form.propTypes = {
  mutationFunction: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  fieldsToShow: PropTypes.shape({
    email: PropTypes.bool,
    name: PropTypes.bool,
    password: PropTypes.bool,
    passwordConfirmation: PropTypes.bool,
    dateOfBirth: PropTypes.bool,
    gender: PropTypes.bool,
  }).isRequired,
};

export default Form;
