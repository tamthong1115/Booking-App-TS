import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { HotelType } from "../../../../backend/shared/types.ts";

type MapboxGLProps = {
  hotel: HotelType;
};

const MapboxGL = ({ hotel }: MapboxGLProps) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_SECRET_TOKEN as string;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const longitude = hotel.location.coordinates[0];
  const latitude = hotel.location.coordinates[1];
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      if (!map.current) return;

      setLng(parseInt(map.current.getCenter().lng.toFixed(4)));
      setLat(parseInt(map.current.getCenter().lat.toFixed(4)));
      setZoom(parseInt(map.current.getZoom().toFixed(2)));
    });
    if (!map.current) return;

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h1>${hotel.name}</h1>`))
      .addTo(map.current);
  }, [hotel, lat, lng, zoom]);

  return (
    <div
      ref={mapContainer}
      className={
        "flex h-[500px] w-[500px] items-center justify-center rounded-md bg-gray-300"
      }
    />
  );
};

export default MapboxGL;
