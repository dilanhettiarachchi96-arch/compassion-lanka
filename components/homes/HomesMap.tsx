'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockHomes } from '@/lib/mock-data';
import type { ChildrenHome } from '@/types';

interface HomesMapProps {
  homes?: ChildrenHome[];
}

export function HomesMap({ homes = mockHomes }: HomesMapProps = {}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([7.8731, 80.7718], 7);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: `<div style="background:#1B4F3A;width:24px;height:24px;border-radius:50%;border:3px solid #F4A832;"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    homes.forEach((home) => {
      const needsHtml = home.currentNeeds
        .map((n) => `<span style="display:inline-block;margin:2px;padding:2px 6px;background:#f3f4f6;border-radius:4px;font-size:11px;">${n.replace('_', ' ')}</span>`)
        .join('');

      L.marker([home.latitude, home.longitude], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px;">
            <strong>${home.name}</strong><br/>
            ${home.childrenCount} children<br/>
            <div style="margin:6px 0;">${needsHtml}</div>
            <a href="/homes" style="color:#1B4F3A;font-weight:600;">View Details</a>
          </div>`
        );
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [homes]);

  return (
    <div
      ref={mapRef}
      className="h-[400px] w-full rounded-2xl shadow-md md:h-[500px]"
      aria-label="Map of partner children's homes in Sri Lanka"
    />
  );
}
