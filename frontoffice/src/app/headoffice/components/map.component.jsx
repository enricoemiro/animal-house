import { Text, Title } from '@mantine/core';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const Map = ({ headoffices, onClick }) => {
  // See the following links:
  // - https://gist.github.com/graydon/11198540
  // - https://gist.github.com/graydon/11198540?permalink_comment_id=2216842#gistcomment-2216842
  // Format: [[south_lat, west_long], [north_lat, east_long]]
  const [mapBounds] = useState([
    [36.619987291, 6.7499552751],
    [47.1153931748, 18.4802470232],
  ]);

  return (
    <MapContainer
      bounds={mapBounds}
      worldCopyJump={true}
      style={{
        height: '300px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05),0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {headoffices?.map((headoffice) => {
        const [latitude, longitude] = headoffice.coordinates.split(',');

        return (
          <Marker
            key={headoffice.id}
            position={[latitude, longitude]}
            eventHandlers={
              onClick && {
                click: () => {
                  onClick(headoffice.id);
                },
              }
            }
          >
            <Popup>
              <Title order={3}>{headoffice.location}</Title>
              <Text color="dimmed">{headoffice.streetAddress}</Text>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
