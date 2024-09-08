# University Application Tracker

This is a **University Application Tracker** designed to help users store, manage, and edit their personal information, university applications, and related data in a customizable manner. It uses localStorage to persist data, allowing users to retrieve it anytime they revisit the app. The app also features dark mode, copy functionality, and a dynamic welcome modal to introduce users to the system.

## Features
1. **Dark Mode Toggle**: Allows users to switch between light and dark modes.
2. **Accordion Menu**: Collapsible sections for better organization of content.
3. **University CRUD**: Users can add, update, or delete university entries.
4. **Data Persistence**: Data is saved to and retrieved from `localStorage`, ensuring user information is not lost after closing the app.
5. **Copy Functionality**: Users can copy individual field values or all information at once.
6. **Auto-Save Shortcut**: Users can press `Ctrl + S` to save their current data without interacting with buttons.
7. **Welcome Modal**: A modal window that introduces the app to first-time users.
8. **Notification System**: Real-time notifications inform users of actions such as saving data or copying content.

## How It Works
1. **Dark Mode**:
   - A toggle button switches between light and dark mode.
   - The selected theme is saved in `localStorage` for persistence across sessions.

2. **Accordion Menu**:
   - Sections are collapsible by clicking on their respective headers.
   - The "Toggle All" button opens or closes all sections at once.

3. **CRUD Operations**:
   - Universities are stored as an array in `localStorage`.
   - The user can add, update, or delete university records dynamically.

4. **Data Management**:
   - Personal information is saved in `localStorage` and can be retrieved when the page loads.
   - The user can save all data by pressing `Ctrl + S` or by clicking the save button.

5. **Welcome Modal**:
   - If no data exists, a welcome modal introduces users to the application.
   - The modal can be closed by clicking outside the modal content or clicking the close button.

6. **Copy Functions**:
   - Users can copy individual field values or all data at once for easy access.
   - Notifications are displayed when the copy operation is successful.

## Files
1. **index.html**: The main HTML file that contains the structure of the app, including the form, university list, dark mode button, and welcome modal.
2. **styles.css**: Contains the styles for the application, including dark mode, modal window, and general layout.
3. **script.js**: JavaScript logic for managing data, updating the UI, and handling events like dark mode, CRUD operations, notifications, and saving data.

## Installation
To run this app locally, follow these steps:

1. Clone or download the repository.
2. Open the `index.html` file in your preferred web browser.

## Usage
1. **First-Time Use**:
   - When you first open the application, you will see a welcome modal explaining the app.
   - Fill out your personal information and enter university applications.

2. **Saving Data**:
   - You can manually save your data by clicking the **Save** button or by pressing `Ctrl + S` on your keyboard.
   - The data is saved to your browser's `localStorage` and will persist even after you close or refresh the page.

3. **Managing Universities**:
   - Add new universities by filling out the university name and type and submitting the form.
   - Edit or delete universities using the corresponding buttons next to each university entry.

4. **Dark Mode**:
   - Toggle between light and dark mode using the button in the top-right corner.
   - The mode will be saved and restored on the next visit.

5. **Copying Information**:
   - You can copy specific fields or all of your information with the provided copy buttons.

6. **Clear All Data**:
   - Use the "Clear All Data" button to reset all fields and remove saved data from `localStorage`.

## Shortcuts
- **Ctrl + S**: Save all data.
  
## License
This project is open-source and available for modification or distribution.

---

This `README.md` provides a comprehensive overview of the University Application Tracker app, explaining its features, functionality, and how to use it.