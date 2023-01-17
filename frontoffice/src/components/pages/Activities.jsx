import { useQuery } from '@tanstack/react-query';
import { Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

import {
  BOOKABLE_ACTIVITIES_KEY,
  getBookableActivities,
} from '@/api/activities/bookableActivities';
import { ActivitiesList } from '@/components/shared/ActivitiesList';

function Activities() {
  const [selectedActivity, setSelectedActivity] = useState({ id: null, headOfficeLocation: null });
  const [activityToSearch, setActivityToSearch] = useState('');

  const { isLoading, data: availableActivities } = useQuery(
    [BOOKABLE_ACTIVITIES_KEY],
    getBookableActivities,
  );

  const filterByActivity = (index) => {
    const { id, headOffice } = availableActivities.activities[index];
    setSelectedActivity({ id, headOfficeLocation: headOffice.location });
  };

  const handleFilterByActivityName = (event) => {
    const value = event.target.value;
    setActivityToSearch(value);
  };

  const filterByActivityName = (activities) => {
    if (activityToSearch == '') {
      return activities;
    }
    return activities.filter((activity) => activity.name.includes(activityToSearch));
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="container mx-auto py-10 px-2.5 md:px-0">
      <div className="flex flex-col gap-y-10">
        <section className="flex flex-col gap-y-5">
          <div className="flex items-center gap-x-3">
            <h1 className="font-bold text-2xl">List of Available Activities</h1>

            <div>
              <Label className="sr-only" htmlFor="search" value="Filter activities by name" />
              <TextInput
                id="search"
                type="search"
                placeholder="Filter by name"
                aria-label="Filter activities by name"
                onChange={handleFilterByActivityName}
              />
            </div>
          </div>
          {availableActivities && (
            <section className="flex">
              <div className="flex w-2/3 border-r-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-3 auto-rows-auto gap-y-4 mt-5">
                  <ActivitiesList
                    activities={filterByActivityName(availableActivities.activities)}
                    cardOnClick={filterByActivity}
                    isCardCliccable={true}
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/3">
                {selectedActivity.id && (
                  <div className="flex flex-row items-center justify-center mt-5">
                    <div className="border p-5 rounded-lg">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {selectedActivity.headOfficeLocation}
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}

export { Activities };
