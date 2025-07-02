# Demo Mode - Manual Testing Guide

This guide provides comprehensive instructions for manually testing Demo Mode functionality in HydroTracker.

## Overview

Demo Mode allows users to explore the application with sample data without affecting their real hydration tracking data. It includes:

- Sample realistic water intake data for 7 days
- Visual indicators showing demo mode status
- Prevention of data persistence to localStorage
- Easy activation and deactivation

## Test Scenarios

### 1. Demo Mode Activation

#### 1.1 URL Parameter Activation
**Test**: Access demo mode via URL parameter
**Steps**:
1. Open browser and navigate to: `http://localhost:3000/?demo=true`
2. Verify demo mode indicator appears (orange banner with "🎯 DEMO MODE")
3. Verify the message "You're in demo mode - data won't be saved" is displayed
4. Verify sample data is loaded (should show 750ml for current day)
5. Verify "Exit Demo" button is present

**Expected Results**:
- Orange demo mode banner is prominently displayed
- Sample data shows realistic values (750ml for day 0)
- No "Try Demo" button is visible
- Bar chart shows realistic historical data

#### 1.2 UI Button Activation
**Test**: Enter demo mode via UI button
**Steps**:
1. Open browser and navigate to: `http://localhost:3000/`
2. Verify "Try Demo" button is visible in top-right area
3. Click the "Try Demo" button
4. Verify demo mode indicator appears
5. Verify data changes from empty state to sample data

**Expected Results**:
- Demo mode banner appears after clicking
- Data switches from 0ml to 750ml
- "Try Demo" button disappears
- "Exit Demo" button appears

### 2. Demo Mode Data and Navigation

#### 2.1 Sample Data Verification
**Test**: Verify realistic sample data across multiple days
**Steps**:
1. Activate demo mode (via URL or button)
2. Note the current day total (should be 750ml)
3. Click "< Prev" button to navigate to previous day
4. Verify different realistic data (should be 1400ml)
5. Continue navigating through days
6. Verify bar chart updates accordingly

**Expected Results**:
- Day 0: 750ml
- Day 1: 1400ml  
- Day 2: 1200ml
- Day 3: 1000ml
- Day 4: 1750ml
- Day 5: 1050ml
- Day 6: 1200ml
- Bar chart reflects navigation changes

#### 2.2 Interactions in Demo Mode
**Test**: Verify all app features work in demo mode
**Steps**:
1. Activate demo mode
2. Add water intake using predefined buttons (200ml, 300ml, 500ml)
3. Add custom water intake amount
4. Change daily threshold value
5. Navigate between days
6. Verify all actions work but show "(demo mode)" in status messages

**Expected Results**:
- All buttons and inputs function normally
- Status messages include "(demo mode)" suffix
- Changes are reflected in UI immediately
- Demo mode indicator remains visible throughout

### 3. Write Prevention

#### 3.1 localStorage Protection
**Test**: Verify demo mode prevents data persistence
**Steps**:
1. Open browser developer tools (F12)
2. Go to Application > Local Storage
3. Note current localStorage contents
4. Activate demo mode
5. Perform various actions (add water, change threshold)
6. Check localStorage again - should not update with demo data
7. Refresh page while in demo mode
8. Verify demo mode reloads with original sample data (changes lost)

**Expected Results**:
- localStorage is not modified during demo mode
- Real user data remains unchanged
- Page refresh resets to original demo data

### 4. Demo Mode Exit

#### 4.1 Exit via UI Button
**Test**: Exit demo mode and verify data restoration
**Steps**:
1. Start with some real user data (add 300ml in normal mode)
2. Activate demo mode
3. Verify demo data is shown (750ml)
4. Perform some actions in demo mode
5. Click "Exit Demo" button
6. Verify return to real user data (300ml)
7. Verify demo mode indicator disappears
8. Verify "Try Demo" button reappears

**Expected Results**:
- Demo mode indicator disappears
- Real user data is restored exactly as before
- "Try Demo" button is visible again
- Any changes made in demo mode are lost

#### 4.2 Exit from URL-activated Demo Mode
**Test**: Exit demo mode when activated via URL
**Steps**:
1. Navigate to `http://localhost:3000/?demo=true`
2. Verify demo mode is active
3. Click "Exit Demo" button
4. Verify URL parameter is still present but demo mode is inactive
5. Verify "Try Demo" button is visible
6. Refresh page
7. Verify demo mode reactivates due to URL parameter

**Expected Results**:
- Exit Demo button works even with URL parameter
- Demo mode can be toggled off temporarily
- URL parameter reactivates demo mode on refresh

### 5. User Experience and Accessibility

#### 5.1 Visual Indicators
**Test**: Verify clear visual distinction
**Steps**:
1. Compare normal mode vs demo mode appearance
2. Verify demo mode banner is prominent and attention-grabbing
3. Check color contrast and readability
4. Verify mobile responsiveness of demo indicator

**Expected Results**:
- Demo mode is immediately obvious when active
- Orange gradient banner stands out clearly
- Text is readable and high contrast
- Mobile layout adapts appropriately

#### 5.2 Accessibility Testing
**Test**: Verify screen reader and keyboard accessibility
**Steps**:
1. Use keyboard navigation (Tab key) through demo mode controls
2. Test with screen reader (if available)
3. Verify aria-live announcements for status changes
4. Check focus indicators on demo mode buttons

**Expected Results**:
- All demo mode controls are keyboard accessible
- Screen readers announce demo mode status
- Focus indicators are visible
- ARIA attributes provide context

### 6. Edge Cases and Error Scenarios

#### 6.1 Multiple Demo Mode Toggles
**Test**: Rapid activation/deactivation
**Steps**:
1. Start in normal mode
2. Click "Try Demo" multiple times rapidly
3. Click "Exit Demo" multiple times rapidly
4. Verify state remains consistent

**Expected Results**:
- App handles rapid toggles gracefully
- No duplicate demo indicators
- State remains consistent

#### 6.2 Demo Mode with Empty localStorage
**Test**: Demo mode behavior without existing user data
**Steps**:
1. Clear all localStorage data (via dev tools)
2. Activate demo mode
3. Exit demo mode
4. Verify default state is restored

**Expected Results**:
- Demo mode works without existing data
- Exit returns to clean default state (0ml, 2000ml threshold)

## Test Results Documentation

When performing manual testing, document results in this format:

```
Test: [Test Name]
Date: [Date]
Browser: [Browser and Version]
Status: ✅ Pass / ❌ Fail
Notes: [Any observations or issues]
```

## Common Issues and Troubleshooting

- **Demo mode doesn't activate**: Check console for JavaScript errors
- **Data not switching**: Verify demo mode indicator is visible
- **localStorage still updating**: Check that demo mode banner is displayed
- **Mobile layout issues**: Test on actual mobile devices, not just browser resize

## Automation Notes

These manual tests complement the automated test suite:
- Unit tests: Demo Mode state management and data integrity
- Integration tests: UI interactions and component behavior  
- E2E tests: Full user workflows (not yet implemented)

The manual testing focuses on visual verification, accessibility, and real browser behavior that automated tests cannot fully cover.