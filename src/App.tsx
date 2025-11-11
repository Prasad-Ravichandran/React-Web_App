import "./App.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

function App() {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const apiKey = `at_ORYrC6qERueYVjqw80pPsTJRqV4QM`;

  // initialize map once (uses the #map element from index.html)
  useEffect(() => {
    const el = document.getElementById("map") as HTMLDivElement;
    if (!el) return;

    mapRef.current = L.map(el).setView([20, 0], 2);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // attach listeners to the static input/button and update map on search
  useEffect(() => {
    const input = document.getElementById("searchbar") as HTMLInputElement;
    const btn = document.getElementById("button");
    const map = mapRef.current;
    if (!input || !btn || !map) return;

    const handle = async () => {
      const query = input.value.trim();
      if (!query) return;
      try {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        const lat = data?.location?.lat;
        const lng = data?.location?.lng;

        if (typeof lat === "number" && typeof lng === "number") {
          map.setView([lat, lng], 13);
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(map);
          }
        } else {
          console.error("Invalid location in API response", data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    btn.addEventListener("click", handle);

    return () => {
      btn.removeEventListener("click", handle);
    };
  }, [apiKey]);

  // do not render any DOM from React (map and controls are in index.html)
  return null;
}

export default App;
