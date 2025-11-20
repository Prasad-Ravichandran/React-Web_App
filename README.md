# IP Location Tracker (React + TypeScript + Vite + Leaflet)

Small responsive React app that looks up an IP address or domain (via Geo.ipify) and displays:

- IP address
- Location (city, region, country)
- Time zone
- ISP  
  A Leaflet map recenters with a marker for the queried location. Mobile view stacks the info panel as a white card.

## Features

- Search by IP address or domain
- Displays IP, Location, Timezone, ISP below the search input
- Shows marker on a Leaflet map and recenters map
- Responsive layout with column view on mobile
- Built with React + TypeScript + Vite + Leaflet

## Tech stack

- React (TypeScript)
- Vite
- Leaflet (map)
- Geo.ipify (geolocation API)
- CSS for responsive styling
  /

## Prerequisites

- Node.js 16+ (Windows environment assumed)
- npm (or yarn)
- Geo.ipify API key

## Project layout (important files)

- src/App.tsx — main component: search input, fetch logic, state, Leaflet integration
- src/index.css — application styling and responsive rules
- index.html — root + static `#map` element (or can be rendered by React)
- src/assets/ — local images used in JSX
- public/ — recommended place for CSS background images referenced in CSS (optional)

## Setup

1. Clone or open the project folder:

   - Example in PowerShell / CMD:
     cd c:\MyProjects\Ip_location_tracker-react

2. Install dependencies (Windows):
   npm install

3. Create environment file for the API key (Vite expects VITE\_ prefix):

   - File: `.env` (in project root)

   ```
   VITE_IPIFY_API_KEY=your_api_key_here
   ```

4. Ensure Leaflet CSS is imported in code:
   - In App.tsx or index.tsx:
     import 'leaflet/dist/leaflet.css'

## Run (development)

npm run dev

Open the URL printed by Vite (default: http://localhost:5173).

## Build & preview (production)

npm run build
npm run preview

## Usage

1. Start the dev server.
2. Enter an IP address or domain into the search input and press Enter or click the arrow button.
3. The info panel below the input updates (IP, Location, Timezone, ISP).
4. The map recenters and places/updates a marker for the fetched latitude/longitude.

## Notes and implementation details

- The app uses React state (useState) to control the input value and info panel. The map is stored in a ref (useRef) and initialized in a useEffect.
- The fetch request is made to Geo.ipify:
  `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${encodeURIComponent(query)}`
- The marker updates by calling `marker.setLatLng([lat, lng])` or creating a new marker if none exists.
- The component cleans up the Leaflet map on unmount with `map.remove()`.

## IP Location Tracker — Demo
[Click to Watch](https://github.com/Prasad-Ravichandran/React-Web_App/blob/ipaddress/src/assets/videos/Demo.mp4)

## Styling and assets

- For images imported in JSX, use imports or paths under `src/assets`:
  <img src="./src/assets/images/pattern-bg-desktop.png" alt="pattern" />
- For CSS `background-image` usage, prefer the `public/` folder and reference with an absolute path (e.g. `/images/bg-light-theme.png`) or import the image into CSS via bundler-aware methods.
- For font-style: `Kumbh sans` google font is imported for better style.
- Mobile layout: the info panel is styled with a media query to become a white card that stacks entries vertically.

## Common issues & troubleshooting

- Blank map or unstyled map:
  - Ensure Leaflet CSS is imported: `import 'leaflet/dist/leaflet.css'`.
  - Confirm `#map` container exists and has non-zero width/height.
- API returns 401/403 or no results:
  - Verify `VITE_IPIFY_API_KEY` is correct and not expired/quota exceeded.
  - Check browser Network tab for the request and response details.
- Input not triggering fetch:
  - Confirm input is bound: `value={searchQuery}` and `onChange={e => setSearchQuery(e.target.value)}`.
  - Confirm button uses React handler: `onClick={handleSearch}` and input handles Enter via `onKeyDown`.
- Background image not appearing:
  - Verify image path. If referenced from CSS, put images in `public/` and use `/images/...`.
  - Use browser devtools to see if the resource 404s.

## Security & production notes

- Do not expose API keys in client code for production. Use a proxy server or backend to keep keys secret.
- Rate limits and billing: check Geo.ipify account limits before heavy use.

## Commands summary (Windows)

- Install: npm install
- Dev: npm run dev
- Build: npm run build
- Preview build: npm run preview

## License

[MIT](https://github.com/Prasad-Ravichandran/character-counter/blob/ipaddress/LICENSE)
