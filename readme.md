# University Application Organizer (InfOrganizer)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Reminder Feature](#reminder-feature)
- [Translation Feature](#translation-feature)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Dependencies](#dependencies)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application helps users organize their personal information, academic records, and manage university applications efficiently. Users can add, edit, and delete universities, store personal information, and switch between light and dark modes. The app supports custom sections and fields, ensuring flexibility in handling various kinds of information.

## Features

1. **Dark/Light Mode**: Easily toggle between dark and light themes.
2. **CRUD for Universities**: Users can add, update, and delete university applications.
3. **Local Storage**: All the data, including personal information and university lists, is stored in the browser's local storage. This ensures that the user's data persists between sessions.
4. **Welcome Modal**: A modal greets new users, explaining the application’s purpose and functionality.
5. **Keyboard Shortcut for Saving**: Users can press `Ctrl+S` (or `Cmd+S` on Mac) to save their personal information quickly.
6. **Dynamic Accordion Sections**: Toggle individual sections or show/hide all sections to organize information better.
7. **Reminder Feature**: Users can set reminders for specific events or dates, and the app will display the reminders in the user's local time format.
8. **Clipboard Copy**: Users can copy specific fields or all the information at once to their clipboard.
9. **Internationalization (i18n)**: The app supports both English and French translations for various UI elements.

## Reminder Feature

The reminder feature allows users to set a reminder by selecting a date and time. The date is displayed in the user's local timezone. The application stores the reminder information in local storage, ensuring that reminders are persistent across browser sessions.

### Reminder Example:

- The user can enter a reminder text and select a date and time.
- The date and time input is automatically set to 5 hours from the current time.
- All reminders are displayed in the user's local timezone for better accuracy.

## Translation Feature

This application supports translation between **English** and **French** for the UI. The internationalization (i18n) feature allows the app's text to be dynamically switched based on the user's selected language.

### Example of Translations

- **English:**
  - "This app helps you organize your personal information, academic records, and track your university applications efficiently."
  - "You can save your information, modify it anytime, and even add new sections or fields as needed."
- **French:**
  - "Cette application vous aide à organiser vos informations personnelles, vos dossiers académiques et à suivre vos candidatures universitaires de manière efficace."
  - "Vous pouvez sauvegarder vos informations, les modifier à tout moment et même ajouter de nouvelles sections ou champs selon vos besoins."

These translations are handled using the `data-i18n` attribute for different UI elements.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsma3il/InfOrganizer
   ```
2. Open the project in a local development environment.
3. Open `index.html` in your browser to start using the application.

## Usage

### Adding a University

1. Enter the university name.
2. Select the type of university (e.g., **Cycle Ingenieur**, **Licence Professionnelle**, etc.).
3. Choose the status (e.g., **Applied**, **Pending**, **Accepted**, **Rejected**).
4. Click the **Add** button.

### Setting a Reminder

1. Enter the reminder text.
2. Select the reminder date and time (default is 5 hours from the current time).
3. Click the **Add Reminder** button.
4. The reminder will be saved and displayed in your local timezone.

### Switching Between English and French

1. Select your language of choice using a dropdown or toggle in the application.
2. The application will dynamically update the text on the page based on your selection.

## Technologies Used

- **HTML5/CSS3**: For the app structure and design.
- **JavaScript**: For handling dynamic functionalities such as CRUD operations, reminders, and localization.
- **Local Storage**: To save user data, reminders, and theme preferences.

## Dependencies

- No external libraries are required. This application uses vanilla JavaScript, HTML, and CSS.

## Browser Compatibility

This application is compatible with modern web browsers including:
- Google Chrome (version 90+)
- Mozilla Firefox (version 88+)
- Microsoft Edge (version 90+)
- Safari (version 14+)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
