'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current).setView([6.9019, 79.8612], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);
    L.marker([6.9019, 79.8612]).addTo(map).bindPopup('Compassion Lanka Foundation<br/>Colombo 07');
    return () => { map.remove(); };
  }, []);

  return (
    <div ref={mapRef} className="h-48 w-full rounded-2xl shadow-md" aria-label="Office location map" />
  );
}
