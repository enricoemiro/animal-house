import { updateProfile } from '@/api/user/updateProfile';
import Form from '@/components/shared/Form';

function ProfilePage() {
  const submitHandler = (data, mutate) => mutate(data);

  return (
    <>
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <Form
          mutationFunction={updateProfile}
          submitHandler={submitHandler}
          fieldsToShow={{
            name: true,
            email: true,
            dateOfBirth: true,
            gender: true,
          }}
        />
      </div>
    </>
  );
}

export { ProfilePage };
