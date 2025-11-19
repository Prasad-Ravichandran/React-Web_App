import "./App.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

function App() {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [ipInfo, setIpInfo] = useState({
    ip: "-",
    location: "-",
    timezone: "-",
    isp: "-",
  });
  const apiKey = import.meta.env.VITE_IPIFY_API_KEY;

  // initialize map once
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

  // handle search and update map
  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${encodeURIComponent(
          query
        )}`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const lat = data?.location?.lat;
      const lng = data?.location?.lng;
      const city =
        data?.location?.city ||
        `${data?.location?.region || ""} ${
          data?.location?.country || ""
        }`.trim();
      const timezone = data?.location?.timezone || "";
      const isp = data?.isp || "";
      const ip = data?.ip || "";

      // update state with fetched data
      setIpInfo({
        ip: ip || "-",
        location: city || "-",
        timezone: timezone ? `UTC${timezone}` : "-",
        isp: isp || "-",
      });

      // update map
      const map = mapRef.current;
      if (!map) {
        console.warn("Map not initialized yet");
        return;
      }

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
      setIpInfo({ ip: "-", location: "-", timezone: "-", isp: "-" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main>
      <>
        <img
          src="./src/assets/images/pattern-bg-desktop.png"
          alt="pic"
          id="back"
        />
        <h1 id="heading1">IP Address Tracker</h1>
        <input
          id="searchbar"
          type="text"
          placeholder="Search for any IP address or domain"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id="button" onClick={handleSearch}>
          <img src="./src/assets/images/icon-arrow.svg" alt="submit" />
        </button>
      </>

      <div id="info" aria-live="polite">
        <div className="info-item">
          <strong>IP Address:</strong> <span id="ip-address">{ipInfo.ip}</span>
        </div>
        <div className="info-item">
          <strong>Location:</strong>{" "}
          <span id="location">{ipInfo.location}</span>
        </div>
        <div className="info-item">
          <strong>Timezone:</strong>{" "}
          <span id="timezone">{ipInfo.timezone}</span>
        </div>
        <div className="info-item">
          <strong>ISP:</strong> <span id="isp">{ipInfo.isp}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
