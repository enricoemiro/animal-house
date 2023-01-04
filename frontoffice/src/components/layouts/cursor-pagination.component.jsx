import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button, Tooltip } from '@mantine/core';

/**
 * @param {Object} props - Props
 * @param {boolean} props.hasPreviousPage - Has previous page?
 * @param {boolean} props.hasNextPage - Has next page?
 * @param {Function} props.onPreviousPage - Previous page handler
 * @param {Function} props.onNextPage - Next page handler
 */
export const CursorPagination = ({
  hasPreviousPage = false,
  hasNextPage = false,
  onPreviousPage,
  onNextPage,
}) => {
  if (!hasPreviousPage && !hasNextPage) {
    return <></>;
  }

  return (
    <Button.Group>
      <Tooltip label="Previous page" withinPortal withArrow>
        <Button variant="default" disabled={!hasPreviousPage} onClick={onPreviousPage}>
          <ChevronLeftIcon width={16} />
        </Button>
      </Tooltip>

      <Tooltip label="Next Page" withinPortal withArrow>
        <Button variant="default" disabled={!hasNextPage} onClick={onNextPage}>
          <ChevronRightIcon width={16} />
        </Button>
      </Tooltip>
    </Button.Group>
  );
};
