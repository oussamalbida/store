'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map({ location = [34.0522, -118.2437] }) {
  useEffect(() => {
    // Cleanup function to handle map container cleanup
    return () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        key={`${location[0]}-${location[1]}`}
        center={location} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            Visit us here! <br />
            Our physical location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
