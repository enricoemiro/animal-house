import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map({ headoffices, handleOnClick }) {
  // See the following links:
  // - https://gist.github.com/graydon/11198540
  // - https://gist.github.com/graydon/11198540?permalink_comment_id=2216842#gistcomment-2216842
  // Format: [[south_lat, west_long], [north_lat, east_long]]
  const [mapBounds] = useState([
    [36.619987291, 6.7499552751],
    [47.1153931748, 18.4802470232],
  ]);

  return (
    <MapContainer className="h-full" bounds={mapBounds}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {headoffices.map(({ id, location, streetAddress, coordinates }, index) => {
        const [latitude, longitude] = coordinates.split(',');

        return (
          <Marker
            position={[latitude, longitude]}
            key={id}
            eventHandlers={{
              click: () => handleOnClick(headoffices, index),
            }}
          >
            <Popup>
              {location} {streetAddress}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export { Map };
