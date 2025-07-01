# HydroTracker Implementation

## Getting Started

1. Navigate to the `implementation` folder:
   ```sh
   cd implementation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

4. To build for production:
   ```sh
   npm run build
   ```

## Project Structure
- `src/components/` – UI components
- `src/App.tsx` – Main app logic
- `public/index.html` – HTML entry point

## Features
- Layout wireframe
- Predefined buttons (200, 300, 500 ml)
- Custom input and "Add" button
- Display for today’s total and threshold
- Bar chart for last 7 days
- Navigation controls for history

## Additional Features
- Customizable daily threshold (with persistence)
- Data persistence in local storage (history and threshold)
- Responsive design for mobile and desktop
- Accessibility: keyboard navigation, aria-labels, focus styles
- User feedback/status messages for actions

## Manual Testing Guidance
- Log water intake using predefined buttons and custom input
- Change the daily threshold and verify updates
- Navigate through history and check bar chart updates
- Refresh/reload the page to confirm data persistence
- Test on both desktop and mobile devices
- Use keyboard navigation and screen reader to verify accessibility

### Demo Mode Testing
- **URL Activation**: Add `?demo=true` to URL to auto-enter demo mode
- **UI Activation**: Click "Try Demo" button to enter demo mode  
- **Sample Data**: Verify realistic demo data (750ml current day, 1400ml previous day, etc.)
- **Write Prevention**: Confirm demo mode prevents localStorage saves
- **Visual Indicators**: Check orange demo banner and status message suffixes
- **Exit Functionality**: Test "Exit Demo" button restores real user data
- **See detailed guide**: [DEMO_MODE_TESTING.md](DEMO_MODE_TESTING.md)

## Testing

### Automated Tests
Run the test suite to verify core functionality:
```sh
npm test  # From root directory
```

#### Test Coverage
- **Unit Tests**: Demo Mode state management, data loading, write prevention
- **Integration Tests**: UI interactions, demo mode activation/exit workflows  
- **Component Tests**: Demo Mode indicator, accessibility, styling
- **StateContext Tests**: Reducer logic, persistence handling, data integrity

#### Test Categories
- `App.test.tsx` - Basic app rendering and user interactions
- `DemoMode.test.tsx` - Demo mode integration and workflows
- `DemoModeIndicator.test.tsx` - Demo UI component behavior
- `StateContext.test.tsx` - State management and reducer logic

### Manual Testing
Comprehensive manual testing procedures are documented in [DEMO_MODE_TESTING.md](DEMO_MODE_TESTING.md), covering:
- Demo mode activation methods (URL parameter and UI button)
- Data verification and navigation testing
- Write prevention verification  
- User experience and accessibility testing
- Edge cases and error scenarios
