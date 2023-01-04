import { CalendarIcon, EyeIcon, InformationCircleIcon, MapIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Card } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { BOOK_ACTIVITY_KEY, bookActivity } from '@/api/activities/bookActivity';
import { BOOKED_ACTIVITIES_KEY } from '@/api/activities/bookedActivities';
import { UNBOOK_ACTIVITY_KEY, unbookActivity } from '@/api/activities/unbookActivity';
import queryClient from '@/config/query';

import ErrorRenderer from './ErrorRenderer';

function ActivitiesList({ activities }) {
  // Keep track of which activities are expanded and which aren't
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [bookedElement, setBookedElement] = useState(null);

  const handleExpandClick = (activityIndex) => {
    setExpandedIndexes({
      ...expandedIndexes,
      [activityIndex]: !expandedIndexes[activityIndex],
    });
  };

  const { isError, isSuccess, error, data } = useQuery(
    [BOOK_ACTIVITY_KEY],
    () => bookActivity(bookedElement),
    {
      enabled: false,
      onSuccess: () => setBookedElement(null),
      onError: () => setBookedElement(null),
    },
  );

  const a = useQuery([UNBOOK_ACTIVITY_KEY], () => unbookActivity(bookedElement), {
    enabled: !!bookedElement,
    onSuccess: () => {
      queryClient.invalidateQueries([BOOKED_ACTIVITIES_KEY]);
      setBookedElement(null);
    },
    onError: () => setBookedElement(null),
  });

  const handleBookButton = (index) => {
    const { id } = activities[index];
    setBookedElement(id);
  };

  return (
    <>
      {isError && (
        <Alert color="failure" role="alert" id="error-alert" icon={InformationCircleIcon}>
          {<ErrorRenderer error={error.response.data || error.message} />}
        </Alert>
      )}

      {isSuccess && (
        <Alert color="success" role="alert" id="success-alert" icon={InformationCircleIcon}>
          {data.message}
        </Alert>
      )}

      <div className="flex flex-wrap h-full gap-4">
        {activities.map(({ name, description, dateOfPerformance, mode, availability }, index) => {
          const isExpanded = expandedIndexes[index] || false;

          return (
            <div className="flex-1" key={index}>
              <Card>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {name}
                  </h2>

                  <Button
                    color="dark"
                    outline={true}
                    id="bookService"
                    type="button"
                    // aria-labelledby={['success-alert', 'error-alert']}
                    onClick={() => handleBookButton(index)}
                    onKeyDown={(e) => e.key === 'Enter' && handleBookButton(index)}
                    className="hover:scale-[1.05] transition-all ease-in-out"
                  >
                    Book Now!
                  </Button>

                  <Button
                    color="dark"
                    outline={true}
                    id="bookService"
                    type="button"
                    // aria-labelledby={['success-alert', 'error-alert']}
                    onClick={() => handleBookButton(index)}
                    onKeyDown={(e) => e.key === 'Enter' && handleBookButton(index)}
                    className="hover:scale-[1.05] transition-all ease-in-out"
                  >
                    Unbook Now!
                  </Button>
                </div>

                <p className="font-normal text-lg dark:text-white" aria-expanded={isExpanded}>
                  {isExpanded ? description : description.slice(0, 150) + '...'}

                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleExpandClick(index)}
                    // Accessibility: Expand/Collapse via keyboard on 'Enter' key press
                    onKeyDown={(e) => e.key === 'Enter' && handleExpandClick(index)}
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                </p>

                <div className="flex items-center gap-x-5 text-sm text-gray-700 dark:text-gray-400">
                  {[
                    { icon: CalendarIcon, text: dateOfPerformance },
                    { icon: MapIcon, text: mode },
                    { icon: EyeIcon, text: availability },
                  ].map((item, index) => (
                    <div className="flex items-center gap-x-1" key={index}>
                      <item.icon className="w-4 h-4 text-gray-600" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

ActivitiesList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dateOfPerformance: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
      availability: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export { ActivitiesList };
