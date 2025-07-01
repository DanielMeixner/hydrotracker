# Hydro Tracker

Hydro Tracker is a simple, client-side web application for tracking daily water intake. It is built with React and Vite, and supports installability as a Progressive Web App (PWA).

## Features
- Quick logging of water intake with predefined buttons ("Glass", "Half glass", "Bottle") or custom input
- Daily progress display with threshold indicator (red/green)
- Bar chart history for the last 10 days, with navigation
- Persistent data storage in the browser (local storage)
- User-defined or default daily threshold
- Responsive and accessible UI

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/DanielMeixner/hydrotracker.git
   cd hydrotracker/implementation/hydrotracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and go to the local address shown in the terminal (usually http://localhost:5173).

### Build for Production
To build a static version for deployment:
```sh
npm run build
```
The output will be in the `dist/` folder.

### PWA/Installability
This app is a PWA. You can "install" it from your browser on most platforms for an app-like experience.

## Contributing
- See the open issues for tasks and progress.
- Please keep the README up to date with any changes to setup or usage.

## License
MIT
