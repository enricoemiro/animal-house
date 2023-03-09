import { createRoot } from 'react-dom/client';

import '@fontsource/pacifico';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { App } from './App';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

createRoot(document.getElementById('root')).render(<App />);
