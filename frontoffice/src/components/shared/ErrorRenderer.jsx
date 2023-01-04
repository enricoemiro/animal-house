import PropTypes from 'prop-types';

/**
 * Renders an error message or a list of validation errors.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.error - Error object with validation errors and message.
 * @param {Object} props.error.validationErrors - Object with field validation errors.
 * @param {string} props.error.message - Error message.
 */
function ErrorRenderer({ error }) {
  const { validationErrors, message } = error || {};

  if (validationErrors) {
    return (
      <ul className="list-inside list-disc">
        {Object.keys(validationErrors).map((key, index) => (
          <li key={index}>{validationErrors[key]}</li>
        ))}
      </ul>
    );
  }

  return <>{message}</>;
}

ErrorRenderer.propTypes = {
  error: PropTypes.shape({
    validationErrors: PropTypes.object,
    message: PropTypes.string,
  }),
};

export default ErrorRenderer;
