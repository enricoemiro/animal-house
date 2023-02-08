import { CalendarIcon } from '@heroicons/react/24/solid';
import { DatePicker } from '@mantine/dates';

/**
 * @param {import('@mantine/dates').DatePickerProps} props Props
 */
export const DateOfBirthInput = (props) => {
  return (
    <DatePicker
      placeholder="Date of birth"
      label="Date of birth"
      icon={<CalendarIcon width={16} />}
      {...props}
    />
  );
};
