import { SimpleGrid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { GET_ALL_LOCATIONS_KEY, getAllLocations } from '@/app/headoffice/api/get-all-locations.api';
import { Map } from '@/app/headoffice/components/map.component';
import { PageHeader } from '@/components/layouts/page-header.component';

import { HeadOfficeActivities } from './components/head-office-activities.component';

export const HeadOfficesPage = () => {
  const [headOffice, setHeadOffice] = useState(null);

  const { data: headOffices } = useQuery({
    queryKey: [GET_ALL_LOCATIONS_KEY],
    queryFn: getAllLocations,
    initialData: null,
    retry: 0,
  });

  const handleMapClick = (id) => {
    setHeadOffice(headOffices.find((headOffice) => headOffice.id === id));
  };

  return (
    <SimpleGrid spacing="md">
      <PageHeader
        title="Head Offices"
        subtitle="Discover our different office locations and get a detailed look at the services available at
        each site through our interactive map."
      />

      <Map headoffices={headOffices} onClick={handleMapClick} />

      {headOffice && <HeadOfficeActivities headOffice={headOffice} />}
    </SimpleGrid>
  );
};
