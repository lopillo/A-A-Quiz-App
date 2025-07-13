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

### Usage

1. Launch the development server and open the app on a device or emulator.
2. From the home screen enter your name and start a quiz.
3. After each round you can review mistakes before moving on.
4. Use the **View Records** and **View Medals** buttons on the selection screen to see stored high scores and medal standings.

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
- Medal board stores the top three results per operation and tracks how many medals have been collected

## Medal standings

Medals are awarded for each arithmetic operation based on accuracy:

- **Gold** – 100% correct answers
- **Silver** – at least 80% correct
- **Bronze** – at least 50% correct

Whenever a quiz finishes, the `updateMedalBoard` function writes the result to `AsyncStorage`. Each operation keeps the best three scores along with the medal earned. A summary view counts all medals collected out of **40 total badges** available across the app.

## Animations

The celebratory animation on the result screen is powered by
[Lottie](https://airbnb.io/lottie/) using the `lottie-react` package. Animation
data lives in the `assets/lottie` folder where the `success.json` and
`failure.json` files reside.

To use a different animation:

1. Drop the new `.json` file into `assets/lottie`.
2. Update the `require` statement in
   `src/components/RoundSummaryScreen.tsx` to point at your file.
3. Rebuild the project. The library automatically uses `lottie-web` for web
   builds and `lottie-react-native` on Android and iOS, so no extra setup is
   required. Avoid animations that load external images as they may not render
   consistently across platforms.

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
