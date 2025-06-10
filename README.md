# A&A Quiz App

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

This project is a simple quiz application built with [Expo](https://expo.dev) and React Native. It showcases a minimal navigation flow with a home screen, quiz questions and a results view that awards badges based on your score. Questions and high score data are stored locally so you can practise even without a network connection.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npx expo start
   ```
3. The CLI will offer options to open the app in a development build, simulator/emulator or Expo Go.

To run the Jest test suite use:
```bash
npm test
```

## Features

- React Navigation based stack (`HomeScreen`, `QuizScreen`, `ResultScreen`)
- Tracks a persistent high score using AsyncStorage
- Review mode for incorrectly answered questions
- Badge system that rewards bronze, silver or gold depending on the final score
- Works on Android, iOS and the web via Expo
- Multi-language UI with runtime language selection

## Adding translations

Translation files live in `src/i18n`. Each file is named after its language code
(for example `en.json` or `es.json`). To add a new language:

1. Copy `src/i18n/en.json` to a new file like `fr.json`.
2. Translate each value while keeping the same keys.
3. Import the file and add it to the dictionary in `src/i18n/index.ts`.
4. The new language will automatically appear in the menu on the home screen.

## Learn more

See the [Expo documentation](https://docs.expo.dev/) for more details on building, deploying and extending the app.


## License

This project is licensed under the [MIT License](LICENSE).
