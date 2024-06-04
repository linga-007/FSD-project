import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Geocoding = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');

  const getCoordinates = async () => {
    const apiKey = 'YOUR_HERE_MAPS_API_KEY';
    const encodedLocation = encodeURIComponent(location);

    try {
      const response = await axios.get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodedLocation}&apiKey=${apiKey}`
      );

      if (response.data.items.length > 0) {
        const { lat, lng } = response.data.items[0].position;
        setCoordinates({ lat, lng });
        setError('');
      } else {
        setError('Location not found.');
      }
    } catch (err) {
      setError('An error occurred while fetching the coordinates.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCoordinates();
  };

  return (
    <div className="container">
      <h1>Geocoding with HERE Maps API</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
          className="input"
        />
        <button type="submit" className="button">Get Coordinates</button>
      </form>
      {coordinates.lat && coordinates.lng && (
        <div>
          <div className="coordinates">
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
          </div>
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lng]}>
              <Popup>
                {location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Geocoding;
