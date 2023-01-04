import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY,
  getActivitiesByHeadOfficeId,
} from '@/api/headoffice/getActivitiesByHeadOfficeId';
import { GET_ALL_LOCATIONS_KEY, getAllLocations } from '@/api/headoffice/getAllLocations';
import { ActivitiesList } from '@/components/shared/ActivitiesList';

import { Map } from './Map';

function HeadOfficesPage() {
  const [selectedHeadOfficeId, setSelectedHeadOfficeId] = useState(null);
  const [selectedHeadOfficeLocation, setSelectedHeadOfficeLocation] = useState(null);

  const { data: headoffices } = useQuery([GET_ALL_LOCATIONS_KEY], getAllLocations);

  const { data: activities } = useQuery(
    [GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY],
    () => getActivitiesByHeadOfficeId(selectedHeadOfficeId),
    {
      enabled: !!selectedHeadOfficeId,
      onSuccess: () => setSelectedHeadOfficeId(null),
    },
  );

  /**
   * Filters head offices by selected index and sets selected head office.
   *
   * @param {Array} array - array of head offices to filter.
   * @param {Number} index - selected head office index.
   */
  const filterByHeadOffice = (array, index) => {
    const { id, location } = array[index];
    setSelectedHeadOfficeId(id);
    setSelectedHeadOfficeLocation(location);
  };

  return (
    <div className="py-10">
      <div className="flex flex-col gap-y-5">
        <section class="bg-white dark:bg-gray-900">
          <div class="grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Our Head Offices
              </h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Explore our office locations and view services offered at each location with our
                interactive map.
              </p>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>

        {headoffices && headoffices.length > 0 && (
          <div className="h-96">
            <Map headoffices={headoffices} handleOnClick={filterByHeadOffice} />
          </div>
        )}

        {activities && (
          <section className="flex flex-col gap-y-3">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              All activities ({selectedHeadOfficeLocation})
            </h5>

            {activities.length > 0 ? (
              <ActivitiesList activities={activities} />
            ) : (
              'Sorry, there are no activities available for the selected head office location at the moment. Please try again later or choose a different location.'
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export { HeadOfficesPage };
