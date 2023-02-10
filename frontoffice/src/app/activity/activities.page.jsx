import { CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Flex, SimpleGrid, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';
import { isWithinInterval } from 'date-fns';
import { useState } from 'react';

import { PageHeader } from '@/components/layouts/page-header.component';

import {
  GET_BOOKABLE_ACTIVITIES_KEY,
  getBookableActivities,
} from './api/get-bookable-activities.api';
import { ActivityList } from './components/activity-list.component';

export const ActivitiesPage = () => {
  const [query, setQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const { data: activities } = useQuery({
    queryKey: [GET_BOOKABLE_ACTIVITIES_KEY],
    queryFn: getBookableActivities,
    initialData: [],
    retry: 0,
  });

  const filterActivites = (activities) => {
    let filteredActivities = activities;

    if (query) {
      filteredActivities = filteredActivities.filter((activity) => {
        const lowercaseQuery = query.toLowerCase();

        return (
          activity.headOffice.location.toLowerCase().includes(lowercaseQuery) ||
          activity.name.toLowerCase().includes(lowercaseQuery)
        );
      });
    }

    if (dateRange[0] && dateRange[1]) {
      filteredActivities = filteredActivities.filter((activity) => {
        return isWithinInterval(new Date(activity.dateOfPerformance), {
          start: dateRange[0],
          end: dateRange[1],
        });
      });
    }

    return filteredActivities;
  };

  return (
    <SimpleGrid spacing="md">
      <PageHeader
        title="Activities"
        subtitle="Discover the comprehensive care for your pet at our animal store, offering services such as veterinary care and dog grooming, tailored to meet your needs."
      />

      <Flex justify="center" columnGap="xs">
        <TextInput
          placeholder="Search activities"
          icon={<MagnifyingGlassIcon width={16} />}
          aria-label="Search activities"
          onChange={(event) => setQuery(event.currentTarget.value)}
          value={query}
        />

        <DateRangePicker
          placeholder="Search by date"
          focusable
          clearable
          allowSingleDateInRange
          minDate={new Date()}
          icon={<CalendarIcon width={16} />}
          aria-label="Search by date"
          onChange={setDateRange}
          value={dateRange}
        />
      </Flex>

      <ActivityList activities={filterActivites(activities)} />
    </SimpleGrid>
  );
};
