"use client";

import React, { useEffect, useMemo, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationResource } from "@/api/models/LocationResource";
import { Skeleton } from "@/components/ui/skeletor";
import { MapPin } from "lucide-react";

type Props = {
  location?: LocationResource;
  isLoading?: boolean;
  className?: string;
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const FALLBACK_CENTER: [number, number] = [3.0588, 36.7538];

const LocationPlace = ({ location, isLoading, className }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);

  const coordinates = useMemo(() => {
    const lat = Number(location?.latitude);
    const lng = Number(location?.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    console.log({ location })
    return { lat: 4, lng: 34 };
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    if (!containerRef.current || !coordinates || !MAPBOX_TOKEN) return;

    let cancelled = false;
    let map: any | null = null;

    (async () => {
      const mapboxModule = await import("mapbox-gl");
      if (cancelled) return;

      const mapboxgl = (mapboxModule as any).default ?? mapboxModule;
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [coordinates.lng, coordinates.lat],
        zoom: 14,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

      new mapboxgl.Marker({ color: "#2563eb" })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, [coordinates]);

  if (isLoading) {
    return <Skeleton className={`h-64 w-full rounded-xl ${className ?? ""}`} />;
  }

  if (!MAPBOX_TOKEN) {
    return (
      <div className={`h-64 w-full rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground ${className ?? ""}`}>
        Map is unavailable: missing `NEXT_PUBLIC_MAPBOX_TOKEN`.
      </div>
    );
  }

  if (!coordinates) {
    return (
      <div className={`h-64 w-full rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground ${className ?? ""}`}>
        No valid location coordinates provided.
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-zinc-200 shadow-lg bg-white ${className ?? ""}`}>
      <div ref={containerRef} className="h-80 w-full" />
      <div className="border-t border-zinc-200 bg-gradient-to-r from-zinc-50 to-white px-4 py-3 text-sm font-medium text-zinc-700 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        {location?.city}, {location?.wilaya}, {location?.country}
      </div>
    </div>
  );
};

export default LocationPlace;
