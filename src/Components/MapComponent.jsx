// MapComponent.jsx
import React, { useEffect } from 'react';

const MapComponent = ({ coordinates, location }) => {
  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: '6mvha8UrzjALA2axKcZpFEub3dlwdKL6nY3vQWusXpc'
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());

    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    const marker = new window.H.map.Marker({ lat: coordinates.lat, lng: coordinates.lng });
    map.addObject(marker);

    return () => {
      map.dispose();
    };
  }, [coordinates]);

  return (
    <div>
      <div id="mapContainer" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
